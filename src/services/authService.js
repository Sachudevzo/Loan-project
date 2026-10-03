// Mock auth service.
// Every function here fakes what a real backend API call would do,
// including a small artificial delay so loading states feel real.
// When the backend is ready, only this file needs to change —
// the pages calling it will not need to change.

import { SEED_MOCK_USER } from '../data/mockCredentials';

const USERS_KEY = 'devzo_users';
const AUTH_KEY = 'devzo_auth';
const MOCK_DELAY_MS = 900;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// All "registered" users, including the seed demo account.
function getAllUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    return [SEED_MOCK_USER, ...stored];
  } catch {
    return [SEED_MOCK_USER];
  }
}

function saveUser(user) {
  const stored = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  stored.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(stored));
}

/**
 * Attempts to log a user in with an email/mobile + password.
 * Resolves with { success: true, user } on success.
 * Rejects with an Error whose message is safe to show in the UI.
 */
export async function loginUser({ identifier, password }) {
  await delay(MOCK_DELAY_MS);

  const normalized = identifier.trim().toLowerCase();
  const users = getAllUsers();

  const matchedUser = users.find(
    (u) =>
      (u.email.toLowerCase() === normalized || u.mobile === identifier.trim()) &&
      u.password === password
  );

  if (!matchedUser) {
    throw new Error('Invalid email/mobile or password.');
  }

  const { password: _password, ...safeUser } = matchedUser;
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ isAuthenticated: true, user: safeUser })
  );

  return { success: true, user: safeUser };
}

/**
 * Registers a new mock user.
 * Resolves with { success: true } on success.
 * Rejects with an Error if the email/mobile is already registered.
 */
export async function registerUser(formData) {
  await delay(MOCK_DELAY_MS);

  const users = getAllUsers();
  const emailTaken = users.some(
    (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
  );
  const mobileTaken = users.some((u) => u.mobile === formData.mobile.trim());

  if (emailTaken || mobileTaken) {
    throw new Error('An account with this email or mobile already exists.');
  }

  const { confirmPassword: _confirmPassword, ...userToStore } = formData;
  saveUser(userToStore);

  return { success: true };
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_KEY));
    return auth?.isAuthenticated ? auth.user : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}
