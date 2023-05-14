import { initTheme } from './theme-service';
import { Header, FloatingButton, Search, PermalinkArticle, ProgressBar } from './features';
import RecommendArticleCard from './features/recommend-article-card';
import Loading from './features/loading';
import coupangInit from './coupang';

// initialize theme
initTheme();

const categoryCountRestyling = () => {
  coupangInit();

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
  // addIconCategoryItem();
  // restyling category counts
  categoryCountRestyling();

  PermalinkArticle.runScripts();
});
