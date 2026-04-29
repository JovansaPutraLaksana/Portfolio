import { useState, useRef, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Education from './sections/Education';
import Certificates from './sections/Certificates';

function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const audioRef = useRef(null);

  // Play music when splash screen is complete
  useEffect(() => {
    if (splashComplete && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(err => console.log("Audio play blocked", err));
    }
  }, [splashComplete]);

  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  return (
    <>
      {!splashComplete ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          {/* Audio Element - Background music for landing page */}
          <audio ref={audioRef} src="/Last-Surprise.mp3" loop />
          
          <Navbar />
          <main className="pt-16">
            <Hero />
            <About />
            <Education />
            <Certificates />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

export default App;