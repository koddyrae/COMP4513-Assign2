// src/views/SongView.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSong, getArtist, getSongs } from "../api";
import SongRadar from "../components/SongRadar";

export default function SongView({ playlist, setPlaylist }) {
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
          score: analytics.reduce((sum, key) => sum + Math.abs(s[key] - songData[key] ?? 0), 0)
        }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 4);
      setRelatedSongs(scored);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading song...</p>;

  return (
    <div>
      <h1>{song.title}</h1>

      <div>
        <div>
          <p><strong>Artist: </strong><Link to={`/artists/${song.artist_id}`}>{song.artist_name}</Link></p>
          <p><strong>Year:</strong> {song.year}</p>
          <p><strong>Genre:</strong> {song.genre_name}</p>
          <p><strong>BPM:</strong> {song.bpm}</p>
          <p><strong>Popularity:</strong> {song.popularity}</p>
          <p><strong>Loudness:</strong> {song.loudness}</p>
          <button onClick={() => console.log("add to playlist", song)}>
            + Add to Playlist
          </button>
        </div>

        <div>
          {artist && (
            <img
              src={artist.artist_image_url}
              alt={artist.artist_name}
              onError={e => e.target.src = "https://placehold.co/200x200?text=No+Image"}
            />
          )}
        </div>
      </div>

      <div>
        <SongRadar song={song} />
      </div>

      <div>
        <h2>Related Songs</h2>
        <div>
          {relatedSongs.map(s => (
            <Link key={s.song_id} to={`/songs/${s.song_id}`}>
              <p>{s.title}</p>
              <p>{s.artist_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}