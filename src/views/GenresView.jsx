import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const genreImages = {
  "alt z": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  "art pop": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=300&fit=crop",
  "atl hip hop": "https://images.unsplash.com/photo-1571600900166-8466b95cd20b?w=300&h=300&fit=crop",
  "boy band": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  "brostep": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
  "canadian hip hop": "https://images.unsplash.com/photo-1618409698993-11872c0048e3?w=300&h=300&fit=crop",
  "chicago rap": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop",
  "dance pop": "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=300&h=300&fit=crop",
  "dfw rap": "https://images.unsplash.com/photo-1602306022553-2bd3c9928f0d?w=300&h=300&fit=crop",
  "emo rap": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=300&h=300&fit=crop",
  "folk-pop": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop",
  "hip hop": "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?w=300&h=300&fit=crop",
  "indie pop": "https://plus.unsplash.com/premium_photo-1687609112015-23bcdb2385f4?w=300&h=300&fit=crop",
  "latin": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=300&h=300&fit=crop",
  "melodic rap": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
  "pop": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
  "country": "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=300&h=300&fit=crop",
  "r&b": "https://images.unsplash.com/photo-1551853979-e62763e84352?w=300&h=300&fit=crop",
  "k-pop": "https://images.unsplash.com/photo-1577991712260-4ee45603dab8?w=300&h=300&fit=crop",
  "modern rock": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
};

export default function GenresView() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres().then(data => {
      setGenres(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner message="Loading genres..." />;

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-white">Genres</h1>
        <p className="text-zinc-400 mt-2">{genres.length} genres available</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {genres.map(genre => (
          <Link
            key={genre.genre_id}
            to={`/genres/${genre.genre_id}`}
            className="flex flex-col group"
          >
            <div className="w-full aspect-square overflow-hidden rounded-lg border border-zinc-800 group-hover:border-violet-500 transition duration-300">
              <img
                src={genreImages[genre.genre_name.toLowerCase()] || `https://placehold.co/300x300/18181b/a855f7?text=${genre.genre_name}`}
                alt={genre.genre_name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={e => e.target.src = `https://placehold.co/300x300/18181b/a855f7?text=${genre.genre_name}`}
              />
            </div>
            <p className="text-sm font-medium text-zinc-300 group-hover:text-white mt-2 transition">{genre.genre_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}