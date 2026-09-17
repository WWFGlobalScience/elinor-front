import { isOfflineModeEnabled } from '~/config/offline-mode';

let isHandling401 = false;

const VALIDATION_STATUSES = [400, 422];

function getErrorNotificationText(error, offlineModeEnabled) {
  if (!error.response) {
    return offlineModeEnabled
      ? 'default.error.offlineMode'
      : 'default.error.network';
  }

  const status = error.response.status;

  if (status === 403) return 'default.error.forbidden';
  if (status === 404) return 'default.error.notFound';
  if (status === 409) return 'default.error.conflict';
  if (status === 429) return 'default.error.tooManyRequests';
  if (status >= 500) {
    return offlineModeEnabled
      ? 'default.error.offlineMode'
      : 'default.error.serverError';
  }

  return 'default.error.text';
}

function isValidationError(error) {
  const status = error.response && error.response.status;
  return VALIDATION_STATUSES.includes(status);
}

export default function ({ $axios, app, store }) {
  $axios.onError((error) => {
    // ALWAYS deactivate loader on any error - this ensures spinner stops immediately
    // when an error is detected, regardless of error type (401, 500, network errors, etc.)
    // This is done FIRST before any error type checking to ensure loader never stays active on errors
    // Use disableLoader mutation directly to forcefully set active to 0 (not decrement counter)
    // This prevents issues when multiple API calls are active simultaneously
    store.commit('loader/disableLoader');
    // Set error flag to prevent loader from being reactivated by other pending requests
    store.commit('loader/setErrorOccurred', true);

    const offlineModeEnabled = isOfflineModeEnabled(app);
    const status = error.response && error.response.status;

    // Handle 401 errors (unauthorized) - only once to prevent duplicate logout/toast
    if (status === 401 && !isHandling401) {
      isHandling401 = true;
      app.$auth.logout();
      app.$toast.info(app.i18n.t('statusMessaging.authentication.logoutError'));
      throw error;
    }

    // Validation errors (400/422) are handled by the calling form/action
    if (isValidationError(error)) {
      throw error;
    }

    console.error('[Axios] HTTP error detected:', error);

    store.commit('notifications/setNotification', {
      active: true,
      text: getErrorNotificationText(error, offlineModeEnabled),
      button: 'default.error.button',
    });

    throw error;
  });
}
