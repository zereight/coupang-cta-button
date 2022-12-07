import { defEventHandler, openTab } from '../util-service';
import { GUESTBOOK_URL, MANAGE_URL, TAG_CLOUD_URL, WRITE_URL } from '../constants';
import { toggleTheme } from '../theme-service';

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
  defEventHandler('#guestbook-btn', 'click', () => openTab(GUESTBOOK_URL, false));
  defEventHandler('#tag-cloud-btn', 'click', () => openTab(TAG_CLOUD_URL, false));
  defEventHandler('#theme-btn', 'click', toggleTheme);
  defEventHandler('#write-btn', 'click', () => openTab(WRITE_URL));
  defEventHandler('#manage-btn', 'click', () => openTab(MANAGE_URL));
  defEventHandler('#sidebar-open-btn', 'click', () => openSidebar());
  defEventHandler('#sidebar-close-btn', 'click', () => closeSidebar());
};

const Header = {
  runScripts,
};

export default Header;
