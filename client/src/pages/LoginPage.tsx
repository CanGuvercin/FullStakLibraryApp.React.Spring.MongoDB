import { useState } from "react";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginStore = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await authApi.login(email, password);
      loginStore.login(token);
      navigate("/"); // HomePage
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 dark:text-blue-300">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full p-2 rounded border dark:bg-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full p-2 rounded border dark:bg-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
