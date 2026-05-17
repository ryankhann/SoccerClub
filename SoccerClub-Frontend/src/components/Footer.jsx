import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#051f18] text-white pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content - no internal links */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-2">
            <i className="fas fa-futbol text-3xl bg-gradient-to-r from-[#e6b422] to-amber-400 bg-clip-text text-transparent"></i>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
              SoccerClub
            </span>
          </div>
          
          {/* Tagline */}
          <p className="text-sm text-gray-300 max-w-md">
            Elite soccer agency bridging American talent to the international stage.
          </p>

          {/* Social Icons (external links, no internal page links) */}
          <div className="flex gap-5 justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0a3e2f] flex items-center justify-center text-[#e6b422] hover:bg-[#e6b422] hover:text-[#051f18] transition-all duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0a3e2f] flex items-center justify-center text-[#e6b422] hover:bg-[#e6b422] hover:text-[#051f18] transition-all duration-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0a3e2f] flex items-center justify-center text-[#e6b422] hover:bg-[#e6b422] hover:text-[#051f18] transition-all duration-300"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-lg"></i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0a3e2f] flex items-center justify-center text-[#e6b422] hover:bg-[#e6b422] hover:text-[#051f18] transition-all duration-300"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok text-lg"></i>
            </a>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-[#1d7a5c]/30 mt-8 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} SoccerClub Elite Agency. All rights reserved.</p>
          <p className="mt-1">Empowering the next generation of global talent.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;