import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const [isExiting, setIsExiting] = useState(false);

  // === ANIMASI ENTRANCE (MASUK) ===
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Background membelah masuk
    tl.fromTo(".splash-bg-anim", 
      { scaleY: 0, skewY: 10 },
      { scaleY: 1, skewY: 0, duration: 0.8, transformOrigin: "bottom center" }
    )
    // Judul jatuh dan memantul keras (seperti UI P5)
    .fromTo(".splash-title-wrapper", 
      { y: -150, opacity: 0, rotation: -10, scale: 1.5 },
      { y: 0, opacity: 1, rotation: -2, scale: 1, duration: 0.6, ease: "back.out(2)" },
      "-=0.4"
    )
    // Nama & Subtitle bergeser masuk dengan cepat
    .fromTo(".splash-text-slide",
      { x: -100, opacity: 0, skewX: -20 },
      { x: 0, opacity: 1, skewX: 0, duration: 0.5, stagger: 0.1 },
      "-=0.4"
    )
    // Tombol meledak keluar
    .fromTo(".splash-button",
      { scale: 0, rotation: 15 },
      { scale: 1, rotation: -3, duration: 0.6, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )
    // Dekorasi text kedap-kedip agresif
    .fromTo(".splash-decoration",
      { opacity: 0 },
      { opacity: 0.8, duration: 0.2, yoyo: true, repeat: -1 },
      "-=0.2"
    );

    // Idle Animation: Tombol sedikit berdenyut/bergerak asimetris
    gsap.to(".splash-button", {
      rotation: -1,
      scale: 1.05,
      duration: 0.15,
      yoyo: true,
      repeat: -1,
      ease: "rough({ template: none.out, strength: 1, points: 20, randomize: true })",
      delay: 2
    });

  }, { scope: containerRef });

  // === ANIMASI EXIT (ALL-OUT ATTACK) ===
  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // 1. Invert sesaat (Efek "Hold Up!")
    tl.to(".splash-content", {
      scale: 1.1,
      filter: "invert(1) hue-rotate(180deg)",
      duration: 0.1,
      ease: "power1.inOut"
    })
    
    // 2. Teks hancur berantakan
    .to(".splash-title-wrapper", { x: -200, skewX: -45, opacity: 0, duration: 0.3, ease: "power4.in" }, 0.1)
    .to(".splash-button", { scale: 3, opacity: 0, duration: 0.3, ease: "power3.in" }, 0.1)
    
    // 3. Brutal Slashes (Merah & Hitam membelah layar)
    .to(".slash-primary", {
      xPercent: 200,
      skewX: -25,
      duration: 0.4,
      ease: "power4.inOut"
    }, 0.15)
    .to(".slash-secondary", {
      yPercent: 200,
      scale: 3,
      rotation: 45,
      duration: 0.45,
      ease: "power4.inOut"
    }, 0.2)
    .to(".slash-tertiary", {
      xPercent: -200,
      yPercent: -100,
      skewY: 30,
      duration: 0.35,
      ease: "expo.in"
    }, 0.25)

    // 4. Flash Putih & Menghilang
    .to(".splash-flash", {
      opacity: 1,
      duration: 0.1
    }, 0.4)
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.2
    }, 0.5);
  };

  return (
    <section
      ref={containerRef}
      className="splash-screen relative h-screen w-full flex items-center justify-center overflow-hidden bg-p5-black cursor-crosshair"
    >
      {/* Background Utama */}
      <div className="splash-bg-anim absolute inset-0 bg-p5-white" />

      {/* Grid Overlay / Halftone Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
        backgroundSize: '16px 16px',
        transform: 'rotate(-5deg) scale(1.2)'
      }} />

      {/* SLASHES - Posisi Awal di luar layar */}
      {/* Merah Lebar */}
      <div className="slash-primary absolute -left-full top-0 bottom-0 w-[150%] bg-p5-red z-20" 
           style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)' }} />
      {/* Hitam Tajam */}
      <div className="slash-secondary absolute -top-full left-0 right-0 h-[200%] bg-p5-black z-20" 
           style={{ clipPath: 'polygon(0 40%, 100% 10%, 100% 30%, 0 60%)' }} />
      {/* Merah Sekunder */}
      <div className="slash-tertiary absolute -right-full bottom-0 top-0 w-full bg-p5-red z-20"
           style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0% 100%)' }} />

      {/* Flash Putih Akhir */}
      <div className="splash-flash absolute inset-0 bg-white z-50 opacity-0 pointer-events-none" />

      {/* Main Content */}
      <div className="splash-content relative z-30 flex flex-col items-center justify-center gap-6 w-full max-w-5xl px-4">
        
        {/* Title Group - Dibuat asimetris (sedikit miring) */}
        <div className="splash-title-wrapper text-center relative">
          <div className="absolute -inset-4 bg-p5-black clip-jagged -z-10 translate-x-2 translate-y-2 opacity-10"></div>
          <h1 className="text-7xl md:text-[9rem] font-p5 text-p5-black mb-2 tracking-tighter leading-none">
            <span className="inline-block px-8 py-2 bg-p5-red text-p5-white clip-jagged shadow-[12px_12px_0px_black] hover:-translate-y-2 hover:translate-x-2 transition-transform duration-200">
              PORTFOLIO
            </span>
          </h1>
        </div>

        <div className="text-center">
          <p className="splash-text-slide text-3xl md:text-5xl font-punk text-p5-black mb-2 bg-p5-white px-4 py-1 border-4 border-p5-black inline-block shadow-[8px_8px_0px_#e00000] -rotate-1">
            JOVANSA PUTRA LAKSANA
          </p>
          <p className="splash-text-slide mt-6 font-punk text-p5-white bg-p5-black inline-block px-6 py-2 text-xl md:text-2xl clip-jagged shadow-[6px_6px_0px_#e00000] rotate-1">
            Your heart is the treasure we seek...
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnter}
          disabled={isExiting}
          className="splash-button mt-8 px-14 py-6 bg-p5-red text-p5-white text-4xl md:text-5xl font-p5 clip-jagged cursor-pointer shadow-[15px_15px_0px_black] border-4 border-transparent hover:border-p5-black hover:bg-p5-white hover:text-p5-red hover:scale-110 active:scale-90 active:translate-y-4 active:shadow-[0px_0px_0px_black] transition-all duration-150 ease-out z-40 group relative"
        >
          <span className="relative z-10 group-hover:animate-glitch">TAKE YOUR HEART</span>
          {/* Efek Bintang di belakang tombol saat dihover */}
          <div className="absolute inset-0 bg-p5-black clip-jagged scale-0 group-hover:scale-105 transition-transform duration-200 z-0"></div>
        </button>

        {/* Decorative Text */}
        <p className="splash-decoration text-xs md:text-base font-punk text-p5-black mt-8 opacity-60 bg-p5-white px-2 uppercase tracking-widest border border-p5-black">
          [ Press to infiltrate the metaverse ]
        </p>
      </div>
    </section>
  );
};

export default SplashScreen;