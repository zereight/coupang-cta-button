import { ignoreErrorWrapper } from '../util-service';

const hideLoading = (retry = true) => {
  const loading = document.querySelector('#loading');
  if (!loading) {
    if (retry) {
      setTimeout(() => hideLoading(false), 1000);
    }
  }
  loading.style.display = 'none';
};

const runScripts = () => {
  hideLoading(true);
};

const Loading = {
  hideLoading,
  runScripts: ignoreErrorWrapper(runScripts, 'Loading'),
};

export default Loading;
