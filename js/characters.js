/**
 * characters.js - Original Illustrated SVG Character Components
 * Consistent visual identity for The Moon, The Sun, and The Butterfly
 * Palette: #10142B, #191D3A, #E8BD75, #F5EEDF, #A9A0C9, #DCE4F2
 */

/**
 * Shared SVG <defs> for character gradients and soft celestial glows.
 * Included once inside each scene SVG.
 * @param {string} prefix - Unique ID prefix for the SVG instance
 * @returns {string} SVG defs markup
 */
function renderCharacterDefs(prefix = 'celestial') {
  return `
    <linearGradient id="${prefix}-moon-body" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#F5EEDF" />
      <stop offset="55%" stop-color="#DCE4F2" />
      <stop offset="100%" stop-color="#A9A0C9" />
    </linearGradient>

    <radialGradient id="${prefix}-moon-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#DCE4F2" stop-opacity="0.38" />
      <stop offset="60%" stop-color="#A9A0C9" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#10142B" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="${prefix}-sun-core" cx="42%" cy="38%" r="58%">
      <stop offset="0%" stop-color="#F5EEDF" />
      <stop offset="48%" stop-color="#E8BD75" />
      <stop offset="100%" stop-color="#C99A4E" />
    </radialGradient>

    <radialGradient id="${prefix}-sun-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E8BD75" stop-opacity="0.48" />
      <stop offset="52%" stop-color="#E8BD75" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#10142B" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="${prefix}-butterfly-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5EEDF" />
      <stop offset="50%" stop-color="#E8BD75" />
      <stop offset="100%" stop-color="#A9A0C9" />
    </linearGradient>

    <linearGradient id="${prefix}-butterfly-lavender" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A9A0C9" />
      <stop offset="65%" stop-color="#E8BD75" />
      <stop offset="100%" stop-color="#F5EEDF" />
    </linearGradient>
  `;
}

/**
 * Generates facial features for the Moon character based on emotional expression.
 * Coordinates are relative to the Moon's local origin (0,0).
 * @param {string} expression
 * @returns {string} SVG group markup
 */
