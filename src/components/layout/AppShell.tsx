
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  return (
    <div className="min-h-screen bg-trendo-bg flex">
      <aside className="hidden lg:flex w-60 shrink-0 border-r border-trendo-border sticky top-0 h-screen">
        <Sidebar />
      </aside>

      <main className="flex-1 min-w-0 pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}