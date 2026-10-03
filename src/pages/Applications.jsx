import React from "react";
import { FileStack } from "lucide-react";

// Applications table with mock data — wire `applications` up to your API
// once the backend endpoint is ready.

/**
 * Applications
 * -------------------------------------------------------------
 * "My Applications" screen: lists a customer's loan applications
 * (ID, loan type, amount, status). Replace `applications` with data
 * fetched from your API (e.g. via useEffect + fetch, or a query hook).
 * -------------------------------------------------------------
 */

const STATUS_STYLES = {
  Pending: { bg: "#FBF3E3", text: "#96742B" },
  Approved: { bg: "#EAF3ED", text: "#3C5F4C" },
  Rejected: { bg: "#FAEBE8", text: "#8C3F2F" },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  );
}

export default function Applications({
  applications = [
    { id: "LN-1042", loanType: "Personal loan", amount: 250000, status: "Pending" },
    { id: "LN-1038", loanType: "Home loan", amount: 3500000, status: "Approved" },
    { id: "LN-1031", loanType: "Vehicle loan", amount: 600000, status: "Rejected" },
    { id: "LN-1024", loanType: "Education loan", amount: 800000, status: "Approved" },
  ],
}) {
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div>
      <h1 className="text-xl font-semibold text-[#1B3A4B]">My Applications</h1>
      <p className="mt-2 text-sm text-gray-500">
        Track the status of every loan application you've submitted.
      </p>

      {applications.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-16 text-center">
          <FileStack size={28} className="text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            No applications yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Once you apply for a loan, it will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-md border border-slate-200 bg-white">
          {/* Table (md and up) */}
          <table className="hidden w-full text-left text-sm md:table">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Application ID</th>
                <th className="px-5 py-3">Loan type</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {app.id}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{app.loanType}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {formatAmount(app.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Stacked cards (mobile) */}
          <div className="divide-y divide-slate-100 md:hidden">
            {applications.map((app) => (
              <div key={app.id} className="flex flex-col gap-2 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{app.id}</span>
                  <StatusBadge status={app.status} />
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{app.loanType}</span>
                  <span>{formatAmount(app.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}