import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Portfolio",
    desc: "Website portfolio pribadi yang menampilkan proyek-proyek terbaru dengan animasi interaktif menggunakan React, GSAP, dan Tailwind CSS.",
    tags: ["React", "GSAP", "Tailwind"],
    status: "SECURED",
    link: "#",
    color: "bg-p5-black",
    image: "/src/assets/web.png"
  },
  {
    id: 2,
    title: "Smart HR IPB",
    desc: "Aplikasi absensi karyawan berbasis Flutter dengan Firebase untuk manajemen SDM yang efisien.",
    tags: ["Flutter", "Firebase"],
    status: "SECURED",
    link: "https://drive.google.com/drive/folders/1l1ktvJBxqol55QcWd8KD2P-F7WEAk_ZC",
    color: "bg-p5-black",
    image: "/src/assets/Smart.png"
  },
];

const Projects = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".bg-giant-text", {
      yPercent: 30,
      skewY: 5,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.fromTo(".project-title",
      { opacity: 0, scale: 2, rotation: 10, y: -100 },
      {
        opacity: 1, scale: 1, rotation: -2, y: 0,
        duration: 0.8, ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".project-title",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".project-card-wrapper",
      {
        opacity: 0,
        scale: 1.5,
        rotation: (i) => (i % 2 === 0 ? 15 : -15),
        y: 150
      },
      {
        opacity: 1,
        scale: 1,
        rotation: (i) => (i % 2 === 0 ? -3 : 4),
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
        }
      }
    );

  }, { scope: container });

  return (
    <section
      id="projects"
      ref={container}
      className="min-h-screen py-24 px-4 bg-p5-white relative overflow-hidden z-10"
    >
      <div className="bg-giant-text absolute top-0 -left-10 text-[15rem] md:text-[20rem] font-p5 text-p5-black opacity-5 leading-none whitespace-nowrap pointer-events-none -z-20 transform -rotate-12 select-none">
        MISSION LOG TARGETS
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="project-title mb-24 md:mb-28 relative inline-block mx-4 md:mx-0">
          {/* Efek coretan di belakang - dikurangi offset-nya di mobile */}
          <div className="absolute -inset-4 md:-inset-6 bg-p5-black clip-jagged -z-10 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 opacity-10"></div>

          <h2 className="text-5xl md:text-7xl font-p5 text-p5-black uppercase tracking-tighter">
            {/* Shadow dan padding disesuaikan untuk mobile */}
            <span className="inline-block bg-p5-red text-p5-white px-4 md:px-6 py-2 clip-jagged shadow-[5px_5px_0px_#000] md:shadow-[8px_8px_0px_#000] border-2 md:border-4 border-p5-black rotate-2">
              TARGETS
            </span>
          </h2>

          {/* Posisi badge "Infiltrated Palaces" digeser agar tidak keluar layar di mobile */}
          <span className="absolute -bottom-8 right-0 md:-bottom-5 md:-right-8 bg-p5-black text-p5-white text-sm sm:text-base md:text-xl font-punk px-3 md:px-4 py-1 -rotate-3 shadow-[3px_3px_0px_#e00000] md:shadow-[4px_4px_0px_#e00000] whitespace-nowrap">
            Infiltrated Palaces
          </span>
        </div>

        {/* DOSSIER GRID - Jarak (gap) diperkecil */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card-wrapper relative ${i % 2 !== 0 ? 'md:mt-12' : ''}`}
            >
              {/* Fake Tape - Dibuat sedikit lebih kecil */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#e0e0e0] opacity-80 rotate-3 z-30 shadow-sm" style={{ mixBlendMode: 'multiply' }}></div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#d0d0d0] -rotate-2 z-30 shadow-sm mix-blend-multiply"></div>

              {/* Main Card - Border diperkecil sedikit */}
              <div className="group relative bg-p5-white border-[4px] border-p5-black h-full flex flex-col cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:rotate-0 z-20">

                <div className="absolute inset-0 bg-p5-black translate-x-2 translate-y-2 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300 ease-out" />
                <div className={`absolute inset-0 ${project.color} translate-x-1 translate-y-1 -z-20 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-300 opacity-50`} />

                {/* Card Content - Padding diperkecil (p-4 md:p-5) */}
                <div className="p-4 md:p-5 flex flex-col h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px]">

                  {/* Top Bar - Margin dan Padding diperkecil */}
                  <div className="flex justify-between items-start mb-4 border-b-4 border-p5-black pb-2">
                    <span className="text-p5-red font-punk text-lg font-bold tracking-widest bg-p5-black text-p5-white px-2 py-0.5 -rotate-2">
                      P_{project.id.toString().padStart(2, '0')}
                    </span>
                    <a
                      href={project.link}
                      className="text-2xl text-p5-black group-hover:text-p5-red group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                    >
                      ↗
                    </a>
                  </div>

                  {/* GAMBAR - Margin bawah diperkecil */}
                  <div className="relative w-full aspect-video border-[3px] border-p5-black mb-4 bg-p5-black overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x338?text=Image+Not+Found";
                      }}
                    />
                  </div>

                  {/* Title - Ukuran font diperkecil */}
                  <h3 className="text-2xl md:text-3xl font-p5 text-p5-white mb-2 uppercase leading-none group-hover:skew-x-[-5deg] transition-transform">
                    {project.title}
                  </h3>

                  {/* Description - Ukuran font dan margin diperkecil */}
                  <p className="font-punk text-p5-white text-sm font-bold mb-6 grow leading-tight">
                    {project.desc}
                  </p>

                  {/* Tags - Ukuran dan gap diperkecil */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs font-punk font-bold bg-p5-white border-2 border-p5-black shadow-[2px_2px_0px_#000] rotate-[-1deg] group-hover:rotate-[2deg] transition-transform">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status Stamp - Ukuran font dan posisi disesuaikan */}
                  <div className="absolute bottom-4 right-3 rotate-[-15deg] group-hover:rotate-[-25deg] group-hover:scale-110 transition-transform duration-300">
                    <span className={`inline-block px-3 py-1 text-lg md:text-xl font-p5 border-[3px] shadow-[3px_3px_0px_rgba(0,0,0,0.2)] mix-blend-hard-light ${project.status === 'SECURED'
                        ? 'border-p5-red text-p5-red'
                        : project.status === 'IN PROGRESS'
                          ? 'border-p5-black text-p5-black'
                          : 'border-p5-gray text-p5-gray'
                      }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;