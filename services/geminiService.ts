
import { GoogleGenAI } from "@google/genai";
import { GameState } from '../types';
import { GAME_STATE_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseGameStateResponse = (responseText: string): GameState => {
  try {
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Failed to parse JSON from Gemini:", error);
    console.error("Original text:", responseText);
    throw new Error("Received malformed data from the game master.");
  }
};

const getSystemInstruction = (gameState?: GameState) => {
    let instruction = `You are a dungeon master for a text-based adventure game called 'The Lost Temple of Aethel'.
The player's goal is to find the legendary Sunstone.
You must be creative, descriptive, and engaging.
Always respond ONLY with a JSON object that strictly adheres to the provided schema. Do not include any other text or formatting like markdown '` + "```" + `json'.\n`;

    if (gameState) {
        instruction += `\nCurrent Player State:
- Location Description: "${gameState.description}"
- Player Inventory: [${gameState.inventory.join(', ')}]
- Items in room: [${gameState.items.join(', ')}]\n`;
    }

    return instruction;
};


export const getInitialGameState = async (): Promise<GameState> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate the starting scene for the text adventure game 'The Lost Temple of Aethel'. The player starts at the entrance of a cave. The player's inventory is empty.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: GAME_STATE_SCHEMA,
        },
        systemInstruction: getSystemInstruction()
    });

    return parseGameStateResponse(response.text);
};


export const getNextGameState = async (currentState: GameState, command: string): Promise<GameState> => {
    const prompt = `The player issues the command: "${command}".
Analyze the command and the current state to generate the next game state.
If the player tries to 'get' an item, update their inventory and remove it from the room's items.
If they try to 'go' somewhere, change the description to a new room.
If they find the 'sunstone', set 'isGameOver' to true with a congratulatory message.
Be creative with outcomes. A wrong move could lead to a trap!`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: GAME_STATE_SCHEMA,
        },
        systemInstruction: getSystemInstruction(currentState)
    });

    return parseGameStateResponse(response.text);
};
