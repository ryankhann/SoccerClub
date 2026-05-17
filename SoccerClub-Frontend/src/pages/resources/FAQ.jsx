import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const FAQ = () => {
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

  const faqs = [
    { q: "What age groups do you train?", a: "We offer programs for ages 8 through 19, with specialized tracks for each developmental stage." },
    { q: "Do you offer boarding or housing?", a: "Yes, for out-of-state players in our Elite U18 and Pro Pathway programs, we provide homestay and dormitory options." },
    { q: "How often are international scouts present?", a: "Scouts attend all major showcases (4-6 per year) and are embedded in our combine events." },
    { q: "What is the cost of tuition?", a: "Tuition varies by program. Financial aid and scholarships are available for qualified players." },
    { q: "Do you guarantee professional contracts?", a: "While we cannot guarantee contracts, 38 of our graduates have signed professional deals since 2018." },
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
            FREQUENTLY ASKED <span className="text-[#e6b422]">QUESTIONS</span>
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">EVERYTHING YOU NEED TO KNOW</div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-16 px-4">
        <div className="max-w-3xl mx-auto reveal" ref={addToReveals}>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-l-4 border-[#e6b422] bg-[#0c2b21]/50 p-5">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/80 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-[#1e2a32]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {['hero-4.jpg', 'Ronaldo.png', 'Mbappé.png'].map((img, idx) => (
            <img key={idx} className="w-full h-64 object-cover grayscale-[0.2] reveal" src={`/images/${img}`} alt="faq visual" ref={addToReveals} onError={(e) => { e.target.style.display = 'none'; }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;