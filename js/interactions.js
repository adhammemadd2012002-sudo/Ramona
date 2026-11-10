/**
 * interactions.js - Interactive Story Elements & Gesture Handlers
 * Powers the Opening Storybook, all 13 Chapter interactive moments, and touch swipes
 */

(function () {
const { renderMoonFace, getChapterInteractionMeta } = (typeof window !== 'undefined' && window.MoonSunApp) ? window.MoonSunApp : require('./scenes.js');
const { isReducedMotion } = (typeof window !== 'undefined' && window.MoonSunApp) ? window.MoonSunApp : require('./animations.js');

/**
 * Binds the Opening Scene book interaction ("Open the Story").
 * @param {Object} options
 * @param {HTMLElement} options.heroSection
 * @param {HTMLElement} options.openButton
 * @param {HTMLElement} options.bookStage
 * @param {Function} options.onStoryOpened
 */
function bindOpeningBookInteraction({ heroSection, openButton, bookStage, onStoryOpened }) {
  if (!heroSection) return;

  let isOpening = false;

  const triggerOpen = () => {
    if (isOpening) {
      if (typeof onStoryOpened === 'function') onStoryOpened();
      return;
    }
    isOpening = true;

    heroSection.classList.add('is-book-opening');
    if (openButton) {
      openButton.setAttribute('aria-expanded', 'true');
    }

    const delay = isReducedMotion() ? 40 : 280;
    setTimeout(() => {
      heroSection.classList.add('is-book-opened');
      if (typeof onStoryOpened === 'function') {
        onStoryOpened();
      }
    }, delay);
  };

  if (openButton) {
    openButton.addEventListener('click', triggerOpen);
  }

  if (bookStage) {
    bookStage.addEventListener('click', triggerOpen);
    bookStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOpen();
      }
    });
  }
}

/**
 * Updates the Moon character's facial expression inside a specific SVG element.
 * @param {HTMLElement} chapterSection
 * @param {string} newExpression
 */
function updateMoonExpression(chapterSection, newExpression) {
  if (!chapterSection) return;
  const moonChar = chapterSection.querySelector('.character-moon');
  if (!moonChar) return;

  const faceSlot = moonChar.querySelector('.moon-face-slot');
  if (faceSlot) {
    faceSlot.innerHTML = renderMoonFace(newExpression);
    moonChar.setAttribute('data-expression', newExpression);
  }
}

/**
 * Activates a specific chapter's interactive scene state.
 * @param {HTMLElement} chapterSection
 * @param {number} chapterId
 * @param {Function} announceCallback
 */
function activateChapterScene(chapterSection, chapterId, announceCallback) {
  if (!chapterSection) return;

  const meta = getChapterInteractionMeta(chapterId);
  const isAlreadyActive = chapterSection.classList.contains('is-scene-activated');

  // Toggle or activate scene state
  chapterSection.classList.add('is-scene-activated');

  // Special character expression transformations per chapter
  if (chapterId === 3) {
    updateMoonExpression(chapterSection, 'wonder');
  } else if (chapterId === 6) {
    // Transition Moon from nervous hesitation to hopeful joy as the Sun's light responds
    const delay = isReducedMotion() ? 10 : 500;
    setTimeout(() => {
      updateMoonExpression(chapterSection, 'hopeful');
    }, delay);
  }

  // Update interactive button state & status text
  const actionBtn = chapterSection.querySelector('.scene-action-btn');
  const statusEl = chapterSection.querySelector('.scene-interaction-status');

  if (actionBtn) {
    actionBtn.classList.add('is-active');
    actionBtn.setAttribute('aria-pressed', 'true');
  }

  if (statusEl && meta && meta.activeLabelAr) {
    statusEl.textContent = meta.activeLabelAr;
    statusEl.classList.add('is-visible');
  }

  if (!isAlreadyActive && typeof announceCallback === 'function' && meta && meta.activeLabelAr) {
    announceCallback(meta.activeLabelAr);
  }
}

/**
 * Binds interactive story moments across all 13 chapter sections.
 * @param {HTMLElement} container
 * @param {Function} announceCallback
 */
