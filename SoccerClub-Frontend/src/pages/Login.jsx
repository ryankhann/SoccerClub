import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    alert('Please fill in both email and password.');
    return;
  }

  try {
    const response = await API.post('/auth/login', {
      email,
      password,
    });

    // Save token
    localStorage.setItem(
      'token',
      response.data.token
    );

    // Save user
    localStorage.setItem(
      'user',
      JSON.stringify(response.data.user)
    );

    window.dispatchEvent(new Event('authChanged'));

    alert('Login successful!');

    navigate('/');
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      'Login failed'
    );
  }
};

  return (
    <>
      {/* Custom animations and hover effects (same as original) */}
      <style>{`
        .card-hover-effect {
          transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.2);
        }
        .btn-login-hover {
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .btn-login-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(10, 62, 47, 0.3);
        }
      `}</style>

      {/* Header: brand logo + home link */}
      <header className="bg-white shadow-sm py-3 px-4 sm:px-6 md:px-8 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/')}
        >
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-[#0a3e2f] font-semibold bg-[#f0f3f2] hover:bg-[#0a3e2f] hover:text-white transition-all duration-200 rounded-full px-3 py-1.5 text-xs sm:text-sm shadow-sm"
        >
          <i className="fas fa-arrow-left text-xs"></i> Back to Home
        </Link>
      </header>

      {/* Main login section */}
      <main className="flex justify-center items-center px-4 py-8 sm:py-12 md:py-16 min-h-[calc(100vh-76px)]">
        <div className="w-full max-w-[480px] bg-white rounded-[28px] shadow-xl border border-[#1d7a5c]/20 p-5 sm:p-6 md:p-7 card-hover-effect transition-all duration-300">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0a3e2f] tracking-tight">Welcome Back</h1>
          <p className="text-center text-[#5f6c72] text-xs sm:text-sm mt-1 mb-5">Sign in to access your player dashboard</p>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="mb-4">
              <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="player@soccerclub.com"
                required
                className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
              />
            </div>

            {/* Password field */}
            <div className="mb-3">
              <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex justify-between items-center mb-5 text-xs sm:text-sm">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#0a3e2f] w-3.5 h-3.5"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[#1d7a5c] font-medium hover:text-[#e6b422] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="btn-login-hover w-full bg-gradient-to-r from-[#0a3e2f] to-[#1d7a5c] text-white font-bold py-2.5 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-200"
            >
              <i className="fas fa-sign-in-alt text-sm"></i> Log In
            </button>

            {/* Sign-up prompt */}
            <div className="text-center mt-5 text-xs sm:text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#e6b422] font-bold hover:underline transition">
                Join Us →
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;