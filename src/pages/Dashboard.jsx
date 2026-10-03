import React from "react";
import { useNavigate } from "react-router-dom";
import { FileStack, Clock, CheckCircle2, XCircle } from "lucide-react";

/**
 * CustomerDashboard
 * -------------------------------------------------------------
 * Dashboard content only (no sidebar) — intended to be rendered
 * inside a shared layout/shell that already provides navigation.
 * - Welcome banner with the customer's name
 * - Four stat cards: Total / Pending / Approved / Rejected applications
 *
 * Wire up real data by replacing the `customer` and `stats` objects
 * below with values from your auth/session and API layer.
 * -------------------------------------------------------------
 */

function StatCard({ label, value, icon: Icon, accent }) {
  const accentMap = {
    navy: { border: "#1B3A4B", bg: "#EAF0F2", icon: "#1B3A4B" },
    amber: { border: "#C89B3C", bg: "#FBF3E3", icon: "#96742B" },
    sage: { border: "#4F7B62", bg: "#EAF3ED", icon: "#3C5F4C" },
    rust: { border: "#B5533E", bg: "#FAEBE8", icon: "#8C3F2F" },
  }[accent];

  return (
    <div
      className="flex items-start justify-between rounded-md bg-white p-5"
      style={{ borderLeft: `4px solid ${accentMap.border}` }}
    >
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
      </div>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: accentMap.bg }}
      >
        <Icon size={20} color={accentMap.icon} />
      </div>
    </div>
  );
}

export default function CustomerDashboard({
  customer = { name: "Priya Nandakumar" },
  stats = { total: 6, pending: 2, approved: 3, rejected: 1 },
}) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Welcome message */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-slate-800 md:text-3xl">
          Welcome back, {customer.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's a summary of your loan applications.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total applications"
          value={stats.total}
          icon={FileStack}
          accent="navy"
        />
        <StatCard
          label="Pending applications"
          value={stats.pending}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Approved loans"
          value={stats.approved}
          icon={CheckCircle2}
          accent="sage"
        />
        <StatCard
          label="Rejected loans"
          value={stats.rejected}
          icon={XCircle}
          accent="rust"
        />
      </div>

      {/* Quick action */}
      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-md border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-slate-800">
            Ready to apply for a new loan?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            It takes about 10 minutes to complete an application.
          </p>
        </div>
        <button
          onClick={() => navigate("/apply-loan")}
          className="whitespace-nowrap rounded-md bg-[#1B3A4B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#15303E]"
        >
          Apply for a loan
        </button>
      </div>
    </div>
  );
}