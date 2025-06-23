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

  return <div>Confirming your account...</div>;
}

export default ConfirmPage;
