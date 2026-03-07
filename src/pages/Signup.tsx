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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans py-12">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] leading-tight font-bold text-[#555] mb-2 tracking-tight">
            Kerala Softball Association
          </h1>
          <p className="text-[#888] text-[15px]">
            Join our sports association
          </p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-[#666]">
            Sign Up
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="space-y-1 w-full">
              <label className="block text-[13px] text-[#888]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
              />
            </div>

            <div className="space-y-1 w-full">
              <label className="block text-[13px] text-[#888]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="flex items-center mt-2">
            <input
              id="agree-terms"
              name="agreeTerms"
              type="checkbox"
              required
              className="h-3.5 w-3.5 text-[#555] focus:ring-[#555] border-gray-300 rounded-sm cursor-pointer"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-[12px] text-[#888] cursor-pointer">
              I agree to the{' '}
              <a href="#" className="underline hover:text-[#555]">
                Terms and Conditions
              </a>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-[#f5f5f5] text-[#666] text-[13px] font-medium hover:bg-[#eaeaea] hover:text-[#333] focus:outline-none focus:ring-2 focus:ring-[#eaeaea] focus:ring-offset-2 transition-all duration-200 inline-block text-center rounded-sm"
            >
              Already have an account?
            </Link>
            <button
              type="submit"
              disabled={isLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
              className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#555] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] rounded-sm shadow-sm"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
