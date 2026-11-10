/**
 * navigation.js - Story Navigation & Scroll-Spy State Machine
 * Synchronizes natural scrolling with chapter progress, URL hash, and step controls
 */

(function () {
const { smoothScrollToElement, smoothScrollToTop } = (typeof window !== 'undefined' && window.MoonSunApp) ? window.MoonSunApp : require('./animations.js');

class ChapterNavigation {
  /**
   * @param {Array} chapters - List of chapter data objects
   * @param {Object} options
   * @param {number} options.initialIndex - Starting index (0-based)
   * @param {Function} options.onChapterChange - Callback when active chapter changes
   */
  constructor(chapters = [], options = {}) {
    if (!Array.isArray(chapters) || chapters.length === 0) {
      throw new Error('ChapterNavigation requires a non-empty chapters array.');
    }

    this.chapters = chapters;
    this.total = chapters.length;
    this.currentIndex = 0;
    this.isAtOpening = true;
    this.onChapterChange = options.onChapterChange || null;
    this._isProgrammaticScroll = false;
    this._scrollTimer = null;

    // Detect initial index from URL hash if valid
    const hashIndex = this.getIndexFromHash();
    if (hashIndex !== null) {
      this.currentIndex = hashIndex;
      this.isAtOpening = false;
    } else if (typeof options.initialIndex === 'number') {
      this.currentIndex = this.clampIndex(options.initialIndex);
      this.isAtOpening = false;
    }
  }

  /**
   * Clamps an index within valid chapter bounds.
   * @param {number} idx
   * @returns {number}
   */
  clampIndex(idx) {
    return Math.max(0, Math.min(idx, this.total - 1));
  }

  /**
   * Reads the current chapter index from window.location.hash.
   * Format: #chapter-{id}
   * @returns {number|null}
   */
  getIndexFromHash() {
    if (typeof window === 'undefined') return null;
    const match = window.location.hash.match(/^#chapter-(\d+)$/i);
    if (match) {
      const chapterNum = parseInt(match[1], 10);
      const foundIdx = this.chapters.findIndex(
        (c) => c.chapterNumber === chapterNum || c.id === chapterNum
      );
      if (foundIdx !== -1) return foundIdx;
    }
    return null;
  }

  /**
   * Updates window.location.hash to reflect the active chapter without jumping.
   */
  syncHash() {
    if (typeof window === 'undefined') return;
    const currentChapter = this.getCurrentChapter();
    if (currentChapter) {
      const chapterId = currentChapter.chapterNumber || currentChapter.id;
      const targetHash = `#chapter-${chapterId}`;
      if (window.location.hash !== targetHash) {
        try {
          window.history.replaceState(null, '', targetHash);
        } catch (_) {
          // Ignore security error in strict file:// environments
        }
      }
    }
  }

  /**
   * Returns current chapter object.
   */
  getCurrentChapter() {
    return this.chapters[this.currentIndex];
  }

  /**
   * Returns current index (0-based).
   */
  getCurrentIndex() {
    return this.currentIndex;
  }

  /**
   * Returns total count of chapters.
   */
  getTotalCount() {
    return this.total;
  }

  /**
   * Checks if navigation can advance.
   */
  hasNext() {
    if (this.isAtOpening) return true;
    return this.currentIndex < this.total - 1;
  }

  /**
   * Checks if navigation can retreat.
   */
  hasPrev() {
    if (this.isAtOpening) return false;
    return this.currentIndex >= 0;
  }

  /**
   * Scrolls back to the Opening Hero screen and resets opening state.
   */
  goToOpening({ scroll = true } = {}) {
    this.isAtOpening = true;
    this.currentIndex = 0;

    if (typeof window !== 'undefined') {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (_) {}
    }

    if (scroll && typeof window !== 'undefined') {
      this._isProgrammaticScroll = true;
      clearTimeout(this._scrollTimer);
      if (typeof smoothScrollToTop === 'function') {
        smoothScrollToTop();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      this._scrollTimer = setTimeout(() => {
        this._isProgrammaticScroll = false;
      }, 900);
    }

    if (typeof this.onChapterChange === 'function') {
      this.onChapterChange(this.getCurrentChapter(), this.currentIndex, this);
    }
  }

  /**
   * Updates the active chapter state and optionally scrolls to the chapter section.
   * @param {number} targetIndex
   * @param {Object} opts
   * @param {boolean} opts.scroll - Whether to scroll the chapter into view
   * @param {boolean} opts.updateHash - Whether to update location.hash
   * @returns {Object} current chapter
   */
  goTo(targetIndex, { scroll = true, updateHash = true } = {}) {
    const nextIdx = this.clampIndex(targetIndex);
    const wasAtOpening = this.isAtOpening;
    const changed = nextIdx !== this.currentIndex || wasAtOpening || !this._initialized;

    this.currentIndex = nextIdx;
    this.isAtOpening = false;
    this._initialized = true;

    if (updateHash) {
      this.syncHash();
    }

    if (scroll && typeof document !== 'undefined') {
      const chapter = this.getCurrentChapter();
      const targetEl = document.getElementById(`chapter-${chapter.id}`);
      if (targetEl) {
        this._isProgrammaticScroll = true;
        clearTimeout(this._scrollTimer);
        smoothScrollToElement(targetEl);
        this._scrollTimer = setTimeout(() => {
          this._isProgrammaticScroll = false;
        }, 900);
      }
    }

    if (changed && typeof this.onChapterChange === 'function') {
      this.onChapterChange(this.getCurrentChapter(), this.currentIndex, this);
    }

    return this.getCurrentChapter();
  }

  /**
   * Advances to next chapter (or enters Chapter 1 if currently on the Opening screen).
   * @returns {Object|null}
   */
  next() {
    if (this.isAtOpening) {
      return this.goTo(0, { scroll: true, updateHash: true });
    }
    if (this.currentIndex < this.total - 1) {
      return this.goTo(this.currentIndex + 1, { scroll: true, updateHash: true });
    }
    return null;
  }

  /**
   * Retreats to previous chapter (or returns to Opening screen from Chapter 1).
   * @returns {Object|null}
   */
  prev() {
    if (this.isAtOpening) {
      return null;
    }
    if (this.currentIndex > 0) {
      return this.goTo(this.currentIndex - 1, { scroll: true, updateHash: true });
    }
    this.goToOpening({ scroll: true });
    return this.getCurrentChapter();
  }

  /**
   * Attaches IntersectionObserver to track active chapter while scrolling naturally.
   * @param {NodeListOf<HTMLElement>|Array<HTMLElement>} sectionElements
   */
  observeSections(sectionElements) {
    if (typeof IntersectionObserver === 'undefined' || !sectionElements || !sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (this._isProgrammaticScroll) return;

        // Find the most visible intersecting chapter
        let bestEntry = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });

        if (bestEntry) {
          const idx = parseInt(bestEntry.target.dataset.chapterIndex, 10);
          if (!Number.isNaN(idx) && (idx !== this.currentIndex || this.isAtOpening)) {
            this.goTo(idx, { scroll: false, updateHash: true });
          }
        }
      },
      {
        root: null,
        rootMargin: '-28% 0px -42% 0px',
        threshold: [0.05, 0.2, 0.4, 0.6]
      }
    );

    sectionElements.forEach((sec) => observer.observe(sec));

    // Also observe the opening hero section so scrolling back to the very top updates state
    if (typeof document !== 'undefined') {
      const heroEl = document.getElementById('opening-hero');
      if (heroEl) {
        const heroObserver = new IntersectionObserver(
          (entries) => {
            if (this._isProgrammaticScroll) return;
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.55 && !this.isAtOpening) {
                this.goToOpening({ scroll: false });
              }
            });
          },
          { threshold: [0.55] }
        );
        heroObserver.observe(heroEl);
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  window.MoonSunApp.ChapterNavigation = ChapterNavigation;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChapterNavigation };
}
})();
