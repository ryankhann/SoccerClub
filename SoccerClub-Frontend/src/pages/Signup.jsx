import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [role, setRole] = useState('player'); // 'player', 'parent', 'agent'

  // Handle role change from radio buttons
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  if (!agreeTerms) {
    alert('You must agree to the Terms & Privacy Policy.');
    return;
  }

  try {
    const response = await API.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      role,
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

    alert('Account created successfully!');

    navigate('/');
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      'Registration failed'
    );
  }
};

  return (
    <>
      {/* Inject custom keyframe animations and additional hover styles */}
      <style>{`
        @keyframes sc__ballBounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-5px); }
        }
        .card-hover-effect {
          transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.2);
        }
        .btn-gold-hover {
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .btn-gold-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(230,180,34,0.4);
        }
        .role-label {
          transition: all 0.2s ease;
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

      {/* Main sign-up section */}
      <main className="flex justify-center items-center px-4 py-8 sm:py-12 md:py-16 min-h-[calc(100vh-76px)]">
        <div className="w-full max-w-[520px] bg-white rounded-[28px] shadow-xl border border-[#1d7a5c]/20 p-5 sm:p-6 md:p-7 card-hover-effect transition-all duration-300">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0a3e2f] tracking-tight">Join Us</h1>
          <p className="text-center text-[#5f6c72] text-xs sm:text-sm mt-1 mb-5">Create your profile and start your journey</p>

          <form onSubmit={handleSubmit}>
            {/* 2-column row: first + last name */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="flex-1">
                <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Leo"
                  required
                  className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Messi"
                  required
                  className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
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

            {/* Password */}
            <div className="mb-3">
              <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="block font-semibold text-[#1e2a32] mb-1 text-xs sm:text-sm">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className="w-full py-2.5 px-4 rounded-full border border-[#cfdfd8] bg-white focus:ring-2 focus:ring-[#e6b422]/30 focus:border-[#e6b422] transition-all text-sm sm:text-base"
              />
            </div>

            {/* Segmented role toggle */}
            <div className="mb-4">
              <label className="block font-semibold text-[#1e2a32] mb-2 text-xs sm:text-sm">I am a</label>
              <div className="flex flex-wrap gap-2 items-center" id="roleToggleGroup">
                {/* Player */}
                <input
                  type="radio"
                  name="role"
                  id="rolePlayer"
                  value="player"
                  checked={role === 'player'}
                  onChange={handleRoleChange}
                  className="hidden peer/player"
                />
                <label
                  htmlFor="rolePlayer"
                  className="role-label cursor-pointer px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gray-100 text-[#1e2a32] font-medium text-xs sm:text-sm transition-all border border-transparent hover:border-[#e6b422] peer-checked/player:bg-gradient-to-r peer-checked/player:from-[#e6b422] peer-checked/player:to-[#f5c542] peer-checked/player:text-[#051f18] peer-checked/player:shadow-md peer-checked/player:font-bold"
                >
                  ⚽ Player
                </label>

                {/* Parent / Guardian */}
                <input
                  type="radio"
                  name="role"
                  id="roleParent"
                  value="parent"
                  checked={role === 'parent'}
                  onChange={handleRoleChange}
                  className="hidden peer/parent"
                />
                <label
                  htmlFor="roleParent"
                  className="role-label cursor-pointer px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gray-100 text-[#1e2a32] font-medium text-xs sm:text-sm transition-all border border-transparent hover:border-[#e6b422] peer-checked/parent:bg-gradient-to-r peer-checked/parent:from-[#e6b422] peer-checked/parent:to-[#f5c542] peer-checked/parent:text-[#051f18] peer-checked/parent:shadow-md peer-checked/parent:font-bold"
                >
                  👪 Parent / Guardian
                </label>

                {/* Scout / Agent */}
                <input
                  type="radio"
                  name="role"
                  id="roleAgent"
                  value="agent"
                  checked={role === 'agent'}
                  onChange={handleRoleChange}
                  className="hidden peer/agent"
                />
                <label
                  htmlFor="roleAgent"
                  className="role-label cursor-pointer px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gray-100 text-[#1e2a32] font-medium text-xs sm:text-sm transition-all border border-transparent hover:border-[#e6b422] peer-checked/agent:bg-gradient-to-r peer-checked/agent:from-[#e6b422] peer-checked/agent:to-[#f5c542] peer-checked/agent:text-[#051f18] peer-checked/agent:shadow-md peer-checked/agent:font-bold"
                >
                  🤝 Scout / Agent
                </label>
              </div>
            </div>

            {/* Terms & conditions */}
            <div className="flex items-center gap-2 my-4 text-xs sm:text-sm">
              <input
                type="checkbox"
                id="sc__agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="w-3.5 h-3.5 accent-[#e6b422]"
              />
              <label htmlFor="sc__agreeTerms" className="text-gray-700 text-xs sm:text-sm">
                I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="text-[#e6b422] font-semibold hover:underline">Terms of Service</a> and <a href="#" onClick={(e) => e.preventDefault()} className="text-[#e6b422] font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Sign Up button */}
            <button
              type="submit"
              className="btn-gold-hover w-full bg-gradient-to-r from-[#e6b422] to-[#f5c542] text-[#051f18] font-extrabold py-2.5 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-200"
            >
              <i className="fas fa-user-plus text-sm"></i> Create Account
            </button>

            {/* Login prompt */}
            <div className="text-center mt-4 text-xs sm:text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-[#e6b422] font-bold hover:underline transition">Log in →</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;