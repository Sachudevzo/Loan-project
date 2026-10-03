import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from './paths';

import AuthLayout from '../layouts/AuthLayout';
import CustomerLayout from '../layouts/CustomerLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ApplyLoan from '../pages/ApplyLoan';
import Applications from '../pages/Applications';
import EmiCalculator from '../pages/EmiCalculator';

// All app routes are defined here in one place.
// AuthLayout wraps the login/register pages (no sidebar).
// CustomerLayout wraps every logged-in page (sidebar + mobile nav).
export default function AppRoutes() {
  return (
    <Routes>
      {/* Default route redirects to login for now */}
      <Route path="/" element={<Navigate to={PATHS.LOGIN} replace />} />

      <Route element={<AuthLayout />}>
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.REGISTER} element={<Register />} />
      </Route>

      <Route element={<CustomerLayout />}>
        <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
        <Route path={PATHS.PROFILE} element={<Profile />} />
        <Route path={PATHS.APPLY_LOAN} element={<ApplyLoan />} />
        <Route path={PATHS.APPLICATIONS} element={<Applications />} />
        <Route path={PATHS.EMI_CALCULATOR} element={<EmiCalculator />} />
      </Route>

      {/* Catch-all: unknown routes go back to login */}
      <Route path="*" element={<Navigate to={PATHS.LOGIN} replace />} />
    </Routes>
  );
}
