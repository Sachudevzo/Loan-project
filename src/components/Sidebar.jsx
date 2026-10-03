import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  ClipboardList,
  Calculator,
  LogOut,
} from 'lucide-react';
import { PATHS } from '../routes/paths';
import { logoutUser } from '../services/authService';

// Nav items shared between Sidebar (desktop) and MobileNav (mobile).
// Kept in one place so both stay in sync automatically.
export const NAV_ITEMS = [
  { label: 'Dashboard', to: PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'My Profile', to: PATHS.PROFILE, icon: User },
  { label: 'Apply for Loan', to: PATHS.APPLY_LOAN, icon: FileText },
  { label: 'My Applications', to: PATHS.APPLICATIONS, icon: ClipboardList },
  { label: 'EMI Calculator', to: PATHS.EMI_CALCULATOR, icon: Calculator },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate(PATHS.LOGIN);
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 bg-navy-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">
          D
        </div>
        <span className="text-lg font-semibold tracking-tight">Devzo</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-navy-200 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
