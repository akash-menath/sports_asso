import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      toast.success('Reset link sent successfully!');
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
        {/* Left Column: Confirmation Message */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-[360px]">
            <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-[#ecf7fe] text-[#3b82f6]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-[28px] font-bold text-[#1e3a8a] mb-4 text-center">
              Check Your Email
            </h2>
            <p className="text-[#6b7280] text-[15px] mb-8">
              We've sent a password reset link to <span className="font-bold text-[#374151]">{email}</span>. Please check your inbox.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3.5 bg-[#22c55e] text-white text-[15px] font-bold rounded-lg hover:bg-[#16a34a] focus:outline-none transition-all duration-200 shadow-sm flex items-center justify-center"
              >
                Send another link
              </button>
              <Link
                to="/login"
                className="block w-full py-3.5 bg-white border-[1.5px] border-[#3b82f6] text-[#4b5563] text-[15px] font-bold rounded-lg hover:bg-[#f8fbff] focus:outline-none transition-all duration-200 text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Branding */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white border-l border-gray-50">
          <div className="flex items-center gap-6 max-w-[500px]">
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/forgotpassword.png"
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left Column: Forgot Password Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[360px]">
          <h2 className="text-[28px] font-bold text-[#1e3a8a] mb-8">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[14px] font-medium text-[#6b7280]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#ecf7fe] border-none rounded-lg focus:ring-0 focus:outline-none px-4 py-3.5 text-[#333] placeholder-[#9ca3af] transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading || !email}
                className="flex-1 py-3.5 bg-[#22c55e] text-white text-[15px] font-bold rounded-lg hover:bg-[#16a34a] focus:outline-none transition-all duration-200 shadow-sm flex items-center justify-center"
              >
                {isLoading ? '...' : 'Send Link'}
              </button>
              <Link
                to="/login"
                className="flex-1 py-3.5 bg-white border-[1.5px] border-[#3b82f6] text-[#4b5563] text-[15px] font-bold rounded-lg hover:bg-[#f8fbff] focus:outline-none transition-all duration-200 text-center"
              >
                Cancel
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
              src="/forgotpassword.png"
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
