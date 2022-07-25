let ACTIVE_DARK_THEME = true;

let alertTimer: number;

type EventHandlerFunction = (e: any) => any;
type ErrHandlerFunction = (e: Error) => any;
const funcWrapper = (
  func: EventHandlerFunction,
  errHandler?: ErrHandlerFunction
): any => {
  try {
    return func;
  } catch (e: unknown) {
    console.log(e);
    if (!!errHandler && e instanceof Error) {
      errHandler(e);
    }
  }
};

const move = (url: string, target = '_self') => window.open(url, target);

const copy = (content: string, callback = () => {}) => {
  try {
    navigator.clipboard.writeText(content);
    if (callback) {
      callback();
    }
  } catch (e) {
    console.error(e);
  }
};

const getBaseUrl = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

const showAlert = (text: string) => {
  const alert = document.querySelector('#alert') as HTMLDivElement;
  const alertText = document.querySelector(
    '#alert .alert-text'
  ) as HTMLSpanElement;
  alertText.innerText = text;
  alert.style.right = '0';

  if (alertTimer) clearTimeout(alertTimer);
  alertTimer = setTimeout(() => (alert.style.right = '-500px'), 2000);
};

// index page - copy article url
const copyArticleUrl = (url: string) => {
  const fullUrl = `${getBaseUrl()}${url}`;
  copy(fullUrl);
  showAlert('복사했습니다!');
};

const headerIntersectionObserver = new IntersectionObserver((entries) => {
  // scroll top button
  const scrollTopButton = document.querySelector(
    '#scroll-top-button'
  ) as HTMLButtonElement;

  // float theme button
  const floatThemeButton = document.querySelector(
    '#float-theme-button'
  ) as HTMLButtonElement;

  const subscribeButton = document.querySelector(
    '.container_postbtn .btn_subscription'
  ) as HTMLButtonElement;

  const likeButton = document.querySelector('#btn-like') as HTMLButtonElement;

  const buttonList = [
    scrollTopButton,
    floatThemeButton,
    likeButton,
    subscribeButton,
  ].filter((btn) => !!btn);
  const show = () =>
    buttonList.forEach(
      (btn, idx) => btn && (btn.style.bottom = `${80 * (idx + 1)}px`)
    );
  const hide = () =>
    buttonList.forEach((btn, idx) => btn && (btn.style.bottom = '-500px'));

  if (entries[0].intersectionRatio === 0) {
    funcWrapper(show)();
  } else {
    funcWrapper(hide)();
  }
});

const replyFormIntersectionObserver = new IntersectionObserver((entries) => {
  const recommendCardList = document.querySelectorAll(
    '.recommend-card'
  ) as NodeListOf<HTMLDivElement>;
  if (!recommendCardList || recommendCardList.length === 0) return;

  const hide = () =>
    recommendCardList.forEach((card) => (card.style.bottom = '-500px'));
  const show = () =>
    recommendCardList.forEach((card) => (card.style.bottom = '100px'));

  if (entries[0].intersectionRatio === 0) {
    funcWrapper(hide)();
  } else {
    funcWrapper(show)();
  }
});

const hideLoading = () => {
  const loading = document.querySelector('#loading') as HTMLDivElement;
  if (loading && loading.style.display != 'none') {
    loading.style.display = 'none';
  }
};

