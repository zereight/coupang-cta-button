import { copyClipboard } from '../util-service';

const codeTagRestyling = () => {
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

const runScripts = () => {
  codeTagRestyling();
};

const CommonArticle = {
  runScripts,
};

export default CommonArticle;
