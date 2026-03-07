import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_authenticated');
    navigate('/login');
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = location.pathname.startsWith(item.path) && (item.path !== '/dashboard' || location.pathname === '/dashboard');

    return (
      <div key={item.id} className="mb-4">
        <Link
          to={item.path}
          className={`block text-[13px] transition-colors ${isActive ? 'text-[#333] font-medium' : 'text-[#888] hover:text-[#555]'
            }`}
        >
          {item.name}
        </Link>
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white px-8 py-10 w-64 border-r border-[#f0f0f0]">
      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {sidebarItems.map((item) => renderSidebarItem(item))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8">
        <button
          onClick={handleLogout}
          className="text-[13px] text-[#888] hover:text-[#333] transition-colors text-left w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-[#f0f0f0] px-4 py-3 flex justify-between items-center">
        <div className="text-[16px] font-bold text-[#333]">KSA</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#555] focus:outline-none"
        >
          {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white pt-16">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
