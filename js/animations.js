/**
 * animations.js - Scene & Scroll Animation Orchestration
 * Uses IntersectionObserver and respects prefers-reduced-motion
 */

/**
 * Checks whether the user has requested reduced motion.
 * @returns {boolean}
 */
function isReducedMotion() {
  return Boolean(
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Transitions element animation class smoothly.
 * @param {HTMLElement} element - Target DOM element
 * @param {string} animationClass - CSS class name
 * @returns {Promise<void>}
 */
function playAnimation(element, animationClass = 'animate-fade-in') {
  return new Promise((resolve) => {
    if (!element || isReducedMotion()) {
      resolve();
      return;
    }

    const handleAnimationEnd = () => {
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };

    element.addEventListener('animationend', handleAnimationEnd, { once: true });
    element.classList.add(animationClass);
  });
}

/**
 * Smoothly scrolls to a target DOM element and reveals its children.
 * @param {HTMLElement} element
 */
function smoothScrollToElement(element) {
  if (!element) return;
  const revealItems = element.querySelectorAll('.reveal-on-scroll, .narrative-paragraph, .chapter-scene-stage');
  revealItems.forEach((el) => el.classList.add('is-visible'));

  const behavior = isReducedMotion() ? 'auto' : 'smooth';
  if (typeof window !== 'undefined' && typeof element.getBoundingClientRect === 'function') {
    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight : 56;
    const rect = element.getBoundingClientRect();
    const targetTop = Math.max(0, Math.round(rect.top + (window.scrollY || window.pageYOffset || 0) - headerOffset));
    window.scrollTo({ top: targetTop, behavior });
  } else {
    element.scrollIntoView({ behavior, block: 'start' });
  }
}

/**
 * Smoothly scrolls the window to top.
 * @param {ScrollToOptions} options
 */
function smoothScrollToTop(options = { top: 0, behavior: 'smooth' }) {
  const behavior = isReducedMotion() ? 'auto' : (options.behavior || 'smooth');
  window.scrollTo({ top: options.top || 0, behavior });
}

/**
 * Sets up IntersectionObserver to reveal chapters, paragraphs, and scene cards as user scrolls.
 * @param {HTMLElement} container
 * @param {Function} onChapter3AutoReveal - Optional callback to trigger Chapter 3 golden reveal
 */
function setupScrollRevealObserver(container = document, onChapter3AutoReveal = null) {
  const revealTargets = container.querySelectorAll('.reveal-on-scroll, .narrative-paragraph, .chapter-scene-stage');

  if (isReducedMotion() || typeof IntersectionObserver === 'undefined') {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Automatically trigger the dramatic sunrise-in-night reveal when Chapter 3 scene enters view
          if (
            entry.target.classList.contains('chapter-scene-stage') &&
            entry.target.dataset.chapterId === '3' &&
            typeof onChapter3AutoReveal === 'function'
          ) {
            onChapter3AutoReveal();
          }
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

/**
 * Sets up lightweight, passive celestial parallax on background star layers.
 */
function setupParallaxBackground() {
  if (isReducedMotion()) return;

  const starLayerDeep = document.querySelector('.ambient-stars--deep');
  const starLayerMid = document.querySelector('.ambient-stars--mid');
  if (!starLayerDeep && !starLayerMid) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          if (starLayerDeep) {
            starLayerDeep.style.transform = `translate3d(0, ${-(scrollY * 0.04).toFixed(1)}px, 0)`;
          }
          if (starLayerMid) {
            starLayerMid.style.transform = `translate3d(0, ${-(scrollY * 0.08).toFixed(1)}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  Object.assign(window.MoonSunApp, {
    isReducedMotion,
    playAnimation,
    smoothScrollToElement,
    smoothScrollToTop,
    setupScrollRevealObserver,
    setupParallaxBackground
  });
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isReducedMotion,
    playAnimation,
    smoothScrollToElement,
    smoothScrollToTop,
    setupScrollRevealObserver,
    setupParallaxBackground
  };
}
