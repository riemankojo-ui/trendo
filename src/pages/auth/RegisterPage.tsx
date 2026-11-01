
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Logo } from "@/components/layout/Logo";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      push(error.message, "error");
    } else {
      push("Account created! Check your email to confirm.", "success");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-trendo-surface grid place-items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-trendo-border p-8">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="text-xs text-trendo-muted mt-1">Create an account</p>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs text-trendo-muted mt-6">
          Already have an account? <Link to="/login" className="text-trendo-primary font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}