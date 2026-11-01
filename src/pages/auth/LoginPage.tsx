
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Logo } from "@/components/layout/Logo";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      push(error.message, "error");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-trendo-surface grid place-items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-trendo-border p-8">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="text-xs text-trendo-muted mt-1">Your World. Your Trends.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-trendo-border px-3 py-2 text-sm focus:border-trendo-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-trendo-border px-3 py-2 text-sm focus:border-trendo-primary outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-trendo-primary py-2.5 text-sm font-semibold text-white hover:bg-trendo-primary-hover transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-trendo-muted mt-6">
          Don't have an account? <Link to="/register" className="text-trendo-primary font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}