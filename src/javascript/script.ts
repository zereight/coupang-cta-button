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

window.onload = () => {
  const body: HTMLBodyElement = document.querySelector(
    'body'
  ) as HTMLBodyElement;

  // Theme Toggle
  const themeButton = document.querySelector(
    '#theme-button'
  ) as HTMLButtonElement;
  const sunIcon = document.querySelector(
    '#theme-button .uil-sun'
  ) as HTMLElement;
  const moonIcon = document.querySelector(
    '#theme-button .uil-moon'
  ) as HTMLElement;
  const initThemeIcon = (): void => {
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    if (isDarkTheme) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  };
  funcWrapper(initThemeIcon)();
  const toggleTheme = (e: Event) => {
    const isDarkTheme = body.classList.contains('dark-theme');
    if (isDarkTheme) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      body.classList.remove('dark-theme');
      localStorage.removeItem('theme');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  };
  themeButton.addEventListener('click', funcWrapper(toggleTheme));

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
      tocContainer.style.width = '200px';
      const tocWrapper: HTMLDivElement = document.querySelector(
        '#toc-container .toc-wrapper'
      ) as HTMLDivElement;
      tocContainer.style.width = '200px';
      tocWrapper.style.display = 'inline-block';
    }
  };
  funcWrapper(showToc)();

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
