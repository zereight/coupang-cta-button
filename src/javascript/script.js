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

window.onload = () => {
  const body = document.querySelector('body');

  // Theme Toggle
  const themeButton = document.querySelector('#theme-button');
  const toggleTheme = (e) => {
    const isDarkTheme = body.classList.contains('dark-theme');
    const sunIcon = document.querySelector('#theme-button .uil-sun');
    const moonIcon = document.querySelector('#theme-button .uil-moon');

    if (isDarkTheme) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      body.classList.remove('dark-theme');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      body.classList.add('dark-theme');
    }
  };
  themeButton.addEventListener('click', errHandle(toggleTheme));

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
