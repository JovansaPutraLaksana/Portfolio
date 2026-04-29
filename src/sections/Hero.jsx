import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const container = useRef();
    const bgTextRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        // Background Text Parallax/Marquee
        gsap.to(bgTextRef.current, {
            xPercent: -20,
            repeat: -1,
            duration: 20,
            ease: "none",
            yoyo: true
        });

        // Intro Smash Effect untuk background slashes
        tl.from(".hero-red-slash-left", {
            x: "-100vw",
            skewX: 45,
            duration: 0.6,
            ease: "power4.out"
        }, 0)
        .from(".hero-red-slash-right", {
            x: "100vw",
            skewX: -45,
            duration: 0.6,
            ease: "power4.out"
        }, 0.1);

        // Grid dan Noise overlay muncul perlahan
        tl.from(".hero-grid-overlay", {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut"
        }, 0.3);

        // Ransom letter jatuh dengan efek membanting (Stomp)
        tl.from(".ransom-letter", {
            opacity: 80,
            scale: 2,
            y: -100,
            rotation: () => gsap.utils.random(-45, 45),
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(3)", // Pantulan lebih agresif
        }, 0.4);

        // Subtitle di-slash masuk
        tl.from(".hero-subtitle-box", {
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            x: -50,
            duration: 0.7,
            ease: "power3.inOut"
        }, "-=0.2");

        // Tagline pop-up
        tl.from(".hero-tagline", {
            opacity: 0,
            scale: 0,
            rotation: -10,
            duration: 0.5,
            ease: "back.out(2)"
        }, 0.8);

        // Dekorasi bertebaran
        tl.from(".hero-deco", {
            opacity: 0,
            scale: 0,
            rotation: () => gsap.utils.random(-90, 90),
            stagger: 0.1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)"
        }, 0.6);

        // Scroll indicator bounce
        tl.from(".scroll-indicator", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out"
        }, 1.5);

        // --- CONTINUOUS FLOATING ANIMATIONS ---
        gsap.to(".hero-deco-float-1", { y: -15, rotation: 5, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(".hero-deco-float-2", { x: 15, rotation: -10, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(".hero-deco-float-3", { rotation: 360, duration: 8, repeat: -1, ease: "none" });
        gsap.to(".hero-deco-pulse", { scale: 1.1, opacity: 0.8, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
        
        // Bouncing arrow untuk scroll
        gsap.to(".scroll-arrow", { y: 10, duration: 0.6, yoyo: true, repeat: -1, ease: "power1.inOut" });

    }, { scope: container });

    const name = "JOPUL";

    return (
        <section 
            id="hero"
            ref={container} 
            className="relative pt-16 md:pt-20 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-p5-white"
        >
            {/* Background Marquee Text Raksasa */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] opacity-[0.03] pointer-events-none -rotate-12 z-0">
                <div ref={bgTextRef} className="text-[12rem] md:text-[20rem] font-p5 font-black text-p5-black whitespace-nowrap leading-none">
                    FRONTEND REBELLION • STEAL THE WEB
                </div>
            </div>

            {/* Dynamic Slashes */}
            <div className="hero-red-slash-left absolute top-1/4 -left-10 w-[40vw] h-12 bg-p5-red skew-x-30 border-4 border-p5-black shadow-[8px_8px_0px_black] z-5 mix-blend-multiply" />
            <div className="hero-red-slash-right absolute bottom-1/3 -right-10 w-[50vw] h-8 bg-p5-black skew-x-45deg shadow-[8px_8px_0px_#D80027] z-5" />

            {/* Grid Overlay Textures */}
            <div className="hero-grid-overlay absolute inset-0 opacity-10 pointer-events-none mix-blend-color-burn" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .5) 25%, rgba(0, 0, 0, .5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .5) 75%, rgba(0, 0, 0, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .5) 25%, rgba(0, 0, 0, .5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .5) 75%, rgba(0, 0, 0, .5) 76%, transparent 77%, transparent)',
                backgroundSize: '40px 40px'
            }} />

            {/* Geometric Decorations Khas UI P5 */}
            <div className="hero-deco hero-deco-float-1 absolute top-20 left-10 md:left-20 w-16 h-16 bg-p5-black clip-jagged shadow-[6px_6px_0px_#D80027]" />
            <div className="hero-deco hero-deco-pulse absolute top-32 right-16 md:right-32 text-6xl font-p5 text-p5-red opacity-80 rotate-12">★</div>
            <div className="hero-deco hero-deco-float-2 absolute bottom-40 right-10 md:right-20 w-24 h-6 bg-p5-black border-2 border-p5-white rotate-45" />
            <div className="hero-deco hero-deco-float-3 absolute bottom-32 left-16 md:left-32 w-12 h-12 border-4 border-p5-black border-dashed rounded-full" />
            
            {/* Caution Tape Decoration */}
            <div className="hero-deco absolute top-10 right-0 bg-yellow-400 text-black font-punk text-xs px-20 py-1 rotate-45 translate-x-16 translate-y-10 border-y-2 border-black tracking-widest uppercase">
               • Warning •
            </div>

            <div className="relative z-10 flex flex-col items-center w-full px-4 mt-10">
                
                {/* System Notification Tagline */}
                <div className="hero-tagline mb-6 relative">
                    <div className="absolute -inset-1 bg-p5-black clip-jagged opacity-20 translate-x-2 translate-y-2"></div>
                    <p className="relative font-punk text-p5-white bg-p5-black px-4 py-1 text-xs md:text-sm uppercase tracking-widest border-2 border-p5-red rotate-2 shadow-[4px_4px_0px_#D80027]">
                        <span className="text-p5-red mr-2">▶</span> INCOMING TRANSMISSION
                    </p>
                </div>

                {/* Main Name - Ransom Style Enhanced */}
                <h1 className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 z-20">
                    {name.split("").map((char, i) => (
                        <span key={i} className={`
                            ransom-letter relative inline-block px-3 py-2 md:px-6 md:py-4 text-5xl md:text-8xl lg:text-[9rem]
                            ${i % 2 === 0 
                                ? "bg-p5-black text-p5-white -rotate-3 border-b-8 border-p5-red" 
                                : "bg-p5-white text-p5-black border-4 border-p5-black rotate-3"}
                            shadow-[8px_8px_0px_#D80027] hover:shadow-[12px_12px_0px_#000] 
                            clip-jagged font-p5 font-extrabold uppercase transition-all duration-300
                            hover:-translate-y-4 hover:scale-110 cursor-crosshair
                        `}>
                            {/* Inner grunge effect */}
                            <span className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity mix-blend-overlay"></span>
                            {char}
                        </span>
                    ))}
                </h1>

                {/* Subtitle Box - Aggressive Styling */}
                <div className="hero-subtitle-box relative group cursor-pointer">
                    {/* Shadow Layer */}
                    <div className="absolute inset-0 bg-p5-black translate-x-3 translate-y-3 clip-jagged transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                    
                    {/* Main Label */}
                    <div className="relative bg-p5-red border-4 border-p5-black px-8 md:px-12 py-3 md:py-5 clip-jagged flex items-center gap-4">
                        <span className="text-p5-white text-3xl md:text-5xl font-p5 drop-shadow-[2px_2px_0px_#000] rotate-12">★</span>
                        <p className="text-xl md:text-4xl font-punk text-p5-white font-bold uppercase tracking-widest drop-shadow-[2px_2px_0px_#000]">
                            Junior Developer
                        </p>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-8 md:bottom-12 flex flex-col items-center z-20">
                <span className="font-punk text-p5-white bg-p5-black border-2 border-p5-red px-3 py-1 text-xs md:text-sm tracking-widest rotate-2 shadow-[3px_3px_0px_#D80027] mb-2">
                    SCROLL DOWN
                </span>
                <div className="scroll-arrow text-p5-red text-3xl md:text-4xl drop-shadow-[2px_2px_0px_#000]">
                    ▼
                </div>
            </div>

            {/* Vignette/Shadow pinggiran layar */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none z-30" />
        </section>
    );
};

export default Hero;