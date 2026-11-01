
import { useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";
import { EmptyState } from "@/components/ui/EmptyState";

const TABS = ["For You", "Following", "Friends"] as const;
type Tab = (typeof TABS)[number];

export function HomePage() {
  const [tab, setTab] = useState<Tab>("For You");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-trendo-border">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 lg:justify-center">
          <div className="lg:hidden"><Logo size="sm" /></div>
          <button
            onClick={() => navigate("/inbox")}
            aria-label="Inbox"
            className="lg:hidden p-2 -mr-2 rounded-full hover:bg-trendo-surface"
          >
            <Bell size={20} className="text-trendo-text" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 pb-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-2 text-sm font-semibold transition-colors ${
                tab === t ? "text-trendo-text" : "text-trendo-muted"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-px h-0.5 w-8 rounded-full bg-trendo-primary" />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden bg-trendo-bg">
        <div className="h-full w-full grid place-items-center">
          <EmptyState
            icon={Bell}
            title={
              tab === "For You" ? "Your feed is warming up" :
              tab === "Following" ? "Follow creators to fill your feed" :
              "No friend videos yet"
            }
            body="Videos from creators you follow will appear here once the short-video feed is live."
            action={
              <button
                onClick={() => navigate("/explore")}
                className="inline-flex items-center justify-center rounded-lg bg-trendo-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-trendo-primary-hover transition-colors"
              >
                Discover creators
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}