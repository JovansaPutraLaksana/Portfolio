import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef();

  // Data dummy sertifikat (Tambahkan path gambar aslimu di property 'image')
  const certificates = [
    {
      id: 1,
      title: "Badan Nasional Sertifikasi Profesi",
      issuer: "Web Developer",
      date: "2 Maret 2026 - 2 Maret 2029",
      category: "WEB DEVELOPMENT",
      icon: "💻",
      image: "LSP.png" // <-- Ganti dengan gambarmu
    },
    {
      id: 2,
      title: "SAP HANA",
      issuer: "SAP Modul SD & MM",
      date: "September 2024 - Januari 2025",
      category: "Software ERP",
      icon: "☁️",
      image: "SAP.png" // <-- Ganti dengan gambarmu
    },
    {
      id: 3,
      title: "Universitas MDP",
      issuer: "Asisten Dosen",
      date: "19 Februari 2024 - 20 Desember 2025",
      category: "Akademik",
      icon: "✨",
      image: "Asdos.jpg" // <-- Ganti dengan gambarmu
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".cert-title",
      { opacity: 0, x: -100, skewX: 10 },
      { opacity: 1, x: 0, skewX: 0, duration: 0.6, ease: "power4.out" }
    )
      .fromTo(".cert-line",
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 0.5, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(".cert-card",
        { opacity: 0, scale: 1.5, y: 100, rotation: () => gsap.utils.random(-30, 30) },
        { opacity: 1, scale: 1, y: 0, rotation: (i) => [3, -2, 4, -3][i % 4], stagger: 0.15, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.2"
      );

  }, { scope: sectionRef });

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="min-h-screen py-24 px-4 bg-p5-black relative overflow-hidden z-10"
    >
      {/* Latar Belakang Papan Investigasi */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10" style={{
        backgroundImage: 'linear-gradient(#D80027 2px, transparent 2px), linear-gradient(90deg, #D80027 2px, transparent 2px)',
        backgroundSize: '100px 100px',
        backgroundPosition: '-1px -1px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 relative">
          <div className="cert-title inline-block relative z-10">
            <h2 className="text-5xl md:text-7xl font-p5 text-p5-white uppercase leading-none">
              SECURED <br />
              <span className="inline-block bg-p5-red text-p5-white px-6 py-2 mt-2 clip-jagged shadow-[8px_8px_0px_white]">
                LOOT
              </span>
            </h2>
            <div className="absolute -top-6 -left-6 font-punk text-2xl text-p5-gray opacity-50 -rotate-12">
              EXHIBIT A
            </div>
          </div>
          <div className="cert-line absolute top-1/2 left-0 w-full h-4 bg-p5-white opacity-10 -z-10"></div>
        </div>

        {/* GRID SERTIFIKAT DENGAN GAMBAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-10">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="cert-card group relative cursor-pointer flex flex-col"
            >
              {/* Lakban Perekata (Tape) */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#e0e0e0] opacity-90 z-30 shadow-sm mix-blend-multiply rotate-3 group-hover:-translate-y-2 transition-transform duration-300"></div>

              {/* Kartu Utama */}
              <div className="relative flex flex-col h-full bg-p5-white border-4 border-p5-black clip-jagged shadow-[8px_8px_0px_#D80027] transition-all duration-300 group-hover:shadow-[12px_12px_0px_#D80027] group-hover:-translate-y-4 group-hover:rotate-0 overflow-hidden">

                {/* --- AREA GAMBAR (IMAGE PREVIEW) --- */}
                <div className="relative h-48 w-full border-b-4 border-p5-black bg-p5-black overflow-hidden flex items-center justify-center">
                  {/* Efek Overlay Merah P5 (Hilang saat hover) */}
                  <div className="absolute inset-0 bg-p5-red mix-blend-color z-10 opacity-70 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Gambar Sertifikat */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    // GANTI object-cover MENJADI object-contain DI SINI
                    className="w-full h-full object-contain p-2 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => { e.target.src = '/public/fav.png' }}
                  />

                  {/* Kategori di atas gambar */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="font-punk text-xs font-bold bg-p5-black text-p5-white px-3 py-1 uppercase tracking-wider border-2 border-p5-white">
                      {cert.category}
                    </span>
                  </div>
                </div>
                {/* --- AREA TEKS (DETAIL KARTU) --- */}
                <div className="relative z-20 flex flex-col p-5 flex-grow bg-p5-white">

                  {/* Overlay Halftone Merah saat di-hover (untuk teks) */}
                  <div className="absolute inset-0 bg-p5-red opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)',
                    backgroundSize: '8px 8px',
                  }}></div>

                  {/* Judul & Penerbit */}
                  <div className="flex-grow relative z-10">
                    <h3 className="font-p5 text-xl md:text-2xl text-p5-black uppercase leading-tight mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-punk font-bold text-p5-gray text-sm uppercase">
                      Issuer: <span className="text-p5-red">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Tanggal & Barcode */}
                  <div className="mt-4 pt-3 border-t-4 border-p5-black flex justify-between items-end relative z-10">
                    <span className="font-punk font-bold text-p5-black text-sm">
                      {cert.date}
                    </span>
                    <div className="flex gap-[2px] h-5 opacity-60">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-p5-black" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEMPEL VERIFIED (Muncul menyamping di tengah layar) */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 border-[6px] border-p5-red text-p5-red font-p5 text-5xl px-4 py-2 -rotate-12 mix-blend-multiply opacity-0 scale-150 group-hover:opacity-90 group-hover:scale-100 transition-all duration-300 z-30 pointer-events-none shadow-sm bg-p5-white/20 backdrop-blur-sm">
                  SECURED
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Peringatan Bawah */}
        <div className="mt-20 text-center relative z-10">
          <span className="font-punk text-p5-white bg-p5-red px-4 py-1 text-sm font-bold uppercase tracking-widest clip-jagged shadow-[4px_4px_0px_#000]">
            All visual evidence successfully extracted
          </span>
        </div>

      </div>
    </section>
  );
};

export default Certificates;