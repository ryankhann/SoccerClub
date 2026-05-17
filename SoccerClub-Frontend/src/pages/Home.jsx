import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lenis from '@studio-freight/lenis';

const Home = () => {
  const heroVideoRef = useRef(null);
  const joinTargetRef = useRef(null);
  const statNumbersRef = useRef([]);
  const revealsRef = useRef([]);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' } // Lower threshold for earlier trigger
    );
    revealsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let current = 0;
            const increment = target / 55;
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                el.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                el.innerText = target;
              }
            };
            updateCounter();
            el.dataset.animated = 'true';
          }
        });
      },
      { threshold: 0.3 }
    );
    statNumbersRef.current.forEach((stat) => {
      if (stat) countObserver.observe(stat);
    });
    return () => countObserver.disconnect();
  }, []);

  // Hero video zoom on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroVideoRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = 500;
        const scale = 1 + (scrollY / maxScroll) * 0.1;
        heroVideoRef.current.style.transform = `scale(${Math.min(1.1, scale)})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToJoin = () => {
    if (joinTargetRef.current) {
      window.scrollTo({ top: joinTargetRef.current.offsetTop, behavior: 'smooth' });
    }
  };

  const handleFinalJoin = () => {
    alert('⚡ Exclusive: Our scouting team will contact you within 24h. International dreams start now! ⚡');
  };

  // Helper to add refs for reveal
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
        .btn-cta {
          transition: all 0.4s var(--transition-butter);
          clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%);
        }
        .btn-cta:hover {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        .join-btn {
          clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
        }
        .join-btn:hover {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        .swiper-button-next, .swiper-button-prev {
          color: var(--gold-strike);
          background: rgba(0,0,0,0.5);
          width: 45px;
          height: 45px;
          backdrop-filter: blur(4px);
          border-radius: 0;
        }
        .swiper-pagination-bullet-active {
          background: var(--gold-strike);
        }
        .gallery-img {
          transition: all 0.5s var(--transition-butter);
          cursor: pointer;
        }
        .gallery-img:hover {
          transform: scale(1.03) translateY(-8px);
          filter: grayscale(0) brightness(1.05);
          box-shadow: 0 25px 40px rgba(0,0,0,0.4);
        }
        .flag-card {
          transition: all 0.4s ease;
        }
        .flag-card:hover img {
          transform: translateY(-8px) scale(1.05);
          filter: brightness(1.1);
          box-shadow: 0 15px 25px rgba(0,0,0,0.3);
        }
        .flag-card:hover p {
          color: var(--gold-strike);
        }
        .slide-caption {
          background: rgba(5,31,24,0.7);
          backdrop-filter: blur(8px);
          border-left: 4px solid var(--gold-strike);
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
            THE <span className="text-[#e6b422]">SOCCERCLUB</span><br />LEGACY
          </h1>
          <div className="text-sm md:text-base uppercase tracking-[2px] my-4 backdrop-blur-sm text-white">
            U.S. BASED • INTERNATIONAL DESTINY
          </div>
          <button
            onClick={scrollToJoin}
            className="btn-cta inline-flex items-center gap-2 bg-transparent border-2 border-[#e6b422] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-[#e6b422] hover:text-[#051f18] transition-all"
          >
            IGNITE YOUR JOURNEY <i className="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-[#051f18] to-[#0b2c22] py-12 md:py-16 px-4">
        <div className="flex flex-wrap justify-evenly gap-8 max-w-6xl mx-auto">
          {[
            { count: 38, label: 'PRO PLAYERS PLACED' },
            { count: 15, label: "INT'L TEAMS" },
            { count: 100, label: 'ELITE GRADUATES' },
            { count: 9, label: 'YEARS OF EXCELLENCE' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center reveal" ref={addToReveals}>
              <div
                className="stat-number text-4xl md:text-5xl font-['Playfair_Display',serif] font-extrabold text-[#e6b422]"
                data-count={stat.count}
                ref={(el) => (statNumbersRef.current[idx] = el)}
              >
                0
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wider opacity-80 mt-1 text-white">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Mosaic */}
      <div className="py-16 md:py-20 px-4 bg-[#1e2a32]">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
            Where Stars Are Forged
          </h2>
          <p className="text-sm md:text-base opacity-80 mt-2 text-white">
            Elite facilities, US-based academies & direct pipelines to European giants
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {['Ronaldo.png', 'Mbappé.png', 'Messi.png'].map((img, idx) => (
            <img
              key={idx}
              className="gallery-img w-full h-80 md:h-[380px] object-cover grayscale-[0.2] brightness-90 reveal"
              src={`/images/${img}`}
              alt="soccer training"
              ref={addToReveals}
              onError={(e) => {
                console.error(`Failed to load image: /images/${img}`);
                e.target.style.display = 'none'; // Hide broken images
              }}
            />
          ))}
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="py-12 md:py-20 px-4 bg-[#051f18]">
        <div className="text-center mb-8 reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
            International Breakthroughs
          </h2>
          <p className="text-[#e6b422] text-sm uppercase tracking-wider mt-1">
            From local fields to global stadiums
          </p>
        </div>
        <div className="max-w-7xl mx-auto reveal" ref={addToReveals}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={800}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
            }}
          >
            {[
              { img: 'hero-1.jpg', name: 'M. Reynolds', desc: '→ Bundesliga · class of 24' },
              { img: 'hero-2.png', name: 'E. Costa', desc: '→ Premier League Academy' },
              { img: 'hero-3.jpg', name: 'J. Kim', desc: '→ Serie A U21 call-up' },
              { img: 'hero-4.jpg', name: 'D. Williams', desc: '→ MLS Next Pro & USYNT' },
            ].map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative">
                  <img
                    className="slide-img w-full h-[450px] md:h-[500px] object-cover brightness-75 transition-all duration-500 hover:brightness-95 hover:scale-105"
                    src={`/images/${slide.img}`}
                    alt="player"
                    onError={(e) => {
                      console.error(`Failed to load slide image: /images/${slide.img}`);
                      e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute bottom-5 left-5 px-4 py-2 slide-caption">
                    <h4 className="text-lg md:text-xl font-bold text-white">{slide.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-white">{slide.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Video Split Section */}
      <div className="flex flex-wrap min-h-[80vh] bg-[#1e2a32]">
        <div className="flex-1 min-w-[300px] relative">
          <video controls poster="/images/hero-bg-2.jpg" className="w-full h-full object-cover">
            <source src="/videos/SoccerPlaying.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex-1 flex flex-col justify-center p-6 md:p-12 bg-gradient-to-r from-[#102b21] to-[#051f18] reveal" ref={addToReveals}>
          <h3 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold text-white">
            UNLOCK YOUR <span className="text-[#e6b422]">POTENTIAL</span>
          </h3>
          <p className="italic border-l-4 border-[#e6b422] pl-4 my-4 text-sm md:text-base leading-relaxed text-white">
            “The will to win is nothing without the will to prepare. SoccerClub gives you the tools, exposure, and elite coaching that bridges American talent to the world.”
          </p>
          <div className="flex gap-5 mt-4">
            <i className="fas fa-futbol text-2xl text-[#e6b422]"></i>
            <i className="fas fa-globe-americas text-2xl text-[#e6b422]"></i>
            <i className="fas fa-chart-line text-2xl text-[#e6b422]"></i>
          </div>
        </div>
      </div>

      {/* Global Partners */}
      <div className="py-16 md:py-20 px-4 bg-[#0c2b21]">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#e6b422] bg-clip-text text-transparent">
            Global Partners & Scouting Network
          </h2>
          <p className="text-sm md:text-base opacity-80 mt-2 text-white">
            Direct pipelines to clubs across Europe, South America & MLS
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto reveal" ref={addToReveals}>
          {[
            { img: 'PREMIERLEAGUE.jpg', label: 'PREMIER LEAGUE' },
            { img: 'laliga.jpg', label: 'LA LIGA' },
            { img: 'serieA.jpg', label: 'SERIE A' },
            { img: 'bundesliga.jpg', label: 'BUNDESLIGA' },
            { img: 'MAJORLEAGUESOCCER.jpg', label: 'MAJOR LEAGUE SOCCER' },
          ].map((league, idx) => (
            <div key={idx} className="flag-card flex-1 min-w-[120px] text-center transition-all duration-300">
              <img
                className="w-full h-28 object-cover rounded-sm brightness-90 transition-all duration-300"
                src={`/images/${league.img}`}
                alt={league.label}
                onError={(e) => {
                  console.error(`Failed to load league image: /images/${league.img}`);
                  e.target.style.display = 'none';
                }}
              />
              <p className="mt-2 text-xs md:text-sm font-semibold tracking-wide text-white">{league.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div
        ref={joinTargetRef}
        className="relative py-20 md:py-28 px-4 text-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/hero-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#051f18]/85 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl mx-auto reveal" ref={addToReveals}>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold text-white">
            READY TO <span className="text-[#e6b422]">DOMINATE</span>?<br />YOUR INTERNATIONAL DEBUT STARTS HERE
          </h2>
          <p className="text-sm md:text-base mt-4 mb-6 opacity-90 text-white">
            Limited spots for the 2025 Elite Scouting Combine. US-based trials with global scouts.
          </p>
          <button
            onClick={handleFinalJoin}
            className="join-btn inline-flex items-center gap-2 bg-[#e6b422] text-[#051f18] font-extrabold px-6 py-3 text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
          >
            SECURE YOUR TRIAL <i className="fas fa-bolt"></i>
          </button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="fixed bottom-5 right-5 bg-[#e6b422]/90 backdrop-blur-md text-[#051f18] px-4 py-1.5 text-xs font-mono tracking-wide shadow-lg pointer-events-none z-50">
        <i className="fas fa-medal mr-1"></i> NEXT STOP: INTERNATIONAL GLORY
      </div>
    </>
  );
};

export default Home;