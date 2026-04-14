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

  if (loading) return <LoadingSpinner message="Loading Genres..." />;

  return (
    <div>
      <h1>Genres</h1>
      <div>
        {genres.map(genre => (
          <Link key={genre.genre_id} to={`/genres/${genre.genre_id}`}>
            <img 
              src={`https://placehold.co/200x200?text=${genre.genre_name}`}
              alt={genre.genre_name}
            />
            <p>{genre.genre_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}