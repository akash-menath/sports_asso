import { useEffect, useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen?: boolean; setIsMobileMenuOpen?: (state: boolean) => void }) {
  const [userName, setUserName] = useState('Anil A Johnson');

  useEffect(() => {
    try {
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        const data = JSON.parse(userDataStr);
        if (data.firstName && data.lastName) {
          setUserName(`${data.firstName} ${data.lastName}`);
        } else if (data.firstName || data.lastName) {
          setUserName(`${data.firstName || ''} ${data.lastName || ''}`.trim());
        }
      }
    } catch (e) {
      console.error('Error parsing user data for header:', e);
    }
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="text-base font-semibold text-gray-900">KSA</div>
        <button
          onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md transition-colors"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop header */}
      <header className="hidden lg:block bg-gray-50 border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="flex justify-between items-center w-full">
          {/* Left side: Logo */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              KSA Logo
            </span>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md">
              <MagnifyingGlassIcon className="h-5 w-5 stroke-2" />
            </button>

            <button className="text-gray-500 hover:text-gray-700 transition-colors relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md">
              <BellIcon className="h-5 w-5 stroke-2" />
              {/* Notification badge */}
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-md">
              <PlusIcon className="h-6 w-6 stroke-2" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 ml-2 cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center transition-colors group-hover:bg-blue-200">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-gray-700">{userName}</span>
                <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5">Secretary</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
