import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import { registerUser } from '../services/authService';
import {
  isValidEmail,
  isValidIndianMobile,
  isValidPassword,
} from '../utils/validators';
import { PATHS } from '../routes/paths';

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  dob: '',
  gender: '',
  address: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.fullName.trim()) errors.fullName = 'Full name is required.';

    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!form.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    } else if (!isValidIndianMobile(form.mobile)) {
      errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!form.dob) errors.dob = 'Date of birth is required.';

    if (!form.gender) errors.gender = 'Please select a gender.';

    if (!form.address.trim()) errors.address = 'Address is required.';

    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (!isValidPassword(form.password)) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => navigate(PATHS.LOGIN), 1500);
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Register to start your loan application.
      </p>

      {success ? (
        <div className="mt-6">
          <SuccessMessage message="Registration successful! Redirecting you to login..." />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={fieldErrors.fullName}
            placeholder="Rahul Sharma"
            autoComplete="name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={fieldErrors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <Input
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            error={fieldErrors.mobile}
            placeholder="9876543210"
            autoComplete="tel"
          />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            error={fieldErrors.dob}
          />

          <div className="w-full">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-navy-900 mb-1.5"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:ring-2 ${
                fieldErrors.gender
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'
              }`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {fieldErrors.gender && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.gender}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-navy-900 mb-1.5"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, city, state, PIN code"
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-gray-400 outline-none transition-colors resize-none focus:ring-2 ${
                fieldErrors.address
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-brand-400 focus:ring-brand-100'
              }`}
            />
            {fieldErrors.address && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.address}
              </p>
            )}
          </div>

          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
            placeholder="Create a password"
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />

          <ErrorMessage message={formError} />

          <Button type="submit" loading={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>
      )}

      {!success && (
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to={PATHS.LOGIN}
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Login
          </Link>
        </p>
      )}
    </div>
  );
}
