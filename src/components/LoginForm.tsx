import { useState, FormEvent } from 'react';

interface LoginFormProps {
  onLoginSuccess: (username: string, token: string) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onClose }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      user: {
        login,
        password,
      },
    });

    try {
      const response = await fetch('http://localhost:4343/api/v1/users/sign_in', {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || 'Login failed');
        return;
      }

      const result = await response.json();
      onLoginSuccess(result.username, result.token);
      onClose();
    } catch {
      setError('Network error');
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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-accent text-text-black font-semibold px-6 py-2 rounded hover:bg-accent-yellow transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
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
