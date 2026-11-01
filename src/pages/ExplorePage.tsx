
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Hash, Users, Video, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useDebounce } from "@/hooks/useDebounce";

type ProfileRow = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

export function ExplorePage() {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 300);
  const sanitized = debounced.replace(/[%_,()]/g, "").trim();

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["search-users", sanitized],
    enabled: sanitized.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .or(`username.ilike.%${sanitized}%,display_name.ilike.%${sanitized}%`)
        .limit(20);
      if (error) throw error;
      return (data ?? []) as ProfileRow[];
    },
  });

  const searching = sanitized.length > 0;

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-trendo-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-trendo-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search people…"
              className="w-full rounded-lg bg-trendo-surface pl-10 pr-3 py-2.5 text-sm placeholder:text-trendo-muted border border-transparent focus:border-trendo-primary focus:bg-white outline-none transition"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {searching ? (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-trendo-muted mb-3">People</h2>
            {isFetching && <p className="text-sm text-trendo-muted">Searching…</p>}
            {!isFetching && results.length === 0 && (
              <p className="text-sm text-trendo-muted">No accounts match "{sanitized}".</p>
            )}
            <ul className="divide-y divide-trendo-border rounded-lg bg-white border border-trendo-border overflow-hidden">
              {results.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="h-10 w-10 rounded-full bg-trendo-surface shrink-0 overflow-hidden">
                    {u.avatar_url ? (
                      <img src={u.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-trendo-muted font-semibold">
                        {(u.display_name || u.username).slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{u.display_name || u.username}</p>
                    <p className="text-xs text-trendo-muted truncate">@{u.username}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="space-y-8">
            <section>
              <SectionHeader icon={TrendingUp} title="Trending" />
              <EmptyCard icon={Hash} title="No trends yet" body="Hashtags rise here as the community starts posting." />
            </section>
            <section>
              <SectionHeader icon={Users} title="Creators to follow" />
              <EmptyCard icon={Users} title="Creator recommendations coming soon" body="New accounts will be featured here as TRENDO grows." />
            </section>
            <section>
              <SectionHeader icon={Video} title="Popular videos" />
              <EmptyCard icon={Video} title="Popular videos coming soon" body="This grid lights up as soon as video uploads go live." />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: typeof Hash; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold mb-3">
      <Icon size={16} className="text-trendo-primary" />
      {title}
    </h2>
  );
}

function EmptyCard({ icon: Icon, title, body }: { icon: typeof Hash; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-trendo-border bg-trendo-surface px-5 py-8 text-center">
      <Icon size={22} className="mx-auto text-trendo-muted mb-2" />
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-trendo-muted mt-1">{body}</p>
    </div>
  );
}