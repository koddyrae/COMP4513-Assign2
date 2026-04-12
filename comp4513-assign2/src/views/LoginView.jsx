import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginView = ({ onLogin, isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    onLogin(email);
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@example.com"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.btnRow}>
            <button type="submit" style={styles.loginBtn}>
              Login
            </button>
            <button type="button" style={styles.registerBtn} disabled>
              Register (coming soon)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    margin: "0 0 1rem 0",
    textAlign: "center",
    color: "#1a1a2e",
  },
  notice: {
    fontSize: "0.8rem",
    color: "#888",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "600",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    color: "#333",
  },
  input: {
    padding: "0.6rem 0.8rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.95rem",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
    margin: "0.25rem 0",
  },
  btnRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  loginBtn: {
    flex: 1,
    padding: "0.65rem",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  registerBtn: {
    flex: 1,
    padding: "0.65rem",
    backgroundColor: "#eee",
    color: "#aaa",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "0.95rem",
  },
};

export default LoginView;
