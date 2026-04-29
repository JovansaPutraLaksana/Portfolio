import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook untuk scroll-triggered animations
 * @param {Object} config - Konfigurasi animasi
 * @returns {void}
 */
export const useScrollAnimation = (config = {}) => {
  const {
    trigger,
    animations = [],
    startTrigger = "top 80%",
    once = true,
  } = config;

  useGSAP(() => {
    animations.forEach(({ target, animation }) => {
      animation({
        scrollTrigger: {
          trigger: trigger?.current || trigger,
          start: startTrigger,
          once: once,
        },
      });
    });
  });
};

/**
 * Hook untuk hover animations
 * @param {Object} elementRef - Ref ke element yang akan di-animate
 * @param {Object} config - Konfigurasi animasi
 */
export const useHoverAnimation = (elementRef, config = {}) => {
  const {
    enterAnimation = {},
    exitAnimation = {},
  } = config;

  const handleMouseEnter = () => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        ...enterAnimation,
      });
    }
  };

  const handleMouseLeave = () => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        ...exitAnimation,
      });
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};

/**
 * Hook untuk infinite loop animations
 * @param {Object} elementRef - Ref ke element yang akan di-animate
 * @param {Object} config - Konfigurasi animasi
 */
export const useInfiniteAnimation = (elementRef, config = {}) => {
  const {
    y = -10,
    duration = 2,
    ease = "sine.inOut",
    ...otherConfig
  } = config;

  useGSAP(() => {
    if (elementRef?.current) {
      gsap.to(elementRef.current, {
        y: y,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: ease,
        ...otherConfig,
      });
    }
  }, { scope: elementRef });
};