function renderMoonFace(expression = 'calm') {
  // Subtle warm cheek blush
  const blush = `
    <ellipse cx="4" cy="7" rx="4.2" ry="2.2" fill="#E8BD75" opacity="0.28" />
    <ellipse cx="18" cy="6" rx="3.5" ry="1.9" fill="#E8BD75" opacity="0.22" />
  `;

  switch (expression) {
    case 'surprise':
      return `
        <g class="moon-face moon-face--surprise">
          ${blush}
          <!-- Slightly raised brows -->
          <path d="M 1 -8 Q 4 -11 7 -8" fill="none" stroke="#191D3A" stroke-width="1.3" stroke-linecap="round" opacity="0.7" />
          <path d="M 14 -9 Q 17 -12 20 -9" fill="none" stroke="#191D3A" stroke-width="1.3" stroke-linecap="round" opacity="0.7" />
          <!-- Wide attentive eyes with starlight catchlights -->
          <circle cx="4.5" cy="-2" r="2.7" fill="#10142B" />
          <circle cx="5.3" cy="-2.8" r="0.9" fill="#F5EEDF" />
          <circle cx="16.5" cy="-2.5" r="2.5" fill="#10142B" />
          <circle cx="17.2" cy="-3.3" r="0.85" fill="#F5EEDF" />
          <!-- Soft surprised 'o' mouth -->
          <ellipse cx="11" cy="7.5" rx="2.1" ry="2.5" fill="none" stroke="#10142B" stroke-width="1.4" />
        </g>
      `;

    case 'wonder':
      return `
        <g class="moon-face moon-face--wonder">
          <ellipse cx="4" cy="7" rx="4.6" ry="2.4" fill="#E8BD75" opacity="0.38" />
          <ellipse cx="18" cy="6" rx="3.8" ry="2.1" fill="#E8BD75" opacity="0.32" />
          <!-- Softly arched admiring brows -->
          <path d="M 1 -7.5 Q 4.5 -10 8 -7.8" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <path d="M 13.5 -8 Q 16.8 -10.5 20 -8.2" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <!-- Sparkling eyes reflecting golden light -->
          <circle cx="4.5" cy="-2" r="2.6" fill="#10142B" />
          <circle cx="5.4" cy="-2.9" r="1.05" fill="#E8BD75" />
          <circle cx="3.7" cy="-1.1" r="0.55" fill="#F5EEDF" />
          <circle cx="16.5" cy="-2.5" r="2.4" fill="#10142B" />
          <circle cx="17.3" cy="-3.3" r="0.95" fill="#E8BD75" />
          <circle cx="15.7" cy="-1.6" r="0.5" fill="#F5EEDF" />
          <!-- Gentle enchanted smile -->
          <path d="M 7.5 6.8 Q 11 10.2 14.8 6.4" fill="none" stroke="#10142B" stroke-width="1.45" stroke-linecap="round" />
        </g>
      `;

    case 'curious':
      return `
        <g class="moon-face moon-face--curious">
          ${blush}
          <!-- Inquisitive gentle brow tilt -->
          <path d="M 1.5 -7 Q 4.5 -8.5 7.5 -7" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <path d="M 13.5 -8.5 Q 17 -10.8 20 -8.5" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <!-- Bright attentive eyes looking slightly upward/forward -->
          <circle cx="5" cy="-2" r="2.4" fill="#10142B" />
          <circle cx="5.9" cy="-2.8" r="0.9" fill="#F5EEDF" />
          <circle cx="16.8" cy="-2.5" r="2.3" fill="#10142B" />
          <circle cx="17.6" cy="-3.3" r="0.85" fill="#F5EEDF" />
          <!-- Warm curious smile -->
          <path d="M 8 6.8 Q 11.5 9.4 14.5 6.3" fill="none" stroke="#10142B" stroke-width="1.4" stroke-linecap="round" />
        </g>
      `;

    case 'courage':
      return `
        <g class="moon-face moon-face--courage">
          ${blush}
          <!-- Steady, determined yet warm brows -->
          <path d="M 1.5 -7.2 Q 4.8 -8.2 8 -6.6" fill="none" stroke="#191D3A" stroke-width="1.35" stroke-linecap="round" opacity="0.75" />
          <path d="M 13.5 -7.2 Q 16.5 -8.5 19.8 -7.4" fill="none" stroke="#191D3A" stroke-width="1.35" stroke-linecap="round" opacity="0.75" />
          <!-- Clear resolute eyes -->
          <circle cx="5" cy="-2" r="2.4" fill="#10142B" />
          <circle cx="5.8" cy="-2.7" r="0.9" fill="#F5EEDF" />
          <circle cx="16.5" cy="-2.4" r="2.3" fill="#10142B" />
          <circle cx="17.3" cy="-3.1" r="0.85" fill="#F5EEDF" />
          <!-- Brave, hopeful smile -->
          <path d="M 7.8 6.8 Q 11.2 9.5 15 6.2" fill="none" stroke="#10142B" stroke-width="1.45" stroke-linecap="round" />
        </g>
      `;

    case 'nervous':
      return `
        <g class="moon-face moon-face--nervous">
          <ellipse cx="4" cy="7" rx="4.8" ry="2.5" fill="#E8BD75" opacity="0.38" />
          <ellipse cx="18" cy="6" rx="4" ry="2.2" fill="#E8BD75" opacity="0.32" />
          <!-- Shy, slightly upturned inner brows -->
          <path d="M 1.2 -6.5 Q 4.5 -7.5 7.5 -8.2" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
          <path d="M 13.8 -8.4 Q 16.8 -7.8 19.8 -6.8" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
          <!-- Earnest eyes -->
          <circle cx="4.8" cy="-1.8" r="2.35" fill="#10142B" />
          <circle cx="5.6" cy="-2.5" r="0.85" fill="#F5EEDF" />
          <circle cx="16.2" cy="-2.2" r="2.25" fill="#10142B" />
          <circle cx="17" cy="-2.9" r="0.8" fill="#F5EEDF" />
          <!-- Gentle hesitant smile -->
          <path d="M 8.5 7.2 Q 11 8.6 13.8 7" fill="none" stroke="#10142B" stroke-width="1.35" stroke-linecap="round" />
        </g>
      `;

    case 'hopeful':
    case 'hope':
      return `
        <g class="moon-face moon-face--hope">
          <ellipse cx="4" cy="7" rx="4.5" ry="2.3" fill="#E8BD75" opacity="0.35" />
          <ellipse cx="18" cy="6" rx="3.8" ry="2" fill="#E8BD75" opacity="0.3" />
          <!-- Soft hopeful brows -->
          <path d="M 1.5 -7.5 Q 4.5 -9.5 7.8 -7.8" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <path d="M 13.5 -8 Q 16.8 -10 19.8 -8" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <!-- Bright eyes with warm gold reflection -->
          <circle cx="4.8" cy="-2" r="2.5" fill="#10142B" />
          <circle cx="5.7" cy="-2.8" r="1" fill="#E8BD75" />
          <circle cx="16.5" cy="-2.4" r="2.4" fill="#10142B" />
          <circle cx="17.3" cy="-3.2" r="0.95" fill="#E8BD75" />
          <!-- Warm relieved smile -->
          <path d="M 7.2 6.5 Q 11.2 10.4 15.2 6.1" fill="none" stroke="#10142B" stroke-width="1.45" stroke-linecap="round" />
        </g>
      `;

    case 'affection':
    case 'sincere':
      return `
        <g class="moon-face moon-face--affection">
          <ellipse cx="4" cy="6.8" rx="4.8" ry="2.5" fill="#E8BD75" opacity="0.4" />
          <ellipse cx="18" cy="5.8" rx="4" ry="2.2" fill="#E8BD75" opacity="0.35" />
          <!-- Tender relaxed brows -->
          <path d="M 1.5 -7.2 Q 4.5 -9 7.8 -7.4" fill="none" stroke="#191D3A" stroke-width="1.15" stroke-linecap="round" opacity="0.6" />
          <path d="M 13.5 -7.6 Q 16.5 -9.4 19.8 -7.6" fill="none" stroke="#191D3A" stroke-width="1.15" stroke-linecap="round" opacity="0.6" />
          <!-- Soft loving eyes with warm dual catchlights -->
          <circle cx="4.8" cy="-1.8" r="2.5" fill="#10142B" />
          <circle cx="5.6" cy="-2.6" r="1.05" fill="#E8BD75" />
          <circle cx="3.9" cy="-1" r="0.55" fill="#F5EEDF" />
          <circle cx="16.4" cy="-2.2" r="2.4" fill="#10142B" />
          <circle cx="17.2" cy="-3" r="0.95" fill="#E8BD75" />
          <circle cx="15.6" cy="-1.4" r="0.5" fill="#F5EEDF" />
          <!-- Deeply warm, affectionate smile -->
          <path d="M 7 6.3 Q 11.2 10.6 15.4 5.9" fill="none" stroke="#10142B" stroke-width="1.5" stroke-linecap="round" />
        </g>
      `;

    case 'happy':
      return `
        <g class="moon-face moon-face--happy">
          <ellipse cx="3.8" cy="6.8" rx="5.2" ry="2.7" fill="#E8BD75" opacity="0.45" />
          <ellipse cx="18.2" cy="5.8" rx="4.4" ry="2.4" fill="#E8BD75" opacity="0.4" />
          <!-- Joyful curved smiling eyes -->
          <path d="M 1.8 -1.5 Q 4.8 -5.2 7.8 -1.5" fill="none" stroke="#10142B" stroke-width="1.7" stroke-linecap="round" />
          <path d="M 13.6 -2 Q 16.5 -5.6 19.4 -2" fill="none" stroke="#10142B" stroke-width="1.7" stroke-linecap="round" />
          <!-- Beaming happy smile -->
          <path d="M 6.5 5.8 Q 11.2 11.5 15.8 5.4" fill="none" stroke="#10142B" stroke-width="1.6" stroke-linecap="round" />
        </g>
      `;

    case 'vulnerable':
      return `
        <g class="moon-face moon-face--vulnerable">
          ${blush}
          <!-- Gentle empathetic brows -->
          <path d="M 1.5 -6.2 Q 4.5 -7.2 7.6 -8.2" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
          <path d="M 13.6 -8.4 Q 16.5 -7.5 19.5 -6.5" fill="none" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
          <!-- Patient, earnest eyes -->
          <circle cx="4.8" cy="-1.6" r="2.35" fill="#10142B" />
          <circle cx="5.6" cy="-2.4" r="0.9" fill="#DCE4F2" />
          <circle cx="16.2" cy="-2" r="2.25" fill="#10142B" />
          <circle cx="17" cy="-2.8" r="0.85" fill="#DCE4F2" />
          <!-- Soft, patient, caring expression -->
          <path d="M 8.2 7.2 Q 11.2 9 14.2 7" fill="none" stroke="#10142B" stroke-width="1.35" stroke-linecap="round" />
        </g>
      `;

    case 'peace':
    case 'calm':
    default:
      return `
        <g class="moon-face moon-face--calm">
          ${blush}
          <!-- Serene, peaceful gently curved eyes -->
          <path d="M 2 -2.2 Q 4.8 -0.2 7.6 -2.2" fill="none" stroke="#10142B" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 13.8 -2.6 Q 16.5 -0.6 19.2 -2.6" fill="none" stroke="#10142B" stroke-width="1.5" stroke-linecap="round" />
          <!-- Tranquil content smile -->
          <path d="M 7.8 6.5 Q 11.2 9.4 14.6 6.2" fill="none" stroke="#10142B" stroke-width="1.4" stroke-linecap="round" />
        </g>
      `;
  }
}

