
import React from 'react';
import { Song } from '../types';
import { MusicIcon } from './icons';

interface SongSuggestionsProps {
  suggestions: Song[];
  onSelectSong: (song: Song) => void;
  isLoading: boolean;
}

const SongSuggestions: React.FC<SongSuggestionsProps> = ({ suggestions, onSelectSong }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-cyan-400 mb-4">Song Suggestions</h2>
      <div className="space-y-3">
        {suggestions.map((song, index) => (
          <button
            key={index}
            onClick={() => onSelectSong(song)}
            className="w-full text-left p-3 bg-gray-700 hover:bg-cyan-800/50 rounded-md transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <MusicIcon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"/>
              <div>
                <p className="font-semibold text-gray-100">{song.title}</p>
                <p className="text-sm text-gray-400">{song.movie}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongSuggestions;
