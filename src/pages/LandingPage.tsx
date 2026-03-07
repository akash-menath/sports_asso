import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Card } from '../components/ui';
import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">KSA</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Kerala Softball Association</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Championships</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
            </nav>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Register Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Kerala Softball Association
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-4 sm:text-lg">
            Promoting softball excellence across Kerala through organized championships, 
            player development, and community engagement.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg">
                Login
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">
                Register Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Features & Services
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Player Registration</h3>
                <p className="mt-2 text-gray-600">
                  Register players and manage their profiles, achievements, and participation in championships.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Championship Management</h3>
                <p className="mt-2 text-gray-600">
                  Create and manage championships with fixtures, results, and live updates.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">District Associations</h3>
                <p className="mt-2 text-gray-600">
                  Manage district associations and their activities across Kerala.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Referees Panel</h3>
                <p className="mt-2 text-gray-600">
                  Certified referees panel with match assignments and performance tracking.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Office Bearers</h3>
                <p className="mt-2 text-gray-600">
                  Management of office bearers and committee members.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 002-2h2a2 2 0 002 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Reports & Analytics</h3>
                <p className="mt-2 text-gray-600">
                  Comprehensive reports and analytics for championships and performance.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Association Statistics
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">14</div>
              <div className="mt-2 text-gray-600">District Associations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,200+</div>
              <div className="mt-2 text-gray-600">Registered Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="mt-2 text-gray-600">Active Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">26</div>
              <div className="mt-2 text-gray-600">Championships</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kerala Softball Association</h3>
              <p className="text-gray-300">
                Promoting softball excellence across Kerala through organized championships 
                and player development programs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Championships</a></li>
                <li><a href="#" className="hover:text-white">Registration</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>11/234 Kudappanakunnu, Trivandrum</p>
                <p>+91 7012839918</p>
                <p>secretary@softballkerala.com</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Kerala Softball Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
