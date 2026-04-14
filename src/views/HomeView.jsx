// src/views/HomeView.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../api";
import FeaturedArtists from "../components/FeaturedArtists";

export default function HomeView() {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then(data => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      setFeaturedArtists(shuffled.slice(0, 12));
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-violet-950 to-zinc-950">
        <h1 className="text-6xl font-bold text-white mb-4">SoundVault</h1>
        <p className="text-zinc-400 text-lg mb-8">Discover your next favorite artist, genre, or song.</p>
        <div className="flex gap-4">
          <Link to="/songs" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-md font-medium transition">
            Browse Songs
          </Link>
          <Link to="/artists" className="border border-zinc-600 hover:border-violet-400 text-zinc-300 hover:text-white px-6 py-2.5 rounded-md font-medium transition">
            Browse Artists
          </Link>
        </div>
      </div>

      {/* Featured Artists */}
      {loading ? (
        <p className="text-zinc-400 text-center py-12">Loading...</p>
      ) : (
        <FeaturedArtists artists={featuredArtists} />
      )}
    </div>
  );
}