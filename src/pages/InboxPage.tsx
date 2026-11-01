
import { useState } from "react";
import { Bell, MessageCircle, UserPlus } from "lucide-react";

const TABS = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "requests", label: "Requests", icon: UserPlus },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function InboxPage() {
  const [tab, setTab] = useState<TabId>("notifications");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-trendo-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <h1 className="text-base font-bold">Inbox</h1>
        </div>
        <div className="max-w-2xl mx-auto px-2 flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? "border-trendo-primary text-trendo-text"
                  : "border-transparent text-trendo-muted hover:text-trendo-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-trendo-primary-tint grid place-items-center mb-4">
          <active.icon size={26} className="text-trendo-primary" />
        </div>
        <p className="text-sm font-semibold">
          {tab === "notifications" && "No notifications yet"}
          {tab === "messages" && "No messages yet"}
          {tab === "requests" && "No follow requests"}
        </p>
        <p className="mt-1 text-xs text-trendo-muted max-w-xs mx-auto">
          {tab === "notifications" && "Likes, comments, and follows will show up here."}
          {tab === "messages" && "Start a conversation with a creator you follow."}
          {tab === "requests" && "People who ask to follow your private account appear here."}
        </p>
      </div>
    </div>
  );
}