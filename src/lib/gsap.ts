/**
 * Central GSAP setup. Import `gsap` and `ScrollTrigger` from here so the plugin
 * is registered exactly once and every module shares the same instance.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