/**
 * Renders the original illustrated Moon character.
 * @param {Object} options
 * @param {number} options.x - Center X position
 * @param {number} options.y - Center Y position
 * @param {number} options.scale - Scale factor (default 1)
 * @param {string} options.expression - Facial expression state
 * @param {boolean} options.flip - Flip horizontally if true
 * @param {string} options.prefix - Defs ID prefix
 * @param {string} options.className - Additional CSS class
 * @param {string} options.id - Optional DOM id
 * @returns {string} SVG group string
 */
function renderMoonCharacter({
  x = 200,
  y = 220,
  scale = 1,
  expression = 'calm',
  flip = false,
  prefix = 'celestial',
  className = '',
  id = ''
} = {}) {
  const scaleX = flip ? -scale : scale;
  const idAttr = id ? `id="${id}"` : '';

  return `
    <g ${idAttr} class="character-moon ${className}" transform="translate(${x}, ${y}) scale(${scaleX}, ${scale})" data-expression="${expression}">
      <!-- Soft Ambient Moonlight Halo -->
      <circle cx="0" cy="0" r="68" fill="url(#${prefix}-moon-aura)" class="moon-halo" />
      <circle cx="2" cy="0" r="46" fill="#DCE4F2" opacity="0.08" />

      <!-- Elegant Crescent Moon Silhouette with Gentle Inner Profile -->
      <path
        d="M 14 -42
           C -16 -44, -42 -22, -42 4
           C -42 30, -16 46, 15 42
           C 32 39, 41 28, 36 23
           C 29 27, 15 26, 7 18
           C 1 11, 0 -2, 6 -12
           C 13 -22, 26 -25, 34 -22
           C 38 -27, 29 -40, 14 -42 Z"
        fill="url(#${prefix}-moon-body)"
        stroke="#F5EEDF"
        stroke-width="1.2"
        stroke-linejoin="round"
      />

      <!-- Full Rounded Cheek / Face Area inside the Crescent Cradle -->
      <circle cx="8" cy="0" r="24" fill="url(#${prefix}-moon-body)" />

      <!-- Delicate Lunar Crater Details & Rim Highlights -->
      <circle cx="-22" cy="-14" r="4.5" fill="#A9A0C9" opacity="0.22" />
      <circle cx="-27" cy="6" r="6.2" fill="#A9A0C9" opacity="0.18" />
      <circle cx="-18" cy="22" r="3.4" fill="#A9A0C9" opacity="0.2" />
      <path d="M -34 -12 A 38 38 0 0 0 -30 22" fill="none" stroke="#F5EEDF" stroke-width="1.4" stroke-linecap="round" opacity="0.55" />

      <!-- Expressive Facial Features -->
      <g class="moon-face-slot">
        ${renderMoonFace(expression)}
      </g>
    </g>
  `;
}

