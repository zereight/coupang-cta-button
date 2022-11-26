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

export const openTab = (link, newTab = true) => window.open(link, newTab ? '_blank' : null);
