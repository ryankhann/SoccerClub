import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const YouthAcademy = () => {
  const heroVideoRef = useRef(null);
  const revealsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

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
    revealsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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

  const addToReveals = (el) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --field-green: #0a3e2f;
          --turf-glow: #1d7a5c;
          --pitch-dark: #051f18;
          --gold-strike: #e6b422;
          --pure-white: #ffffff;
          --soft-ash: #f4f7f9;
          --charcoal-slate: #1e2a32;
          --transition-butter: cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .hero-video {
          transition: transform 0.4s var(--transition-butter);
        }
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s var(--transition-butter), transform 0.7s var(--transition-butter);
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
          className="hero-video absolute top-0 left-0 w-full h-full object-cover -z-20 brightness-[0.45] saturate-[1.1]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/SoccerPlaying.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051f18]/40 to-[#051f18] -z-10"></div>
        <div className="max-w-[1200px] px-4 z-10 reveal" ref={addToReveals}>
          <h1 className="font-['Playfair_Display',serif] font-extrabold text-[clamp(2.5rem,9vw,5.2rem)] leading-[1.1] drop-shadow-lg text-white">
            YOUTH <span className="text-[#e6b422]">ACADEMY</span>
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">
            AGES 8-14 • DEVELOPMENT FIRST
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center reveal" ref={addToReveals}>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            Our Youth Academy focuses on technical mastery, tactical awareness, and character development. 
            Young players train in a professional environment with licensed coaches, building the foundation 
            for a future in elite soccer.
          </p>
        </div>
      </div>

      {/* Training Pillars */}
      <div className="py-16 md:py-20 px-4 bg-[#1e2a32]">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
            Academy Pillars
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Technical Excellence', desc: 'Ball mastery, first touch, passing precision under pressure.', icon: 'fas fa-futbol' },
            { title: 'Tactical IQ', desc: 'Positional play, game reading, decision-making drills.', icon: 'fas fa-brain' },
            { title: 'Athletic Foundation', desc: 'Age-appropriate fitness, coordination, and agility.', icon: 'fas fa-heartbeat' },
          ].map((pillar, idx) => (
            <div key={idx} className="text-center reveal p-6 bg-[#0c2b21] border-l-4 border-[#e6b422]" ref={addToReveals}>
              <i className={`${pillar.icon} text-4xl text-[#e6b422] mb-4`}></i>
              <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
              <p className="text-white/80 text-sm">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="py-16 px-4 bg-[#051f18]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {['Ronaldo.png', 'Mbappé.png', 'Messi.png'].map((img, idx) => (
            <img
              key={idx}
              className="w-full h-80 object-cover grayscale-[0.2] brightness-90 reveal"
              src={`/images/${img}`}
              alt="academy training"
              ref={addToReveals}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ))}
        </div>
      </div>

      {/* Program Details */}
      <div className="py-16 md:py-20 px-4 bg-[#1e2a32]">
        <div className="max-w-6xl mx-auto reveal" ref={addToReveals}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#e6b422] mb-4">Curriculum</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-[#e6b422]"></i> 4 training sessions per week</li>
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-[#e6b422]"></i> Monthly friendly matches & tournaments</li>
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-[#e6b422]"></i> Video analysis & classroom sessions</li>
                <li className="flex items-center gap-2"><i className="fas fa-check-circle text-[#e6b422]"></i> Physical development monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#e6b422] mb-4">Pathway</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2"><i className="fas fa-arrow-right text-[#e6b422]"></i> U8-U12 Foundation Phase</li>
                <li className="flex items-center gap-2"><i className="fas fa-arrow-right text-[#e6b422]"></i> U13-U14 Development Phase</li>
                <li className="flex items-center gap-2"><i className="fas fa-arrow-right text-[#e6b422]"></i> Pathway to U15 Select Teams</li>
                <li className="flex items-center gap-2"><i className="fas fa-arrow-right text-[#e6b422]"></i> International showcase opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YouthAcademy;