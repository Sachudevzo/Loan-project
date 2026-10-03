import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Pencil, Check } from "lucide-react";

// Customer profile screen — replace `initialProfile` with data fetched
// from your API/session, and wire `onSave` up to your update endpoint.

const FIELDS = [
  { key: "name", label: "Full name", icon: User },
  { key: "email", label: "Email address", icon: Mail },
  { key: "mobile", label: "Mobile number", icon: Phone },
  { key: "address", label: "Address", icon: MapPin },
];

const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]";

export default function Profile({
  initialProfile = {
    name: "Priya Nandakumar",
    email: "priya@email.com",
    mobile: "98765 43210",
    address: "12 MG Road, Madurai",
  },
  onSave = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [savedMessage, setSavedMessage] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
    setSavedMessage(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(draft);
    onSave(draft);
    setIsEditing(false);
    setSavedMessage(true);
  };

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-[#1B3A4B]">
        My profile
      </h1>
   
      <div className="mt-8 max-w-xl rounded-md border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full font-serif text-lg font-semibold text-white"
            style={{ backgroundColor: "#1B3A4B" }}
          >
            {initials}
          </div>
          <div>
            <p className="text-base font-medium text-slate-800">{profile.name}</p>
            <p className="text-sm text-slate-500">{profile.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {FIELDS.map(({ key, label, icon: Icon }) => (
            <div key={key}>
              {isEditing ? (
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <input
                    className={inputClass}
                    value={draft[key]}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                  />
                </label>
              ) : (
                <div className="flex items-start gap-3">
                  <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-medium text-slate-800">
                      {profile[key] || "—"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          {savedMessage && !isEditing ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#3C5F4C]">
              <Check size={16} /> Profile updated
            </span>
          ) : (
            <span />
          )}

          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-md bg-[#1B3A4B] px-4 py-2 text-sm font-medium text-white hover:bg-[#15303E]"
              >
                Save changes
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={14} /> Edit profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}