function bindChapterSceneInteractions(container, announceCallback) {
  if (!container) return;

  const chapterSections = container.querySelectorAll('.chapter-section');

  chapterSections.forEach((section) => {
    const chapterId = parseInt(section.dataset.chapterId, 10);
    if (!chapterId) return;

    // 1. Standard Scene Action Button (Chapters 1-3, 5-13)
    const actionBtn = section.querySelector('.scene-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        const isActive = section.classList.contains('is-scene-activated');
        if (isActive && (chapterId === 3 || chapterId === 6)) {
          // Allow replaying the transformation animation
          section.classList.remove('is-scene-activated');
          if (chapterId === 3) updateMoonExpression(section, 'surprise');
          if (chapterId === 6) updateMoonExpression(section, 'nervous');
          void section.offsetWidth; // Reflow to restart CSS transitions
        }
        activateChapterScene(section, chapterId, announceCallback);
      });
    }

    // 2. Clickable SVG Canvas Elements (Stars, Book, Bridge, Clouds)
    const svgCanvas = section.querySelector('.chapter-scene-svg');
    if (svgCanvas && chapterId !== 4) {
      svgCanvas.addEventListener('click', () => {
        activateChapterScene(section, chapterId, announceCallback);
      });
    }

    // 3. Chapter 4 Special Interactive Diorama: 3 Pillars (Kindness, Tenderness, Dreams)
    if (chapterId === 4) {
      const pillarButtons = section.querySelectorAll('.pillar-select-btn');
      const svgPillars = section.querySelectorAll('.ch4-pillar');

      const selectPillar = (pillarId) => {
        section.setAttribute('data-active-pillar', pillarId);
        section.classList.add('is-scene-activated');

        pillarButtons.forEach((btn) => {
          const isMatch = btn.dataset.pillar === pillarId;
          btn.classList.toggle('is-active', isMatch);
          btn.setAttribute('aria-pressed', String(isMatch));
        });

        svgPillars.forEach((pillarGroup) => {
          const isMatch = pillarGroup.dataset.pillar === pillarId;
          pillarGroup.classList.toggle('is-highlighted', isMatch);
        });

        const meta = getChapterInteractionMeta(4);
        const found = meta.pillars.find((p) => p.id === pillarId);
        const statusEl = section.querySelector('.scene-interaction-status');
        if (found && statusEl) {
          statusEl.textContent = found.labelAr;
          statusEl.classList.add('is-visible');
          if (typeof announceCallback === 'function') {
            announceCallback(found.labelAr);
          }
        }
      };

      pillarButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectPillar(btn.dataset.pillar);
        });
      });

      svgPillars.forEach((pillarGroup) => {
        pillarGroup.addEventListener('click', (e) => {
          e.stopPropagation();
          selectPillar(pillarGroup.dataset.pillar);
        });
        pillarGroup.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectPillar(pillarGroup.dataset.pillar);
          }
        });
      });
    }
  });
}

/**
 * Attaches swipe listeners to a container for mobile navigation.
 * @param {HTMLElement} element - Target element or container
 * @param {Object} handlers - Callbacks for gestures
 * @param {Function} handlers.onSwipeLeft
 * @param {Function} handlers.onSwipeRight
 * @param {number} threshold - Minimum swipe distance in px (default: 60)
 */
function setupSwipeGestures(element, { onSwipeLeft, onSwipeRight }, threshold = 60) {
  if (!element) return;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  element.addEventListener(
    'touchstart',
    (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }
    },
    { passive: true }
  );

  element.addEventListener(
    'touchend',
    (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      }
    },
    { passive: true }
  );

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) >= threshold) {
      if (diffX < 0 && typeof onSwipeLeft === 'function') {
        onSwipeLeft();
      } else if (diffX > 0 && typeof onSwipeRight === 'function') {
        onSwipeRight();
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  Object.assign(window.MoonSunApp, {
    bindOpeningBookInteraction,
    updateMoonExpression,
    activateChapterScene,
    bindChapterSceneInteractions,
    setupSwipeGestures
  });
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    bindOpeningBookInteraction,
    updateMoonExpression,
    activateChapterScene,
    bindChapterSceneInteractions,
    setupSwipeGestures
  };
}
})();
