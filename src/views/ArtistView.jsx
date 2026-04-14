import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtist, getSongsByArtist } from "../api";
import SongList from "../components/SongList";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ArtistView({ onAddToPlaylist }) {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getArtist(id), getSongsByArtist(id)]).then(([artistData, songsData]) => {
      setArtist(artistData);
      setSongs(songsData);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading artist..." />;

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Artist Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-64 flex-shrink-0">
            <img
              src={artist.artist_image_url}
              alt={artist.artist_name}
              onError={e => e.target.src = "https://placehold.co/300x300?text=No+Image"}
              className="w-full aspect-square object-cover rounded-lg border border-zinc-800"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-1">{artist.type_name}</p>
              <h1 className="text-5xl font-bold text-white">{artist.artist_name}</h1>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">{artist.spotify_desc}</p>
            <a 
              href={artist.spotify_url} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition w-fit"
            >
              View on Spotify →
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <SongList songs={songs} onAddToPlaylist={onAddToPlaylist} />
          </div>
        </div>

      </div>
    </div>
  );
}