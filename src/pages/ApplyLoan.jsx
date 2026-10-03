import React, { useState } from "react";
import { Check, Upload, FileCheck2, User, Landmark, FileStack } from "lucide-react";

// Multi-step loan application flow — wire the final submit handler up to
// your API once the backend endpoint is ready. For now, submission is
// mocked: it generates a fake application ID and shows a success screen.

const STEPS = [
  { key: "personal", label: "Personal details" },
  { key: "loan", label: "Loan details" },
  { key: "documents", label: "Documents" },
  { key: "review", label: "Review" },
  { key: "submit", label: "Submit" },
];

const LOAN_TYPES = ["Personal loan", "Home loan", "Vehicle loan", "Education loan"];
const EMPLOYMENT_TYPES = ["Salaried", "Self-employed", "Business owner", "Other"];

const initialFormData = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  loanType: "",
  loanAmount: "",
  tenure: "",
  monthlyIncome: "",
  employmentType: "",
  aadhaar: null,
  pan: null,
  incomeProof: null,
};

function StepIndicator({ currentIndex }) {
  return (
    <ol className="mb-8 flex items-center">
      {STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isActive = index === currentIndex;
        return (
          <li key={step.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: isComplete || isActive ? "#1B3A4B" : "#E5E7EB",
                  color: isComplete || isActive ? "#FFFFFF" : "#6B7280",
                }}
              >
                {isComplete ? <Check size={15} /> : index + 1}
              </div>
              <span
                className="mt-2 hidden w-20 text-center text-xs sm:block"
                style={{ color: isActive ? "#1B3A4B" : "#9CA3AF" }}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className="mx-2 h-px flex-1"
                style={{ backgroundColor: isComplete ? "#1B3A4B" : "#E5E7EB" }}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[#8C3F2F]">{error}</span>}
    </label>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]";

function PersonalDetailsStep({ data, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" error={errors.name}>
        <input
          className={inputClass}
          placeholder="Priya Nandakumar"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </Field>
      <Field label="Mobile number" error={errors.mobile}>
        <input
          className={inputClass}
          placeholder="98765 43210"
          value={data.mobile}
          onChange={(e) => onChange("mobile", e.target.value)}
        />
      </Field>
      <Field label="Email address" error={errors.email}>
        <input
          className={inputClass}
          placeholder="priya@email.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </Field>
      <Field label="Address" error={errors.address}>
        <input
          className={inputClass}
          placeholder="12 MG Road, Madurai"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </Field>
    </div>
  );
}

function LoanDetailsStep({ data, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Loan type" error={errors.loanType}>
        <select
          className={inputClass}
          value={data.loanType}
          onChange={(e) => onChange("loanType", e.target.value)}
        >
          <option value="">Select loan type</option>
          {LOAN_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Loan amount (₹)" error={errors.loanAmount}>
        <input
          type="number"
          className={inputClass}
          placeholder="500000"
          value={data.loanAmount}
          onChange={(e) => onChange("loanAmount", e.target.value)}
        />
      </Field>
      <Field label="Tenure (months)" error={errors.tenure}>
        <input
          type="number"
          className={inputClass}
          placeholder="36"
          value={data.tenure}
          onChange={(e) => onChange("tenure", e.target.value)}
        />
      </Field>
      <Field label="Monthly income (₹)" error={errors.monthlyIncome}>
        <input
          type="number"
          className={inputClass}
          placeholder="45000"
          value={data.monthlyIncome}
          onChange={(e) => onChange("monthlyIncome", e.target.value)}
        />
      </Field>
      <Field label="Employment type" error={errors.employmentType}>
        <select
          className={inputClass}
          value={data.employmentType}
          onChange={(e) => onChange("employmentType", e.target.value)}
        >
          <option value="">Select employment type</option>
          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function DocumentUpload({ label, file, error, onChange }) {
  const inputId = `upload-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <label
        htmlFor={inputId}
        className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500 hover:border-[#1B3A4B] hover:text-[#1B3A4B]"
      >
        {file ? (
          <>
            <FileCheck2 size={18} className="text-[#3C5F4C]" />
            <span className="truncate text-slate-700">{file.name}</span>
          </>
        ) : (
          <>
            <Upload size={18} />
            <span>Click to upload (PDF, JPG, PNG)</span>
          </>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {error && <span className="mt-1 block text-xs text-[#8C3F2F]">{error}</span>}
    </div>
  );
}

function DocumentsStep({ data, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <DocumentUpload
        label="Aadhaar card"
        file={data.aadhaar}
        error={errors.aadhaar}
        onChange={(file) => onChange("aadhaar", file)}
      />
      <DocumentUpload
        label="PAN card"
        file={data.pan}
        error={errors.pan}
        onChange={(file) => onChange("pan", file)}
      />
      <DocumentUpload
        label="Income proof"
        file={data.incomeProof}
        error={errors.incomeProof}
        onChange={(file) => onChange("incomeProof", file)}
      />
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value || "—"}</span>
    </div>
  );
}

function ReviewStep({ data }) {
  const formatAmount = (amount) =>
    amount ? `₹${Number(amount).toLocaleString("en-IN")}` : "—";

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-slate-200 p-5">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1B3A4B]">
          <User size={16} /> Personal details
        </div>
        <ReviewRow label="Full name" value={data.name} />
        <ReviewRow label="Mobile number" value={data.mobile} />
        <ReviewRow label="Email address" value={data.email} />
        <ReviewRow label="Address" value={data.address} />
      </div>

      <div className="rounded-md border border-slate-200 p-5">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1B3A4B]">
          <Landmark size={16} /> Loan details
        </div>
        <ReviewRow label="Loan type" value={data.loanType} />
        <ReviewRow label="Loan amount" value={formatAmount(data.loanAmount)} />
        <ReviewRow label="Tenure" value={data.tenure ? `${data.tenure} months` : ""} />
        <ReviewRow label="Monthly income" value={formatAmount(data.monthlyIncome)} />
        <ReviewRow label="Employment type" value={data.employmentType} />
      </div>

      <div className="rounded-md border border-slate-200 p-5">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1B3A4B]">
          <FileStack size={16} /> Documents
        </div>
        <ReviewRow label="Aadhaar card" value={data.aadhaar?.name} />
        <ReviewRow label="PAN card" value={data.pan?.name} />
        <ReviewRow label="Income proof" value={data.incomeProof?.name} />
      </div>
    </div>
  );
}

function SuccessStep({ applicationId, onViewApplications }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-6 py-16 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "#EAF3ED" }}
      >
        <Check size={26} color="#3C5F4C" />
      </div>
      <h2 className="mt-4 font-serif text-xl font-semibold text-slate-800">
        Application submitted
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Your loan application has been received. We'll notify you once it's
        reviewed.
      </p>
      <p className="mt-4 rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
        Application ID: {applicationId}
      </p>
      <button
        onClick={onViewApplications}
        className="mt-6 rounded-md bg-[#1B3A4B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#15303E]"
      >
        View my applications
      </button>
    </div>
  );
}

function validateStep(stepKey, data) {
  const errors = {};
  if (stepKey === "personal") {
    if (!data.name.trim()) errors.name = "Enter your full name";
    if (!data.mobile.trim()) errors.mobile = "Enter your mobile number";
    if (!data.email.trim()) errors.email = "Enter your email address";
    if (!data.address.trim()) errors.address = "Enter your address";
  }
  if (stepKey === "loan") {
    if (!data.loanType) errors.loanType = "Select a loan type";
    if (!data.loanAmount) errors.loanAmount = "Enter a loan amount";
    if (!data.tenure) errors.tenure = "Enter a tenure";
    if (!data.monthlyIncome) errors.monthlyIncome = "Enter your monthly income";
    if (!data.employmentType) errors.employmentType = "Select employment type";
  }
  if (stepKey === "documents") {
    if (!data.aadhaar) errors.aadhaar = "Upload your Aadhaar card";
    if (!data.pan) errors.pan = "Upload your PAN card";
    if (!data.incomeProof) errors.incomeProof = "Upload income proof";
  }
  return errors;
}

export default function ApplyLoan({ onViewApplications = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [applicationId, setApplicationId] = useState(null);

  const currentStep = STEPS[currentIndex];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep.key, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (currentStep.key === "review") {
      // Mock submission — replace with a real API call.
      const mockId = `LN-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationId(mockId);
    }

    setCurrentIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep.key) {
      case "personal":
        return <PersonalDetailsStep data={formData} errors={errors} onChange={handleChange} />;
      case "loan":
        return <LoanDetailsStep data={formData} errors={errors} onChange={handleChange} />;
      case "documents":
        return <DocumentsStep data={formData} errors={errors} onChange={handleChange} />;
      case "review":
        return <ReviewStep data={formData} />;
      case "submit":
        return (
          <SuccessStep applicationId={applicationId} onViewApplications={onViewApplications} />
        );
      default:
        return null;
    }
  };

  const isFinalStep = currentStep.key === "submit";

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-[#1B3A4B]">
        Apply for loan
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Complete the steps below to submit a new loan application.
      </p>

      <div className="mt-8">
        <StepIndicator currentIndex={currentIndex} />

        {renderStep()}

        {!isFinalStep && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="rounded-md bg-[#1B3A4B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#15303E]"
            >
              {currentStep.key === "review" ? "Submit application" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}