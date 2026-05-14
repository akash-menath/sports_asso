import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: 'member',
        isFirstTime: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('auth_token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('is_authenticated', 'true');

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left Column: Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[450px]">
          <h2 className="text-[28px] font-bold text-[#1e3a8a] mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="space-y-1.5 w-full">
                <label className="block text-[14px] font-medium text-[#6b7280]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3 text-[#333] placeholder-[#9ca3af] transition-colors"
                />
              </div>

              <div className="space-y-1.5 w-full">
                <label className="block text-[14px] font-medium text-[#6b7280]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3 text-[#333] placeholder-[#9ca3af] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[14px] font-medium text-[#6b7280]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[14px] font-medium text-[#6b7280]">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[14px] font-medium text-[#6b7280]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="************"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 py-1">
              <input
                id="agree-terms"
                name="agreeTerms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#22c55e] focus:ring-[#22c55e] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="agree-terms" className="block text-[13px] text-[#6b7280] cursor-pointer">
                I agree to the <a href="#" className="text-[#3b82f6] hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                className="flex-1 py-3.5 bg-[#22c55e] text-white text-[15px] font-bold rounded-lg hover:bg-[#16a34a] focus:outline-none transition-all duration-200 shadow-sm flex items-center justify-center"
              >
                {isLoading ? '...' : 'Sign Up'}
              </button>
              <Link
                to="/login"
                className="flex-1 py-3.5 bg-white border-[1.5px] border-[#3b82f6] text-[#4b5563] text-[15px] font-bold rounded-lg hover:bg-[#f8fbff] focus:outline-none transition-all duration-200 text-center"
              >
                Go to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white border-l border-gray-50">
        <div className="flex items-center gap-6 max-w-[500px]">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/signlogo.png"
              alt="Logo"
              className="w-48 h-auto object-contain"
            />
          </div>
          <div className="flex flex-col text-right">
            <h1 className="text-[32px] font-bold text-[#333] leading-[1.1]">
              KERALA
            </h1>
            <h1 className="text-[44px] font-[900] text-[#000] leading-[1] tracking-tight">
              THROWBALL
            </h1>
            <p className="text-[20px] font-medium text-[#9ca3af] leading-[1]">
              Association
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