window.onload = () => {
  // loading
  funcWrapper(hideLoading)();

  const body: HTMLBodyElement = document.querySelector(
    'body'
  ) as HTMLBodyElement;

  // Theme Toggle
  const themeButton = document.querySelector(
    '#theme-button'
  ) as HTMLButtonElement;
  ACTIVE_DARK_THEME = !!themeButton; // 테마 버튼이 없는 경우, 다크 테마 기능이 비활성화 된것으로 간주

  if (ACTIVE_DARK_THEME) {
    // localStorage에서 theme 값을 가지고와서 테마 설정
    const initTheme = (): void => {
      const isDarkTheme = localStorage.getItem('theme') === 'dark';
      if (ACTIVE_DARK_THEME && isDarkTheme) {
        body.classList.add('dark-theme');
      }
    };
    funcWrapper(initTheme)();

    // 테마 버튼 아이콘 변경
    const floatThemeButton = document.querySelector(
      '#float-theme-button'
    ) as HTMLButtonElement;
    const sunIcon = document.querySelector(
      '#theme-button .uil-sun'
    ) as HTMLElement;
    const moonIcon = document.querySelector(
      '#theme-button .uil-moon'
    ) as HTMLElement;
    const floatSunIcon = document.querySelector(
      '#float-theme-button .uil-sun'
    ) as HTMLElement;
    const floatMoonIcon = document.querySelector(
      '#float-theme-button .uil-moon'
    ) as HTMLElement;
    const initThemeIcon = (): void => {
      const isDarkTheme = localStorage.getItem('theme') === 'dark';
      if (isDarkTheme) {
        sunIcon.style.display = 'block';
        floatSunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        floatMoonIcon.style.display = 'none';
      }
    };
    funcWrapper(initThemeIcon)();
    const toggleTheme = (e: Event) => {
      const isDarkTheme = body.classList.contains('dark-theme');
      if (isDarkTheme) {
        sunIcon.style.display = 'none';
        floatSunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        floatMoonIcon.style.display = 'block';
        body.classList.remove('dark-theme');
        localStorage.removeItem('theme');
      } else {
        sunIcon.style.display = 'block';
        floatSunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        floatMoonIcon.style.display = 'none';
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    };
    themeButton?.addEventListener('click', funcWrapper(toggleTheme));
    floatThemeButton?.addEventListener('click', funcWrapper(toggleTheme));
  } else {
    body.classList.remove('dark-theme');
    localStorage.removeItem('theme');
  }

  // scroll top button
  const header = document.querySelector('header');
  if (header) {
    headerIntersectionObserver.observe(header);
  }
  const scrollTopButton = document.querySelector(
    '#scroll-top-button'
  ) as HTMLButtonElement;
  const onClickScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  scrollTopButton?.addEventListener('click', funcWrapper(onClickScrollTop));

  // TOC
  const showToc = (): void => {
    if (['', '/', '/notice'].includes(window?.location?.pathname ?? '/')) {
      return;
    }
    const curPathname: string = window.location.pathname.split('/')[1];
    const isArticlePage: boolean = ![
      'tag',
      'guestbook',
      'category',
      'manage',
    ].includes(curPathname);
    if (isArticlePage) {
      const tocContainer: HTMLDivElement = document.querySelector(
        '#toc-container'
      ) as HTMLDivElement;
      const tocWrapper: HTMLDivElement = document.querySelector(
        '#toc-container .toc-wrapper'
      ) as HTMLDivElement;
      tocContainer.style.width = '240px';
      tocWrapper.style.display = 'inline-block';
    }
  };
  funcWrapper(showToc)();

  const makeToc = () => {
    if (!document.querySelector('.article')) return;

    const articleHeadTags = document.querySelectorAll(
      '.article h1, .article h2, .article h3, .article h4'
    ) as NodeListOf<Element>;

    const tocWrapper = document.querySelector('.toc-wrapper');
    if (!articleHeadTags || !tocWrapper) return;

    let minLevel: number = 5;
    let prefixNums = [0, 0, 0, 0];
    const tocList = Array.from(articleHeadTags)
      .splice(0, articleHeadTags.length - 1)
      .map((node) => {
        const level = Number(node.nodeName.charAt(1));
        minLevel = minLevel > level ? level : minLevel;
        return { node, level, text: node.textContent };
      })
      .map(({ node, level, text }) => {
        prefixNums = prefixNums.map((num, idx) => {
          if (idx < level - 1) {
            return num === 0 ? 1 : num;
          } else if (idx === level - 1) {
            return num + 1;
          } else {
            return 0;
          }
        });

        const textPrefix = prefixNums
          .slice(minLevel - 1, prefixNums.length + 1)
          .reduce((result: string, num: number) => {
            if (!num) return result;
            return `${result}${result ? '.' : ''}${num}`;
          }, '');
        return {
          node,
          text: `${textPrefix}. ${text}`,
          depth: textPrefix.split('.').length,
        };
      })
      .map(({ node, text, depth }) => {
        const tag = document.createElement('a');
        tag.classList.add('toc');
        tag.classList.add(`toc${depth}`);
        tag.innerText = text;
        tag.href = `#${text}`;

        if (!!node) {
          // @ts-ignore
          node.id = text;
          node.classList.add('head');
          node.innerHTML = text;
          node?.addEventListener(
            'click',
            funcWrapper(() => (window.location.href = `#${text}`))
          );
        }

        tocWrapper.appendChild(tag);
        return tag;
      });
  };
  funcWrapper(makeToc)();

  // 구독 별 버튼
  const subscribeButton = document.querySelector(
    '.container_postbtn .btn_subscription'
  ) as HTMLButtonElement;
  if (subscribeButton) {
    subscribeButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>';
  }

  // 글 좋아요 하트 버튼
  const likeButton = document.querySelector('#btn-like') as HTMLButtonElement;
  const heartSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
  const heartFillSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>';

  const displayLikeButton = () => {
    const likeOnDiv = document.querySelector(
      '.uoc-icon.like_on'
    ) as HTMLDivElement;
    likeButton.innerHTML = !!likeOnDiv ? heartFillSvg : heartSvg;
  };
  const uocIconButton = document.querySelector(
    '.btn_post.uoc-icon'
  ) as HTMLButtonElement;
  if (!uocIconButton) {
    likeButton.style.display = 'none';
  } else {
    if (likeButton) {
      displayLikeButton();
      likeButton.addEventListener('click', () => {
        uocIconButton?.click();
        setTimeout(displayLikeButton, 200);
      });
    }
  }

  // blog menu
  const blogHomeMenu = document.querySelector(
    '#blog-menu .home-menu'
  ) as HTMLAnchorElement;
  const blogTagMenu = document.querySelector(
    '#blog-menu .tag-menu'
  ) as HTMLAnchorElement;
  const blogGuestbookMenu = document.querySelector(
    '#blog-menu .guestbook-menu'
  ) as HTMLAnchorElement;
  const addActiveProperty = () => {
    const pathname = window.location.pathname;
    switch (pathname) {
      case '/':
        blogHomeMenu.classList.add('blog-menu-active');
        return;
      case '/tag':
        blogTagMenu.classList.add('blog-menu-active');
        return;
      case '/guestbook':
        blogGuestbookMenu.classList.add('blog-menu-active');
        return;
      default:
        return;
    }
  };
  funcWrapper(addActiveProperty)();
  const looseURIEncode = (s: string) => {
    return (s = (s = (s = s.replace(new RegExp('%', 'g'), '%25')).replace(
      new RegExp('\\?', 'g'),
      '%3F'
    )).replace(new RegExp('#', 'g'), '%23'));
  };

  // Search
  const searchInput = document.querySelector('#search') as HTMLInputElement;
  const search = (event: KeyboardEvent) => {
    let searchValue: string = (
      document.getElementsByName('search')[0] as HTMLInputElement
    ).value;
    if (event.key === 'Enter') {
      window.open('/search/' + looseURIEncode(searchValue), '_self');
      return false;
    }
  };
  searchInput?.addEventListener('keypress', funcWrapper(search));

  // Post button
  const postButton = document.querySelector(
    '#post-button'
  ) as HTMLButtonElement;
  const movePostPage = (event: MouseEvent) => {
    window.open('/manage/post', '_blank');
  };
  postButton?.addEventListener('click', funcWrapper(movePostPage));

  // Admin button
  const adminButton = document.querySelector(
    '#admin-button'
  ) as HTMLButtonElement;
  const moveAdminPage = (event: MouseEvent) => {
    window.open('/manage', '_blank');
  };
  adminButton?.addEventListener('click', funcWrapper(moveAdminPage));

  // counter
  const calcVisitCounter = () => {
    const todayCounter = document.querySelector(
      '#counter .today .value'
    ) as HTMLSpanElement;
    const yesterdayCounter = document.querySelector(
      '#counter .yesterday .value'
    ) as HTMLSpanElement;
    const diff =
      Number(todayCounter.innerText || 0) -
      Number(yesterdayCounter.innerText || 0);
    if (diff > 0) {
      const todayIncreaseValue = document.querySelector(
        '#counter .today .increase .value'
      ) as HTMLSpanElement;
      todayIncreaseValue.innerText = '' + diff;
      const todayIncrease = document.querySelector(
        '#counter .today .increase'
      ) as HTMLSpanElement;
      todayIncrease.style.display = 'flex';
    } else if (diff < 0) {
      const todayDecreaseValue = document.querySelector(
        '#counter .today .decrease .value'
      ) as HTMLSpanElement;
      todayDecreaseValue.innerText = '' + diff;
      const todayDecrease = document.querySelector(
        '#counter .today .decrease'
      ) as HTMLSpanElement;
      todayDecrease.style.display = 'flex';
    }
  };
  funcWrapper(calcVisitCounter)();

  // sidebar toggle button
  const sidebarOpenButton = document.querySelector(
    '.sidebar-open-btn'
  ) as HTMLButtonElement;
  const sidebarCloseButton = document.querySelector(
    '.sidebar-close-btn'
  ) as HTMLButtonElement;
  const sidebar = document.querySelector('#sidebar') as HTMLElement;
  const openSideBar = () => {
    sidebar.style.left = '0px';
  };
  const closeSideBar = () => {
    sidebar.style.left = '-700px';
  };
  sidebarOpenButton?.addEventListener('click', funcWrapper(openSideBar));
  sidebarCloseButton?.addEventListener('click', funcWrapper(closeSideBar));

  // code language
  const makeCodeLanguageLabel = () => {
    const articlePre = document.querySelectorAll('.article pre');
    if (articlePre) {
      articlePre.forEach((node) => {
        const language = node.getAttribute('data-ke-language')?.toUpperCase();

        if (language) {
          const label = document.createElement('label');
          label.classList.add('code-language');
          label.innerHTML = `<span>${language}</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-clipboard\" viewBox=\"0 0 16 16\"><path d=\"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z\"/><path d=\"M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z\"/></svg>`;

          const code = node.children[0].textContent;
          if (code) {
            label?.addEventListener('click', () =>
              copy(code, () => showAlert('복사되었습니다.'))
            );
          }

          node.appendChild(label);
        }
      });
    }
  };
  funcWrapper(makeCodeLanguageLabel)();

  // article tags
  const makeNewTagHTML = () => {
    const articleTagContainer = document.querySelector(
      '.article-tag-container'
    ) as HTMLDivElement;
    if (!articleTagContainer) return;
    articleTagContainer.innerHTML = articleTagContainer.innerHTML
      .split(',')
      .map((tagText) => tagText.trim())
      .join('');
  };
  funcWrapper(makeNewTagHTML)();

  const replyFormTextArea = document.querySelector(
    '.reply-form textarea'
  ) as HTMLTextAreaElement;
  if (!replyFormTextArea) return;
  replyFormIntersectionObserver.observe(replyFormTextArea);
};
