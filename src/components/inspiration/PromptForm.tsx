import React from 'react';
import { PiRobot, PiMagicWand, PiSpinner } from 'react-icons/pi';

interface PromptFormProps {
  prompt: string;
  isLoading: boolean;
  setPrompt: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export function PromptForm({
  prompt,
  isLoading,
  setPrompt,
  handleSubmit,
  error,
}: PromptFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Describe your crochet idea
        </label>
        <div className="relative">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a cute baby elephant with a flower crown"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-12"
          />
          <PiRobot className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <PiMagicWand className="w-5 h-5 mr-2" />
            Generate Design
          </>
        )}
      </button>
    </form>
  );
}
