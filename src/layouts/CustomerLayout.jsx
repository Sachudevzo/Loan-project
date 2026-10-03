import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

// Shared shell for every logged-in customer page:
// - Sidebar on desktop (md and up)
// - Top bar + slide-over menu on mobile
// The actual page content renders in place of <Outlet />.
export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] md:flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <MobileNav />
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