/**
 * Generates facial features for the Sun character.
 * Expressive but restrained, warm and graceful.
 * @param {string} mood - 'serene' | 'kind' | 'radiant' | 'thoughtful' | 'joyful'
 * @returns {string}
 */
function renderSunFace(mood = 'serene') {
  const blush = `
    <ellipse cx="-14" cy="6" rx="4.5" ry="2.3" fill="#C99A4E" opacity="0.35" />
    <ellipse cx="14" cy="6" rx="4.5" ry="2.3" fill="#C99A4E" opacity="0.35" />
  `;

  switch (mood) {
    case 'joyful':
      return `
        <g class="sun-face sun-face--joyful">
          ${blush}
          <!-- Warm smiling eyes -->
          <path d="M -15 -3 Q -11 -7 -7 -3" fill="none" stroke="#191D3A" stroke-width="1.65" stroke-linecap="round" />
          <path d="M 7 -3 Q 11 -7 15 -3" fill="none" stroke="#191D3A" stroke-width="1.65" stroke-linecap="round" />
          <!-- Gentle lashes -->
          <path d="M -15 -3 L -17 -4.5 M 15 -3 L 17 -4.5" stroke="#191D3A" stroke-width="1.3" stroke-linecap="round" />
          <!-- Graceful joyful smile -->
          <path d="M -6 6.5 Q 0 11.5 6 6.5" fill="none" stroke="#191D3A" stroke-width="1.55" stroke-linecap="round" />
        </g>
      `;

    case 'thoughtful':
      return `
        <g class="sun-face sun-face--thoughtful">
          ${blush}
          <!-- Soft contemplative eyes -->
          <path d="M -15 -2 Q -11 0.5 -7 -2" fill="none" stroke="#191D3A" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 7 -2 Q 11 0.5 15 -2" fill="none" stroke="#191D3A" stroke-width="1.5" stroke-linecap="round" />
          <path d="M -4.5 7.2 Q 0 9 4.5 7.2" fill="none" stroke="#191D3A" stroke-width="1.35" stroke-linecap="round" />
        </g>
      `;

    case 'radiant':
    case 'kind':
      return `
        <g class="sun-face sun-face--kind">
          ${blush}
          <!-- Friendly, luminous eyes -->
          <circle cx="-11" cy="-2.5" r="2.4" fill="#191D3A" />
          <circle cx="-10.2" cy="-3.3" r="0.9" fill="#F5EEDF" />
          <path d="M -13.2 -4.2 L -15.2 -5.5" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" />
          <circle cx="11" cy="-2.5" r="2.4" fill="#191D3A" />
          <circle cx="11.8" cy="-3.3" r="0.9" fill="#F5EEDF" />
          <path d="M 13.2 -4.2 L 15.2 -5.5" stroke="#191D3A" stroke-width="1.2" stroke-linecap="round" />
          <!-- Warm, kind smile -->
          <path d="M -5.5 6.5 Q 0 10.4 5.5 6.5" fill="none" stroke="#191D3A" stroke-width="1.45" stroke-linecap="round" />
        </g>
      `;

    case 'serene':
    default:
      return `
        <g class="sun-face sun-face--serene">
          ${blush}
          <!-- Graceful serene eyes -->
          <circle cx="-11" cy="-2.2" r="2.3" fill="#191D3A" />
          <circle cx="-10.2" cy="-3" r="0.85" fill="#F5EEDF" />
          <circle cx="11" cy="-2.2" r="2.3" fill="#191D3A" />
          <circle cx="11.8" cy="-3" r="0.85" fill="#F5EEDF" />
          <path d="M -5 6.8 Q 0 10 5 6.8" fill="none" stroke="#191D3A" stroke-width="1.4" stroke-linecap="round" />
        </g>
      `;
  }
}

