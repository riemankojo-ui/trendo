
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";
import { Logo } from "./Logo";

export function Sidebar() {
  const navigate = useNavigate();

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-trendo-primary-tint text-trendo-primary"
        : "text-trendo-text hover:bg-trendo-surface"
    }`;

  return (
    <div className="flex flex-col h-full p-5">
      <div className="mb-8 pl-2">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink to="/home" end className={({ isActive }) => linkClass(isActive)}>
          {({ isActive }) => (<><Home size={22} strokeWidth={isActive ? 2.4 : 2} /> Home</>)}
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => linkClass(isActive)}>
          {({ isActive }) => (<><Compass size={22} strokeWidth={isActive ? 2.4 : 2} /> Explore</>)}
        </NavLink>
        <button
          type="button"
          onClick={() => navigate("/create")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-trendo-text hover:bg-trendo-surface transition-colors text-left"
        >
          <Plus size={22} strokeWidth={2} /> Create
        </button>
        <NavLink to="/inbox" className={({ isActive }) => linkClass(isActive)}>
          {({ isActive }) => (<><MessageCircle size={22} strokeWidth={isActive ? 2.4 : 2} /> Inbox</>)}
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => linkClass(isActive)}>
          {({ isActive }) => (<><User size={22} strokeWidth={isActive ? 2.4 : 2} /> Profile</>)}
        </NavLink>
      </nav>
    </div>
  );
}