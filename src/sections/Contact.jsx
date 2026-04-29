import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useGSAP(() => {
    // 1. Ticker Background Animation
    gsap.to(".bg-ticker", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse" // Reset animasi saat scroll up
      }
    });

    // 2. Title Slam
    tl.fromTo(".contact-title",
      { opacity: 0, scale: 1.5, rotation: 5, y: -50 },
      { opacity: 1, scale: 1, rotation: -2, y: 0, duration: 0.6, ease: "back.out(2)" }
    )
      // 3. Info Cards (Dilempar ke meja)
      .fromTo(".contact-item",
        { opacity: 0, x: -100, rotation: () => gsap.utils.random(-20, 20) },
        { opacity: 1, x: 0, rotation: (i) => [-4, 2, -1][i], stagger: 0.15, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.3"
      )
      // 4. Form Entrance (Muncul dari bawah dengan skew)
      .fromTo(".contact-form",
        { opacity: 0, y: 100, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: "power4.out" },
        "-=0.4"
      )
      // 5. Social Links Pop
      .fromTo(".social-link",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: "back.out(2)" },
        "-=0.2"
      );
  }, { scope: sectionRef });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Efek guncangan saat tombol submit ditekan
    gsap.fromTo(".submit-btn",
      { x: -5, rotation: -2 },
      { x: 5, rotation: 2, yoyo: true, repeat: 5, duration: 0.05, onComplete: () => gsap.set(".submit-btn", { x: 0, rotation: 0 }) }
    );

    console.log('Calling Card prepared:', formData);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      alert("CALLING CARD SENT!"); // Ganti dengan custom toast P5-style nanti
    }, 500);
  };

  const contactInfo = [
    { label: 'CODENAME', value: 'JOPUL', icon: '🃏' },
    { label: 'HIDEOUT', value: 'Palembang, Indonesia', icon: '📍' },
    { label: 'NETWORK', value: 'jovansaputralaksana.my.id', icon: '🌐' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-24 px-4 bg-p5-black relative overflow-hidden z-10"
    >
      {/* --- BACKGROUND DECORATIONS --- */}
      {/* Halftone Merah */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-20" style={{
        backgroundImage: 'radial-gradient(circle, #D80027 2px, transparent 2.5px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Ticker Tape Bergerak */}
      <div className="absolute top-1/4 -left-10 w-[200%] h-16 bg-p5-red -rotate-3 -z-10 flex items-center overflow-hidden border-y-4 border-p5-white">
        <div className="bg-ticker flex whitespace-nowrap text-p5-white font-punk text-2xl font-bold tracking-widest">
          {Array(10).fill(" SEND YOUR CALLING CARD • TAKE YOUR HEART • ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* --- LEFT COLUMN: INFO & SOCIALS --- */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Title */}
            <h2 className="contact-title text-6xl md:text-8xl font-p5 text-p5-white uppercase leading-none">
              <span className="block mb-2">Ready to</span>
              <span className="inline-block bg-p5-white text-p5-red px-6 py-2 clip-jagged shadow-[8px_8px_0px_#D80027] border-4 border-p5-red rotate-2">
                STEAL
              </span>
              <span className="block mt-2 text-p5-white">Hearts?</span>
            </h2>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4 relative">
              <div className="absolute -left-6 top-10 w-2 h-full bg-p5-red -z-10"></div>
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="contact-item group relative bg-p5-white p-4 pl-6 border-4 border-p5-black clip-jagged shadow-[6px_6px_0px_#D80027] hover:translate-x-4 transition-transform duration-300 w-4/5 md:w-3/4"
                >
                  {/* Pin Lakban */}
                  <div className="absolute -top-3 left-4 w-12 h-6 bg-[#d0d0d0] -rotate-6 shadow-sm mix-blend-multiply z-20"></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{info.icon}</span>
                    <div>
                      <p className="font-punk text-p5-red font-bold text-xs tracking-widest">{info.label}</p>
                      <p className="font-p5 text-p5-black text-sm uppercase mt-1">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Section */}
            <div className="mt-8">
              <p className="font-punk text-p5-white bg-p5-black inline-block px-2 text-sm mb-4 uppercase border-b-2 border-p5-red">
                Phantom Network
              </p>
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

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:col-span-7 relative">
            {/* Background Kotak Abstrak untuk Form */}
            <div className="absolute inset-0 bg-p5-white translate-x-4 translate-y-4 clip-jagged-alt -z-10 border-4 border-p5-black"></div>

            <form onSubmit={handleSubmit} className="contact-form bg-p5-red p-8 md:p-12 clip-jagged shadow-[12px_12px_0px_#000] border-4 border-p5-black">
              <div className="space-y-8 relative z-10">

                {/* Name Field */}
                <div className="relative group">
                  <label className="font-punk font-bold text-p5-black text-lg block mb-2 uppercase flex items-center gap-2">
                    <span className="w-3 h-3 bg-p5-black inline-block"></span> Codename
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-p5-white text-p5-black font-bold font-punk text-xl border-[5px] border-p5-black clip-jagged focus:outline-none focus:translate-x-2 focus:-translate-y-2 focus:shadow-[8px_8px_0px_#000] transition-all duration-200 placeholder:text-p5-gray placeholder:font-normal"
                    placeholder="e.g. Skull, Panther, Fox..."
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className="font-punk font-bold text-p5-black text-lg block mb-2 uppercase flex items-center gap-2">
                    <span className="w-3 h-3 bg-p5-black inline-block"></span> Target Signal (Email)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-p5-white text-p5-black font-bold font-punk text-xl border-[5px] border-p5-black clip-jagged focus:outline-none focus:-translate-x-2 focus:-translate-y-2 focus:shadow-[-8px_8px_0px_#000] transition-all duration-200 placeholder:text-p5-gray placeholder:font-normal"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label className="font-punk font-bold text-p5-black text-lg block mb-2 uppercase flex items-center gap-2">
                    <span className="w-3 h-3 bg-p5-black inline-block"></span> The Threat (Message)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-4 bg-p5-white text-p5-black font-bold font-punk text-xl border-[5px] border-p5-black clip-jagged focus:outline-none focus:translate-x-2 focus:-translate-y-2 focus:shadow-[8px_8px_0px_#000] transition-all duration-200 resize-none placeholder:text-p5-gray placeholder:font-normal"
                    placeholder="We will take your distorted desires..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="submit-btn w-full mt-4 px-8 py-5 bg-p5-black text-p5-white font-p5 font-extrabold text-3xl uppercase clip-jagged hover:bg-p5-white hover:text-p5-red hover:border-4 hover:border-p5-black hover:scale-[1.02] active:scale-95 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.5)] flex justify-between items-center group"
                >
                  <span>Post the Card</span>
                  <span className="text-4xl group-hover:translate-x-4 transition-transform">✉</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;