/**
 * Renders the original illustrated Sun character.
 * @param {Object} options
 * @param {number} options.x - Center X position
 * @param {number} options.y - Center Y position
 * @param {number} options.scale - Scale factor (default 1)
 * @param {string} options.mood - Expression mood
 * @param {string} options.prefix - Defs ID prefix
 * @param {string} options.className - Additional CSS class
 * @param {string} options.id - Optional DOM id
 * @returns {string} SVG group string
 */
function renderSunCharacter({
  x = 580,
  y = 200,
  scale = 1,
  mood = 'serene',
  prefix = 'celestial',
  className = '',
  id = ''
} = {}) {
  const idAttr = id ? `id="${id}"` : '';

  // Generate 12 soft organic petal rays around the Sun
  const rays = [];
  for (let i = 0; i < 12; i++) {
    const angle = i * 30;
    const isMajor = i % 2 === 0;
    const length = isMajor ? 58 : 49;
    const width = isMajor ? 9 : 6.5;
    rays.push(`
      <path
        d="M -${width} -32 Q 0 -${length} ${width} -32 Z"
        fill="#E8BD75"
        opacity="${isMajor ? '0.82' : '0.55'}"
        transform="rotate(${angle})"
      />
    `);
  }

  return `
    <g ${idAttr} class="character-sun ${className}" transform="translate(${x}, ${y}) scale(${scale})" data-mood="${mood}">
      <!-- Outer Warm Golden Aura -->
      <circle cx="0" cy="0" r="82" fill="url(#${prefix}-sun-aura)" class="sun-halo" />
      <circle cx="0" cy="0" r="54" fill="#E8BD75" opacity="0.14" />

      <!-- Softly Rotating Crown of Rays -->
      <g class="sun-rays-group">
        ${rays.join('')}
      </g>

      <!-- Warm Golden Circular Core -->
      <circle
        cx="0"
        cy="0"
        r="35"
        fill="url(#${prefix}-sun-core)"
        stroke="#F5EEDF"
        stroke-width="1.4"
      />

      <!-- Subtle Inner Rim Highlight -->
      <path d="M -22 -18 A 28 28 0 0 1 20 -20" fill="none" stroke="#F5EEDF" stroke-width="1.4" stroke-linecap="round" opacity="0.7" />

      <!-- Friendly, Elegant Facial Features -->
      <g class="sun-face-slot">
        ${renderSunFace(mood)}
      </g>
    </g>
  `;
}

