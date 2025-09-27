
import React, { useState } from 'react';

interface InputBarProps {
  onSubmit: (command: string) => void;
  disabled: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSubmit, disabled }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() && !disabled) {
      onSubmit(command);
      setCommand('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center">
      <span className="text-green-400 text-2xl mr-2 font-vt323">&gt;</span>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={disabled}
        className="flex-grow bg-gray-800 border border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none rounded-md p-2 text-green-300 placeholder-green-700 disabled:opacity-50"
        placeholder={disabled ? "Awaiting fate's decision..." : "What will you do?"}
        autoFocus
      />
    </form>
  );
};
