import { Link, useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn, playlistCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      <Link to="/">SoundVault</Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/songs">Songs</Link>
        {isLoggedIn && <Link to="/playlists">Playlists</Link>}
        <button>About</button>
      </nav>

      <div>
        {isLoggedIn ? (
          <>
            <Link to="/playlists">
              Playlist ({playlistCount})
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}