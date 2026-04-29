import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Title Slam
    tl.fromTo(".edu-title", 
      { opacity: 0, y: -80, rotation: -5, scale: 1.5 },
      { opacity: 1, y: 0, rotation: -2, scale: 1, duration: 0.6, ease: "back.out(2)" }
    )
    // 2. Palace Photo dilempar dari kiri
    .fromTo(".palace-photo",
      { opacity: 0, x: -150, rotation: -15 },
      { opacity: 1, x: 0, rotation: -3, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.3"
    )
    // 3. Degree Card dilempar dari kanan
    .fromTo(".degree-card",
      { opacity: 0, x: 150, rotation: 15 },
      { opacity: 1, x: 0, rotation: 2, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="min-h-screen py-24 px-4 bg-p5-white relative overflow-hidden z-10 flex items-center"
    >
      {/* Background Ornamen Garis Silang */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 flex justify-center items-center opacity-10">
        <div className="w-[150%] h-4 bg-p5-black rotate-45 absolute"></div>
        <div className="w-[150%] h-4 bg-p5-black -rotate-45 absolute"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        
        {/* TITLE */}
        <div className="edu-title mb-20 text-center relative">
          <h2 className="text-5xl md:text-7xl font-p5 text-p5-black uppercase">
            <span className="inline-block bg-p5-black text-p5-white px-8 py-2 clip-jagged shadow-[8px_8px_0px_#D80027] border-4 border-p5-black">
              ACADEMIC
            </span>
            <span className="block mt-4">RECORDS</span>
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-punk text-8xl text-p5-red opacity-10 pointer-events-none -z-10 whitespace-nowrap -rotate-6">
            CLASSIFIED INTEL
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          
          {/* LEFT: THE PALACE (University Image) */}
          <div className="palace-photo relative group cursor-crosshair">
            {/* Lakban Atas & Bawah */}
            <div className="absolute -top-4 left-10 w-32 h-8 bg-[#e0e0e0] opacity-80 rotate-3 z-30 shadow-sm mix-blend-multiply"></div>
            <div className="absolute -bottom-4 right-10 w-24 h-8 bg-[#d0d0d0] opacity-80 -rotate-6 z-30 shadow-sm mix-blend-multiply"></div>

            <div className="relative border-8 border-p5-black bg-p5-black p-2 clip-jagged-alt shadow-[12px_12px_0px_#D80027] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
              {/* Overlay Merah Khas Palace */}
              <div className="absolute inset-0 bg-p5-red mix-blend-color z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-20 pointer-events-none"></div>

              {/* GANTI SRC GAMBAR DI BAWAH INI DENGAN FOTO KAMPUSMU */}
              <img 
                src="mdp.jpg" 
                alt="University Palace" 
                className="w-full h-75 md:h-100 object-cover filter grayscale contrast-125 clip-jagged"
              />

              {/* Stempel Target */}
              <div className="absolute bottom-4 left-4 z-30 border-4 border-p5-white px-3 py-1 -rotate-12 bg-p5-black">
                <span className="font-punk text-p5-white font-bold tracking-widest text-sm uppercase">
                  Target: Universitas MDP
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: FLIP CARD (Diploma / Ijazah) */}
          <div className="degree-card group relative w-full h-87.5 md:h-100 perspective-[1500px] cursor-pointer">
            
            {/* Inner Container untuk 3D Flip */}
            <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)] shadow-[10px_10px_0px_#000]">
              
              {/* --- BAGIAN DEPAN (FRONT) --- */}
              <div className="absolute inset-0 w-full h-full backface-hidden] bg-p5-red border-4 border-p5-black clip-jagged flex flex-col justify-center items-center p-8">
                {/* Latar Belakang Pola */}
                <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] bg-size-[16px_16px] opacity-20 pointer-events-none"></div>
                
                <div className="bg-p5-black text-p5-white p-6 border-2 border-p5-white -rotate-3 w-full text-center relative z-10">
                  <h3 className="font-p5 text-4xl mb-2">DOSSIER FILE</h3>
                  <p className="font-punk font-bold text-p5-red tracking-widest uppercase">Hover to Uncover</p>
                </div>
                
                <span className="text-8xl mt-4 drop-shadow-[4px_4px_0px_black] group-hover:scale-110 transition-transform">🎓</span>
              </div>

              {/* --- BAGIAN BELAKANG (BACK) --- */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-p5-white border-[6px] border-p5-black clip-jagged flex flex-col justify-between p-6 md:p-8">
                
                {/* Header Ijazah */}
                <div className="border-b-4 border-p5-black pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-p5-black text-p5-white font-punk px-2 py-1 text-xs uppercase font-bold">Confidential</span>
                    <span className="text-p5-red font-p5 text-xl">2022 - 2026</span>
                  </div>
                  <h3 className="font-p5 text-3xl text-p5-black uppercase leading-none mt-2">
                    Bachelor of Computer Science
                  </h3>
                </div>

                {/* Body Ijazah */}
                <div className="py-4 grow flex flex-col justify-center">
                  <p className="font-punk font-bold text-p5-black text-lg mb-1">
                    <span className="text-p5-red">►</span> Major: Informatika
                  </p>
                  <p className="font-punk font-bold text-p5-black text-lg mb-1">
                    <span className="text-p5-red">►</span> Final GPA: <span className="bg-p5-black text-p5-white px-2">3.95</span>
                  </p>
                  <p className="font-punk font-bold text-p5-gray text-sm mt-4">
                    "Successfully infiltrated the academic system and extracted the required knowledge."
                  </p>
                </div>

                {/* Stempel Lulus */}
                <div className="absolute bottom-6 right-6 border-4 border-p5-red text-p5-red font-p5 text-3xl px-4 py-2 -rotate-12 mix-blend-multiply opacity-80">
                  CLEARED
                </div>
                
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;