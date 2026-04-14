import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) return <LoadingSpinner message="Loading artists..." />;

  return (
    <div>
      <h1>{artist.artist_name}</h1>
      
      <div>
        <img 
          src={artist.artist_image_url} 
          alt={artist.artist_name}
          onError={e => e.target.src = "https://placehold.co/200x200?text=No+Image"}
        />
        <div>
          <p>{artist.type_name}</p>
          <p>{artist.spotify_desc}</p>
          <a href={artist.spotify_url} target="_blank" rel="noreferrer">
            Spotify Link
          </a>
        </div>
      </div>

      <h2>Songs</h2>
        <SongList songs={songs} onAddToPlaylist={onAddToPlaylist} />
    </div>
  );
}