/**
 * scenes.js - Custom Illustrated SVG Scenes for Opening & All 13 Chapters
 * Every chapter has a bespoke visual composition, sky backdrop, and interactive hooks.
 */

(function () {
const {
  renderCharacterDefs,
  renderMoonCharacter,
  renderSunCharacter,
  renderButterfly,
  renderMoonFace
} = (typeof window !== 'undefined' && window.MoonSunApp) ? window.MoonSunApp : require('./characters.js');

/**
 * Helper to generate deterministic background stars for a scene.
 * @param {number} seed - Chapter seed (1-13)
 * @param {number} count - Number of stars
 * @returns {string} SVG circles
 */
function generateSceneStars(seed, count = 28) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const hash = (seed * 9301 + i * 49297 + 233) % 233280;
    const hash2 = (seed * 4999 + i * 17389 + 719) % 233280;
    const x = Math.round((hash / 233280) * 760) + 20;
    const y = Math.round((hash2 / 233280) * 340) + 20;
    const r = ((i % 3) * 0.65 + 0.9).toFixed(2);
    const opacity = (((i % 5) + 3) * 0.11).toFixed(2);
    const color = i % 4 === 0 ? '#E8BD75' : i % 3 === 0 ? '#A9A0C9' : '#F5EEDF';
    const animClass = i % 3 === 0 ? 'scene-star scene-star--twinkle' : 'scene-star';
    stars.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}" class="${animClass}" style="animation-delay: ${(i * 0.25).toFixed(2)}s" />`
    );
  }
  return stars.join('');
}

/**
 * Renders the Opening Scene magical floating storybook SVG.
 * @returns {string}
 */
function renderOpeningBookSvg() {
  const prefix = 'opening';
  return `
    <svg class="opening-book-svg" viewBox="0 0 700 420" role="img" aria-label="An illustrated celestial storybook floating among stars with a golden butterfly">
      <defs>
        ${renderCharacterDefs(prefix)}
        <radialGradient id="opening-portal-glow" cx="50%" cy="52%" r="48%">
          <stop offset="0%" stop-color="#E8BD75" stop-opacity="0.42" />
          <stop offset="50%" stop-color="#A9A0C9" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#10142B" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="book-cover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#23284D" />
          <stop offset="55%" stop-color="#191D3A" />
          <stop offset="100%" stop-color="#10142B" />
        </linearGradient>
        <linearGradient id="book-page-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F5EEDF" />
          <stop offset="50%" stop-color="#EFE4CE" />
          <stop offset="100%" stop-color="#F5EEDF" />
        </linearGradient>
        <linearGradient id="opening-ray-grad" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stop-color="#E8BD75" stop-opacity="0.45" />
          <stop offset="65%" stop-color="#F5EEDF" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#10142B" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Ambient Cosmic Halo Behind Book -->
      <circle cx="350" cy="220" r="200" fill="url(#opening-portal-glow)" class="opening-aura" />

      <!-- Delicate Constellation Rings -->
      <g class="opening-constellation-rings" opacity="0.45">
        <ellipse cx="350" cy="225" rx="235" ry="95" fill="none" stroke="#E8BD75" stroke-width="0.8" stroke-dasharray="4 7" />
        <ellipse cx="350" cy="225" rx="185" ry="70" fill="none" stroke="#DCE4F2" stroke-width="0.7" stroke-dasharray="2 6" />
        <circle cx="135" cy="195" r="2.5" fill="#E8BD75" />
        <circle cx="565" cy="250" r="2.5" fill="#DCE4F2" />
        <circle cx="220" cy="130" r="2" fill="#A9A0C9" />
        <circle cx="490" cy="135" r="2.2" fill="#E8BD75" />
      </g>

      <!-- Magical Light Rays Emerging When Book Opens -->
      <g class="opening-light-bloom">
        <path d="M 350 230 L 195 35 L 275 25 Z" fill="url(#opening-ray-grad)" />
        <path d="M 350 230 L 315 20 L 385 20 Z" fill="url(#opening-ray-grad)" />
        <path d="M 350 230 L 425 25 L 505 35 Z" fill="url(#opening-ray-grad)" />
        <circle cx="350" cy="195" r="95" fill="url(#${prefix}-sun-aura)" />
      </g>

      <!-- Floating Storybook Group -->
      <g class="storybook-vessel" transform="translate(350, 240)">
        <!-- Book Shadow / Pedestal Glow -->
        <ellipse cx="0" cy="68" rx="145" ry="22" fill="#0B0E1F" opacity="0.65" />
        <ellipse cx="0" cy="62" rx="115" ry="14" fill="#E8BD75" opacity="0.16" />

        <!-- Left Cover Base -->
        <path
          d="M -4 26 L -162 2 L -142 -68 L 0 -42 Z"
          fill="url(#book-cover-grad)"
          stroke="#E8BD75"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <!-- Right Cover Base -->
        <path
          d="M 4 26 L 162 2 L 142 -68 L 0 -42 Z"
          fill="url(#book-cover-grad)"
          stroke="#E8BD75"
          stroke-width="2"
          stroke-linejoin="round"
        />

        <!-- Spine Gold Binding -->
        <path d="M -6 27 Q 0 33 6 27 L 4 -42 Q 0 -38 -4 -42 Z" fill="#E8BD75" />

        <!-- Left Open Page -->
        <g class="storybook-page storybook-page--left">
          <path
            d="M -2 20 Q -78 -2 -150 -8 L -132 -74 Q -62 -64 0 -42 Z"
            fill="url(#book-page-grad)"
            stroke="#E8BD75"
            stroke-width="1.2"
          />
          <!-- Gold Filigree & Crescent Emblem on Left Page -->
          <path d="M -85 -46 A 16 16 0 1 0 -68 -24 A 13 13 0 1 1 -85 -46 Z" fill="#191D3A" opacity="0.78" />
          <line x1="-115" y1="-22" x2="-40" y2="-14" stroke="#C99A4E" stroke-width="1.2" stroke-linecap="round" opacity="0.55" />
          <line x1="-120" y1="-12" x2="-48" y2="-5" stroke="#C99A4E" stroke-width="1.2" stroke-linecap="round" opacity="0.45" />
        </g>

        <!-- Right Open Page -->
        <g class="storybook-page storybook-page--right">
          <path
            d="M 2 20 Q 78 -2 150 -8 L 132 -74 Q 62 -64 0 -42 Z"
            fill="url(#book-page-grad)"
            stroke="#E8BD75"
            stroke-width="1.2"
          />
          <!-- Gold Filigree & Sun Emblem on Right Page -->
          <circle cx="76" cy="-38" r="12" fill="#E8BD75" stroke="#191D3A" stroke-width="1" opacity="0.88" />
          <line x1="40" y1="-14" x2="115" y2="-22" stroke="#C99A4E" stroke-width="1.2" stroke-linecap="round" opacity="0.55" />
          <line x1="48" y1="-5" x2="120" y2="-12" stroke="#C99A4E" stroke-width="1.2" stroke-linecap="round" opacity="0.45" />
        </g>

        <!-- Rising Starlight Particles From Spine -->
        <g class="storybook-sparkles">
          <circle cx="-28" cy="-68" r="2.6" fill="#E8BD75" />
          <circle cx="24" cy="-82" r="2.2" fill="#F5EEDF" />
          <circle cx="0" cy="-102" r="3" fill="#E8BD75" />
          <circle cx="-48" cy="-98" r="1.8" fill="#DCE4F2" />
          <circle cx="52" cy="-108" r="2" fill="#A9A0C9" />
          <path d="M 0 -50 Q -18 -95 0 -135" fill="none" stroke="#E8BD75" stroke-width="1" stroke-dasharray="3 5" opacity="0.7" />
        </g>
      </g>

      <!-- Orbiting Golden Butterfly -->
      <g class="opening-butterfly-orbit">
        ${renderButterfly({ x: 435, y: 122, scale: 1.35, rotation: -18, prefix })}
      </g>
    </svg>
  `;
}

