import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../api";

export default function ArtistsView() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then(data => {
      setArtists(data);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <p>Loading artists...</p>;
  return (
    <div>
      <h1>Artists</h1>
      <div>
        {artists.map(artist => (
            <Link key={artist.artist_id} to={`/artists/${artist.artist_id}`}>
                <img 
                    src={artist.artist_image_url} 
                    alt={artist.artist_name}
                    onError={e => e.target.src = "https://placehold.co/200x200?text=No+Image"}
                />
            <p>{artist.artist_name}</p>
            </Link>
        ))}
      </div>
    </div>
  );
}