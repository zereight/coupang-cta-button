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
    console.error(e);
    if (!!errHandler && e instanceof Error) {
      errHandler(e);
    }
  }
};

const initTheme = (): void => {
  const isDarkTheme = localStorage.getItem('theme') === 'dark';
  if (isDarkTheme) {
    const bodyTag = document.querySelector('body') as HTMLBodyElement;
    bodyTag.classList.add('dark-theme');
  }
};
funcWrapper(initTheme)();

const move = (url: string, target = '_self') => window.open(url, target);

const copy = (content: string) => navigator.clipboard.writeText(content);

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

  if (entries[0].intersectionRatio === 0) {
    scrollTopButton.style.bottom = '100px';
    floatThemeButton.style.bottom = '180px';
    subscribeButton.style.bottom = '260px';
  } else {
    scrollTopButton.style.bottom = '-500px';
    floatThemeButton.style.bottom = '-500px';
    subscribeButton.style.bottom = '-500px';
  }
});

window.onload = () => {
  const body: HTMLBodyElement = document.querySelector(
    'body'
  ) as HTMLBodyElement;

  // Theme Toggle
  const themeButton = document.querySelector(
    '#theme-button'
  ) as HTMLButtonElement;
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
  themeButton.addEventListener('click', funcWrapper(toggleTheme));
  floatThemeButton.addEventListener('click', funcWrapper(toggleTheme));

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
  scrollTopButton.addEventListener('click', funcWrapper(onClickScrollTop));

  // TOC
  const showToc = (): void => {
    if (['', '/'].includes(window?.location?.pathname ?? '/')) {
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
      '.article h1, .article h2, .article h3'
    ) as NodeListOf<Element>;

    const tocWrapper = document.querySelector('.toc-wrapper');
    if (!tocWrapper) return;

    let minLevel: number = 5;
    let prefixNums = [0, 0, 0];
    const tocList = Array.from(articleHeadTags)
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
          node.addEventListener(
            'click',
            funcWrapper(() => (window.location.href = `#${text}`))
          );
        }

        tocWrapper.appendChild(tag);
        return tag;
      });
  };
  funcWrapper(makeToc)();

  const subscribeButton = document.querySelector(
    '.container_postbtn .btn_subscription'
  ) as HTMLButtonElement;
  if (subscribeButton) {
    subscribeButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
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
  searchInput.addEventListener('keypress', funcWrapper(search));

  // Admin button
  const adminButton = document.querySelector(
    '#admin-button'
  ) as HTMLButtonElement;
  const moveAdminPage = (event: MouseEvent) => {
    window.open('/manage', '_blank');
  };
  adminButton.addEventListener('click', funcWrapper(moveAdminPage));
};
