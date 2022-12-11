import { defEventHandler, openTab, throttle } from '../util-service';
import { GUESTBOOK_URL, MANAGE_URL, TAG_CLOUD_URL, WRITE_URL } from '../constants';
import { renderThemeButton, toggleTheme } from '../theme-service';

const closureHandlerHideHeaderByScrollDown = () => {
  let prevY = 0;

  return () => {
    document.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (!header) return;

      const curY = window.scrollY;
      if (Math.abs(prevY - curY) < 30) return;

      header.style.top = prevY < curY ? '-200px' : '0';
      prevY = curY;
    });
  };
};

const openSidebar = () => {
  const sidebar = document.querySelector('aside.sidebar');
  if (!sidebar) return;
  sidebar.classList.add('open-sidebar');
};

const closeSidebar = () => {
  const sidebar = document.querySelector('aside.sidebar');
  if (!sidebar) return;
  sidebar.classList.remove('open-sidebar');
};

const runScripts = () => {
  const handlerHideHeaderByScrollDown = closureHandlerHideHeaderByScrollDown();
  handlerHideHeaderByScrollDown();

  defEventHandler('#guestbook-btn', 'click', () => openTab(GUESTBOOK_URL, false));
  defEventHandler('#tag-cloud-btn', 'click', () => openTab(TAG_CLOUD_URL, false));
  defEventHandler('#theme-btn', 'click', () => {
    toggleTheme();
    renderThemeButton();
  });
  defEventHandler('#write-btn', 'click', () => openTab(WRITE_URL));
  defEventHandler('#manage-btn', 'click', () => openTab(MANAGE_URL));
  defEventHandler('#sidebar-open-btn', 'click', () => openSidebar());
  defEventHandler('#sidebar-close-btn', 'click', () => closeSidebar());
};

const Header = {
  runScripts,
};

export default Header;
