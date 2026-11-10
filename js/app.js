/**
 * app.js - Main Application Orchestrator
 * Renders the Opening Storybook, all 13 illustrated Chapter scenes,
 * verbatim Arabic narrative, interactive moments, and constellation navigation.
 */

(function () {
const {
  story,
  renderOpeningBookSvg,
  renderChapterSceneSvg,
  getChapterInteractionMeta,
  renderButterfly,
  ChapterNavigation,
  setupScrollRevealObserver,
  setupParallaxBackground,
  smoothScrollToElement,
  smoothScrollToTop,
  setupKeyboardNavigation,
  announce,
  bindOpeningBookInteraction,
  bindChapterSceneInteractions,
  activateChapterScene,
  setupSwipeGestures
} = window.MoonSunApp;

class StoryApplication {
  constructor() {
    this.heroSection = document.getElementById('opening-hero');
    this.openStoryBtn = document.getElementById('open-story-btn');
    this.bookStage = document.getElementById('opening-book-stage');
    this.mountPoint = document.getElementById('chapter-mount');
    this.constellationDots = document.getElementById('constellation-dots');
    this.prevBtn = document.getElementById('prev-chapter-btn');
    this.nextBtn = document.getElementById('next-chapter-btn');
    this.indicator = document.getElementById('chapter-indicator');
    this.progressBar = document.getElementById('chapter-progress-bar');
    this.progressTrack = document.getElementById('chapter-progress-bar-track');

    this.navigation = null;
  }

  /**
   * Initializes application state, renders all scenes, and attaches listeners.
   */
  init() {
    try {
      if (!Array.isArray(story) || story.length !== 13) {
        throw new Error('Approved 13-chapter story content could not be loaded.');
      }

      // 1. Render Opening Storybook SVG
      this.renderOpeningHero();

      // 2. Render all 13 Chapters into the journey container
      this.renderAllChapters();

      // 3. Render 13 Constellation Navigation Dots
      this.renderConstellationDots();

      // 4. Initialize Navigation & Scroll-Spy State Machine
      this.navigation = new ChapterNavigation(story, {
        onChapterChange: (chapter, index) => this.handleChapterActiveChange(chapter, index)
      });

      // 5. Bind Events & Interactive Story Moments
      this.bindEvents();

      // 6. Initialize Scroll Reveal & Ambient Parallax
      setupScrollRevealObserver(document, () => {
        const ch3Section = document.getElementById('chapter-3');
        if (ch3Section && !ch3Section.classList.contains('is-scene-activated')) {
          activateChapterScene(ch3Section, 3, announce);
        }
      });
      setupParallaxBackground();

      // 7. Set initial state (only scroll if URL explicitly had #chapter-X hash)
      const initialHashIndex = this.navigation.getIndexFromHash();
      if (initialHashIndex !== null) {
        this.navigation.goTo(initialHashIndex, { scroll: true, updateHash: false });
      } else {
        this.handleChapterActiveChange(story[0], 0);
      }

      console.info(`[The Moon Found His Sun] Initialized all ${story.length} chapters.`);
    } catch (error) {
      console.error('[The Moon Found His Sun] Initialization error:', error);
      this.renderError(error);
    }
  }

  /**
   * Injects the floating illustrated storybook SVG into the opening hero section.
   */
  renderOpeningHero() {
    if (this.bookStage) {
      this.bookStage.innerHTML = renderOpeningBookSvg();
    }
  }

  /**
   * Builds the interactive controls markup for a given chapter scene.
   * @param {number} chapterId
   * @returns {string}
   */
  renderSceneControlsMarkup(chapterId) {
    const meta = getChapterInteractionMeta(chapterId);

    // Chapter 4 has 3 distinct interactive exploration areas (Kindness, Tenderness, Dreams)
    if (chapterId === 4 && meta.pillars) {
      const buttonsHtml = meta.pillars
        .map(
          (p, i) => `
          <button
            type="button"
            class="pillar-select-btn ${i === 0 ? 'is-active' : ''}"
            data-pillar="${p.id}"
            aria-pressed="${i === 0 ? 'true' : 'false'}"
          >
            <span class="pillar-select-btn__dot" aria-hidden="true">✦</span>
            <span class="pillar-select-btn__ar" lang="ar" dir="rtl">${this.escapeHtml(p.labelAr)}</span>
          </button>
        `
        )
        .join('');

      return `
        <div class="scene-interaction-bar scene-interaction-bar--pillars" role="group" aria-label="Explore the three details of the Sun's world">
          <div class="pillar-buttons-group">
            ${buttonsHtml}
          </div>
          <p class="scene-interaction-status is-visible" lang="ar" dir="rtl" aria-live="polite">
            ${this.escapeHtml(meta.pillars[0].labelAr)}
          </p>
        </div>
      `;
    }

    return `
      <div class="scene-interaction-bar">
        <button
          type="button"
          class="scene-action-btn"
          data-chapter-action="${chapterId}"
          aria-pressed="false"
        >
          <span class="scene-action-btn__spark" aria-hidden="true">✦</span>
          <span class="scene-action-btn__ar" lang="ar" dir="rtl">${this.escapeHtml(meta.buttonLabelAr)}</span>
        </button>
        <p class="scene-interaction-status" lang="ar" dir="rtl" aria-live="polite">
          ${this.escapeHtml(meta.hintAr || '')}
        </p>
      </div>
    `;
  }

  /**
   * Renders all 13 chapters into the DOM so the user can experience natural cinematic scrolling
   * as well as step-by-step chapter navigation.
   * Preserves every word of approved narrative text verbatim.
   */
  renderAllChapters() {
    if (!this.mountPoint) return;

    const chaptersMarkup = story
      .map((chapter, idx) => {
        const isClimax = chapter.id === 13;
        const formattedNum = String(chapter.chapterNumber || chapter.id).padStart(2, '0');
        const nextChapter = story[idx + 1] || null;

        // Build verbatim Arabic paragraphs
        const paragraphsHtml = chapter.paragraphs
          .map(
            (text, pIdx) =>
              `<p class="narrative-paragraph reveal-on-scroll" style="transition-delay: ${Math.min(pIdx * 55, 350)}ms">${this.escapeHtml(text)}</p>`
          )
          .join('\n');

        // Chapter 13 Personal Letter Salutation ("To My Sun, Reman ❤️")
        const salutationHtml = chapter.subtitle
          ? `<h3 class="letter-salutation">${this.escapeHtml(chapter.subtitle)}</h3>`
          : '';

        // Next chapter scroll cue or Final Closing Sanctuary for Chapter 13
        const footerCueHtml = nextChapter
          ? `
            <div class="chapter-transition-cue">
              <button type="button" class="chapter-next-cue-btn" data-goto-index="${idx + 1}" aria-label="Continue to Chapter ${idx + 2}: ${this.escapeHtml(nextChapter.title)}">
                <span class="chapter-next-cue-btn__label">${this.escapeHtml(nextChapter.title)}</span>
                <span class="chapter-next-cue-btn__arrow" aria-hidden="true">↓</span>
              </button>
            </div>
          `
          : `
            <div class="final-closing-moment reveal-on-scroll">
              <div class="final-closing-moment__emblem" aria-hidden="true">
                <svg viewBox="0 0 180 65" width="160" height="58">
                  ${renderButterfly({ x: 90, y: 32, scale: 1.15, rotation: 0, prefix: 'ch13' })}
                </svg>
              </div>
              <button type="button" id="return-to-top-btn" class="return-top-btn">
                <span aria-hidden="true">↑</span>
                <span>Return to the Beginning</span>
              </button>
            </div>
          `;

        return `
          <section
            id="chapter-${chapter.id}"
            class="chapter-section chapter-section--${chapter.id} ${isClimax ? 'chapter-section--climax' : ''}"
            data-chapter-id="${chapter.id}"
            data-chapter-index="${idx}"
            aria-labelledby="chapter-title-${chapter.id}"
          >
            <div class="chapter-section__inner">
              <!-- Bespoke Illustrated Celestial Scene Stage -->
              <div class="chapter-scene-stage reveal-on-scroll" data-chapter-id="${chapter.id}">
                <div class="chapter-scene-canvas" data-scene-id="${chapter.id}">
                  ${renderChapterSceneSvg(chapter.id)}
                </div>
                ${this.renderSceneControlsMarkup(chapter.id)}
              </div>

              <!-- Editorial Narrative Card / Heirloom Letter -->
              <article class="chapter-narrative-card ${isClimax ? 'chapter-narrative-card--letter' : ''} reveal-on-scroll">
                <header class="chapter-header">
                  <span class="chapter-header__number">Chapter ${formattedNum}</span>
                  <h2 id="chapter-title-${chapter.id}" class="chapter-header__title">${this.escapeHtml(chapter.title)}</h2>
                  ${salutationHtml}
                </header>

                <div class="chapter-body story-text" lang="ar" dir="rtl">
                  ${paragraphsHtml}
                </div>
              </article>

              ${footerCueHtml}
            </div>
          </section>
        `;
      })
      .join('\n');

    this.mountPoint.innerHTML = chaptersMarkup;
  }

  /**
   * Renders the 13 interactive star dots in the bottom navigation bar.
   */
  renderConstellationDots() {
    if (!this.constellationDots) return;

    this.constellationDots.innerHTML = story
      .map((chapter, idx) => {
        const num = String(chapter.chapterNumber || chapter.id).padStart(2, '0');
        return `
          <button
            type="button"
            class="constellation-dot ${idx === 0 ? 'is-active' : ''}"
            data-target-index="${idx}"
            aria-label="Chapter ${num}: ${this.escapeHtml(chapter.title)}"
            title="Chapter ${num}: ${this.escapeHtml(chapter.title)}"
          >
            <span class="constellation-dot__star" aria-hidden="true"></span>
          </button>
        `;
      })
      .join('');
  }

  /**
   * Connects all user interaction listeners, navigation controls, and keyboard shortcuts.
   */
  bindEvents() {
    // Opening Storybook CTA & Book Click
    bindOpeningBookInteraction({
      heroSection: this.heroSection,
      openButton: this.openStoryBtn,
      bookStage: this.bookStage,
      onStoryOpened: () => {
        if (this.navigation) {
          this.navigation.goTo(0, { scroll: true, updateHash: true });
        }
        const ch1 = document.getElementById('chapter-1');
        if (ch1) {
          activateChapterScene(ch1, 1, announce);
        }
      }
    });

    // Bind all 13 Chapter Scene interactive moments
    bindChapterSceneInteractions(this.mountPoint, announce);

    // Previous / Next Chapter Buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.navigation.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.navigation.next();
      });
    }

    // Constellation Progress Dots
    if (this.constellationDots) {
      this.constellationDots.addEventListener('click', (e) => {
        const dot = e.target.closest('.constellation-dot');
        if (dot && dot.dataset.targetIndex !== undefined) {
          const targetIdx = parseInt(dot.dataset.targetIndex, 10);
          this.navigation.goTo(targetIdx, { scroll: true, updateHash: true });
        }
      });
    }

    // Next-Chapter Cue Buttons at the bottom of chapters 1-12
    if (this.mountPoint) {
      this.mountPoint.addEventListener('click', (e) => {
        const cueBtn = e.target.closest('.chapter-next-cue-btn');
        if (cueBtn && cueBtn.dataset.gotoIndex !== undefined) {
          const targetIdx = parseInt(cueBtn.dataset.gotoIndex, 10);
          this.navigation.goTo(targetIdx, { scroll: true, updateHash: true });
        }

        const returnTopBtn = e.target.closest('#return-to-top-btn');
        if (returnTopBtn) {
          if (this.navigation) {
            this.navigation.goToOpening({ scroll: true });
          } else {
            smoothScrollToTop();
          }
        }
      });
    }

    // Observe all 13 chapter sections for natural scroll tracking
    const sections = this.mountPoint.querySelectorAll('.chapter-section');
    this.navigation.observeSections(sections);

    // Global Keyboard Navigation (Arrows & PageUp/PageDown)
    setupKeyboardNavigation({
      onNext: () => this.navigation.next(),
      onPrev: () => this.navigation.prev()
    });

    // Touch Swipe Gestures
    if (this.mountPoint) {
      setupSwipeGestures(this.mountPoint, {
        onSwipeLeft: () => this.navigation.next(),
        onSwipeRight: () => this.navigation.prev()
      });
    }

    // Browser Hash Change Listener
    window.addEventListener('hashchange', () => {
      const targetIndex = this.navigation.getIndexFromHash();
      if (targetIndex !== null && targetIndex !== this.navigation.getCurrentIndex()) {
        this.navigation.goTo(targetIndex, { scroll: true, updateHash: false });
      }
    });
  }

  /**
   * Callback invoked whenever the active chapter changes via scrolling or button navigation.
   * @param {Object} chapter
   * @param {number} index
   */
  handleChapterActiveChange(chapter, index) {
    const total = this.navigation ? this.navigation.getTotalCount() : 13;
    const currentNum = index + 1;
    const formattedNum = String(currentNum).padStart(2, '0');

    // Update ambient sky theme on body
    document.body.setAttribute('data-active-chapter', String(chapter.id));

    // Mark active section
    if (this.mountPoint) {
      const sections = this.mountPoint.querySelectorAll('.chapter-section');
      sections.forEach((sec, idx) => {
        sec.classList.toggle('is-current-chapter', idx === index);
      });
    }

    // Update navigation text indicator
    if (this.indicator) {
      this.indicator.textContent = `Chapter ${formattedNum} / ${total} — ${chapter.title}`;
    }

    // Update progress bar
    const percentage = ((currentNum / total) * 100).toFixed(1);
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }
    if (this.progressTrack) {
      this.progressTrack.setAttribute('aria-valuenow', String(currentNum));
    }

    // Update Constellation Dots
    if (this.constellationDots) {
      const dots = this.constellationDots.querySelectorAll('.constellation-dot');
      dots.forEach((dot, idx) => {
        const isCurrent = idx === index;
        dot.classList.toggle('is-active', isCurrent);
        dot.classList.toggle('is-visited', idx < index);
        if (isCurrent) {
          dot.setAttribute('aria-current', 'step');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    // Update Prev / Next Buttons
    if (this.prevBtn && this.navigation) {
      const hasPrev = this.navigation.hasPrev();
      this.prevBtn.disabled = !hasPrev;
      this.prevBtn.setAttribute('aria-disabled', String(!hasPrev));
    }

    if (this.nextBtn && this.navigation) {
      const hasNext = this.navigation.hasNext();
      this.nextBtn.disabled = !hasNext;
      this.nextBtn.setAttribute('aria-disabled', String(!hasNext));
    }

    // Announce chapter change to assistive technology
    announce(`Chapter ${currentNum} of ${total}: ${chapter.title}`);
  }

  /**
   * Renders an accessible error fallback message if initialization fails.
   * @param {Error} error
   */
  renderError(error) {
    if (!this.mountPoint) return;
    this.mountPoint.innerHTML = `
      <div class="chapter-narrative-card text-center" role="alert">
        <h2 class="chapter-header__title">Unable to Load Story</h2>
        <p class="story-text" style="text-align: center; direction: ltr;">
          ${this.escapeHtml(error.message || 'An unexpected error occurred.')}
        </p>
      </div>
    `;
  }

  /**
   * Escapes HTML characters safely while preserving Arabic characters and emojis.
   * @param {string} str
   * @returns {string}
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

function bootStoryApplication() {
  const app = new StoryApplication();
  app.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootStoryApplication);
} else {
  bootStoryApplication();
}
})();
