import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongsByGenre } from "../api";
import SongList from "../components/SongList";

export default function GenreView({ onAddToPlaylist }) {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSongsByGenre(id).then(data => {
      setSongs(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{songs[0]?.genre_name}</h1>
      <h2>Songs</h2>
        <SongList songs={songs} onAddToPlaylist={onAddToPlaylist} />
    </div>
  );
}