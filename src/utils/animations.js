import gsap from 'gsap';

// Fade In From Left
export const fadeInFromLeft = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    x: -100,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Fade In From Right
export const fadeInFromRight = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    x: 100,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Fade In From Top
export const fadeInFromTop = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    y: -50,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Fade In From Bottom
export const fadeInFromBottom = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
    ...options,
  });
};

// Scale In
export const scaleIn = (target, options = {}) => {
  return gsap.from(target, {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    ease: "back.out(1.5)",
    ...options,
  });
};

// Stagger Animation
export const staggerAnimation = (targets, options = {}) => {
  return gsap.from(targets, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: "power3.out",
    ...options,
  });
};

// Floating Animation (Continuous)
export const floatingAnimation = (target, options = {}) => {
  return gsap.to(target, {
    y: options.distance || -10,
    duration: options.duration || 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    ...options,
  });
};

// Pulse Animation
export const pulseAnimation = (target, options = {}) => {
  return gsap.to(target, {
    scale: options.scale || 1.1,
    duration: options.duration || 0.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    ...options,
  });
};

// Glitch Animation (Persona 5 Style)
export const glitchAnimation = (target, options = {}) => {
  const tl = gsap.timeline({ repeat: -1 });
  
  tl.to(target, {
    x: -5,
    y: -2,
    duration: 0.1,
  })
  .to(target, {
    x: 5,
    y: 2,
    duration: 0.1,
  }, 0.1)
  .to(target, {
    x: -2,
    y: 5,
    duration: 0.1,
  }, 0.2)
  .to(target, {
    x: 0,
    y: 0,
    duration: 0.1,
  }, 0.3);

  return tl;
};

// Red Slash Animation (Persona 5 Splash)
export const redSlashAnimation = (target, options = {}) => {
  return gsap.to(target, {
    xPercent: 100,
    skewX: -10,
    skewY: 10,
    scaleY: 2.5,
    duration: 0.8,
    ease: "expo.inOut",
    ...options,
  });
};

// Page Transition Out
export const pageTransitionOut = (options = {}) => {
  return gsap.to(".main-content", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    ...options,
  });
};

// Page Transition In
export const pageTransitionIn = (options = {}) => {
  return gsap.from(".main-content", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    ...options,
  });
};
