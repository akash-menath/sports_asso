import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const isAuthenticated = useAuthGuard();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If not authenticated, the useAuthGuard hook will redirect to landing page
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white font-sans">
      {/* Header spanning full width */}
      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main layout below header */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-white p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
