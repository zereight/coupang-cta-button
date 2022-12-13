import { renderThemeButton, toggleTheme } from '../theme-service';
import { CATEGORY_URL, GUESTBOOK_URL, NOTICE_URL, TAG_CLOUD_URL } from '../constants';

const FLOATING_BUTTON_GROUP_CLASS_NAME = '.floating-btn-group';

const FLOATING_LIKE_BUTTON_ID = '#floating-like-btn';
const FLOATING_THEME_BUTTON_ID = '#floating-theme-btn';
const FLOATING_SUBSCRIBE_BUTTON_ID = '#floating-subscribe-btn';
const FLOATING_SCROLL_TOP_BUTTON_ID = '#floating-scroll-top-btn';

const HEART_ICON_CLASS_NAME = 'svg.bi-suit-heart';
const HEART_FILL_ICON_CLASS_NAME = 'svg.bi-suit-heart-fill';

/**
 * 스크롤을 100px 이하로 내렸을때 토글 버튼들이 보이도록 함
 */
const toggleFloatingButtonGroupByScroll = () => {
  document.addEventListener('scroll', () => {
    const buttonGroup = document.querySelector(FLOATING_BUTTON_GROUP_CLASS_NAME);
    if (!buttonGroup) return;

    const currentY = window.scrollY;
    if (currentY > 100) {
      buttonGroup.style.bottom = '0';
    } else {
      buttonGroup.style.bottom = '-800px';
    }
  });
};

/**
 * 글 본문 페이지 여부
 * @returns {boolean} true: 글 본문 페이지, false: 글 본문 페이지가 아님
 */
const isArticlePage = () =>
  [GUESTBOOK_URL, TAG_CLOUD_URL, CATEGORY_URL, NOTICE_URL].reduce((isArticlePage, url) => {
    if (!isArticlePage || window.location.pathname === '/') return false;
    return !new RegExp(`^${url}.*`).test(window.location.pathname);
  }, true);

/**
 * 버튼을 화면에 보여줌
 * @param selector
 */
const showFloatingButton = (selector) => {
  const button = document.querySelector(selector);
  if (!button) return;
  button.style.display = 'block';
};

/**
 * 테마 변경해주는 토글 버튼
 * @returns {void | undefined}
 */
const handleToggleTheme = () => {
  document.querySelector(FLOATING_THEME_BUTTON_ID)?.addEventListener('click', () => {
    toggleTheme();
    renderThemeButton();
  });
};

/**
 * 좋아요 버튼의 상태를 확인 후 렌더링 해줌
 */
const renderLikeButton = () => {
  const tistoryLikeButton = document.querySelector('.postbtn_like button.btn_post');
  if (!tistoryLikeButton) return;

  const heartIcon = document.querySelector(HEART_ICON_CLASS_NAME);
  const heartFillIcon = document.querySelector(HEART_FILL_ICON_CLASS_NAME);

  const likeOn = !!tistoryLikeButton.querySelector('.like_on');
  if (likeOn) {
    if (heartIcon) {
      heartIcon.style.display = 'none';
    }
    if (heartFillIcon) {
      heartFillIcon.style.display = 'block';
    }
  } else {
    if (heartIcon) {
      heartIcon.style.display = 'block';
    }
    if (heartFillIcon) {
      heartFillIcon.style.display = 'none';
    }
  }
};

/**
 * 글 좋아요를 눌러주는 버튼
 */
const handleToggleLike = () => {
  const likeButton = document.querySelector(FLOATING_LIKE_BUTTON_ID);
  if (!likeButton) return;
  likeButton.addEventListener('click', () => {
    document.querySelector('.postbtn_like button.btn_post')?.click();
    // API 호출 후 기다려야 하므로, 약간의 딜레이가 필요
    setTimeout(() => renderLikeButton(), 200);
    // 혹시라도 네트워크가 불안정하여 업데이트가 안될 것을 고려하여, 2초 뒤 다시 렌더링
    setTimeout(() => renderLikeButton(), 2000);
  });
};

/**
 * 스크롤을 가장 위로 올려줌
 */
const handleScrollToTop = () => {
  const scrollButton = document.querySelector(FLOATING_SCROLL_TOP_BUTTON_ID);
  if (!scrollButton) return;
  scrollButton.addEventListener('click', () => window.scrollTo(0, 0));
};

/**
 * 구독 가능 여부 확인 후, 구독 버튼 렌더링
 */
const renderSubscribeButton = () => {
  const tistorySubscribeButton = document.querySelector('button#subscribe');
  if (!tistorySubscribeButton) {
    const subscribeButton = document.querySelector(FLOATING_SUBSCRIBE_BUTTON_ID);
    if (!subscribeButton) return;
    subscribeButton.style.display = 'none';
  }
};

/**
 * 구독버튼 이벤트 핸들러
 */
const handleSubscribe = () => {
  const tistorySubscribeButton = document.querySelector('button#subscribe');
  const subscribeButton = document.querySelector(FLOATING_SUBSCRIBE_BUTTON_ID);
  if (!tistorySubscribeButton || !subscribeButton) return;
  subscribeButton.addEventListener('click', tistorySubscribeButton.click());
};

const runScripts = () => {
  toggleFloatingButtonGroupByScroll();

  // theme
  renderThemeButton();
  handleToggleTheme();

  // scroll to top
  handleScrollToTop();

  // subscribe
  renderSubscribeButton();
  handleSubscribe();

  // 글 본문 페이지에서만 동작
  if (isArticlePage()) {
    // like button
    showFloatingButton(FLOATING_LIKE_BUTTON_ID);
    setTimeout(() => renderLikeButton(), 500);
    handleToggleLike();
  }
};

const FloatingButton = {
  runScripts,
};

export default FloatingButton;
