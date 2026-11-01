
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] grid place-items-center px-6 text-center">
      <div>
        <AlertCircle size={48} className="mx-auto text-trendo-muted mb-4" />
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-trendo-muted mb-6 text-sm">The page you are looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/home")}
          className="rounded-lg bg-trendo-primary px-6 py-2.5 text-sm font-semibold text-white"
        >
          Go home
        </button>
      </div>
    </div>
  );
}