/**
 * Returns the interactive prompt configuration for a given chapter.
 * @param {number} chapterId
 * @returns {Object}
 */
function getChapterInteractionMeta(chapterId) {
  const interactions = {
    1: {
      type: 'awaken-book',
      buttonLabelAr: 'أيقظ نجوم الحكاية',
      buttonLabelEn: 'Awaken the Story Stars',
      activeLabelAr: 'تتلألأ نجوم الحكاية في السماء',
      hintAr: 'اضغط على الكتاب أو الزر لإطلاق نجوم البداية'
    },
    2: {
      type: 'star-activation',
      buttonLabelAr: 'أنر مدارات الليل',
      buttonLabelEn: 'Illuminate the Night Orbits',
      activeLabelAr: 'أضاءت النجوم والكواكب في عالم القمر الهادئ',
      hintAr: 'اضغط على النجوم في السماء أو الزر لتنشيط المدارات'
    },
    3: {
      type: 'sun-reveal',
      buttonLabelAr: 'أشرقي يا شمس الليل',
      buttonLabelEn: 'Reveal the Sun in the Night',
      activeLabelAr: 'امتلأت السماء بالنور الذهبي وتبدلت دهشة القمر إلى انبهار',
      hintAr: 'اضغط لمشاهدة لحظة ظهور الشمس وتغير ملامح القمر'
    },
    4: {
      type: 'three-pillars',
      pillars: [
        { id: 'kindness', labelAr: 'طيبتها مع النجوم الصغيرة', labelEn: 'Kindness' },
        { id: 'tenderness', labelAr: 'حنيتها مع الفراشات', labelEn: 'Tenderness' },
        { id: 'dreams', labelAr: 'أحلامها وألوان العالم', labelEn: 'Dreams' }
      ],
      hintAr: 'استكشف التفاصيل الثلاثة في عالم الشمس'
    },
    5: {
      type: 'bridge-step',
      buttonLabelAr: 'خذ أول خطوة عبر الجسر',
      buttonLabelEn: 'Take the First Step',
      activeLabelAr: 'عبر القمر أول خطوة نحو عالم الشمس تتبعه الفراشة الذهبية',
      hintAr: 'اضغط ليخطو القمر فوق جسر النجوم'
    },
    6: {
      type: 'first-ray',
      buttonLabelAr: 'أرسل أول شعاع نور',
      buttonLabelEn: 'Send the First Ray of Light',
      activeLabelAr: 'وصل شعاع القمر... وردت عليه الشمس بنور دافئ',
      hintAr: 'اضغط لإرسال أول شعاع نور عبر السماء'
    },
    7: {
      type: 'constellation-connect',
      buttonLabelAr: 'انسج خيوط النجوم بينهما',
      buttonLabelEn: 'Connect the Constellations',
      activeLabelAr: 'تشابكت النجوم وتقارب عالما القمر والشمس',
      hintAr: 'اضغط على النجوم أو الزر لربط الكوكبات المضيئة'
    },
    8: {
      type: 'heart-confession',
      buttonLabelAr: 'أرسل نور الاعتراف الصادق',
      buttonLabelEn: 'Speak from the Heart',
      activeLabelAr: 'سافر نور القمر نحو الشمس... وبقي الليل في انتظار هادئ',
      hintAr: 'اضغط لإرسال نبضة القلب ومشاركة لحظة الانتظار'
    },
    9: {
      type: 'joy-cascade',
      buttonLabelAr: 'انشر نور الفرحة في السماء',
      buttonLabelEn: 'Spread the Joyful Light',
      activeLabelAr: 'أضاءت السماء كلها بفرحة القمر واستجابة الشمس',
      hintAr: 'اضغط لتعم الفرحة وتتلألأ كل نجوم السماء'
    },
    10: {
      type: 'part-clouds',
      buttonLabelAr: 'بدّد الغيوم وقرّب المسافة',
      buttonLabelEn: 'Part the Silent Clouds',
      activeLabelAr: 'انقشعت الغيوم وعاد النور يجمع القمر والشمس من جديد',
      hintAr: 'اضغط لتبديد السحب وإظهار الخيط المضيء بينهما'
    },
    11: {
      type: 'mutual-reunion',
      buttonLabelAr: 'خطوة القمر واختيار الشمس',
      buttonLabelEn: 'Choose Each Other Again',
      activeLabelAr: 'التقى القمر والشمس في منتصف الطريق باختيارهما معًا',
      hintAr: 'اضغط ليلتقي القمر والشمس فوق جسر العودة'
    },
    12: {
      type: 'shared-horizon',
      buttonLabelAr: 'أضئ أفق الأيام القادمة',
      buttonLabelEn: 'Illuminate Every Tomorrow',
      activeLabelAr: 'يتشارك القمر والشمس سماءً واحدة تجمع الليل والنهار بسلام',
      hintAr: 'اضغط لإضاءة الأفق المشترك وانعكاس النور'
    },
    13: {
      type: 'eternal-promise',
      buttonLabelAr: 'توهّج وعد القمر الأبدي',
      buttonLabelEn: 'Illuminate the Moon’s Promise',
      activeLabelAr: 'القمر والشمس معًا في نور أبدي دافئ ❤️',
      hintAr: 'اضغط لتوهج هالة الوعد الأبدي حول القمر والشمس'
    }
  };
  return interactions[chapterId] || interactions[1];
}

