import Vue from 'vue';

function isBrowserExtensionNoise(error, message) {
  const text = [message, error && error.message, error && error.stack]
    .filter(Boolean)
    .join(' ');

  return (
    text.includes('a-share-modal') ||
    text.includes('message channel closed before a response was received') ||
    text.includes('A listener indicated an asynchronous response')
  );
}

function clearNuxtError(app) {
  if (app && app.nuxt && app.nuxt.err) {
    app.nuxt.err = null;
  }
}

export default function ({ app }) {
  window.addEventListener('error', (event) => {
    if (isBrowserExtensionNoise(event.error, event.message)) {
      event.preventDefault();
      clearNuxtError(app);
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (isBrowserExtensionNoise(reason, reason && reason.message)) {
      event.preventDefault();
      clearNuxtError(app);
    }
  });

  const previousErrorHandler = Vue.config.errorHandler;
  Vue.config.errorHandler = (err, vm, info) => {
    if (isBrowserExtensionNoise(err, err && err.message)) {
      clearNuxtError(app);
      return;
    }
    if (previousErrorHandler) {
      return previousErrorHandler(err, vm, info);
    }
  };

  // SPA navigations do not reload the page, so a one-off client error
  // must not keep the global Nuxt error banner visible on later routes.
  app.router.afterEach(() => {
    clearNuxtError(app);
  });
}
