/**
 * accessibility.js - Keyboard & Screen Reader Helpers
 * Ensures accessible browsing and ARIA live announcements
 */

let liveAnnouncer = null;

/**
 * Initializes or retrieves a visually hidden ARIA live region.
 * @returns {HTMLElement}
 */
function getLiveAnnouncer() {
  if (!liveAnnouncer) {
    liveAnnouncer = document.getElementById('aria-live-announcer');
    if (!liveAnnouncer) {
      liveAnnouncer = document.createElement('div');
      liveAnnouncer.id = 'aria-live-announcer';
      liveAnnouncer.setAttribute('aria-live', 'polite');
      liveAnnouncer.setAttribute('aria-atomic', 'true');
      liveAnnouncer.className = 'sr-only';
      // Inline styles ensuring visual invisibility without hiding from screen readers
      Object.assign(liveAnnouncer.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: '0',
        whiteSpace: 'nowrap'
      });
      document.body.appendChild(liveAnnouncer);
    }
  }
  return liveAnnouncer;
}

/**
 * Announces a message to screen readers.
 * @param {string} message
 */
function announce(message) {
  const announcer = getLiveAnnouncer();
  if (announcer) {
    announcer.textContent = '';
    // Small timeout ensures screen readers catch subsequent identical announcements
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
}

/**
 * Sets up global keyboard navigation for the storytelling experience.
 * @param {Object} options
 * @param {Function} options.onNext - Handler for forward progress
 * @param {Function} options.onPrev - Handler for backward progress
 */
function setupKeyboardNavigation({ onNext, onPrev }) {
  window.addEventListener('keydown', (event) => {
    // Avoid intercepting keystrokes if the user is typing in a form input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'PageDown':
        if (typeof onNext === 'function') {
          event.preventDefault();
          onNext();
        }
        break;
      case 'ArrowLeft':
      case 'PageUp':
        if (typeof onPrev === 'function') {
          event.preventDefault();
          onPrev();
        }
        break;
      default:
        break;
    }
  });
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  Object.assign(window.MoonSunApp, {
    getLiveAnnouncer,
    announce,
    setupKeyboardNavigation
  });
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getLiveAnnouncer,
    announce,
    setupKeyboardNavigation
  };
}

