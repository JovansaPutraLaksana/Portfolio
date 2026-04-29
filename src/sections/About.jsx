import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();
  const contentRef = useRef();
  const marqueeRef = useRef();

  useGSAP(() => {
    // 1. Animasi Marquee Background (Berjalan terus menerus)
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    // 2. Parallax Ornamen Background saat di-scroll (Scrubbing)
    gsap.to(".bg-shape-red", {
      y: 300,
      rotation: 180,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Mengikuti pergerakan scroll dengan sedikit jeda (smooth)
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true
      }
    });

    // 3. Entrance Animations (Lebih snappy)
    tl.fromTo(".profile-pic-container", 
      { opacity: 0, scale: 0.2, x: 150, rotation: 45 },
      { opacity: 1, scale: 1, x: 0, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(".about-title", 
      { opacity: 0, y: -100, rotation: -10 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.7, ease: "back.out(2)" }, 
      "-=0.5"
    )
    .fromTo(".about-bio", 
      { opacity: 0, scale: 0.8, x: -80, rotation: 5, skewX: 10 },
      { opacity: 1, scale: 1, x: 0, rotation: 0, skewX: 0, duration: 0.6, ease: "power4.out" }, 
      "-=0.4"
    )
    .fromTo(".about-stat", 
      { opacity: 0, scale: 0, rotation: () => gsap.utils.random(-30, 30) },
      { opacity: 1, scale: 1, rotation: (i) => i % 2 === 0 ? 3 : -2, stagger: 0.1, duration: 0.6, ease: "back.out(2.5)" }, 
      "-=0.3"
    )
    .fromTo(".about-tool", 
      { opacity: 0, y: 30, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: "back.out(2)" }, 
      "-=0.2"
    )
    // Animasi Calling Card Masuk
    .fromTo(".calling-card", 
      { opacity: 0, y: 100, rotation: -15, scale: 0.8 },
      { opacity: 1, y: 0, rotation: -2, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.7)",
        onComplete: () => {
          // 4. Continuous Idle Animation (Setelah animasi masuk selesai)
          gsap.to(".calling-card", {
            y: "-=15",
            rotation: "-=1",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
          });
          gsap.to(".calling-card-star", {
            rotation: 360,
            repeat: -1,
            duration: 5,
            ease: "none"
          });
        }
      }, 
      "-=0.3"
    );

  }, { scope: sectionRef });

  // 5. Mouse tracking logic untuk efek Parallax 3D
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    // Kalkulasi posisi kursor dari titik tengah layar (-1 hingga 1)
    const xPos = (clientX / window.innerWidth - 0.5);
    const yPos = (clientY / window.innerHeight - 0.5);

    // Menggeser layer background perlahan ke arah kursor
    gsap.to(".parallax-bg", {
      x: xPos * 40,
      y: yPos * 40,
      duration: 1,
      ease: "power2.out"
    });

    // Menggeser layer konten utama berlawanan arah kursor (Lebih cepat)
    gsap.to(".parallax-fg", {
      x: -xPos * 30,
      y: -yPos * 30,
      rotationY: xPos * 10, // Sedikit rotasi 3D
      rotationX: -yPos * 10,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  const stats = [
    { label: "Active", value: "1+ YRS" },
    { label: "Projects", value: "2+" },
    { label: "Skills", value: "15+" },
  ];

  const tools = ['HTML/CSS','JavaScript','Java','Kotlin','PHP',"GO",'Dart','Python','SQL','React', 'Tailwind', 'GSAP', 'Vite','Laravel','Flutter','Flask','Git'];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen py-24 px-4 bg-p5-black text-p5-white relative overflow-hidden flex flex-col justify-center z-10 perspective-[1000px]"
    >
      {/* --- BACKGROUND ELEMENTS (Parallax BG) --- */}
      <div className="parallax-bg absolute inset-0 pointer-events-none z-0">
        {/* Marquee Text */}
        <div className="absolute top-1/4 left-0 w-[200%] opacity-5 -rotate-6">
          <div ref={marqueeRef} className="text-9xl font-p5 font-black text-p5-red whitespace-nowrap">
            TAKE YOUR HEART • STEAL THE SHOW • REBELLION • TAKE YOUR HEART • STEAL THE SHOW • REBELLION •
          </div>
        </div>
        {/* Decorative Geometric Elements */}
        <div className="bg-shape-red absolute top-0 right-0 w-[600px] h-[600px] bg-p5-red opacity-15 rotate-45 translate-x-1/2 -translate-y-1/4 mix-blend-screen" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-p5-white opacity-5 rotate-12 clip-jagged" />
      </div>

      {/* --- MAIN CONTENT CONTAINER (Parallax FG) --- */}
      <div className="parallax-fg max-w-6xl mx-auto relative z-10 w-full transform-style-3d">
        
       {/* === FOTO PROFIL === */}
        {/* FIX MOBILE: Gunakan relative & flex di mobile, lalu kembalikan ke absolute di md (desktop) */}
        <div className="profile-pic-container relative flex justify-center mb-16 w-full md:w-auto md:absolute md:-top-16 md:right-0 md:block md:mb-0 z-30">
          <div className="relative group cursor-crosshair inline-block">
            {/* Lakban decoration: Posisi disesuaikan agar rapi di tengah saat mobile */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-10 w-24 h-6 bg-[#e0e0e0] opacity-90 rotate-2 shadow-sm mix-blend-multiply z-10 border border-p5-black"></div>
            
            <div className="relative border-8 border-p5-white p-2 clip-jagged-alt shadow-[10px_10px_0px_#D80027] rotate-3 group-hover:-translate-y-4 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0 bg-p5-red opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)',
                backgroundSize: '8px 8px',
              }}></div>
              
              {/* Ukuran foto sedikit diperbesar di mobile (w-48) agar lebih 'menghantam' */}
              <img 
                src="profil.jpg" 
                alt="Jovansa Putra Laksana" 
                className="w-48 h-48 md:w-64 md:h-64 object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 clip-jagged-alt relative z-0"
              />
              
              {/* Stempel Target: Posisi kiri digeser sedikit saat mobile agar tidak terpotong layar */}
              <div className="absolute -bottom-6 -left-2 md:-left-6 z-30 border-4 border-p5-red px-3 py-1 -rotate-12 bg-p5-black mix-blend-hard-light group-hover:scale-125 transition-transform duration-300">
                <span className="font-punk text-p5-red font-bold tracking-widest text-sm uppercase">VERIFIED_REBEL</span>
              </div>
            </div>
          </div>
        </div>

        {/* === TITLE SECTION === */}
        <div className="about-title mb-24 relative inline-block">
          <div className="absolute -inset-2 bg-p5-white clip-jagged opacity-10 translate-x-4 translate-y-4 animate-pulse"></div>
          
          <h2 className="text-6xl md:text-8xl font-p5 uppercase tracking-tighter relative z-10 hover:skew-x-6 transition-transform duration-300 cursor-default">
            <span className="inline-block bg-p5-red text-p5-white px-8 py-2 clip-jagged shadow-[10px_10px_0px_#fff] mr-6 -rotate-2 border-4 border-p5-black hover:bg-p5-white hover:text-p5-red hover:border-p5-red transition-colors">
              CONFIDANT
            </span>
            <span className="block mt-6 md:ml-8 text-4xl md:text-5xl font-punk text-p5-white bg-p5-black border-4 border-p5-white px-6 py-2 w-max rotate-1 shadow-[6px_6px_0px_#D80027]">
              File: Jovansa
            </span>
          </h2>
        </div>

        {/* === CONTENT GRID === */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24 relative z-0">
          
          {/* KIRI - Bio / Persona Details */}
          <div className="about-bio md:col-span-7">
            {/* Ditambahkan efek hover glitch ringan */}
            <div className="bg-p5-black border-8 border-p5-white p-8 md:p-12 clip-jagged shadow-[15px_15px_0px_#D80027] relative group transition-all duration-300 hover:shadow-[20px_20px_0px_#D80027] hover:-translate-x-2 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/4 w-32 h-8 bg-p5-white/90 -rotate-3 border-2 border-p5-black group-hover:rotate-0 transition-transform"></div>
              
              <h3 className="text-4xl font-p5 mb-8 bg-p5-white px-6 py-2 inline-block text-p5-black -rotate-1 clip-jagged border-2 border-p5-black">
                PROFILE DATA
              </h3>
              
              <div className="space-y-6 text-xl md:text-2xl font-punk text-p5-white leading-relaxed font-bold">
                <p>
                  Jovansa Putra Laksana (JOPUL) adalah seorang Junior Developer yang memiliki 
                  <span className="bg-p5-white text-p5-black px-2 py-1 mx-2 font-black -rotate-2 inline-block border-2 border-p5-black shadow-[4px_4px_0px_#D80027] hover:bg-p5-red hover:text-p5-white transition-colors cursor-crosshair">PASSION</span> 
                  untuk mencuri perhatian melalui pengalaman digital yang unik dan memorable. 
                </p>
                <p>
                  Dipersenjatai dengan <span className="text-p5-red font-extrabold uppercase bg-p5-white px-2 tracking-wider border-2 border-p5-black inline-block rotate-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-p5-red">Pola Pikir Developer</span> dan Teknologi AI, saya bisa menciptakan berbagai macam karya digital yang visually stunning.
                </p>
                <p className="text-[#c0c0c0] font-bold border-l-4 border-p5-red pl-4 italic text-lg md:text-xl group-hover:border-[#fff] transition-colors">
                  "Setiap project adalah sebuah infiltration ke Istana baru, dimana saya belajar, berkembang, dan meninggalkan jejak nyata."
                </p>
              </div>
            </div>
          </div>

          {/* KANAN - Stats & Arsenal */}
          <div className="md:col-span-5 flex flex-col gap-10 mt-10 md:mt-0">
            {/* Social Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`about-stat bg-p5-black text-p5-white p-5 flex flex-col items-center justify-center clip-jagged border-2 border-p5-white shadow-[8px_8px_0px_#D80027] transition-all duration-200 hover:scale-110 hover:bg-p5-red hover:-rotate-6 cursor-crosshair ${idx % 2 === 0 ? 'rotate-2' : '-rotate-1'}`}
                >
                  <div className="text-3xl md:text-4xl font-p5 text-p5-white">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-punk uppercase tracking-widest mt-1 text-center font-extrabold text-p5-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Arsenal / Skills */}
            <div className="about-bio bg-p5-red border-4 border-p5-black p-8 clip-jagged shadow-[10px_10px_0px_#fff]">
              <h4 className="text-2xl font-p5 text-p5-white mb-6 flex items-center gap-2">
                <span className="bg-p5-black text-p5-white px-2 py-1 rotate-2 border border-p5-white">EQUIPPED</span> Skills
              </h4>
              <div className="flex flex-wrap gap-4">
                {tools.map((skill, index) => (
                  <span
                    key={skill}
                    // Efek hover dibikin snappy dan miring ekstrem
                    className={`about-tool px-5 py-3 bg-p5-white text-p5-black font-punk text-base md:text-lg font-bold clip-jagged border-2 border-p5-black hover:bg-p5-black hover:text-p5-white hover:scale-110 hover:rotate-6 transition-all duration-200 cursor-crosshair ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === CALL TO ACTION (CALLING CARD) === */}
        <div className="calling-card max-w-3xl mx-auto transform -rotate-2 z-40 relative">
          <div className="bg-[#D80027] p-8 md:p-14 border-8 border-p5-black relative shadow-[15px_15px_0px_#fff] flex flex-col items-center text-center group">
            {/* Card Icon - Diberikan ref/class untuk di-rotate terus menerus */}
            <div className="calling-card-star absolute -top-10 -right-8 w-20 h-20 bg-p5-black text-p5-white border-4 border-p5-white rounded-full flex items-center justify-center text-4xl font-p5 shadow-[6px_6px_0px_#000] z-10">
              ★
            </div>
            
            <h3 className="text-4xl md:text-6xl font-p5 text-p5-white mb-8 uppercase tracking-widest bg-p5-black px-6 py-2 -rotate-1 clip-jagged border-2 border-p5-white group-hover:scale-105 transition-transform">
              Calling Card
            </h3>
            
            <p className="font-punk text-p5-white text-xl md:text-3xl mb-10 leading-snug font-bold">
              Tertarik untuk <span className="bg-p5-white text-p5-black px-2 mx-1 inline-block rotate-2 font-black border-2 border-p5-black">berkolaborasi?</span><br/>
              Mari kita curi perhatian dunia digital bersama-sama!
            </p>
            
            <a
              href="#contact"
              className="relative inline-block px-12 py-5 bg-p5-white text-p5-black font-p5 text-3xl uppercase tracking-wider clip-jagged border-4 border-p5-black hover:bg-p5-black hover:text-p5-white hover:border-p5-white transition-all duration-300 hover:scale-110 hover:-rotate-3 shadow-[8px_8px_0px_#000] active:scale-95 active:translate-y-2"
            >
              <span className="relative z-10">Take Action</span>
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;