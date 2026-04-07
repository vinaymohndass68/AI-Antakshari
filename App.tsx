import React, { useState, useMemo } from 'react';
import { Song } from './types';
import { findSongs, getSongDetails } from './services/geminiService';
import SearchForm from './components/SearchForm';
import SongSuggestions from './components/SongSuggestions';
import LyricsDisplay from './components/LyricsDisplay';
import PickedSongsList from './components/PickedSongsList';
import Loader from './components/Loader';
import { MusicNoteIcon } from './components/icons';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [pickedSongs, setPickedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (character: string) => {
    setIsLoading(true);
    setLoadingMessage(`Finding songs starting with '${character}'...`);
    setError(null);
    setSuggestions([]);
    setSelectedSong(null);
    try {
      const excludedTitles = pickedSongs.map(s => s.title);
      const newSuggestions = await findSongs(character, excludedTitles);
      setSuggestions(newSuggestions);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSong = async (song: Song) => {
    setIsLoading(true);
    setLoadingMessage(`Fetching details for '${song.title}'...`);
    setError(null);
    try {
      const { lyrics, youtubeUrl } = await getSongDetails(song.title, song.movie);
      const completeSong = { ...song, lyrics, youtubeUrl };
      setSelectedSong(completeSong);
      setPickedSongs(prev => [...prev, completeSong]);
      setSuggestions([]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPickedSongs = () => {
    setPickedSongs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 font-sans">
      <header className="py-4 px-8 bg-black/20 shadow-md">
        <div className="container mx-auto flex items-center space-x-3">
          <MusicNoteIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold tracking-wider text-white">AI Antakshari</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            {suggestions.length > 0 && !isLoading && (
              <SongSuggestions suggestions={suggestions} onSelectSong={handleSelectSong} isLoading={isLoading}/>
            )}
            <PickedSongsList songs={pickedSongs} onClear={handleClearPickedSongs} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 min-h-[60vh] flex flex-col">
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
                <p className="font-bold">An error occurred:</p>
                <p>{error}</p>
              </div>
            )}
            <div className="flex-grow">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader message={loadingMessage} />
                </div>
              ) : (
                <LyricsDisplay song={selectedSong} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;