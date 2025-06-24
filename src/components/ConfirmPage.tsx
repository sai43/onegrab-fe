import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Confirming your account...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('confirmation_token');

    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    if (token) {
      fetch(`${backendUrl}/api/v1/users/confirmation?confirmation_token=${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setMessage('Email confirmed successfully!');
          } else {
            setMessage('Confirmation failed: ' + (data.errors || 'Unknown error'));
          }
          setLoading(false);
          
          // Delay before redirecting
          setTimeout(() => {
            navigate('/');
          }, 2000); // 2 seconds delay
        });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <svg
              className="h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ animation: 'spin 1s linear infinite' }}
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
            <p className="text-lg font-semibold text-gray-700">{message}</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
            `}</style>
          </div>
        ) : (
          <p className="text-lg font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ConfirmPage;