/**
 * Renders the bespoke SVG illustration for any of the 13 chapters.
 * @param {number} chapterId - 1 to 13
 * @returns {string} SVG markup
 */
function renderChapterSceneSvg(chapterId) {
  const prefix = `ch${chapterId}`;
  const baseStars = generateSceneStars(chapterId, 26);

  switch (chapterId) {
    // =========================================================================
    // CHAPTER 01: THE INVITATION
    // =========================================================================
    case 1:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--1" viewBox="0 0 800 440" role="img" aria-label="Chapter 1 illustration: A magical storybook floating in a starry cosmos with a golden butterfly">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-sky" cx="50%" cy="60%" r="65%">
              <stop offset="0%" stop-color="#23284D" />
              <stop offset="60%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Distant Spiral Galaxy -->
          <g transform="translate(175, 110) rotate(-18)" opacity="0.45">
            <ellipse cx="0" cy="0" rx="58" ry="18" fill="none" stroke="#A9A0C9" stroke-width="1.2" stroke-dasharray="4 4" />
            <ellipse cx="0" cy="0" rx="34" ry="10" fill="none" stroke="#DCE4F2" stroke-width="1.5" />
            <circle cx="0" cy="0" r="6" fill="#F5EEDF" />
          </g>

          <!-- Rising Constellation Arcs (Interactive Layer) -->
          <g class="ch1-constellation-arcs">
            <path d="M 400 300 C 310 210, 250 130, 190 85" fill="none" stroke="#DCE4F2" stroke-width="1.4" stroke-dasharray="4 6" opacity="0.55" />
            <path d="M 400 300 C 490 210, 550 130, 610 85" fill="none" stroke="#E8BD75" stroke-width="1.4" stroke-dasharray="4 6" opacity="0.65" />
            <path d="M 400 300 Q 400 175 400 65" fill="none" stroke="#F5EEDF" stroke-width="1.5" stroke-dasharray="3 5" opacity="0.6" />
            <!-- Star Nodes on Arcs -->
            <circle cx="320" cy="200" r="4" fill="#DCE4F2" class="interactive-star-node" />
            <circle cx="245" cy="128" r="4.5" fill="#DCE4F2" class="interactive-star-node" />
            <circle cx="480" cy="200" r="4" fill="#E8BD75" class="interactive-star-node" />
            <circle cx="555" cy="128" r="4.5" fill="#E8BD75" class="interactive-star-node" />
            <circle cx="400" cy="145" r="5" fill="#F5EEDF" class="interactive-star-node" />
            <!-- Subtle Silhoutte Emblems of Moon & Sun in the Sky -->
            <path d="M 235 80 A 18 18 0 1 0 255 104 A 14 14 0 1 1 235 80 Z" fill="#DCE4F2" opacity="0.75" />
            <circle cx="565" cy="92" r="14" fill="#E8BD75" opacity="0.78" />
          </g>

          <!-- Open Glowing Storybook at Center Bottom -->
          <g class="ch1-storybook interactive-svg-trigger" transform="translate(400, 325)" tabindex="0" role="button" aria-label="Awaken storybook stars">
            <circle cx="0" cy="-25" r="110" fill="url(#${prefix}-sun-aura)" class="ch1-book-glow" />
            <!-- Book Covers -->
            <path d="M -5 18 L -135 0 L -118 -54 L 0 -34 Z" fill="#191D3A" stroke="#E8BD75" stroke-width="2" />
            <path d="M 5 18 L 135 0 L 118 -54 L 0 -34 Z" fill="#191D3A" stroke="#E8BD75" stroke-width="2" />
            <!-- Open Ivory Pages -->
            <path d="M -2 12 Q -65 -6 -125 -10 L -110 -60 Q -50 -52 0 -34 Z" fill="#F5EEDF" stroke="#E8BD75" stroke-width="1" />
            <path d="M 2 12 Q 65 -6 125 -10 L 110 -60 Q 50 -52 0 -34 Z" fill="#F5EEDF" stroke="#E8BD75" stroke-width="1" />
            <path d="M -5 19 Q 0 24 5 19 L 3 -34 L -3 -34 Z" fill="#E8BD75" />
          </g>

          <!-- Golden Butterfly Ascending -->
          ${renderButterfly({ x: 448, y: 195, scale: 1.25, rotation: -15, prefix, className: 'ch1-butterfly' })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 02: THE MOON WHO LOVED THE NIGHT
    // =========================================================================
    case 2:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--2" viewBox="0 0 800 440" role="img" aria-label="Chapter 2 illustration: The calm Moon gazing at stars and planetary orbits in his peaceful night world">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10142B" />
              <stop offset="65%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#23284D" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Peaceful Planetary Orbits -->
          <g class="ch2-orbits">
            <ellipse cx="480" cy="210" rx="220" ry="85" fill="none" stroke="#DCE4F2" stroke-width="0.9" stroke-dasharray="5 8" opacity="0.35" transform="rotate(-10 480 210)" />
            <ellipse cx="480" cy="210" rx="145" ry="52" fill="none" stroke="#A9A0C9" stroke-width="1" stroke-dasharray="3 6" opacity="0.45" transform="rotate(-10 480 210)" />

            <!-- Ringed Planet 1 -->
            <g class="ch2-planet ch2-planet--1 interactive-svg-trigger" transform="translate(560, 125)">
              <circle cx="0" cy="0" r="18" fill="#A9A0C9" opacity="0.85" />
              <ellipse cx="0" cy="0" rx="34" ry="8" fill="none" stroke="#F5EEDF" stroke-width="2" opacity="0.7" transform="rotate(-18)" />
            </g>

            <!-- Distant Planet 2 -->
            <g class="ch2-planet ch2-planet--2 interactive-svg-trigger" transform="translate(370, 145)">
              <circle cx="0" cy="0" r="11" fill="#DCE4F2" opacity="0.8" />
              <circle cx="-3" cy="-3" r="3" fill="#F5EEDF" opacity="0.6" />
            </g>

            <!-- Interactive Constellation Stars -->
            <g class="ch2-interactive-stars">
              <circle cx="330" cy="90" r="5" fill="#DCE4F2" class="ch2-star-node" />
              <circle cx="430" cy="70" r="5.5" fill="#F5EEDF" class="ch2-star-node" />
              <circle cx="520" cy="85" r="5" fill="#A9A0C9" class="ch2-star-node" />
              <circle cx="650" cy="115" r="5" fill="#DCE4F2" class="ch2-star-node" />
              <path d="M 330 90 L 430 70 L 520 85 L 650 115" fill="none" stroke="#DCE4F2" stroke-width="1.2" stroke-dasharray="4 4" class="ch2-constellation-line" opacity="0.35" />
            </g>

            <!-- Subtle Unfilled Golden Space (The Unnamed Missing Feeling) -->
            <g class="ch2-missing-space" transform="translate(615, 245)">
              <circle cx="0" cy="0" r="38" fill="none" stroke="#E8BD75" stroke-width="1" stroke-dasharray="3 7" opacity="0.45" />
              <circle cx="0" cy="0" r="22" fill="#E8BD75" opacity="0.06" />
            </g>
          </g>

          <!-- Soft Lunar Cloud Ridge -->
          <path d="M 0 365 Q 140 330 290 365 T 600 370 T 800 360 L 800 440 L 0 440 Z" fill="#10142B" opacity="0.85" />
          <path d="M 40 375 Q 180 345 320 380" fill="none" stroke="#DCE4F2" stroke-width="1" opacity="0.25" />

          <!-- The Moon Character (Calm & Content) -->
          ${renderMoonCharacter({ x: 195, y: 235, scale: 1.28, expression: 'calm', prefix, className: 'ch2-moon' })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 03: THE NIGHT THE SUN APPEARED
    // =========================================================================
    case 3:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--3" viewBox="0 0 800 440" role="img" aria-label="Chapter 3 illustration: Golden light filling the night sky as the Sun appears before the amazed Moon">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-night-dawn" cx="68%" cy="48%" r="65%">
              <stop offset="0%" stop-color="#E8BD75" stop-opacity="0.52" class="ch3-grad-stop-1" />
              <stop offset="45%" stop-color="#23284D" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-night-dawn)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Swirling Star Trails Moving in the Night -->
          <g class="ch3-moving-stars" opacity="0.65">
            <path d="M 120 90 Q 380 40 620 110" fill="none" stroke="#F5EEDF" stroke-width="1" stroke-dasharray="3 8" />
            <path d="M 160 140 Q 400 85 590 155" fill="none" stroke="#E8BD75" stroke-width="1.2" stroke-dasharray="4 7" />
            <path d="M 140 310 Q 410 355 630 295" fill="none" stroke="#A9A0C9" stroke-width="1" stroke-dasharray="3 8" />
          </g>

          <!-- Expanding Golden Rays Across the Night -->
          <g class="ch3-golden-rays" transform="translate(565, 210)">
            <circle cx="0" cy="0" r="175" fill="url(#${prefix}-sun-aura)" class="ch3-sun-bloom" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="#E8BD75" stroke-width="1" stroke-dasharray="5 8" opacity="0.5" />
            <line x1="0" y1="0" x2="-340" y2="-80" stroke="#E8BD75" stroke-width="1.5" opacity="0.32" stroke-linecap="round" />
            <line x1="0" y1="0" x2="-350" y2="15" stroke="#F5EEDF" stroke-width="1.8" opacity="0.38" stroke-linecap="round" />
            <line x1="0" y1="0" x2="-330" y2="95" stroke="#E8BD75" stroke-width="1.5" opacity="0.32" stroke-linecap="round" />
          </g>

          <!-- The Sun Appearing in the Night -->
          ${renderSunCharacter({ x: 565, y: 210, scale: 1.25, mood: 'radiant', prefix, className: 'ch3-sun' })}

          <!-- The Moon (Transitions from Surprise to Wonder) -->
          <g class="ch3-moon-wrapper">
            ${renderMoonCharacter({ x: 205, y: 225, scale: 1.25, expression: 'surprise', prefix, className: 'ch3-moon', id: 'ch3-moon-char' })}
          </g>
        </svg>
      `;

    // =========================================================================
    // CHAPTER 04: A THOUSAND LITTLE THINGS (3 Interactive Visual Areas)
    // =========================================================================
    case 4:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--4" viewBox="0 0 800 440" role="img" aria-label="Chapter 4 interactive illustration: Three celestial scenes showing Kindness with small stars, Tenderness with butterflies, and Dreams in a blooming celestial garden">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10142B" />
              <stop offset="55%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#27264A" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- The Moon Observing Admiringly from Afar (Top Left Balcony of Clouds) -->
          <g transform="translate(0, 0)">
            <path d="M 20 260 Q 110 245 190 268 Q 115 290 20 280 Z" fill="#191D3A" stroke="#DCE4F2" stroke-width="0.8" opacity="0.7" />
            ${renderMoonCharacter({ x: 110, y: 185, scale: 0.98, expression: 'curious', prefix, className: 'ch4-moon' })}
          </g>

          <!-- The Sun Radiating Warmth Above the Three Pillars (Top Right) -->
          ${renderSunCharacter({ x: 675, y: 120, scale: 0.95, mood: 'kind', prefix, className: 'ch4-sun' })}

          <!-- ============================================================= -->
          <!-- PILLAR 1: KINDNESS (Helping Small Stars)                      -->
          <!-- ============================================================= -->
          <g class="ch4-pillar ch4-pillar--kindness is-highlighted" data-pillar="kindness" transform="translate(275, 135)" tabindex="0" role="button" aria-label="Kindness: Helping small stars">
            <circle cx="0" cy="0" r="64" fill="#191D3A" fill-opacity="0.7" stroke="#E8BD75" stroke-width="1.5" class="pillar-ring" />
            <!-- Golden nurturing rays from Sun -->
            <path d="M 45 -18 Q 15 -8 0 0" fill="none" stroke="#E8BD75" stroke-width="1.4" stroke-dasharray="3 4" />
            <!-- Three Small Baby Stars Being Helped & Brightened -->
            <g transform="translate(-22, -10)">
              <path d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="#E8BD75" />
              <circle cx="0" cy="0" r="2" fill="#F5EEDF" />
            </g>
            <g transform="translate(18, -16)">
              <path d="M 0 -8 L 2.5 -2.5 L 8 0 L 2.5 2.5 L 0 8 L -2.5 2.5 L -8 0 L -2.5 -2.5 Z" fill="#F5EEDF" />
            </g>
            <g transform="translate(4, 20)">
              <path d="M 0 -11 L 3.2 -3.2 L 11 0 L 3.2 3.2 L 0 11 L -3.2 3.2 L -11 0 L -3.2 -3.2 Z" fill="#E8BD75" />
              <circle cx="0" cy="0" r="2.5" fill="#F5EEDF" />
            </g>
            <text x="0" y="84" text-anchor="middle" fill="#F5EEDF" font-family="var(--font-arabic)" font-size="13">طيبتها مع النجوم</text>
          </g>

          <!-- ============================================================= -->
          <!-- PILLAR 2: TENDERNESS (Butterflies & Celestial Creatures)      -->
          <!-- ============================================================= -->
          <g class="ch4-pillar ch4-pillar--tenderness" data-pillar="tenderness" transform="translate(455, 255)" tabindex="0" role="button" aria-label="Tenderness: Butterflies and gentle creatures">
            <circle cx="0" cy="0" r="68" fill="#191D3A" fill-opacity="0.7" stroke="#A9A0C9" stroke-width="1.5" class="pillar-ring" />
            ${renderButterfly({ x: -16, y: -12, scale: 0.95, rotation: -14, prefix })}
            ${renderButterfly({ x: 22, y: 8, scale: 0.78, rotation: 18, prefix })}
            <!-- Gentle Starlight Creature / Dove-like Wisp -->
            <path d="M -22 24 Q 0 10 24 26 Q 6 20 -22 24 Z" fill="#DCE4F2" opacity="0.85" />
            <circle cx="8" cy="-22" r="2.5" fill="#E8BD75" />
            <text x="0" y="88" text-anchor="middle" fill="#F5EEDF" font-family="var(--font-arabic)" font-size="13">حنيتها والفراشات</text>
          </g>

          <!-- ============================================================= -->
          <!-- PILLAR 3: DREAMS (Celestial Garden in Full Color)             -->
          <!-- ============================================================= -->
          <g class="ch4-pillar ch4-pillar--dreams" data-pillar="dreams" transform="translate(645, 295)" tabindex="0" role="button" aria-label="Dreams: Blooming celestial garden">
            <circle cx="0" cy="0" r="66" fill="#191D3A" fill-opacity="0.7" stroke="#E8BD75" stroke-width="1.5" class="pillar-ring" />
            <!-- Floating Garden Mound -->
            <path d="M -46 24 Q 0 8 46 24 Q 25 42 0 42 Q -25 42 -46 24 Z" fill="#23284D" stroke="#E8BD75" stroke-width="1" />
            <!-- Blooming Golden & Lavender Celestial Flowers -->
            <g transform="translate(-20, 16)">
              <path d="M 0 6 Q -2 -12 -6 -24" fill="none" stroke="#E8BD75" stroke-width="1.5" />
              <circle cx="-6" cy="-26" r="7" fill="#E8BD75" />
              <circle cx="-6" cy="-26" r="3" fill="#F5EEDF" />
            </g>
            <g transform="translate(0, 12)">
              <path d="M 0 8 Q 0 -16 0 -32" fill="none" stroke="#F5EEDF" stroke-width="1.6" />
              <circle cx="0" cy="-35" r="9" fill="#A9A0C9" stroke="#F5EEDF" stroke-width="1" />
              <circle cx="0" cy="-35" r="3.5" fill="#E8BD75" />
            </g>
            <g transform="translate(20, 16)">
              <path d="M 0 6 Q 3 -10 7 -22" fill="none" stroke="#E8BD75" stroke-width="1.5" />
              <circle cx="7" cy="-24" r="6.5" fill="#F5EEDF" />
              <circle cx="7" cy="-24" r="2.5" fill="#E8BD75" />
            </g>
            <text x="0" y="86" text-anchor="middle" fill="#F5EEDF" font-family="var(--font-arabic)" font-size="13">أحلامها وألوان الحياة</text>
          </g>
        </svg>
      `;

    // =========================================================================
    // CHAPTER 05: BEYOND THE NIGHT (The Celestial Bridge)
    // =========================================================================
    case 5:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--5" viewBox="0 0 800 440" role="img" aria-label="Chapter 5 illustration: The Moon standing bravely before a starry bridge leading toward the golden horizon, guided by a butterfly">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-sky" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stop-color="#10142B" />
              <stop offset="60%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#362C47" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Warm Distant Sun Horizon Glow on Right -->
          <circle cx="750" cy="220" r="190" fill="url(#${prefix}-sun-aura)" />

          <!-- Left Cliff (Moon's Quiet World) -->
          <path d="M 0 285 Q 115 275 195 315 L 195 440 L 0 440 Z" fill="#10142B" stroke="#DCE4F2" stroke-width="1" />

          <!-- Right Cliff (Path Toward the Sun's World) -->
          <path d="M 625 305 Q 705 275 800 285 L 800 440 L 625 440 Z" fill="#191D3A" stroke="#E8BD75" stroke-width="1" />

          <!-- Arching Celestial Bridge Connecting Both Worlds -->
          <g class="ch5-bridge">
            <path
              d="M 175 310 Q 410 185 645 305"
              fill="none"
              stroke="#DCE4F2"
              stroke-width="2.5"
              stroke-dasharray="8 6"
              opacity="0.45"
              class="ch5-bridge-arch"
            />
            <path
              d="M 175 318 Q 410 193 645 313"
              fill="none"
              stroke="#E8BD75"
              stroke-width="3"
              class="ch5-bridge-glow-path"
            />
            <!-- Stepping Star Stones along the Bridge -->
            <circle cx="240" cy="282" r="5" fill="#DCE4F2" class="bridge-stone" />
            <circle cx="320" cy="256" r="5.5" fill="#F5EEDF" class="bridge-stone" />
            <circle cx="410" cy="246" r="6" fill="#E8BD75" class="bridge-stone" />
            <circle cx="500" cy="256" r="5.5" fill="#E8BD75" class="bridge-stone" />
            <circle cx="575" cy="280" r="5" fill="#E8BD75" class="bridge-stone" />
          </g>

          <!-- Guiding Golden Butterfly Ahead on the Bridge -->
          <g class="ch5-butterfly-guide">
            ${renderButterfly({ x: 395, y: 195, scale: 1.2, rotation: 12, prefix })}
          </g>

          <!-- The Moon Taking the First Courageous Step -->
          <g class="ch5-moon-traveler">
            ${renderMoonCharacter({ x: 165, y: 220, scale: 1.15, expression: 'courage', prefix, className: 'ch5-moon' })}
          </g>
        </svg>
      `;

    // =========================================================================
    // CHAPTER 06: THE FIRST MESSAGE (A Magical Ray of Light at Dawn)
    // =========================================================================
    case 6:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--6" viewBox="0 0 800 440" role="img" aria-label="Chapter 6 illustration: At the break of a festive dawn, the Moon sends a luminous ray of light across the sky and the Sun answers with warm light">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-dawn-sky" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stop-color="#10142B" />
              <stop offset="50%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#3D2E4F" />
            </linearGradient>
            <linearGradient id="${prefix}-light-ray" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#DCE4F2" />
              <stop offset="50%" stop-color="#F5EEDF" />
              <stop offset="100%" stop-color="#E8BD75" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-dawn-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Soft Dawn Horizon Glow (Festive Eid Morning Warmth) -->
          <path d="M 0 380 Q 400 310 800 370 L 800 440 L 0 440 Z" fill="#E8BD75" opacity="0.12" />
          <path d="M 0 395 Q 400 340 800 390 L 800 440 L 0 440 Z" fill="#10142B" opacity="0.85" />

          <!-- The Moon's First Ray of Light Traveling to the Sun -->
          <g class="ch6-ray-exchange">
            <!-- Outgoing Silver-Gold Ray from Moon -->
            <path
              d="M 215 225 Q 400 145 585 205"
              fill="none"
              stroke="url(#${prefix}-light-ray)"
              stroke-width="4"
              stroke-linecap="round"
              class="ch6-outgoing-ray"
            />
            <!-- Answering Warm Golden Wave from the Sun -->
            <path
              d="M 585 215 Q 400 265 215 235"
              fill="none"
              stroke="#E8BD75"
              stroke-width="3.5"
              stroke-dasharray="8 6"
              stroke-linecap="round"
              class="ch6-returning-ray"
            />
            <!-- Luminous Sparkles Along the Ray Path -->
            <circle cx="330" cy="185" r="4" fill="#F5EEDF" class="ch6-ray-spark" />
            <circle cx="410" cy="176" r="5" fill="#E8BD75" class="ch6-ray-spark" />
            <circle cx="490" cy="184" r="4" fill="#F5EEDF" class="ch6-ray-spark" />
          </g>

          <!-- The Moon (Nervous transitioning to Hopeful) -->
          ${renderMoonCharacter({ x: 165, y: 225, scale: 1.15, expression: 'nervous', prefix, className: 'ch6-moon', id: 'ch6-moon-char' })}

          <!-- The Sun Receiving and Responding Warmly -->
          ${renderSunCharacter({ x: 630, y: 205, scale: 1.15, mood: 'kind', prefix, className: 'ch6-sun' })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 07: FALLING IN LOVE (Connected Worlds & Constellations)
    // =========================================================================
    case 7:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--7" viewBox="0 0 800 440" role="img" aria-label="Chapter 7 illustration: The Moon and Sun connected by glowing constellations with the golden butterfly between them">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-warm-night" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stop-color="#2A264F" />
              <stop offset="60%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-warm-night)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Interwoven Silver and Gold Light Ribbons -->
          <path d="M 210 230 C 330 130, 470 310, 590 210" fill="none" stroke="#DCE4F2" stroke-width="2" opacity="0.4" />
          <path d="M 210 210 C 330 310, 470 130, 590 230" fill="none" stroke="#E8BD75" stroke-width="2" opacity="0.45" />

          <!-- Interactive Constellation Network Between Characters -->
          <g class="ch7-constellations">
            <line x1="275" y1="150" x2="355" y2="115" stroke="#E8BD75" stroke-width="1.6" class="ch7-line" />
            <line x1="355" y1="115" x2="445" y2="120" stroke="#F5EEDF" stroke-width="1.6" class="ch7-line" />
            <line x1="445" y1="120" x2="525" y2="155" stroke="#E8BD75" stroke-width="1.6" class="ch7-line" />
            <line x1="315" y1="295" x2="400" y2="320" stroke="#DCE4F2" stroke-width="1.6" class="ch7-line" />
            <line x1="400" y1="320" x2="485" y2="295" stroke="#E8BD75" stroke-width="1.6" class="ch7-line" />
            <line x1="355" y1="115" x2="400" y2="215" stroke="#A9A0C9" stroke-width="1.2" stroke-dasharray="4 4" class="ch7-line" />
            <line x1="445" y1="120" x2="400" y2="215" stroke="#A9A0C9" stroke-width="1.2" stroke-dasharray="4 4" class="ch7-line" />

            <!-- Clickable Star Nodes -->
            <circle cx="275" cy="150" r="5.5" fill="#DCE4F2" class="ch7-star-node" />
            <circle cx="355" cy="115" r="6" fill="#E8BD75" class="ch7-star-node" />
            <circle cx="445" cy="120" r="6" fill="#F5EEDF" class="ch7-star-node" />
            <circle cx="525" cy="155" r="5.5" fill="#E8BD75" class="ch7-star-node" />
            <circle cx="315" cy="295" r="5" fill="#DCE4F2" class="ch7-star-node" />
            <circle cx="400" cy="320" r="6" fill="#E8BD75" class="ch7-star-node" />
            <circle cx="485" cy="295" r="5" fill="#F5EEDF" class="ch7-star-node" />
          </g>

          <!-- Butterfly Dancing Between Them -->
          ${renderButterfly({ x: 400, y: 205, scale: 1.25, rotation: -8, prefix, className: 'ch7-butterfly' })}

          <!-- The Moon (Affectionate) & The Sun (Warm & Kind) -->
          ${renderMoonCharacter({ x: 195, y: 220, scale: 1.18, expression: 'affection', prefix })}
          ${renderSunCharacter({ x: 605, y: 220, scale: 1.18, mood: 'kind', prefix })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 08: WHEN THE MOON SPOKE HIS HEART (Confession & Waiting)
    // =========================================================================
    case 8:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--8" viewBox="0 0 800 440" role="img" aria-label="Chapter 8 illustration: A quiet, intimate night where a soft light of confession travels from the Moon toward the Sun in patient stillness">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-still-night" cx="45%" cy="50%" r="65%">
              <stop offset="0%" stop-color="#1E2246" />
              <stop offset="65%" stop-color="#151936" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
            <radialGradient id="${prefix}-heart-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#F5EEDF" />
              <stop offset="45%" stop-color="#E8BD75" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#E8BD75" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-still-night)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Quiet Ripples of Patient Waiting -->
          <g class="ch8-waiting-ripples" transform="translate(390, 220)">
            <circle cx="0" cy="0" r="85" fill="none" stroke="#DCE4F2" stroke-width="0.8" stroke-dasharray="3 7" opacity="0.3" />
            <circle cx="0" cy="0" r="52" fill="none" stroke="#E8BD75" stroke-width="1" stroke-dasharray="4 6" opacity="0.45" />
          </g>

          <!-- Soft Luminous Stream & Orb of Confession -->
          <g class="ch8-confession-light">
            <path d="M 235 225 Q 320 215 390 220" fill="none" stroke="#E8BD75" stroke-width="2.5" stroke-linecap="round" opacity="0.75" />
            <circle cx="390" cy="220" r="26" fill="url(#${prefix}-heart-orb)" class="ch8-orb-glow" />
            <circle cx="390" cy="220" r="6" fill="#F5EEDF" />
          </g>

          <!-- The Moon (Sincere Affection & Patient Waiting) -->
          ${renderMoonCharacter({ x: 185, y: 225, scale: 1.2, expression: 'affection', prefix })}

          <!-- The Sun (Thoughtful, Contemplative Stillness) -->
          ${renderSunCharacter({ x: 615, y: 220, scale: 1.15, mood: 'thoughtful', prefix })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 09: THE HAPPIEST SURPRISE (Joyful Illumination)
    // =========================================================================
    case 9:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--9" viewBox="0 0 800 440" role="img" aria-label="Chapter 9 illustration: Warm golden light spreads across the sky as stars illuminate and the Moon beams with pure happiness">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-joy-sky" cx="52%" cy="48%" r="68%">
              <stop offset="0%" stop-color="#E8BD75" stop-opacity="0.42" />
              <stop offset="50%" stop-color="#252850" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-joy-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Spreading Golden Light Waves -->
          <g class="ch9-joy-waves" transform="translate(400, 220)">
            <circle cx="0" cy="0" r="240" fill="url(#${prefix}-sun-aura)" />
            <circle cx="0" cy="0" r="165" fill="none" stroke="#E8BD75" stroke-width="1.2" stroke-dasharray="6 8" opacity="0.55" />
            <circle cx="0" cy="0" r="220" fill="none" stroke="#F5EEDF" stroke-width="1" stroke-dasharray="3 9" opacity="0.45" />
          </g>

          <!-- Illuminating Canopy of Celebratory Stars -->
          <g class="ch9-star-canopy">
            <g transform="translate(290, 95)"><path d="M 0 -10 L 2.5 -2.5 L 10 0 L 2.5 2.5 L 0 10 L -2.5 2.5 L -10 0 L -2.5 -2.5 Z" fill="#E8BD75" /></g>
            <g transform="translate(400, 70)"><path d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" fill="#F5EEDF" /></g>
            <g transform="translate(510, 95)"><path d="M 0 -10 L 2.5 -2.5 L 10 0 L 2.5 2.5 L 0 10 L -2.5 2.5 L -10 0 L -2.5 -2.5 Z" fill="#E8BD75" /></g>
            <g transform="translate(230, 130)"><path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#DCE4F2" /></g>
            <g transform="translate(570, 130)"><path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#F5EEDF" /></g>
          </g>

          <!-- Shared Golden Arc Connecting Sun and Moon -->
          <path d="M 245 220 Q 400 155 555 220" fill="none" stroke="#E8BD75" stroke-width="3" opacity="0.8" />

          <!-- Playful Butterfly in the Center -->
          ${renderButterfly({ x: 400, y: 155, scale: 1.3, rotation: 10, prefix, className: 'ch9-butterfly' })}

          <!-- The Moon (Beaming with Genuine Happiness) & The Sun (Joyful) -->
          ${renderMoonCharacter({ x: 225, y: 230, scale: 1.24, expression: 'happy', prefix, className: 'ch9-moon' })}
          ${renderSunCharacter({ x: 575, y: 225, scale: 1.22, mood: 'joyful', prefix, className: 'ch9-sun' })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 10: EVEN WHEN THE STARS FELL SILENT (Passing Clouds & Patience)
    // =========================================================================
    case 10:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--10" viewBox="0 0 800 440" role="img" aria-label="Chapter 10 illustration: Soft celestial clouds drifting between the sympathetic Moon and Sun while an unbroken thread of light remains between them">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-cloud-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10142B" />
              <stop offset="50%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#1E2243" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-cloud-sky)" />
          <g class="scene-stars-layer" opacity="0.5">${baseStars}</g>

          <!-- Enduring Golden-Silver Thread of Connection Beneath the Clouds -->
          <path
            d="M 200 225 C 320 245, 480 205, 600 225"
            fill="none"
            stroke="#E8BD75"
            stroke-width="2.5"
            stroke-dasharray="6 4"
            class="ch10-connection-thread"
          />

          <!-- The Moon (Vulnerable, Patient, Reaching Out) -->
          ${renderMoonCharacter({ x: 175, y: 225, scale: 1.16, expression: 'vulnerable', prefix })}

          <!-- The Sun (Sympathetic, Thoughtful, Returning) -->
          ${renderSunCharacter({ x: 625, y: 225, scale: 1.14, mood: 'thoughtful', prefix })}

          <!-- Soft Drifting Nebula Clouds (Part When Interacted With) -->
          <g class="ch10-clouds-layer">
            <path
              d="M 265 185 Q 315 150 370 175 Q 425 150 470 185 Q 505 210 470 240 Q 400 260 320 245 Q 245 225 265 185 Z"
              fill="#191D3A"
              stroke="#A9A0C9"
              stroke-width="1"
              opacity="0.82"
              class="ch10-cloud ch10-cloud--left"
            />
            <path
              d="M 335 235 Q 395 205 455 228 Q 515 210 545 245 Q 565 275 520 295 Q 435 310 355 290 Q 305 265 335 235 Z"
              fill="#23284D"
              stroke="#DCE4F2"
              stroke-width="0.8"
              opacity="0.78"
              class="ch10-cloud ch10-cloud--right"
            />
          </g>
        </svg>
      `;

    // =========================================================================
    // CHAPTER 11: THE DAY WE CHOSE AGAIN (Mutual Reunion on the Bridge)
    // =========================================================================
    case 11:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--11" viewBox="0 0 800 440" role="img" aria-label="Chapter 11 illustration: Both the Moon and the Sun approaching each other on a luminous celestial bridge">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-reunion-sky" cx="50%" cy="48%" r="65%">
              <stop offset="0%" stop-color="#332B54" />
              <stop offset="55%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-reunion-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Central Reunion Halo -->
          <circle cx="400" cy="210" r="150" fill="url(#${prefix}-sun-aura)" class="ch11-reunion-glow" />

          <!-- Luminous Celestial Bridge -->
          <path d="M 90 345 Q 400 215 710 345" fill="none" stroke="#E8BD75" stroke-width="3.5" opacity="0.85" />
          <path d="M 90 355 Q 400 225 710 355" fill="none" stroke="#DCE4F2" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.6" />

          <!-- The Moon Stepping Forward -->
          <g class="ch11-moon-mover">
            ${renderMoonCharacter({ x: 255, y: 225, scale: 1.18, expression: 'hope', prefix })}
          </g>

          <!-- The Sun Approaching Independently -->
          <g class="ch11-sun-mover">
            ${renderSunCharacter({ x: 545, y: 220, scale: 1.18, mood: 'radiant', prefix })}
          </g>

          <!-- Golden Butterfly Overhead -->
          ${renderButterfly({ x: 400, y: 125, scale: 1.2, rotation: -6, prefix })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 12: EVERY TOMORROW WITH YOU (Harmonious Shared Horizon)
    // =========================================================================
    case 12:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--12" viewBox="0 0 800 440" role="img" aria-label="Chapter 12 illustration: A peaceful horizon combining night stars and golden daylight where the Moon and Sun share the same sky">
          <defs>
            ${renderCharacterDefs(prefix)}
            <linearGradient id="${prefix}-harmony-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#191D3A" />
              <stop offset="52%" stop-color="#2E2952" />
              <stop offset="100%" stop-color="#4A3859" />
            </linearGradient>
            <linearGradient id="${prefix}-sea-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#23284D" />
              <stop offset="100%" stop-color="#10142B" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-harmony-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Warm Shared Horizon Glow -->
          <ellipse cx="400" cy="310" rx="340" ry="110" fill="url(#${prefix}-sun-aura)" />

          <!-- Tranquil Cosmic Sea & Gentle Hills -->
          <path d="M 0 315 Q 200 290 400 315 T 800 310 L 800 440 L 0 440 Z" fill="url(#${prefix}-sea-grad)" opacity="0.9" />
          <rect x="0" y="320" width="800" height="120" fill="url(#${prefix}-sea-grad)" />
          <line x1="0" y1="320" x2="800" y2="320" stroke="#E8BD75" stroke-width="1.2" opacity="0.55" />

          <!-- Shimmering Water Reflections of Moon & Sun -->
          <g class="ch12-reflections" opacity="0.65">
            <ellipse cx="320" cy="350" rx="45" ry="4" fill="#DCE4F2" />
            <ellipse cx="320" cy="368" rx="32" ry="3" fill="#DCE4F2" />
            <ellipse cx="480" cy="350" rx="52" ry="4.5" fill="#E8BD75" />
            <ellipse cx="480" cy="368" rx="38" ry="3.5" fill="#E8BD75" />
            <ellipse cx="400" cy="390" rx="75" ry="4" fill="#F5EEDF" opacity="0.5" />
          </g>

          <!-- The Moon & The Sun Sharing the Same Peaceful Sky -->
          ${renderMoonCharacter({ x: 310, y: 195, scale: 1.18, expression: 'peace', prefix })}
          ${renderSunCharacter({ x: 490, y: 190, scale: 1.18, mood: 'joyful', prefix })}

          <!-- Butterfly Gliding Across the Shared Horizon -->
          ${renderButterfly({ x: 400, y: 115, scale: 1.18, rotation: 8, prefix })}
        </svg>
      `;

    // =========================================================================
    // CHAPTER 13: THE MOON'S PROMISE (Emotional Climax & Personal Letter)
    // =========================================================================
    case 13:
    default:
      return `
        <svg class="chapter-scene-svg chapter-scene-svg--13" viewBox="0 0 800 440" role="img" aria-label="Chapter 13 illustration: The Moon and the Sun side by side in a warm golden celestial sanctuary with the butterfly nearby">
          <defs>
            ${renderCharacterDefs(prefix)}
            <radialGradient id="${prefix}-climax-sky" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stop-color="#382D52" />
              <stop offset="52%" stop-color="#191D3A" />
              <stop offset="100%" stop-color="#10142B" />
            </radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#${prefix}-climax-sky)" />
          <g class="scene-stars-layer">${baseStars}</g>

          <!-- Sacred Mandala Halo Uniting Moon and Sun -->
          <g class="ch13-sacred-halo" transform="translate(400, 220)">
            <circle cx="0" cy="0" r="195" fill="url(#${prefix}-sun-aura)" />
            <circle cx="0" cy="0" r="158" fill="none" stroke="#E8BD75" stroke-width="1.2" stroke-dasharray="4 6" opacity="0.65" />
            <circle cx="0" cy="0" r="134" fill="none" stroke="#F5EEDF" stroke-width="0.9" opacity="0.4" />
            <!-- Crown of Stars Above -->
            <path d="M -90 -115 Q 0 -155 90 -115" fill="none" stroke="#E8BD75" stroke-width="1.2" opacity="0.6" />
            <circle cx="-60" cy="-126" r="3" fill="#DCE4F2" />
            <circle cx="0" cy="-140" r="4.5" fill="#E8BD75" />
            <circle cx="60" cy="-126" r="3" fill="#DCE4F2" />
          </g>

          <!-- The Moon & The Sun Together Side by Side -->
          ${renderMoonCharacter({ x: 332, y: 225, scale: 1.24, expression: 'sincere', prefix, className: 'ch13-moon' })}
          ${renderSunCharacter({ x: 468, y: 220, scale: 1.22, mood: 'joyful', prefix, className: 'ch13-sun' })}

          <!-- Golden-Lavender Butterfly Resting Nearby -->
          ${renderButterfly({ x: 400, y: 122, scale: 1.22, rotation: -10, prefix, className: 'ch13-butterfly' })}
        </svg>
      `;
  }
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  Object.assign(window.MoonSunApp, {
    renderOpeningBookSvg,
    getChapterInteractionMeta,
    renderChapterSceneSvg,
    renderMoonFace
  });
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderOpeningBookSvg,
    getChapterInteractionMeta,
    renderChapterSceneSvg,
    renderMoonFace
  };
}
})();
