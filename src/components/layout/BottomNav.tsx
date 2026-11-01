
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();

  const iconClass = (isActive: boolean) =>
    `transition-colors ${isActive ? "text-trendo-primary" : "text-trendo-muted"}`;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-trendo-border lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary navigation"
    >
      <ul className="flex items-center justify-around h-14">
        <li className="flex-1 flex justify-center">
          <NavLink to="/home" end className="flex items-center justify-center w-full h-full" aria-label="Home">
            {({ isActive }) => (
              <Home size={22} strokeWidth={isActive ? 2.4 : 2} className={iconClass(isActive)} />
            )}
          </NavLink>
        </li>

        <li className="flex-1 flex justify-center">
          <NavLink to="/explore" className="flex items-center justify-center w-full h-full" aria-label="Explore">
            {({ isActive }) => (
              <Compass size={22} strokeWidth={isActive ? 2.4 : 2} className={iconClass(isActive)} />
            )}
          </NavLink>
        </li>

        <li className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/create")}
            aria-label="Create"
            className="w-[38px] h-[38px] rounded-[5px] bg-trendo-primary text-white flex items-center justify-center shadow-sm transition-transform active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </li>

        <li className="flex-1 flex justify-center">
          <NavLink to="/inbox" className="flex items-center justify-center w-full h-full" aria-label="Inbox">
            {({ isActive }) => (
              <MessageCircle size={22} strokeWidth={isActive ? 2.4 : 2} className={iconClass(isActive)} />
            )}
          </NavLink>
        </li>

        <li className="flex-1 flex justify-center">
          <NavLink to="/profile" className="flex items-center justify-center w-full h-full" aria-label="Profile">
            {({ isActive }) => (
              <User size={22} strokeWidth={isActive ? 2.4 : 2} className={iconClass(isActive)} />
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}