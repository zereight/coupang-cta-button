const SEARCH_LAYER_XPATH = '.search-layer';
const SEARCH_POPUP_XPATH = '.search-popup';

const HIDE_SEARCH_POPUP_CLASSNAME = 'hide-search-popup';

/**
 * 검색창을 열고, search input 에 focusing
 */
const showSearchPopupAndFocusing = () => {
  document.querySelector(SEARCH_LAYER_XPATH)?.classList?.remove(HIDE_SEARCH_POPUP_CLASSNAME);
  document.querySelector('#search-input')?.focus();
};

/**
 * 검색창을 닫는다.
 */
const hideSearchPopup = () =>
  document.querySelector(SEARCH_LAYER_XPATH)?.classList?.add(HIDE_SEARCH_POPUP_CLASSNAME);

/**
 * 검색창 단축키 설정 (closure)
 * @returns {{keyup: key code 초기화 메소드, keydown: 단축키 이벤트 메소드}}
 */
const openSearchPopupByShortcut = () => {
  let clickedMeta = false;
  let clickedCtrl = false;
  let clickedK = false;

  const resetKey = () => {
    clickedMeta = false;
    clickedCtrl = false;
    clickedK = false;
  };

  return {
    keydown: (event) => {
      const keyCode = event?.key;
      if (keyCode === 'Meta') {
        clickedMeta = true;
      }
      if (keyCode === 'Control') {
        clickedCtrl = true;
      }
      if (keyCode === 'k') {
        clickedK = true;
      }
      if (clickedK && (clickedCtrl || clickedMeta)) {
        showSearchPopupAndFocusing();
        resetKey();
      }
    },
    keyup: resetKey,
  };
};

const runScripts = () => {
  // 단축키 설정
  const openSearchPopupEventHandler = openSearchPopupByShortcut();
  document.addEventListener('keydown', openSearchPopupEventHandler.keydown);
  document.addEventListener('keyup', openSearchPopupEventHandler.keyup);

  // fake search input 클릭시 검색창 open
  document.querySelector('header .fake-search-input')?.addEventListener('click', () => {
    showSearchPopupAndFocusing();
  });

  // ESC 키보드 입력시 검색창을 닫는다.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideSearchPopup();
    }
  });

  // 검색창 외부 영역 클릭시 검색창을 닫는다.
  document.addEventListener('mouseup', (event) => {
    const searchLayer = document.querySelector(SEARCH_LAYER_XPATH);
    const isHideSearchPopup = searchLayer?.classList.contains(HIDE_SEARCH_POPUP_CLASSNAME);
    if (isHideSearchPopup) return;

    const clickedOutOfSearchPopup = !event?.target.closest(SEARCH_POPUP_XPATH);
    if (clickedOutOfSearchPopup) {
      hideSearchPopup();
    }
  });

  // close 버튼 클릭시 검색창 닫음
  document.querySelector('#search-popup-close-btn')?.addEventListener('click', hideSearchPopup);
};

const Search = { runScripts };
export default Search;
