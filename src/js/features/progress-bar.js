const changeProgressBarWidthByScroll = () => {
  document.addEventListener('scroll', () => {
    const totalHeight = document?.scrollingElement?.scrollHeight;
    const currentY = window.scrollY + window.innerHeight;
    const rate = (currentY / totalHeight) * 100;
    const progressBar = document.querySelector('.progress-bar .fill');
    if (!progressBar?.style) return;
    progressBar.style.width = `${rate}%`;
  });
};

const runScripts = () => {
  changeProgressBarWidthByScroll();
};

const ProgressBar = { runScripts };
export default ProgressBar;
