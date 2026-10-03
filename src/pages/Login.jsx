import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { loginUser } from '../services/authService';
import { isValidEmailOrMobile, isValidPassword } from '../utils/validators';
import { PATHS } from '../routes/paths';

const initialForm = { identifier: '', password: '' };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the user starts fixing it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.identifier.trim()) {
      errors.identifier = 'Email or mobile number is required.';
    } else if (!isValidEmailOrMobile(form.identifier)) {
      errors.identifier = 'Enter a valid email or 10-digit mobile number.';
    }

    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (!isValidPassword(form.password)) {
      errors.password = 'Password must be at least 8 characters.';
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
      await loginUser(form);
      navigate(PATHS.DASHBOARD);
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">Welcome back</h1>
      <p className="mt-1 text-sm text-gray-500">
        Log in to manage your loan applications.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <Input
          label="Email or Mobile Number"
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          error={fieldErrors.identifier}
          placeholder="you@example.com or 9876543210"
          autoComplete="username"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />

        <div className="flex justify-end -mt-1">
          <Link
            to="#"
            className="text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            Forgot Password?
          </Link>
        </div>

        <ErrorMessage message={formError} />

        <Button type="submit" loading={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="mt-6 rounded-lg bg-brand-50 border border-brand-100 px-3.5 py-3 text-xs text-navy-700">
        <p className="font-medium mb-1">Demo credentials</p>
        <p>Email: rahul@example.com or Mobile: 9876543210</p>
        <p>Password: Password@123</p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          to={PATHS.REGISTER}
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
