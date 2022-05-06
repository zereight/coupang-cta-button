const errHandle = (func, errHandler = undefined) => {
  try {
    return func;
  } catch (e) {
    console.error(e);
    if (!!errHandler) {
      errHandler(e);
    }
  }
};

const move = (url, target = '_self') => window.open(url, target);

const copy = (content) => navigator.clipboard.writeText(content);

const getBaseUrl = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

const initTheme = () => {
  const isDarkTheme = localStorage.getItem('theme') === 'dark';
  if (isDarkTheme) {
    document.querySelector('body').classList.add('dark-theme');
  }
};
errHandle(initTheme)();

window.onload = () => {
  const body = document.querySelector('body');

  // Theme Toggle
  const themeButton = document.querySelector('#theme-button');
  const sunIcon = document.querySelector('#theme-button .uil-sun');
  const moonIcon = document.querySelector('#theme-button .uil-moon');
  const initThemeIcon = () => {
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    if (isDarkTheme) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  };
  errHandle(initThemeIcon)();
  const toggleTheme = (e) => {
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
  themeButton.addEventListener('click', errHandle(toggleTheme));

  // blog menu
  const blogHomeMenu = document.querySelector('#blog-menu .home-menu');
  const blogTagMenu = document.querySelector('#blog-menu .tag-menu');
  const blogGuestbookMenu = document.querySelector(
    '#blog-menu .guestbook-menu'
  );
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
  errHandle(addActiveProperty)();

  // Search
  const searchInput = document.querySelector('#search');
  const search = (event) => {
    let searchValue = document.getElementsByName('search')[0].value;
    if (event.key === 'Enter') {
      window.open('/search/' + looseURIEncode(searchValue), '_self');
      return false;
    }
  };
  searchInput.addEventListener('keypress', errHandle(search));

  // Admin button
  const adminButton = document.querySelector('#admin-button');
  const moveAdminPage = (event) => {
    window.open('/manage', '_blank');
  };
  adminButton.addEventListener('click', errHandle(moveAdminPage));
};
