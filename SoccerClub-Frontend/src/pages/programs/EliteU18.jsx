import React, { useEffect, useRef } from 'react';

const EliteU18 = () => {
  const heroVideoRef = useRef(null);
  const revealsRef = useRef([]);

  // Simplified scroll effect for video (no Lenis)
  useEffect(() => {
    const handleScroll = () => {
      if (heroVideoRef.current) {
        const scrollY = window.scrollY;
        const scale = 1 + (scrollY / 500) * 0.1;
        heroVideoRef.current.style.transform = `scale(${Math.min(1.1, scale)})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple reveal on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = revealsRef.current;
    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToReveals = (el) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        .hero-video {
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center isolate overflow-hidden">
        <video
          ref={heroVideoRef}
          className="hero-video absolute top-0 left-0 w-full h-full object-cover -z-20 brightness-[0.45]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/SoccerPlaying.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051f18]/40 to-[#051f18] -z-10"></div>
        <div className="max-w-[1200px] px-4 z-10 reveal" ref={addToReveals}>
          <h1 className="font-['Playfair_Display',serif] font-extrabold text-[clamp(2.5rem,9vw,5.2rem)] leading-[1.1] text-white">
            ELITE <span className="text-[#e6b422]">U18</span>
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">
            PREMIER PATHWAY • NATIONAL RANKINGS
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center reveal" ref={addToReveals}>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            The Elite U18 program is designed for top-tier players aiming for professional contracts,
            Division I scholarships, and youth national team selection. Training mirrors professional
            environments with high-intensity sessions and regular scouting exposure.
          </p>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="py-16 md:py-20 px-4 bg-[#1e2a32]">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
            Program Highlights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Elite Competition', desc: 'Matches against MLS Next, ECNL, and international academies.' },
            { title: 'College Recruiting', desc: 'Direct partnerships with NCAA Division I programs.' },
            { title: 'Pro Exposure', desc: 'Regular showcases attended by European and MLS scouts.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center reveal p-6 bg-[#0c2b21] border-t-4 border-[#e6b422]"
              ref={addToReveals}
            >
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="py-16 px-4 bg-[#051f18]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {['hero-1.jpg', 'hero-2.png', 'hero-3.jpg'].map((img, idx) => (
            <img
              key={idx}
              className="w-full h-80 object-cover brightness-90 reveal"
              src={`/images/${img}`}
              alt="elite training"
              ref={addToReveals}
              onError={(e) => {
                console.error(`Failed to load: /images/${img}`);
                e.target.style.display = 'none';
              }}
            />
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="py-16 px-4 bg-[#1e2a32]">
        <div className="max-w-6xl mx-auto reveal" ref={addToReveals}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#e6b422] mb-4">Training Schedule</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#e6b422]"></i> 5 on-field sessions per week
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#e6b422]"></i> 3 strength & conditioning sessions
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#e6b422]"></i> Weekly video analysis & classroom
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#e6b422]"></i> Monthly scouting combines
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#e6b422] mb-4">Pathway to Pro</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <i className="fas fa-arrow-right text-[#e6b422]"></i> U15 Select → U17 National → Elite U18
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-arrow-right text-[#e6b422]"></i> Direct referrals to European agents
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-arrow-right text-[#e6b422]"></i> MLS SuperDraft preparation
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-arrow-right text-[#e6b422]"></i> Alumni network of 38 pros
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliteU18;