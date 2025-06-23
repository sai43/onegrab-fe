import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmPage() {
  const location = useLocation();

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
          if(data.success) {
            alert("Email confirmed successfully!");
          } else {
            alert("Confirmation failed: " + data.errors);
          }
        });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-md w-full text-center">
        <p className="text-lg font-semibold text-gray-700">Confirming your account...</p>
      </div>
    </div>
  );
}

export default ConfirmPage;
