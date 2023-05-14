/**
 * 더보기 쿠팡 약관
 * https://partners.coupang.com/#announcements/32
 */

const SKIP_COUNT_NUMBER = 5; // 5초 뒤에 광고스킵
const LOCAL_STORAGE_SKIP_TIME_KET = 'coupang-skip-time'; // 로컬스토리지에 저장할 쿠팡광고 마지막 노출 키값. 2시간동안 안보이게 한다. (약관임)
const AD_LINK = 'https://link.coupang.com/a/X7BMQ';

const drawButton = ($parentElement) => {
  const $container = document.createElement('div');
  $container.classList.add('cta-container');
  $container.classList.add('cta-button-floating');

  // custom coupang CTA button
  $container.innerHTML = `
            <button class="cta-button" type="button">
                버튼 누르고 바로 보기 <span class="cta-skip-count-number">${SKIP_COUNT_NUMBER}</span>
            </button>

            <div class="skip-text-container none">
                <span class="skip-text">
                    원치 않을 경우 <button class="skip-button" type="button">여기</button>를 눌러주세요
                </span>
            </div>
    `;

  const $ctaButton = $container.querySelector('.cta-button');

  // CTA 버튼 클릭했을때
  $ctaButton.addEventListener('click', () => {
    showContent();

    // 현재 광고를 확인한 시간을 저장한다.

    localStorage.setItem(LOCAL_STORAGE_SKIP_TIME_KET, Date.now());

    window.open(AD_LINK, '_blank');
  });

  // skip 버튼 클릭했을때
  const $skipButton = $container.querySelector('.skip-button');
  $skipButton.addEventListener('click', showContent);

  // 3초뒤에 5초카운트해서 스킵한다.
  let count = SKIP_COUNT_NUMBER;
  setTimeout(() => {
    const intervalId = setInterval(() => {
      count--;

      if (count === -1) {
        showSkipButton();
        clearInterval(intervalId);
      }

      const $countNumber = $container.querySelector('.cta-skip-count-number');
      if ($countNumber) {
        $countNumber.textContent = count >= 0 ? count : '';
      }
    }, 1000);
  }, 3000);

  $parentElement.appendChild($container);
};

const hideContent = ($content) => {
  $content.classList.add('content-hidden');
  $content.classList.add('hider');

  drawButton($content);
};

const showContent = () => {
  // cta 버튼 클릭이벤트달기
  const $root = document.querySelector('.article-body');
  const $ctaButton = $root.querySelector('.cta-button');
  const $skipButtonContainer = $root.querySelector('.skip-text-container');
  if ($ctaButton) $ctaButton.classList.add('none');
  if ($skipButtonContainer) $skipButtonContainer.classList.add('none');

  $root.classList.remove('content-hidden');
  $root.classList.remove('hider');
};

const showSkipButton = () => {
  const $root = document.querySelector('.article-body');
  const $skipButtonContainer = $root.querySelector('.skip-text-container');

  $skipButtonContainer.classList.remove('none');
};

const init = () => {
  const $content = document.querySelector('.article-body');

  const recentViewTime = localStorage.getItem(LOCAL_STORAGE_SKIP_TIME_KET);

  if (recentViewTime) {
    const currentTime = Date.now();

    const diff = currentTime - Number(recentViewTime);

    // 2시간을 ms로 표현
    const sec1 = 1000;
    const hoursCriteriaMx = 2 * 3600 * sec1; // 2시간을 ms로 표현

    if (diff <= hoursCriteriaMx) {
      // 2시간 안지나면 스킵
      return;
    } else {
      // 지나면 광고노출

      hideContent($content);
      localStorage.setItem(LOCAL_STORAGE_SKIP_TIME_KET, currentTime);
    }
  } else {
    hideContent($content);
  }
};

export default init;
