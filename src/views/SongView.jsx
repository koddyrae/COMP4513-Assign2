import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSong, getArtist, getSongs } from "../api";
import SongRadar from "../components/SongRadar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SongView( { onAddToPlaylist } ) {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSong(id).then(songData => {
      setSong(songData);
      return Promise.all([getArtist(songData.artist_id), getSongs(), songData]);
    }).then(([artistData, allSongs, songData]) => {
      setArtist(artistData);
      const analytics = ["danceability", "energy", "valence", "liveness", "speechiness", "acousticness"];
      const scored = allSongs
        .filter(s => s.song_id !== parseInt(id))
        .map(s => ({
          ...s,
          score: analytics.reduce((sum, key) => sum + Math.abs(s[key] - songData[key]), 0)
        }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 4);
      setRelatedSongs(scored);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading song..." />;

  return (
    <div className="h-full overflow-y-auto px-8 py-6 text-white">

      <h1 className="text-4xl font-bold mb-8">{song.title}</h1>

      <div className="flex gap-8 mb-10">

        <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-3">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-zinc-400 font-medium">Artist</span>
            <Link to={`/artists/${song.artist_id}`} className="text-violet-400 hover:text-violet-300 transition-colors">
              {song.artist_name}
            </Link>

            <span className="text-zinc-400 font-medium">Year</span>
            <span>{song.year}</span>

            <span className="text-zinc-400 font-medium">Genre</span>
            <span>{song.genre_name}</span>

            <span className="text-zinc-400 font-medium">BPM</span>
            <span>{song.bpm}</span>

            <span className="text-zinc-400 font-medium">Popularity</span>
            <span>{song.popularity}</span>

            <span className="text-zinc-400 font-medium">Loudness</span>
            <span>{song.loudness}</span>
          </div>

          <button
            onClick={() => onAddToPlaylist(song)}
            className="mt-4 w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-md py-2 transition-colors"
          >
          + Add to Playlist
          </button>
        </div>

        {artist && (
          <div className="shrink-0">
            <img
              src={artist.artist_image_url}
              alt={artist.artist_name}
              onError={e => e.target.src = "https://placehold.co/200x200?text=No+Image"}
              className="w-52 h-52 object-cover rounded-xl border border-zinc-700"
            />
            <p className="text-center text-sm text-zinc-400 mt-2">{artist.artist_name}</p>
          </div>
        )}
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">Audio Profile</h2>
        <SongRadar song={song} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Related Songs</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {relatedSongs.map(s => (
            <Link
              key={s.song_id}
              to={`/songs/${s.song_id}`}
              className="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-xl p-4 transition-colors"
            >
              <p className="text-sm font-medium text-white truncate">{s.title}</p>
              <p className="text-xs text-zinc-400 mt-1 truncate">{s.artist_name}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}