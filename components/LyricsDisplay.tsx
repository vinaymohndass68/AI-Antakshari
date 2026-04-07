import React from 'react';
import { Song } from '../types';
import { MusicNoteIcon } from './icons';

interface LyricsDisplayProps {
  song: Song | null;
}

const getYouTubeID = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}


const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ song }) => {
  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-800 rounded-lg shadow-inner">
        <MusicNoteIcon className="w-24 h-24 text-gray-600 mb-6" />
        <h2 className="text-2xl font-bold text-gray-300">Welcome to AI Antakshari!</h2>
        <p className="text-gray-400 mt-2 max-w-md">
          Find a song by entering a letter on the left. Once you select a suggestion, its lyrics and a music player will appear here.
        </p>
      </div>
    );
  }
  
  const videoId = song.youtubeUrl ? getYouTubeID(song.youtubeUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-inner h-full overflow-y-auto">
      <div className="mb-4 pb-4 border-b border-gray-700">
        <h2 className="text-3xl font-bold text-cyan-300">{song.title}</h2>
        <p className="text-lg text-gray-400 mt-1">From the movie: {song.movie}</p>
      </div>

      {embedUrl ? (
         <div className="aspect-video w-full rounded-lg overflow-hidden my-4 shadow-lg">
            <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
      ) : song.youtubeUrl && (
         <p className="text-red-400 text-sm my-4">Could not load video player: invalid YouTube URL provided.</p>
      )}

      <h3 className="text-xl font-semibold text-cyan-400 mb-4 mt-6">Lyrics</h3>
      <pre className="whitespace-pre-wrap text-gray-200 font-sans text-base leading-relaxed">
        {song.lyrics}
      </pre>
    </div>
  );
};

export default LyricsDisplay;