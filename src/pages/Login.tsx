import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('auth_token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('is_authenticated', 'true');

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] leading-tight font-bold text-[#555] mb-2 tracking-tight">
            Kerala Softball Association
          </h1>
          <p className="text-[#888] text-[15px]">
            Please fill in with your details
          </p>
        </div>

        {/* Login Title */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-[#666]">
            Login
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Email/Phone
            </label>
            <input
              type="text"
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

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/forgot-password"
              className="px-6 py-2.5 bg-[#f5f5f5] text-[#666] text-[13px] font-medium hover:bg-[#eaeaea] hover:text-[#333] focus:outline-none focus:ring-2 focus:ring-[#eaeaea] focus:ring-offset-2 transition-all duration-200 inline-block text-center rounded-sm"
            >
              Forgot Password
            </Link>
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#555] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] rounded-sm shadow-sm"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
