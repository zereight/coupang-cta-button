import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY } from './constants';

const SUN_ICON_CLASS_NAME = 'svg.bi-sun';
const MOON_ICON_CLASS_NAME = 'svg.bi-moon';

export const initTheme = () => {
  const theme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!theme) {
    // storage 에 설정된 테마가 없는 경우, os 에 따름
    const useDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)');
    if (useDarkTheme?.matches) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME);
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME);
    }
  } else {
    // storage 에 설정된 테마가 있는 경우, 해당 테마로 설정
    if (theme === LIGHT_THEME) {
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
    }
  }
};

export const getTheme = () =>
  localStorage.getItem(THEME_STORAGE_KEY) === DARK_THEME ? DARK_THEME : LIGHT_THEME;

export const isDarkTheme = () => getTheme() === DARK_THEME;

export const isLightTheme = () => getTheme() === LIGHT_THEME;

export const toggleTheme = () => {
  const useDarkTheme = getTheme() === DARK_THEME;
  let state;
  if (useDarkTheme) {
    localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME);
    state = false;
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME);
    state = true;
  }
  document.documentElement.classList.toggle('dark-theme', state);
};

/**
 * 테마 상태를 확인 후 테마 버튼을 렌더링 해줌
 */
export const renderThemeButton = () => {
  const sunIcons = document.querySelectorAll(SUN_ICON_CLASS_NAME);
  const moonIcons = document.querySelectorAll(MOON_ICON_CLASS_NAME);

  if (isDarkTheme()) {
    if (sunIcons && sunIcons.length > 0) {
      sunIcons.forEach((icon) => {
        icon.style.display = 'none';
      });
    }
    if (moonIcons && moonIcons.length > 0) {
      moonIcons.forEach((icon) => {
        icon.style.display = 'block';
      });
    }
  } else {
    if (sunIcons && sunIcons.length > 0) {
      sunIcons.forEach((icon) => {
        icon.style.display = 'block';
      });
    }
    if (moonIcons && moonIcons.length > 0) {
      moonIcons.forEach((icon) => {
        icon.style.display = 'none';
      });
    }
  }
};
