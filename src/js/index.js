import { initTheme } from './theme-service';
import { Header, FloatingButton, Search, PermalinkArticle, ProgressBar } from './features';
import RecommendArticleCard from './features/recommend-article-card';
import Loading from './features/loading';

// initialize theme
initTheme();

const addIconCategoryItem = () => {
  const rootElement = document.querySelector('.tt_category .link_tit');
  const parentElements = document.querySelectorAll('.tt_category a.link_item');
  const subElements = document.querySelectorAll('.tt_category a.link_sub_item');

  const folderIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/></svg>';
  [rootElement, ...parentElements]?.forEach((e) => {
    e.innerHTML = `${folderIcon}${e.innerHTML}`;
    e.classList.add('btn');
    e.classList.add('btn-primary-text');
  });

  const moreIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>';
  subElements?.forEach((e) => {
    e.innerHTML = `${moreIcon}${e.innerHTML}`;
    e.classList.add('btn');
    e.classList.add('btn-secondary-text');
  });
};

const categoryCountRestyling = () => {
  const countElements = document.querySelectorAll('.c_cnt');
  countElements?.forEach((e) => {
    e.innerText = `${e.innerText.replace(/\(|\)|\s/g, '')} 개`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  Loading.runScripts();
  Header.runScripts();
  ProgressBar.runScripts();
  Search.runScripts();
  FloatingButton.runScripts();
  RecommendArticleCard.runScripts();

  /**
   * sidebar
   */
  // restyling category parent items
  addIconCategoryItem();
  // restyling category counts
  categoryCountRestyling();

  PermalinkArticle.runScripts();
});
