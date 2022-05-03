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
  const brightButton = document.querySelector('#bright-button');
  const moonButton = document.querySelector('#moon-button');

  const toggleTheme = (e) => {
    const isDarkTheme = body.classList.contains('dark-theme');

    if (isDarkTheme) {
      moonButton.style.display = 'none';
      brightButton.style.display = 'block';
      body.classList.remove('dark-theme');
    } else {
      brightButton.style.display = 'none';
      moonButton.style.display = 'block';
      body.classList.add('dark-theme');
    }
  };

  [brightButton, moonButton].map((btn) =>
    btn.addEventListener('click', errHandle(toggleTheme))
  );

  // Search
  const searchInput = document.querySelector('#search');
  const search = (event) => {
    let searchValue = document.getElementsByName('search')[0].value;
    if (event.key === 'Enter') {
      window.location.href = '/search/' + looseURIEncode(searchValue);
      searchValue = '';
      return false;
    }
  };
  searchInput.addEventListener('keypress', errHandle(search));
};
