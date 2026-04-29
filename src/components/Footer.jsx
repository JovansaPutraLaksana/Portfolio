import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%", // Mulai animasi saat footer mulai terlihat
        toggleActions: "play none none reverse" 
      }
    });

    // 1. Logo "P5" dibanting ke layar
    tl.fromTo(".footer-logo", 
      { scale: 3, rotation: 15, opacity: 0 },
      { scale: 1, rotation: -4, opacity: 1, duration: 0.7, ease: "back.out(2)" }
    )
    // 2. Garis miring di belakang logo mengayun
    .fromTo(".footer-slash",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.5, ease: "power4.out" },
      "-=0.5"
    )
    // 3. Link berjatuhan secara acak
    .fromTo(".footer-link",
      { y: 50, opacity: 0, rotation: () => gsap.utils.random(-15, 15) },
      { y: 0, opacity: 1, rotation: (i) => i % 2 === 0 ? -2 : 3, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" },
      "-=0.3"
    )
    // 4. Baris copyright muncul dari bawah
    .fromTo(".footer-bottom",
      { y: '100%' },
      { y: '0%', duration: 0.5, ease: "power3.out" },
      "-=0.3"
    );

    // Animasi teks Easter Egg berkedip
    gsap.to(".easter-egg", {
      opacity: 0.2,
      yoyo: true,
      repeat: -1,
      duration: 0.1,
      repeatDelay: gsap.utils.random(2, 5), // Kedip secara acak seperti lampu rusak
    });

  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-p5-red overflow-hidden mt-10">
      
      {/* Transisi Robekan Kasar di atas Footer */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-p5-black clip-jagged -translate-y-2 z-20"></div>

      {/* Halftone Pattern Merah Gelap */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0" style={{
        backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
        backgroundSize: '16px 16px',
      }} />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8 relative z-10">
        
        {/* BIG STATEMENT & LOGO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-8 border-p5-black pb-8 relative">
          {/* Aksen tebasan hitam di belakang */}
          <div className="footer-slash absolute top-1/2 left-0 w-full h-8 bg-p5-black -z-10 -rotate-2"></div>
          
          <div className="mb-8 md:mb-0">
            <div className="footer-logo inline-block bg-p5-black text-p5-white px-6 py-4 clip-jagged shadow-[8px_8px_0px_white] border-4 border-p5-white mb-6">
              <span className="font-p5 font-extrabold text-5xl md:text-7xl uppercase">
                THE SHOW'S OVER
              </span>
            </div>
            <p className="font-punk text-p5-black font-extrabold text-lg md:text-2xl uppercase bg-p5-white inline-block px-3 py-1 shadow-[4px_4px_0px_#000] rotate-1">
              A portfolio inspired by persona 5.
            </p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Quick Links - Diubah jadi blok kasar */}
          <div>
            <h4 className="font-p5 font-extrabold text-p5-white text-3xl mb-6 uppercase tracking-wider drop-shadow-[2px_2px_0px_#000]">
              <span className="text-p5-black text-4xl mr-2">✦</span> QUICK ESCAPE
            </h4>
            <div className="flex flex-wrap gap-4">
              {['Hero', 'About','Education', 'Certicates', 'Projects', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  className="footer-link block bg-p5-white text-p5-black font-punk font-bold text-xl px-6 py-2 border-4 border-p5-black clip-jagged hover:bg-p5-black hover:text-p5-white hover:scale-110 hover:-rotate-3 active:scale-95 transition-all shadow-[6px_6px_0px_#000]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links - Diubah jadi stiker / lakban */}
          <div>
            <h4 className="font-p5 font-extrabold text-p5-white text-3xl mb-6 uppercase tracking-wider drop-shadow-[2px_2px_0px_#000]">
              <span className="text-p5-black text-4xl mr-2">✦</span> THE NETWORK
            </h4>
            <div className="flex flex-wrap gap-4">
             {[
                  { name: 'GitHub', url: "https://github.com/JovansaPutraLaksana" },
                  { name: 'LinkedIn', url: "https://www.linkedin.com/in/jovansa-putra-laksana-7306843a9/" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link px-6 py-2 bg-p5-black text-p5-white font-punk font-bold clip-jagged border-4 border-p5-white hover:bg-p5-red hover:border-p5-red hover:-translate-y-2 hover:rotate-3 active:translate-y-0 transition-all shadow-[6px_6px_0px_#D80027]"
                  >
                    {/* PERBAIKAN DI SINI: Ubah {social} menjadi {social.name} */}
                    {social.name}
                  </a>
                ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BANNER */}
      <div className="footer-bottom relative z-20 bg-p5-black text-p5-white border-t-8 border-p5-white">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <span className="bg-p5-red px-2 py-1 font-p5 text-xl clip-jagged rotate-2">© {currentYear}</span>
            <span className="font-punk font-bold text-sm md:text-base uppercase tracking-widest text-p5-white">
              Jovansa • All Rights Reserved
            </span>
          </div>

          {/* Easter Egg diselipkan dengan kedipan ala neon rusak */}
          <div className="easter-egg font-punk text-p5-red font-bold text-xs uppercase tracking-[0.2em] text-center">
            "The night is dark and full of code..." 🎭
          </div>

          <p className="font-p5 text-p5-white text-sm md:text-xl font-bold uppercase drop-shadow-[2px_2px_0px_#D80027]">
            Made with passion ✨
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;