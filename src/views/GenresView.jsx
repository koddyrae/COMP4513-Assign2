// src/views/GenresView.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

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
                src={`https://placehold.co/300x300/18181b/a855f7?text=${genre.genre_name}`}
                alt={genre.genre_name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <p className="text-sm font-medium text-zinc-300 group-hover:text-white mt-2 transition">{genre.genre_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}