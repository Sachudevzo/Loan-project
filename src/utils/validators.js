// Shared validation helpers used by Login and Registration forms.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile numbers: 10 digits, starting with 6-9 (optionally with +91 / 91 prefix)
const INDIAN_MOBILE_REGEX = /^(\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidIndianMobile(value) {
  return INDIAN_MOBILE_REGEX.test(value.trim());
}

// Login accepts either an email OR a mobile number in the same field.
export function isValidEmailOrMobile(value) {
  return isValidEmail(value) || isValidIndianMobile(value);
}

export function isValidPassword(value) {
  return value.length >= 8;
}
