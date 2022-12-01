import { defEventHandler, openTab } from '../util-service';
import { GUESTBOOK_URL, MANAGE_URL, TAG_CLOUD_URL, WRITE_URL } from '../constants';
import { toggleTheme } from '../theme-service';

const runScripts = () => {
  defEventHandler('#guestbook-btn', 'click', () => openTab(GUESTBOOK_URL));
  defEventHandler('#tag-cloud-btn', 'click', () => openTab(TAG_CLOUD_URL));
  defEventHandler('#theme-btn', 'click', toggleTheme);
  defEventHandler('#write-btn', 'click', () => openTab(WRITE_URL));
  defEventHandler('#manage-btn', 'click', () => openTab(MANAGE_URL));
};

const Header = {
  runScripts,
};

export default Header;
