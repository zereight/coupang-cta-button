window.onload = () => {
  const body = document.querySelector('body');
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
    btn.addEventListener('click', toggleTheme)
  );
};
