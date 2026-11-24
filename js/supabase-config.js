/**
 * supabase-config.js - Supabase Public Configuration
 * Safe for frontend use: protected by Row Level Security (RLS) in Supabase.
 */
(function () {
  const DEFAULT_PROJECT_URL = 'https://gapqefnfdlkhzygrklgm.supabase.co';
  const DEFAULT_PUBLISHABLE_KEY = 'sb_publishable_qA5QTFOHPS0fX55kvldBoQ_gA6FM4ih';

  function getSavedProjectUrl() {
    try {
      return (typeof localStorage !== 'undefined' && localStorage.getItem('moon_sun_supabase_url')) || '';
    } catch (_) {
      return '';
    }
  }

  const supabaseConfig = {
    get projectUrl() {
      const raw = DEFAULT_PROJECT_URL || getSavedProjectUrl();
      return raw ? raw.replace(/\/+$/, '') : '';
    },
    publishableKey: DEFAULT_PUBLISHABLE_KEY,
    bucketName: 'daily-media'
  };

  if (typeof window !== 'undefined') {
    window.MoonSunApp = window.MoonSunApp || {};
    window.MoonSunApp.supabaseConfig = supabaseConfig;
  }
})();
