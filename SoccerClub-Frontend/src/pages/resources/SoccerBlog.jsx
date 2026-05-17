import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SoccerBlog = () => {
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

  const posts = [
    { title: "5 Drills to Improve First Touch", category: "Training", date: "March 15, 2025" },
    { title: "Understanding the Modern Holding Midfielder", category: "Tactics", date: "March 10, 2025" },
    { title: "How to Prepare for a European Trial", category: "Scouting", date: "March 5, 2025" },
    { title: "Recovery Protocols for Tournament Play", category: "Health", date: "February 28, 2025" },
    { title: "US Talent Pathway to Europe", category: "Pathway", date: "February 20, 2025" },
  ];

  return (
    <>
      <style>{`.hero-video { transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
        .reveal { opacity: 0; transform: translateY(50px); transition: opacity 0.8s, transform 0.7s; }
        .reveal.visible { opacity: 1; transform: translateY(0); }`}</style>

      <section className="relative h-[60vh] w-full flex items-center justify-center text-center isolate overflow-hidden">
        <video ref={heroVideoRef} className="hero-video absolute top-0 left-0 w-full h-full object-cover -z-20 brightness-[0.45]" autoPlay muted loop playsInline>
          <source src="/videos/SoccerPlaying.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051f18]/40 to-[#051f18] -z-10"></div>
        <div className="max-w-[1200px] px-4 z-10 reveal" ref={addToReveals}>
          <h1 className="font-['Playfair_Display',serif] font-extrabold text-[clamp(2.5rem,9vw,5.2rem)] leading-[1.1] text-white">
            SOCCER <span className="text-[#e6b422]">BLOG</span>
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">INSIGHTS • ANALYSIS • STORIES</div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-16 px-4">
        <div className="max-w-4xl mx-auto reveal" ref={addToReveals}>
          <div className="space-y-6">
            {posts.map((post, idx) => (
              <div key={idx} className="border-b border-[#e6b422]/30 pb-4">
                <div className="text-[#e6b422] text-xs uppercase tracking-wide">{post.category}</div>
                <h3 className="text-xl font-bold text-white mt-1">{post.title}</h3>
                <div className="text-white/50 text-sm mt-1">{post.date}</div>
                <p className="text-white/70 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-[#1e2a32]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {['Ronaldo.png', 'Mbappé.png', 'Messi.png'].map((img, idx) => (
            <img key={idx} className="w-full h-64 object-cover grayscale-[0.2] reveal" src={`/images/${img}`} alt="blog feature" ref={addToReveals} onError={(e) => { e.target.style.display = 'none'; }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SoccerBlog;