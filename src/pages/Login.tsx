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
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left Column: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[360px]">
          <h2 className="text-[28px] font-bold text-[#1e3a8a] mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[14px] font-medium text-[#6b7280]">
                Email/Phone
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email/Phone"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3.5 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="space-y-2">
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
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3.5 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="flex-1 py-3.5 bg-[#22c55e] text-white text-[15px] font-bold rounded-lg hover:bg-[#16a34a] focus:outline-none transition-all duration-200 shadow-sm flex items-center justify-center"
              >
                {isLoading ? '...' : 'Login'}
              </button>
              <Link
                to="/forgot-password"
                className="flex-1 py-3.5 bg-white border-[1.5px] border-[#3b82f6] text-[#4b5563] text-[15px] font-bold rounded-lg hover:bg-[#f8fbff] focus:outline-none transition-all duration-200 text-center"
              >
                Reset Password
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
              src="/logo.png"
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
