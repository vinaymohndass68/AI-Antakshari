
import React from 'react';
import { Song } from '../types';

interface PickedSongsListProps {
  songs: Song[];
  onClear: () => void;
}

const PickedSongsList: React.FC<PickedSongsListProps> = ({ songs, onClear }) => {
  if (songs.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-cyan-400">Played Songs</h2>
        <button
          onClick={onClear}
          className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-red-800/60 rounded-md transition-colors"
          aria-label="Clear played songs list"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {songs.map((song, index) => (
          <li key={index} className="p-2 bg-gray-700/50 rounded text-sm">
            <p className="font-semibold text-gray-200 truncate">{song.title}</p>
            <p className="text-xs text-gray-400 truncate">{song.movie}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PickedSongsList;
