import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // === ANIMASI INITIAL LOAD & MOBILE MENU ===
  useGSAP(() => {
    // Animasi Navbar masuk saat pertama kali dirender
    gsap.fromTo(containerRef.current,
      { yPercent: -100, skewY: 2 },
      { yPercent: 0, skewY: 0, duration: 0.6, ease: "power4.out", delay: 0.2 }
    );

    // Animasi Mobile Menu
    if (isOpen) {
      const tl = gsap.timeline();
      
      // Buka kontainer menu dengan gaya "membelah" ke bawah
      tl.to(".nav-menu-container", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.4,
        ease: "power3.out"
      })
      // Stagger animasi link: meluncur dari kiri dengan kemiringan
      .fromTo(".mobile-link",
        { x: -50, opacity: 0, skewX: -20 },
        { x: 0, opacity: 1, skewX: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
        "-=0.2"
      );
    } else {
      // Tutup kontainer menu ditarik ke atas
      gsap.to(".nav-menu-container", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.3,
        ease: "power3.in"
      });
    }
  }, { dependencies: [isOpen], scope: containerRef });

  const navLinks = [
    { name: 'HERO', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'CERTIFICATES', href: '#certificates' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-p5-white border-b-[6px] border-p5-black shadow-[0px_8px_0px_rgba(0,0,0,0.1)]"
    >
      {/* Container Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center relative">
        
        {/* Dekorasi Garis Kinetik di Background Navbar */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)]" />
        </div>

        {/* Logo / Brand */}
        <div className="font-p5 text-3xl md:text-4xl font-bold relative z-10 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <span className="inline-block bg-p5-red text-p5-white px-4 py-1 clip-jagged shadow-[6px_6px_0px_black] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-[2px_2px_0px_black] transition-all duration-200 rotate-1 group-hover:-rotate-2">
            JPL
          </span>
        </div>

        {/* Mobile Menu Button - Animasi Burger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-20 flex flex-col justify-center items-center w-12 h-12 bg-p5-black text-p5-white clip-jagged hover:bg-p5-red transition-colors"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-1 bg-current transition-all duration-300 absolute ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
          <div className={`w-6 h-1 bg-current transition-all duration-300 absolute ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
          <div className={`w-6 h-1 bg-current transition-all duration-300 absolute ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6 flex-wrap relative z-10">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              // Rotasi selang-seling agar terlihat seperti potongan kertas berantakan
              className={`group relative px-2 py-1 font-punk font-bold text-lg text-p5-black transition-all duration-200 ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:z-10`}
            >
              {/* Background hover yang meledak dari dalam */}
              <span className="absolute inset-0 bg-p5-red clip-jagged scale-0 group-hover:scale-110 transition-transform duration-200 ease-out origin-left shadow-[4px_4px_0px_black]" />
              
              {/* Teks utama */}
              <span className="relative z-10 group-hover:text-p5-white inline-block group-hover:-translate-y-1 transition-transform duration-200">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className="nav-menu-container md:hidden absolute top-full left-0 right-0 bg-p5-black border-b-[6px] border-p5-red"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }} // Mulai dalam keadaan tertutup
      >
        <div className="flex flex-col p-6 gap-4 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:16px_16px]">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className={`mobile-link relative overflow-hidden group w-full px-6 py-4 font-punk font-bold text-2xl text-p5-black bg-p5-white border-4 border-p5-black clip-jagged text-center shadow-[6px_6px_0px_#e00000] active:translate-y-1 active:shadow-[2px_2px_0px_#e00000] ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
            >
              {/* Efek swipe background saat di-hover/tap di mobile */}
              <span className="absolute inset-0 bg-p5-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 group-hover:text-p5-white transition-colors duration-200">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;