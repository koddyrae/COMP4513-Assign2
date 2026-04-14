// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn, playlistCount, setAboutOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-violet-400 tracking-tight hover:text-violet-300 transition">
        SoundVault
      </Link>

      <nav className="flex items-center gap-6 text-sm text-zinc-400">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/artists" className="hover:text-white transition">Artists</Link>
        <Link to="/genres" className="hover:text-white transition">Genres</Link>
        <Link to="/songs" className="hover:text-white transition">Songs</Link>
        {isLoggedIn && (
          <Link to="/playlists" className="hover:text-white transition">Playlists</Link>
        )}
        <button 
          onClick={() => setAboutOpen(true)} 
          className="hover:text-white transition"
        >
          About
        </button>
      </nav>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link 
              to="/playlists" 
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
            >
              🎵
              <span className="bg-violet-600 text-white text-xs rounded-full px-2 py-0.5 font-medium">
                {playlistCount}
              </span>
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-md transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}