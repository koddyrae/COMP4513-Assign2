import { Link, useNavigate } from "react-router-dom";

const Header = ({
  isLoggedIn,
  onLogout,
  currentPlaylistCount,
  currentPlaylistName,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        SoundVault
      </Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/artists" style={styles.link}>
          Artists
        </Link>
        <Link to="/genres" style={styles.link}>
          Genres
        </Link>
        <Link to="/songs" style={styles.link}>
          Songs
        </Link>
        {isLoggedIn && (
          <Link to="/playlists" style={styles.link}>
            Playlists
          </Link>
        )}
        <Link to="/songs" style={styles.link}>
          About
        </Link>
      </nav>

      <div style={styles.right}>
        {isLoggedIn && (
          <span style={styles.playlistInfo}>
            {currentPlaylistName ?? "No playlist"} ({currentPlaylistCount})
          </span>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.btn}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={styles.btn}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 2rem",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  playlistInfo: {
    fontSize: "0.85rem",
    color: "#aaa",
  },
  btn: {
    padding: "0.4rem 1rem",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

export default Header;
