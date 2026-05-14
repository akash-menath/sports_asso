import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SidebarItem {
  id: string;
  name: string;
  path: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', name: 'Home', path: '/dashboard' },
  { id: 'championships', name: 'Championships', path: '/dashboard/championships' },
  { id: 'district-associations', name: 'District Associations', path: '/dashboard/district-associations' },
  { id: 'office-bearers', name: 'Office Bearers', path: '/dashboard/office-bearers' },
  { id: 'referees', name: 'Referees Panel', path: '/dashboard/referees' },
  { id: 'players', name: 'Players', path: '/dashboard/players' },
  { id: 'events', name: 'Events', path: '/dashboard/events' },
  { id: 'claims', name: 'Claims', path: '/dashboard/events/claims' },
  { id: 'profile', name: 'Profile', path: '/dashboard/profile' },
];

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen?: boolean; setIsSidebarOpen?: (state: boolean) => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_authenticated');
    navigate('/login');
  };

  const handleItemClick = () => {
    // Only close the sidebar automatically on mobile/tablet when an item is clicked
    if (window.innerWidth < 1024 && setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = location.pathname.startsWith(item.path) && (item.path !== '/dashboard' || location.pathname === '/dashboard');

    return (
      <div key={item.id} className="mb-4">
        <Link
          to={item.path}
          onClick={handleItemClick}
          className={`block text-sm transition-colors duration-200 ${isActive
            ? 'text-gray-900 font-semibold bg-gray-100 rounded-lg px-3 py-2'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2'
            }`}
        >
          {item.name}
        </Link>
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white px-4 py-6 w-64 border-r border-gray-200">
      {/* Logo/Brand for mobile */}
      <div className="lg:hidden mb-8 px-2 flex items-center gap-3">
        <Link to="/dashboard" onClick={handleItemClick}>
          <img src="/logo.png" alt="KSA Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {sidebarItems.map((item) => renderSidebarItem(item))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8">
        <button
          onClick={handleLogout}
          className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 text-left px-3 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen?.(false)}
            aria-hidden="true"
          />
          {/* Sidebar content */}
          <div className="relative flex flex-col w-80 max-w-[80vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="text-lg font-semibold text-gray-900">Menu</div>
              <button
                onClick={() => setIsSidebarOpen?.(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`${isSidebarOpen ? 'lg:flex' : 'hidden'} hidden lg:flex-shrink-0 transition-all duration-300`}>
        {sidebarContent}
      </div>
    </>
  );
}
