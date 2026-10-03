import React, { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

// Standalone EMI calculator. Computes live as the user types/drags —
// no submit button needed since there's nothing to persist.

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount || 0));

function calculateEmi(principal, annualRate, tenureMonths) {
  const P = Number(principal) || 0;
  const n = Number(tenureMonths) || 0;
  const annual = Number(annualRate) || 0;

  if (P <= 0 || n <= 0) {
    return { emi: 0, totalInterest: 0, totalPayable: 0 };
  }

  // Zero-interest edge case avoids a divide-by-zero in the standard formula.
  if (annual === 0) {
    const emi = P / n;
    return { emi, totalInterest: 0, totalPayable: P };
  }

  const r = annual / 12 / 100;
  const factor = Math.pow(1 + r, n);
  const emi = (P * r * factor) / (factor - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - P;

  return { emi, totalInterest, totalPayable };
}

const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]";

function ResultCard({ label, value, accent }) {
  const accentMap = {
    navy: { border: "#1B3A4B", bg: "#EAF0F2" },
    amber: { border: "#C89B3C", bg: "#FBF3E3" },
    sage: { border: "#4F7B62", bg: "#EAF3ED" },
  }[accent];

  return (
    <div
      className="rounded-md p-4"
      style={{ backgroundColor: accentMap.bg, borderLeft: `4px solid ${accentMap.border}` }}
    >
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureMonths, setTenureMonths] = useState(36);

  const { emi, totalInterest, totalPayable } = useMemo(
    () => calculateEmi(loanAmount, interestRate, tenureMonths),
    [loanAmount, interestRate, tenureMonths]
  );

  const principalShare = totalPayable > 0 ? (loanAmount / totalPayable) * 100 : 0;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Calculator size={20} className="text-[#1B3A4B]" />
        <h1 className="font-serif text-xl font-semibold text-[#1B3A4B]">
          EMI calculator
        </h1>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Estimate your monthly instalment before you apply.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6 rounded-md border border-slate-200 bg-white p-6">
          <label className="block">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-700">Loan amount</span>
              <span className="text-sm font-semibold text-slate-800">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <input
              type="range"
              min={50000}
              max={10000000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="mt-3 w-full accent-[#1B3A4B]"
            />
          </label>

          <label className="block">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-700">Interest rate (% per year)</span>
              <span className="text-sm font-semibold text-slate-800">
                {Number(interestRate).toFixed(1)}%
              </span>
            </div>
            <input
              type="number"
              min={0}
              step={0.1}
              className={inputClass}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <input
              type="range"
              min={1}
              max={24}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-3 w-full accent-[#1B3A4B]"
            />
          </label>

          <label className="block">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-700">Tenure (months)</span>
              <span className="text-sm font-semibold text-slate-800">
                {tenureMonths} months
              </span>
            </div>
            <input
              type="number"
              min={1}
              className={inputClass}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
            />
            <input
              type="range"
              min={3}
              max={360}
              step={1}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="mt-3 w-full accent-[#1B3A4B]"
            />
          </label>
        </div>

        {/* Results */}
        <div className="rounded-md border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ResultCard label="Monthly EMI" value={formatCurrency(emi)} accent="navy" />
            <ResultCard label="Total interest" value={formatCurrency(totalInterest)} accent="amber" />
            <ResultCard label="Total amount payable" value={formatCurrency(totalPayable)} accent="sage" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Principal</span>
              <span>Interest</span>
            </div>
            <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full"
                style={{ width: `${principalShare}%`, backgroundColor: "#1B3A4B" }}
              />
              <div
                className="h-full"
                style={{ width: `${100 - principalShare}%`, backgroundColor: "#C89B3C" }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{formatCurrency(loanAmount)}</span>
              <span>{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}