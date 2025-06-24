import { useState, FormEvent } from 'react';

interface User {
  username: string;
  email: string;
}

interface SignupFormProps {
  onSignupSuccess: (user: User, token: string) => void;
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    const payload = {
      user: {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch(`${backendUrl}/api/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        if (err.errors && Array.isArray(err.errors)) {
          setError(err.errors.join(', '));
        } else if (err.error) {
          setError(err.error);
        } else {
          setError('Signup failed');
        }
        setLoading(false);
        return;
      }

      const result = await response.json();

      if (!result.user || !result.user.username) {
        setError('Invalid user data received');
        setLoading(false);
        return;
      }

      onSignupSuccess(result.user, result.token);
      onClose();
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 uppercase">Sign Up</h2>

        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-accent text-text-black font-semibold px-6 py-2 rounded transition-colors ${
                loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-accent-yellow'
              }`}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
