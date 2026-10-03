import { Outlet } from 'react-router-dom';

// Centered, card-style layout used for the Login and Registration pages.
// No sidebar here since the user isn't logged in yet.
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">
            D
          </div>
          <span className="text-xl font-semibold tracking-tight text-navy-900">
            Devzo
          </span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
