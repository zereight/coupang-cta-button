import { WRITE_URL, MANAGE_URL } from './constants';
import { initTheme, toggleTheme } from './theme-service';
import { defEventHandler, openTab } from './util-service';

// initialize theme
initTheme();

const categoryCountRestyling = () => {
  const countElements = document.querySelectorAll('.c_cnt');
  countElements?.forEach((e) => {
    e.innerText = e.innerText.replace(/\(|\)|\s/g, '');
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  // Theme button event handler
  defEventHandler('#theme-btn', 'click', toggleTheme);
  // Write button event handler
  defEventHandler('#write-btn', 'click', () => openTab(WRITE_URL));
  // Manage button event handler
  defEventHandler('#manage-btn', 'click', () => openTab(MANAGE_URL));

  // restyling category counts
  categoryCountRestyling();
});
