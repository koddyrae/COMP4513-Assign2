import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ArtistsView() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then(data => {
      setArtists(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner message="Loading artists..." />;

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-white">Artists</h1>
        <p className="text-zinc-400 mt-2">{artists.length} artists available</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {artists.map(artist => (
          <Link
            key={artist.artist_id}
            to={`/artists/${artist.artist_id}`}
            className="flex flex-col group"
          >
            <div className="w-full aspect-square overflow-hidden rounded-lg border border-zinc-800 group-hover:border-violet-500 transition duration-300">
              <img
                src={artist.artist_image_url}
                alt={artist.artist_name}
                onError={e => e.target.src = "https://placehold.co/300x300?text=No+Image"}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <p className="text-sm font-medium text-zinc-300 group-hover:text-white mt-2 transition">{artist.artist_name}</p>
            <p className="text-xs text-zinc-500">{artist.type_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}