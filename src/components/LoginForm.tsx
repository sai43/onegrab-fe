import { useState, FormEvent } from 'react';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  email: string;
  phone: string;
}

interface LoginFormProps {
  onLoginSuccess: (user: User, token: string) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onClose }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await fetch(`${backendUrl}/api/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { login, password } }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (err.errors && Array.isArray(err.errors)) {
          setError(err.errors.join(', '));
        } else if (err.error) {
          setError(err.error);
        } else {
          setError('Login failed');
        }
        setLoading(false);
        return;
      }

      const result = await response.json();

      onLoginSuccess(result.user, result.token);
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
        <h2 className="text-lg font-bold mb-4 uppercase">Login</h2>

        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-accent text-text-black font-semibold px-6 py-2 rounded transition-colors flex items-center justify-center space-x-2 ${
                loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-accent-yellow'
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              <span>{loading ? 'Loading...' : 'Login'}</span>
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

export default LoginForm;
