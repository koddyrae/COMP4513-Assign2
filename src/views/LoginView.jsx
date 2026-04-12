// src/views/LoginView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginView({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
    
      <div>
        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}