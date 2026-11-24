/**
 * daily-star.js - "Today's Star" (نجمة اليوم) Reader & Embed Renderer
 * Fetches published messages from Supabase (publish_date <= today)
 */
(function () {
  const TYPE_LABELS = {
    text: 'رسالة مكتوبة ✦',
    image: 'صورة وذكرى ✦',
    spotify: 'أغنية من سبوتيفاي ♫',
    youtube: 'مقطع موسيقي ▶'
  };

  function getTodayIsoDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatArabicDate(isoDate) {
    if (!isoDate) return '';
    try {
      const [y, m, d] = isoDate.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (_) {
      return isoDate;
    }
  }

  function toSpotifyEmbedUrl(url) {
    if (!url) return null;
    const match = url.match(/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (!match) return null;
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  }

  function toYouTubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = null;
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
    if (watchMatch) videoId = watchMatch[1];
    else if (shortMatch) videoId = shortMatch[1];
    else if (shortsMatch) videoId = shortsMatch[1];
    else if (embedMatch) videoId = embedMatch[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  function renderMessageMedia(item) {
    if (!item || !item.media_url) return '';

    if (item.type === 'image') {
      return `
        <div class="daily-message-card__media">
          <img src="${escapeHtml(item.media_url)}" alt="${escapeHtml(item.title || 'صورة من القمر')}" loading="lazy">
        </div>
      `;
    }

    if (item.type === 'spotify') {
      const embedUrl = toSpotifyEmbedUrl(item.media_url);
      if (embedUrl) {
        return `
          <div class="daily-message-card__embed">
            <iframe
              src="${escapeHtml(embedUrl)}"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            ></iframe>
          </div>
        `;
      }
      return `<p style="margin-top:0.85rem;"><a href="${escapeHtml(item.media_url)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-warm-gold);">فتح الأغنية على Spotify ↗</a></p>`;
    }

    if (item.type === 'youtube') {
      const embedUrl = toYouTubeEmbedUrl(item.media_url);
      if (embedUrl) {
        return `
          <div class="daily-message-card__embed">
            <iframe
              src="${escapeHtml(embedUrl)}"
              height="240"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              title="YouTube Player"
            ></iframe>
          </div>
        `;
      }
      return `<p style="margin-top:0.85rem;"><a href="${escapeHtml(item.media_url)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-warm-gold);">فتح المقطع على YouTube ↗</a></p>`;
    }

    return '';
  }

  function renderMessageCard(item) {
    const typeLabel = TYPE_LABELS[item.type] || TYPE_LABELS.text;
    const titleHtml = item.title
      ? `<h3 class="daily-message-card__title">${escapeHtml(item.title)}</h3>`
      : '';
    const textHtml = item.message
      ? `<p class="daily-message-card__text">${escapeHtml(item.message)}</p>`
      : '';

    return `
      <article class="daily-message-card">
        <div class="daily-message-card__meta">
          <span class="daily-message-card__date">${escapeHtml(formatArabicDate(item.publish_date))}</span>
          <span>${escapeHtml(typeLabel)}</span>
        </div>
        ${titleHtml}
        ${textHtml}
        ${renderMessageMedia(item)}
      </article>
    `;
  }

  async function fetchPublishedMessages(config) {
    if (!config || !config.projectUrl || !config.publishableKey) {
      return { configured: false, items: [] };
    }

    const today = getTodayIsoDate();
    const endpoint = `${config.projectUrl}/rest/v1/daily_messages?select=*&publish_date=lte.${today}&order=publish_date.desc,created_at.desc`;
    const response = await fetch(endpoint, {
      headers: {
        apikey: config.publishableKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const items = await response.json();
    return { configured: true, items: Array.isArray(items) ? items : [] };
  }

  function initDailyStar() {
    const triggerBtn = document.getElementById('daily-star-btn');
    const modal = document.getElementById('daily-star-modal');
    const closeBtn = document.getElementById('daily-star-close');
    const bodyEl = document.getElementById('daily-star-body');

    if (!triggerBtn || !modal || !bodyEl) return;

    const config = window.MoonSunApp && window.MoonSunApp.supabaseConfig;
    let messages = [];
    let selectedIndex = 0;
    let showArchive = false;
    let isLoaded = false;

    const render = () => {
      if (!config || !config.projectUrl) {
        bodyEl.innerHTML = `
          <div class="daily-star-state">
            نجمة اليوم مستنية ربط <strong>Project URL</strong> الخاص بـ Supabase في ملف <code>js/supabase-config.js</code> ✨
          </div>
        `;
        return;
      }

      if (!messages.length) {
        bodyEl.innerHTML = `
          <div class="daily-star-state">
            لا توجد رسالة منشورة لليوم بعد...<br>
            ستضيء هذه النجمة فور إضافة أول رسالة ✨
          </div>
        `;
        return;
      }

      const activeItem = messages[selectedIndex] || messages[0];
      let html = renderMessageCard(activeItem);

      if (messages.length > 1) {
        html += `
          <button type="button" class="daily-archive-toggle" id="daily-archive-toggle-btn">
            ${showArchive ? 'إخفاء رسائل الأيام السابقة ▲' : `عرض رسائل الأيام السابقة (${messages.length - 1}) ▼`}
          </button>
        `;

        if (showArchive) {
          html += `<div class="daily-archive-list">`;
          messages.forEach((msg, idx) => {
            const preview = msg.title || msg.message || TYPE_LABELS[msg.type] || 'رسالة';
            html += `
              <button type="button" class="daily-archive-item ${idx === selectedIndex ? 'is-selected' : ''}" data-msg-idx="${idx}">
                <div class="daily-archive-item__info">
                  <span class="daily-archive-item__date">${escapeHtml(formatArabicDate(msg.publish_date))}</span>
                  <span class="daily-archive-item__preview">${escapeHtml(preview)}</span>
                </div>
                <span class="daily-archive-item__badge">${escapeHtml(TYPE_LABELS[msg.type] || '')}</span>
              </button>
            `;
          });
          html += `</div>`;
        }
      }

      bodyEl.innerHTML = html;

      const archiveToggle = document.getElementById('daily-archive-toggle-btn');
      if (archiveToggle) {
        archiveToggle.addEventListener('click', () => {
          showArchive = !showArchive;
          render();
        });
      }

      bodyEl.querySelectorAll('.daily-archive-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          selectedIndex = parseInt(btn.dataset.msgIdx, 10) || 0;
          render();
        });
      });
    };

    const loadMessages = async () => {
      try {
        bodyEl.innerHTML = `<div class="daily-star-state">جاري جلب رسالة اليوم... ✨</div>`;
        const res = await fetchPublishedMessages(config);
        messages = res.items;
        isLoaded = true;
        if (messages.length > 0) {
          triggerBtn.classList.add('has-new');
        }
        render();
      } catch (err) {
        bodyEl.innerHTML = `
          <div class="daily-star-state">
            تعذر تحميل نجمة اليوم حاليًا.<br>
            <small style="opacity:0.7;">${escapeHtml(err.message)}</small>
          </div>
        `;
      }
    };

    const openModal = () => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (!isLoaded) {
        loadMessages();
      } else {
        render();
      }
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    triggerBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Background check to light up the golden dot if there is a message
    if (config && config.projectUrl) {
      fetchPublishedMessages(config)
        .then((res) => {
          messages = res.items;
          isLoaded = true;
          if (messages.length > 0) {
            triggerBtn.classList.add('has-new');
          }
        })
        .catch(() => {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDailyStar);
  } else {
    initDailyStar();
  }
})();
