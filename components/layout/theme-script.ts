export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script for <head>: applies a saved theme before first paint so
 * there is no flash. With no saved choice the CSS follows the system.
 */
export const themeInitScript =
  "(function(){try{var t=localStorage.getItem('" +
  THEME_STORAGE_KEY +
  "');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})();";
