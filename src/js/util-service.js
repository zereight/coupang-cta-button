export const defEventHandler = (ref, eventType, listener) => {
  const element = document.querySelector(ref);
  if (element) {
    return element?.addEventListener('click', listener);
  }
  return console.error(`Not find element. ref: ${ref}, event type: ${eventType}`);
};

export const copyClipboard = (text) => {
  if (!text) return;
  window.navigator.clipboard.writeText(text);
};

export const throttle = (callback, timeout = 100) => {
  let timeoutId;
  return () => {
    if (!!timeoutId) return;
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, timeout);
  };
};

export const debounce = (callback, timeout = 100) => {
  let timeoutId;
  return () => {
    if (!!timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback();
    }, timeout);
  };
};

export const openTab = (link, newTab = true) => window.open(link, newTab ? '_blank' : null);

export const ignoreErrorWrapper =
  (func, logTitle = '') =>
  () => {
    try {
      func();
    } catch (e) {
      console.error(`[${logTitle}] error stack\n`, e);
    }
  };
