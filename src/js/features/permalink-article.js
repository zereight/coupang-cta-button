import { copyClipboard, ignoreErrorWrapper } from '../util-service';

const codeNodeRestyling = () => {
  const preNodeList = document.querySelectorAll('.article-body pre');
  if (!preNodeList || preNodeList?.length === 0) return;

  const preBeforeNode = (language, codeForClipboard) => {
    const node = document.createElement('div');
    node.classList.add('pre-before-node');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('code-copy-button-wrapper');

    const copyButton = document.createElement('button');
    copyButton.classList.add('code-copy-button');
    copyButton.addEventListener('click', () => copyClipboard(codeForClipboard));
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
        <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
      </svg>`;

    buttonWrapper.appendChild(copyButton);

    node.innerHTML = `<div class="btn-wrapper">
      <div class="mac-btn red-mac-btn"></div>
      <div class="mac-btn orange-mac-btn"></div>
      <div class="mac-btn green-mac-btn"></div>
    </div>
    <div class="language">
      &lt;${language || 'code'} /&gt;
    </div>`;
    node.insertAdjacentElement('beforeend', buttonWrapper);
    return node;
  };

  preNodeList.forEach((preNode) => {
    if (!preNode) return;
    const language = preNode.getAttribute('data-ke-language') ?? '';
    preNode.insertAdjacentElement(
      'afterbegin',
      preBeforeNode(language, preNode.querySelector('code')?.innerText ?? '')
    );
  });
};

const aNodeRestyling = () => {
  const aNodeList = document.querySelectorAll('.article-body .tt_article_useless_p_margin p a');
  if (!aNodeList || aNodeList?.length === 0) return;
  aNodeList.forEach((aNode) => {
    const span = document.createElement('span');
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-box-arrow-up-right" viewbox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
      </svg>`;
    aNode.insertAdjacentElement('beforeend', span);
  });
};

const hNodeRestylingAndMakeToc = () => {
  const tocContainer = document.querySelector('#toc-container');
  if (!tocContainer) return;

  const hNodeList = document.querySelectorAll(
    ['h1', 'h2', 'h3', 'h4']
      .map((h) => `.article-body .tt_article_useless_p_margin ${h}`)
      .join(', ')
  );
  if (!hNodeList || hNodeList?.length === 0) return;

  const minLevel = Array.from(hNodeList).reduce((minLevel, node) => {
    const level = +node.nodeName.charAt(1);
    return Math.min(minLevel, level);
  }, 4);

  const tocList = [];
  let curLevelList = [0, 0, 0, 0];
  hNodeList.forEach((node) => {
    const level = +node.nodeName.charAt(1);
    curLevelList = [
      ...curLevelList.slice(0, level - 1),
      curLevelList[level - 1] + 1,
      ...curLevelList.slice(level, curLevelList.length).map((_) => 0),
    ];

    let trimedZero = false;
    let tocNumberStr = '';
    const tocNumberList = curLevelList.slice(minLevel - 1, curLevelList.length);
    for (let i = tocNumberList.length - 1; i >= 0; i--) {
      const num = tocNumberList[i];
      if (!trimedZero && num === 0) {
        continue;
      }
      trimedZero = true;
      tocNumberStr = `${num}.${tocNumberStr}`;
    }

    const headText = `<span class="number">${tocNumberStr}</span> ${node.innerText}`;
    const headId = `article-${
      [tocNumberStr, node.innerText]
        .join(' ')
        .trim()
        .replace(/\s|\.|\s+\./g, '-')
        .toLowerCase() ?? ''
    }`;
    node.innerHTML = `<a id="${headId}" href="#${headId}">${headText}</a>`;

    tocList.push({ id: headId, text: headText, className: `toc-item${level - minLevel + 1}` });
  });

  const toc = document.querySelector('#toc-container .toc-wrapper');
  if (!toc) return;
  toc.innerHTML = `<ul class="toc-list">
    ${tocList
      .map(
        (tocInfo) =>
          `<li class="${tocInfo.className}"><a id="${tocInfo.id}" href="#${tocInfo.id}">${tocInfo.text}</a></li>`
      )
      .join('\n')}
    </ul>`;

  tocContainer.style.display = 'block';
};

const runScripts = () => {
  codeNodeRestyling();
  aNodeRestyling();
  hNodeRestylingAndMakeToc();
};

const PermalinkArticle = {
  runScripts: ignoreErrorWrapper(runScripts, 'PermalinkArticle'),
};

export default PermalinkArticle;
