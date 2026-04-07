
import React, { useState, FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (character: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [character, setCharacter] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (character.trim() && !isLoading) {
      onSearch(character.trim().charAt(0).toUpperCase());
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg shadow-lg mb-6">
      <h2 className="text-lg font-bold text-cyan-400 mb-2">Find a Song</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder="Enter a letter"
          maxLength={1}
          className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !character.trim()}
          className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? 'Searching...' : 'Find'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;