/**
 * Renders the recurring symbolic Butterfly.
 * Uses warm golden (#E8BD75), soft ivory (#F5EEDF), and muted lavender (#A9A0C9).
 * @param {Object} options
 * @param {number} options.x
 * @param {number} options.y
 * @param {number} options.scale
 * @param {number} options.rotation
 * @param {string} options.prefix
 * @param {string} options.className
 * @param {string} options.id
 * @returns {string}
 */
function renderButterfly({
  x = 400,
  y = 180,
  scale = 1,
  rotation = -12,
  prefix = 'celestial',
  className = '',
  id = ''
} = {}) {
  const idAttr = id ? `id="${id}"` : '';

  return `
    <g ${idAttr} class="character-butterfly ${className}" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
      <!-- Subtle Golden-Lavender Glow -->
      <circle cx="0" cy="0" r="22" fill="#E8BD75" opacity="0.18" />

      <g class="butterfly-wings">
        <!-- Left Forewing & Hindwing -->
        <path
          d="M -1 0
             C -8 -14, -22 -16, -20 -4
             C -19 2, -10 4, -1 2 Z"
          fill="url(#${prefix}-butterfly-gold)"
          stroke="#F5EEDF"
          stroke-width="0.7"
          opacity="0.95"
        />
        <path
          d="M -1 2
             C -10 5, -16 14, -9 16
             C -4 17, -1 10, -1 3 Z"
          fill="url(#${prefix}-butterfly-lavender)"
          stroke="#E8BD75"
          stroke-width="0.6"
          opacity="0.9"
        />
        <!-- Delicate Lavender & Ivory Wing Accents (Left) -->
        <circle cx="-12" cy="-6" r="2.1" fill="#A9A0C9" opacity="0.7" />
        <circle cx="-14" cy="-7" r="0.9" fill="#F5EEDF" />

        <!-- Right Forewing & Hindwing -->
        <path
          d="M 1 0
             C 8 -14, 22 -16, 20 -4
             C 19 2, 10 4, 1 2 Z"
          fill="url(#${prefix}-butterfly-gold)"
          stroke="#F5EEDF"
          stroke-width="0.7"
          opacity="0.95"
        />
        <path
          d="M 1 2
             C 10 5, 16 14, 9 16
             C 4 17, 1 10, 1 3 Z"
          fill="url(#${prefix}-butterfly-lavender)"
          stroke="#E8BD75"
          stroke-width="0.6"
          opacity="0.9"
        />
        <!-- Delicate Lavender & Ivory Wing Accents (Right) -->
        <circle cx="12" cy="-6" r="2.1" fill="#A9A0C9" opacity="0.7" />
        <circle cx="14" cy="-7" r="0.9" fill="#F5EEDF" />
      </g>

      <!-- Slender Golden Body & Curled Antennae -->
      <ellipse cx="0" cy="2" rx="1.3" ry="7.5" fill="#F5EEDF" />
      <path d="M -0.5 -5 Q -4 -11 -7 -10" fill="none" stroke="#E8BD75" stroke-width="0.8" stroke-linecap="round" />
      <path d="M 0.5 -5 Q 4 -11 7 -10" fill="none" stroke="#E8BD75" stroke-width="0.8" stroke-linecap="round" />
    </g>
  `;
}

if (typeof window !== 'undefined') {
  window.MoonSunApp = window.MoonSunApp || {};
  Object.assign(window.MoonSunApp, {
    renderCharacterDefs,
    renderMoonFace,
    renderMoonCharacter,
    renderSunFace,
    renderSunCharacter,
    renderButterfly
  });
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderCharacterDefs,
    renderMoonFace,
    renderMoonCharacter,
    renderSunFace,
    renderSunCharacter,
    renderButterfly
  };
}

