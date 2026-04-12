import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../api";

export default function HomeView() {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then(data => {
      // grabs 6 random artists for featured section
      const shuffled = data.sort(() => 0.5 - Math.random());
      setFeaturedArtists(shuffled.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>SoundVault</h1>
        <p>Discover your next favorite artist, genre, or song.</p>
        <Link to="/songs">Browse Songs</Link>
        <Link to="/artists">Browse Artists</Link>
      </div>

      <div>
        <h2>Featured Artists</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {featuredArtists.map(artist => (
              <Link key={artist.artist_id} to={`/artists/${artist.artist_id}`}>
                <img
                  src={artist.artist_image_url}
                  alt={artist.artist_name}
                  onError={e => e.target.src = "https://placehold.co/200x200?text=No+Image"}
                />
                <p>{artist.artist_name}</p>
                <p>{artist.type_name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}