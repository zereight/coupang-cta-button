import { ignoreErrorWrapper } from '../util-service';

const applyObserverReplyContainer = () => {
  const replyContainerObserver = new IntersectionObserver((entries, observer) => {
    const ratio = entries[0]?.intersectionRatio || 0;
    const recommendArticleCards = document.querySelectorAll('.recommend-article-card-container');
    if (ratio > 0) {
      recommendArticleCards?.forEach((card) => {
        if (!card) return;
        card.style.bottom = '100px';
      });
    } else {
      recommendArticleCards?.forEach((card) => {
        if (!card) return;
        card.style.bottom = '-800px';
      });
    }
  });

  const replyContainer = document.querySelector('.reply-container');
  if (!replyContainer) return;
  replyContainerObserver.observe(replyContainer);
};

const runScripts = () => {
  applyObserverReplyContainer();
};

const RecommendArticleCard = {
  runScripts: ignoreErrorWrapper(runScripts, 'RecommendArticleCard'),
};

export default RecommendArticleCard;
