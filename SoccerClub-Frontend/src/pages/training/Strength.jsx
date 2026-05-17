import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const Strength = () => {
  const heroVideoRef = useRef(null);
  const revealsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    revealsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroVideoRef.current) {
        const scale = 1 + (window.scrollY / 500) * 0.1;
        heroVideoRef.current.style.transform = `scale(${Math.min(1.1, scale)})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToReveals = (el) => { if (el && !revealsRef.current.includes(el)) revealsRef.current.push(el); };

  return (
    <>
      <style>{`.hero-video { transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
        .reveal { opacity: 0; transform: translateY(50px); transition: opacity 0.8s, transform 0.7s; }
        .reveal.visible { opacity: 1; transform: translateY(0); }`}</style>

      <section className="relative h-screen w-full flex items-center justify-center text-center isolate overflow-hidden">
        <video ref={heroVideoRef} className="hero-video absolute top-0 left-0 w-full h-full object-cover -z-20 brightness-[0.45]" autoPlay muted loop playsInline>
          <source src="/videos/SoccerPlaying.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051f18]/40 to-[#051f18] -z-10"></div>
        <div className="max-w-[1200px] px-4 z-10 reveal" ref={addToReveals}>
          <h1 className="font-['Playfair_Display',serif] font-extrabold text-[clamp(2.5rem,9vw,5.2rem)] leading-[1.1] text-white">
            STRENGTH & <span className="text-[#e6b422]">CONDITIONING</span>
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">SPORTS SCIENCE • POWER • INJURY PREVENTION</div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center reveal" ref={addToReveals}>
          <p className="text-white text-lg md:text-xl leading-relaxed">Our strength program is designed specifically for soccer athletes, focusing on explosive power, core stability, and injury resilience. Led by certified strength coaches with professional experience.</p>
        </div>
      </div>

      <div className="py-16 md:py-20 px-4 bg-[#1e2a32]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Ronaldo.png', 'Mbappé.png', 'Messi.png'].map((img, idx) => (
            <img key={idx} className="w-full h-64 object-cover grayscale-[0.2] reveal" src={`/images/${img}`} alt="strength training" ref={addToReveals} onError={(e) => { e.target.style.display = 'none'; }} />
          ))}
        </div>
      </div>

      <div className="py-16 px-4 bg-[#051f18]">
        <div className="max-w-6xl mx-auto reveal" ref={addToReveals}>
          <h2 className="text-3xl font-bold text-[#e6b422] mb-8 text-center">Training Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0c2b21] p-6">
              <i className="fas fa-dumbbell text-3xl text-[#e6b422] mb-3"></i>
              <h3 className="text-xl font-bold text-white mb-2">Resistance Training</h3>
              <p className="text-white/80">Periodized strength programs focusing on compound movements and soccer-specific muscle groups.</p>
            </div>
            <div className="bg-[#0c2b21] p-6">
              <i className="fas fa-bolt text-3xl text-[#e6b422] mb-3"></i>
              <h3 className="text-xl font-bold text-white mb-2">Plyometrics</h3>
              <p className="text-white/80">Explosive jumping, bounding, and agility drills to improve acceleration and change of direction.</p>
            </div>
            <div className="bg-[#0c2b21] p-6">
              <i className="fas fa-heartbeat text-3xl text-[#e6b422] mb-3"></i>
              <h3 className="text-xl font-bold text-white mb-2">Injury Prevention</h3>
              <p className="text-white/80">Nordic hamstrings, ACL prevention protocols, and mobility work integrated into every session.</p>
            </div>
            <div className="bg-[#0c2b21] p-6">
              <i className="fas fa-chart-line text-3xl text-[#e6b422] mb-3"></i>
              <h3 className="text-xl font-bold text-white mb-2">Performance Testing</h3>
              <p className="text-white/80">Regular VO2 max, sprint, and strength assessments to track progress.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Strength;