import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
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

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Password changed successfully!');

      // Redirect to login or dashboard
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
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
            Change your password
          </p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-[#666]">
            Reset your password
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Enter Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Enter New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Confirm New Password
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

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
              className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#555] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] rounded-sm shadow-sm"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Reset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
