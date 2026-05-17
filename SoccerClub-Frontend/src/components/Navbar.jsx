import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDrawerOpen]);

  // Handle resize: close drawer if screen becomes > 860px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 861 && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDrawerOpen]);

  useEffect(() => {
  const loadUser = () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  // Initial load
  loadUser();

  // Listen for auth changes
  window.addEventListener('authChanged', loadUser);

  return () => {
    window.removeEventListener('authChanged', loadUser);
  };
}, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setOpenMobileSubmenu(null);
    document.body.style.overflow = '';
  };

  const toggleMobileSubmenu = (menuKey) => {
    setOpenMobileSubmenu(openMobileSubmenu === menuKey ? null : menuKey);
  };

  // Helper to handle navigation and close drawer
  const handleNavClick = (path) => {
    navigate(path);
    closeDrawer();
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  window.dispatchEvent(new Event('authChanged'));

  setUser(null);
  setShowLogoutModal(false);

  navigate('/');
};

  return (
    <>
      {/* Inject custom keyframe animations (same as original) */}
      <style>{`
        @keyframes sc__pulseGlow {
          0% { background: linear-gradient(95deg, #022b20, #0b5a42); }
          50% { background: linear-gradient(95deg, #0c5c46, #148866); }
          100% { background: linear-gradient(95deg, #022b20, #0b5a42); }
        }
        @keyframes sc__ballBounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-5px); }
        }
        .animate-pulse-glow {
          animation: sc__pulseGlow 4s infinite ease-in-out;
        }
        .animate-ball-bounce {
          animation: sc__ballBounce 1.2s infinite alternate;
        }
        .sc__mobile-drawer--slider {
          transition: right 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .sc__mobile-drawer--slider.open {
          right: 0 !important;
        }
        .sc__mobile-submenu--panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-out;
        }
        .sc__mobile-submenu--panel.open-sub {
          max-height: 380px;
          padding-top: 0.5rem;
          padding-bottom: 0.75rem;
        }
        .sc__sub-link--item {
          position: relative;
          overflow: hidden;
          transition: all 0.2s;
        }
        .sc__sub-link--item::before {
          content: '⚽';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: 0.2s ease;
          font-size: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
        }
        .sc__sub-link--item:hover::before {
          left: 10px;
          opacity: 1;
        }
        .menu-underline-item {
          position: relative;
        }
        .menu-underline-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 2px;
          background: #e6b422;
          transition: 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .menu-underline-item:hover::after {
          width: 100%;
        }
        .sc__overlay--drawer-bg.active {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      {/* ========== TOP BANNER (10vh) ========== */}
      <section className="h-[10vh] min-h-[64px] bg-gradient-to-r from-[#022b20] to-[#0b5a42] flex items-center justify-center gap-3 md:gap-5 text-white font-bold text-sm md:text-base relative z-20 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.05)] animate-pulse-glow">
        <i className="fas fa-futbol text-xl drop-shadow-md animate-ball-bounce"></i>
        <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full tracking-wide">⚡ EXCLUSIVE: US National Team Tryouts — Limited Slots! ⚡</span>
        <i className="fas fa-star-of-life text-amber-300"></i>
        <span className="text-[0.75rem] md:text-sm bg-black/30 px-3 py-1 rounded-full font-semibold">FREE ASSESSMENT</span>
      </section>

      {/* ========== STICKY NAVBAR ========== */}
      <nav className="sticky top-0 z-[1000] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)] border-b-2 border-[#1d7a5c]/20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          
          {/* LOGO + BRAND */}
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:translate-x-1"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-futbol text-3xl md:text-4xl bg-gradient-to-r from-[#e6b422] to-amber-400 bg-clip-text text-transparent"></i>
            <div className="text-xl md:text-[1.7rem] font-extrabold tracking-tight bg-gradient-to-r from-[#0a3e2f] to-[#1d7a5c] bg-clip-text text-transparent">
              SoccerClub <span className="text-sm font-medium text-[#e6b422]">• Elite Agency</span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION (visible on screens >860px) */}
          <div className="hidden min-[860px]:flex flex-1 items-center justify-center gap-8 lg:gap-10">
            <ul className="flex gap-4 lg:gap-6">
              {/* Programs dropdown */}
              <li className="relative group">
                <a href="#" className="menu-underline-item flex items-center gap-1.5 font-semibold text-[#1e2a32] text-[0.95rem] lg:text-base py-2 transition-colors hover:text-[#1d7a5c]">
                  Programs <i className="fas fa-chevron-down text-[0.7rem] transition-transform duration-200 group-hover:rotate-180"></i>
                </a>
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-[#1d7a5c]/20 backdrop-blur-sm py-2">
                    <Link to="/programs/youth-academy" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-child w-5 text-[#e6b422]"></i> Youth Academy</Link>
                    <Link to="/programs/elite-u18" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-user-graduate w-5 text-[#e6b422]"></i> Elite U-18</Link>
                    <Link to="/programs/pro-pathway" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-trophy w-5 text-[#e6b422]"></i> Pro Pathway</Link>
                  </div>
                </div>
              </li>
              {/* Training dropdown */}
              <li className="relative group">
                <a href="#" className="menu-underline-item flex items-center gap-1.5 font-semibold text-[#1e2a32] text-[0.95rem] lg:text-base py-2 transition-colors hover:text-[#1d7a5c]">
                  Training <i className="fas fa-chevron-down text-[0.7rem] transition-transform duration-200 group-hover:rotate-180"></i>
                </a>
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-[#1d7a5c]/20 py-2">
                    <Link to="/training/strength" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-dumbbell w-5 text-[#e6b422]"></i> Strength & Conditioning</Link>
                    <Link to="/training/tactical" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-chalkboard-user w-5 text-[#e6b422]"></i> Tactical Mastery</Link>
                    <Link to="/training/video-analysis" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-video w-5 text-[#e6b422]"></i> Video Analysis</Link>
                  </div>
                </div>
              </li>
              {/* Teams dropdown */}
              <li className="relative group">
                <a href="#" className="menu-underline-item flex items-center gap-1.5 font-semibold text-[#1e2a32] text-[0.95rem] lg:text-base py-2 transition-colors hover:text-[#1d7a5c]">
                  Teams <i className="fas fa-chevron-down text-[0.7rem] transition-transform duration-200 group-hover:rotate-180"></i>
                </a>
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-[#1d7a5c]/20 py-2">
                    <Link to="/teams/u15-select" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-users w-5 text-[#e6b422]"></i> U-15 Select</Link>
                    <Link to="/teams/u17-national" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-flag-usa w-5 text-[#e6b422]"></i> U-17 National Dev</Link>
                    <Link to="/teams/international-combines" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-globe w-5 text-[#e6b422]"></i> International Combines</Link>
                  </div>
                </div>
              </li>
              {/* Scouting dropdown */}
              <li className="relative group">
                <a href="#" className="menu-underline-item flex items-center gap-1.5 font-semibold text-[#1e2a32] text-[0.95rem] lg:text-base py-2 transition-colors hover:text-[#1d7a5c]">
                  Scouting <i className="fas fa-chevron-down text-[0.7rem] transition-transform duration-200 group-hover:rotate-180"></i>
                </a>
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-[#1d7a5c]/20 py-2">
                    <Link to="/scouting/eu-trials" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-passport w-5 text-[#e6b422]"></i> EU Trials</Link>
                    <Link to="/scouting/agent-network" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-handshake w-5 text-[#e6b422]"></i> Agent Network</Link>
                    <Link to="/scouting/metrics" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-chart-line w-5 text-[#e6b422]"></i> Performance Metrics</Link>
                  </div>
                </div>
              </li>
              {/* Resources dropdown */}
              <li className="relative group">
                <a href="#" className="menu-underline-item flex items-center gap-1.5 font-semibold text-[#1e2a32] text-[0.95rem] lg:text-base py-2 transition-colors hover:text-[#1d7a5c]">
                  Resources <i className="fas fa-chevron-down text-[0.7rem] transition-transform duration-200 group-hover:rotate-180"></i>
                </a>
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-[#1d7a5c]/20 py-2">
                    <Link to="/resources/blog" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-newspaper w-5 text-[#e6b422]"></i> Soccer Blog</Link>
                    <Link to="/resources/calendar" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-calendar-alt w-5 text-[#e6b422]"></i> Event Calendar</Link>
                    <Link to="/resources/faq" className="sc__sub-link--item flex items-center gap-3 px-5 py-2.5 text-[#1e2a32] hover:bg-[#f0f9f5] hover:text-[#0a3e2f] transition-all"><i className="fas fa-question-circle w-5 text-[#e6b422]"></i> FAQ</Link>
                  </div>
                </div>
              </li>
            </ul>
            {/* Desktop action buttons */}
            <div className="flex gap-3 items-center">
  {user ? (
    <button
      onClick={() => setShowLogoutModal(true)}
      className="bg-[#0a3e2f] text-white font-bold py-2 px-5 rounded-full shadow-md hover:shadow-xl transition-all"
    >
      ✓ {user.firstName} {user.lastName}
    </button>
  ) : (
    <>
      <button
        onClick={() => navigate('/login')}
        className="border-2 border-[#0a3e2f] bg-transparent hover:bg-[#0a3e2f] hover:text-white text-[#0a3e2f] font-bold py-2 px-5 rounded-full transition-all duration-200"
      >
        <i className="fas fa-user-lock mr-1"></i> Login
      </button>

      <button
        onClick={() => navigate('/signup')}
        className="bg-gradient-to-r from-[#e6b422] to-amber-400 text-[#051f18] font-extrabold py-2 px-6 rounded-full shadow-md transition-all duration-300"
      >
        <i className="fas fa-plus-circle mr-1"></i> Join Us
      </button>
    </>
  )}
</div>
          </div>

          {/* HAMBURGER BUTTON (visible on screens ≤860px) */}
          <button 
            className="hidden max-[860px]:block text-3xl text-[#0a3e2f] focus:outline-none transition-transform hover:scale-110" 
            onClick={openDrawer}
            aria-label="Menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* OVERLAY for mobile drawer */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1999] transition-all duration-300 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeDrawer}
      ></div>

      {/* MOBILE DRAWER (off-canvas) */}
      <div 
        ref={drawerRef}
        className={`sc__mobile-drawer--slider fixed top-0 right-[-100%] w-[85%] max-w-[380px] h-full bg-white shadow-2xl z-[2000] p-6 pt-20 flex flex-col gap-6 overflow-y-auto ${isDrawerOpen ? 'open' : ''}`}
      >
        <button 
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-[#e6b422] hover:text-white transition-all duration-200 flex items-center justify-center text-xl"
          onClick={closeDrawer}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <ul className="flex flex-col gap-1">
          {/* Programs mobile */}
          <li className="border-b border-gray-100 py-1">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-[#1e2a32] text-base"
              onClick={() => toggleMobileSubmenu('programs')}
            >
              Programs 
              <i className={`fas fa-chevron-down transition-transform duration-200 text-sm ${openMobileSubmenu === 'programs' ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`sc__mobile-submenu--panel pl-4 bg-[#fafefb] rounded-xl mt-1 flex flex-col gap-2 ${openMobileSubmenu === 'programs' ? 'open-sub' : ''}`}>
              <Link to="/programs/youth-academy" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-child w-5 text-[#e6b422]"></i> Youth Academy</Link>
              <Link to="/programs/elite-u18" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-user-graduate w-5 text-[#e6b422]"></i> Elite U-18</Link>
              <Link to="/programs/pro-pathway" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-trophy w-5 text-[#e6b422]"></i> Pro Pathway</Link>
            </div>
          </li>
          {/* Training mobile */}
          <li className="border-b border-gray-100 py-1">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-[#1e2a32] text-base"
              onClick={() => toggleMobileSubmenu('training')}
            >
              Training 
              <i className={`fas fa-chevron-down transition-transform duration-200 text-sm ${openMobileSubmenu === 'training' ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`sc__mobile-submenu--panel pl-4 bg-[#fafefb] rounded-xl mt-1 flex flex-col gap-2 ${openMobileSubmenu === 'training' ? 'open-sub' : ''}`}>
              <Link to="/training/strength" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-dumbbell w-5 text-[#e6b422]"></i> Strength & Conditioning</Link>
              <Link to="/training/tactical" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-chalkboard-user w-5 text-[#e6b422]"></i> Tactical Mastery</Link>
              <Link to="/training/video-analysis" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-video w-5 text-[#e6b422]"></i> Video Analysis</Link>
            </div>
          </li>
          {/* Teams mobile */}
          <li className="border-b border-gray-100 py-1">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-[#1e2a32] text-base"
              onClick={() => toggleMobileSubmenu('teams')}
            >
              Teams 
              <i className={`fas fa-chevron-down transition-transform duration-200 text-sm ${openMobileSubmenu === 'teams' ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`sc__mobile-submenu--panel pl-4 bg-[#fafefb] rounded-xl mt-1 flex flex-col gap-2 ${openMobileSubmenu === 'teams' ? 'open-sub' : ''}`}>
              <Link to="/teams/u15-select" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-users w-5 text-[#e6b422]"></i> U-15 Select</Link>
              <Link to="/teams/u17-national" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-flag-usa w-5 text-[#e6b422]"></i> U-17 National Dev</Link>
              <Link to="/teams/international-combines" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-globe w-5 text-[#e6b422]"></i> International Combines</Link>
            </div>
          </li>
          {/* Scouting mobile */}
          <li className="border-b border-gray-100 py-1">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-[#1e2a32] text-base"
              onClick={() => toggleMobileSubmenu('scouting')}
            >
              Scouting 
              <i className={`fas fa-chevron-down transition-transform duration-200 text-sm ${openMobileSubmenu === 'scouting' ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`sc__mobile-submenu--panel pl-4 bg-[#fafefb] rounded-xl mt-1 flex flex-col gap-2 ${openMobileSubmenu === 'scouting' ? 'open-sub' : ''}`}>
              <Link to="/scouting/eu-trials" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-passport w-5 text-[#e6b422]"></i> EU Trials</Link>
              <Link to="/scouting/agent-network" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-handshake w-5 text-[#e6b422]"></i> Agent Network</Link>
              <Link to="/scouting/metrics" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-chart-line w-5 text-[#e6b422]"></i> Performance Metrics</Link>
            </div>
          </li>
          {/* Resources mobile */}
          <li className="border-b border-gray-100 py-1">
            <button 
              className="flex justify-between items-center w-full py-3 font-semibold text-[#1e2a32] text-base"
              onClick={() => toggleMobileSubmenu('resources')}
            >
              Resources 
              <i className={`fas fa-chevron-down transition-transform duration-200 text-sm ${openMobileSubmenu === 'resources' ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`sc__mobile-submenu--panel pl-4 bg-[#fafefb] rounded-xl mt-1 flex flex-col gap-2 ${openMobileSubmenu === 'resources' ? 'open-sub' : ''}`}>
              <Link to="/resources/blog" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-newspaper w-5 text-[#e6b422]"></i> Soccer Blog</Link>
              <Link to="/resources/calendar" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-calendar-alt w-5 text-[#e6b422]"></i> Event Calendar</Link>
              <Link to="/resources/faq" onClick={closeDrawer} className="flex items-center gap-3 py-2 text-[#0a3e2f] font-medium"><i className="fas fa-question-circle w-5 text-[#e6b422]"></i> FAQ</Link>
            </div>
          </li>
        </ul>
        
        {/* Mobile drawer buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <button 
            onClick={() => handleNavClick('/login')}
            className="border-2 border-[#0a3e2f] bg-transparent text-[#0a3e2f] font-bold py-3 rounded-full w-full text-center hover:bg-[#0a3e2f] hover:text-white transition-all"
          >
            <i className="fas fa-user-lock mr-2"></i> Login
          </button>
          <button 
            onClick={() => handleNavClick('/signup')}
            className="bg-gradient-to-r from-[#e6b422] to-amber-400 text-[#051f18] font-extrabold py-3 rounded-full w-full shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <i className="fas fa-plus-circle mr-2"></i> Join Us
          </button>
        </div>
      </div>
      {showLogoutModal && (
  <div className="fixed inset-0 bg-black/50 z-[3000] flex items-center justify-center">
    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl">
      <h2 className="text-xl font-bold text-[#0a3e2f] mb-4">
        Logout
      </h2>

      <p className="mb-6">
        Do you want to log out?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-5 py-2 border rounded-full"
        >
          No
        </button>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-full"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Navbar;