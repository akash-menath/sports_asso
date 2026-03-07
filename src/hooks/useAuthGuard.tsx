import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      // Direct first-time users to onboarding
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          if (userData.isFirstTime && location.pathname !== '/dashboard/state-association/onboarding') {
            navigate('/dashboard/state-association/onboarding');
          }
        } catch (e) {
          // ignore parsing error
        }
      }
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated;
}
