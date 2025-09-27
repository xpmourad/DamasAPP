import { Type } from "@google/genai";

export const GAME_STATE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A creative and descriptive narration of the player's current location and surroundings. This should change if the player moves to a new location.",
    },
    exits: {
      type: Type.OBJECT,
      description: "An object where keys are directions (e.g., 'north', 'south', 'up') and values are brief descriptions of what is in that direction. Omit directions that are not valid exits.",
      properties: {
        north: { type: Type.STRING, description: "Description for the north exit, if it exists." },
        south: { type: Type.STRING, description: "Description for the south exit, if it exists." },
        east: { type: Type.STRING, description: "Description for the east exit, if it exists." },
        west: { type: Type.STRING, description: "Description for the west exit, if it exists." },
        up: { type: Type.STRING, description: "Description for the up exit, if it exists." },
        down: { type: Type.STRING, description: "Description for the down exit, if it exists." },
        in: { type: Type.STRING, description: "Description for going 'in', if it exists." },
        out: { type: Type.STRING, description: "Description for going 'out', if it exists." },
      },
    },
    items: {
      type: Type.ARRAY,
      description: "A list of items currently visible or available to take in the room.",
      items: { type: Type.STRING },
    },
    inventory: {
      type: Type.ARRAY,
      description: "The player's updated inventory list after their action. Should include any newly acquired items.",
      items: { type: Type.STRING },
    },
    narratorResponse: {
      type: Type.STRING,
      description: "The narrator's response to the player's action. Describe what happened as a result of their command (e.g., 'You pick up the dusty key.', 'You can't go that way.').",
    },
    isGameOver: {
      type: Type.BOOLEAN,
      description: "Set to true if the player has won or lost the game. Otherwise, false.",
    },
    gameMessage: {
      type: Type.STRING,
      description: "A message to display when the game is over. For example, 'Congratulations! You have found the Sunstone!' or 'You have been defeated.'",
    },
  },
  required: ["description", "exits", "items", "inventory", "narratorResponse", "isGameOver", "gameMessage"],
};