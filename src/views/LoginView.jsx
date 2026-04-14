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
    <div className="h-full flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 w-full max-w-sm space-y-6">
        
        <h1 className="text-3xl font-bold text-white text-center">Login</h1>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-zinc-800 text-white text-sm rounded-md px-4 py-2 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-zinc-800 text-white text-sm rounded-md px-4 py-2 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          Login
        </button>

      </div>
    </div>
  );
}