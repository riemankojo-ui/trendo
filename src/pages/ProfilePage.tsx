
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Link as LinkIcon, Video } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const TABS = ["Videos", "Liked", "Saved"] as const;
type Tab = (typeof TABS)[number];

type ProfileRow = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
};

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Videos");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, bio, avatar_url, website")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data as ProfileRow;
    },
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-full grid place-items-center">
        <div className="h-6 w-6 rounded-full border-2 border-trendo-primary border-t-transparent animate-trendo-spin" />
      </div>
    );
  }

  const name = profile?.display_name || profile?.username || "Your profile";
  const initial = name.slice(0, 1).toUpperCase();

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-trendo-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-bold">Profile</h1>
          <button
            onClick={handleSignOut}
            className="p-2 -mr-2 rounded-full hover:bg-trendo-surface text-trendo-muted"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-trendo-surface border border-trendo-border overflow-hidden grid place-items-center text-2xl font-bold text-trendo-primary shrink-0">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{name}</h2>
            {profile?.username && (
              <p className="text-sm text-trendo-muted truncate">@{profile.username}</p>
            )}
            <div className="flex gap-5 mt-3 text-sm">
              <span><b>0</b> <span className="text-trendo-muted">Following</span></span>
              <span><b>0</b> <span className="text-trendo-muted">Followers</span></span>
              <span><b>0</b> <span className="text-trendo-muted">Likes</span></span>
            </div>
          </div>
        </div>

        {profile?.bio && <p className="mt-4 text-sm whitespace-pre-line">{profile.bio}</p>}
        {profile?.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1 text-sm text-trendo-primary hover:underline"
          >
            <LinkIcon size={14} />
            {profile.website.replace(/^https?:\/\//, "")}
          </a>
        )}

        <div className="mt-5 flex gap-2">
          <button
            disabled
            title="Profile editing ships in Phase 2"
            className="flex-1 rounded-lg border border-trendo-border bg-trendo-surface py-2.5 text-sm font-semibold text-trendo-muted cursor-not-allowed"
          >
            Edit profile
          </button>
          <button
            onClick={() => navigate("/create")}
            className="flex-1 rounded-lg bg-trendo-primary py-2.5 text-sm font-semibold text-white hover:bg-trendo-primary-hover transition-colors"
          >
            Create video
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-2">
        <div className="flex gap-1 border-y border-trendo-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "border-trendo-primary text-trendo-text"
                  : "border-transparent text-trendo-muted hover:text-trendo-text"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-trendo-primary-tint grid place-items-center mb-4">
          <Video size={24} className="text-trendo-primary" />
        </div>
        <p className="text-sm font-semibold">
          {tab === "Videos" && "No videos yet"}
          {tab === "Liked" && "Nothing liked yet"}
          {tab === "Saved" && "Nothing saved yet"}
        </p>
        <p className="mt-1 text-xs text-trendo-muted max-w-xs mx-auto">
          {tab === "Videos" && "Your published videos will appear here."}
          {tab === "Liked" && "Videos you like will be saved to this tab."}
          {tab === "Saved" && "Videos you bookmark will be saved here."}
        </p>
      </div>
    </div>
  );
}