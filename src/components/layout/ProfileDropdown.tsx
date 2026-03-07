import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Clear all localStorage items
      localStorage.clear();
      
      // Call logout mutation
      await logoutMutation.mutateAsync();
      
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      // Even if API call fails, we've already cleared localStorage
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  const handleProfile = () => {
    setIsOpen(false);
    // Navigate to profile page or open profile modal
    navigate('/profile');
  };

  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  // Get user data from localStorage
  const userData = localStorage.getItem('user_data');
  const user = userData ? JSON.parse(userData) : { firstName: 'User', email: 'user@example.com' };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">Open user menu</span>
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-medium">
            {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName || ''}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            
            <button
              onClick={handleProfile}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Your Profile
            </button>
            
            <button
              onClick={handleSettings}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </button>
            
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
