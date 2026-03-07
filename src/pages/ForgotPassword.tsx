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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans py-12">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-[28px] leading-tight font-bold text-[#555] mb-2 tracking-tight">
              Kerala Softball Association
            </h1>
          </div>

          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#f4f4f4] mb-4">
              <svg className="h-6 w-6 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[#666]">
              Check Your Email
            </h2>
            <p className="mt-2 text-[#888] text-[15px]">
              We've sent a password reset link to<br />
              <span className="font-medium text-[#555]">{email}</span>
            </p>
            <p className="mt-4 text-[#888] text-[13px]">
              Click the link in the email to reset your password. The link will expire in 15 minutes.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full px-8 py-2.5 bg-[#f5f5f5] text-[#666] text-[13px] font-medium hover:bg-[#eaeaea] hover:text-[#333] focus:outline-none focus:ring-2 focus:ring-[#eaeaea] focus:ring-offset-2 transition-all duration-200 rounded-sm"
            >
              Send another link
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-[#888] text-[13px] hover:text-[#555] transition-colors">
                ← Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans py-12">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] leading-tight font-bold text-[#555] mb-2 tracking-tight">
            Kerala Softball Association
          </h1>
          <p className="text-[#888] text-[15px]">
            Enter your email to reset password
          </p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-[#666]">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[13px] text-[#888]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-3 py-2.5 text-[#333] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-[#f5f5f5] text-[#666] text-[13px] font-medium hover:bg-[#eaeaea] hover:text-[#333] focus:outline-none focus:ring-2 focus:ring-[#eaeaea] focus:ring-offset-2 transition-all duration-200 inline-block text-center rounded-sm"
            >
              ← Back to sign in
            </Link>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-[#555] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] rounded-sm shadow-sm"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send Link'}
            </button>
          </div>
        </form>

        <div className="text-center pt-8">
          <span className="text-[#888] text-[13px]">Don't have an account? </span>
          <Link to="/signup" className="text-[#555] text-[13px] font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
