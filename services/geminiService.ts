import { GoogleGenAI, Type } from "@google/genai";
import { Song } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const findSongs = async (character: string, excludedTitles: string[]): Promise<Song[]> => {
  try {
    const prompt = `Give me a list of 5 popular Hindi Bollywood songs starting with the letter '${character}'. The songs should be well-known. Do not include any of the following songs in your suggestions: [${excludedTitles.join(', ')}].`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the song.",
              },
              movie: {
                type: Type.STRING,
                description: "The name of the movie the song is from.",
              },
            },
            required: ['title', 'movie'],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const songs: Song[] = JSON.parse(jsonString);
    return songs;
  } catch (error) {
    console.error("Error finding songs:", error);
    throw new Error("Failed to fetch song suggestions. The model may be unavailable.");
  }
};

export const getSongDetails = async (songTitle: string, movieName: string): Promise<{ lyrics: string; youtubeUrl: string; }> => {
  try {
    const prompt = `For the Hindi song "${songTitle}" from the movie "${movieName}", provide the full lyrics and a valid YouTube URL for the official music video.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
       config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.STRING,
              description: "The full lyrics of the song, with appropriate line breaks.",
            },
            youtubeUrl: {
              type: Type.STRING,
              description: "A valid YouTube URL for the song's official music video.",
            },
          },
          required: ['lyrics', 'youtubeUrl'],
        },
      },
    });

    const jsonString = response.text.trim();
    const details = JSON.parse(jsonString);
    return details;

  } catch (error) {
    console.error("Error getting song details:", error);
    throw new Error("Failed to fetch details for the selected song.");
  }
};