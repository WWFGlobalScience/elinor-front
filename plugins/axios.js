import { isOfflineModeEnabled } from '~/config/offline-mode';

let isHandling401 = false;

export default function ({ $axios, app, store, $nuxt }) {
  $axios.onError((error) => {
    // ALWAYS deactivate loader on any error - this ensures spinner stops immediately
    // when an error is detected, regardless of error type (401, 500, network errors, etc.)
    // This is done FIRST before any error type checking to ensure loader never stays active on errors
    // Use disableLoader mutation directly to forcefully set active to 0 (not decrement counter)
    // This prevents issues when multiple API calls are active simultaneously
    store.commit('loader/disableLoader');
    // Set error flag to prevent loader from being reactivated by other pending requests
    store.commit('loader/setErrorOccurred', true);

    // Check if offline mode is enabled using centralized utility
    const offlineModeEnabled = isOfflineModeEnabled(app);

    // Handle 401 errors (unauthorized) - only once to prevent duplicate logout/toast
    if (error.response && error.response.status === 401 && !isHandling401) {
      isHandling401 = true;
      app.$auth.logout();
      app.$toast.info(app.i18n.t('statusMessaging.authentication.logoutError'));
      throw error;
    }

    // Handle 500 errors (Internal Server Error)
    if (error.response && error.response.status === 500) {
      console.error('[Axios] 500 error detected:', error);

      // Show user-friendly error notification
      if (offlineModeEnabled) {
        // When offline mode is enabled, show offline-specific message
        store.commit('notifications/setNotification', {
          active: true,
          text: 'default.error.offlineMode',
          button: 'default.error.button',
        });
      } else {
        // When offline mode is disabled, show general server error message
        store.commit('notifications/setNotification', {
          active: true,
          text: 'default.error.serverError',
          button: 'default.error.button',
        });
      }

      // Don't throw error to prevent further error handling
      return Promise.reject(error);
    }

    // Handle network errors (no response object) - loader already deactivated above
    if (!error.response) {
      console.error('[Axios] Network error detected:', error);
      // Loader is already deactivated, allow error to propagate for component-level handling
    }

    // For all other errors (400, 403, 404, etc.), loader is already deactivated above
    // Allow normal error handling to proceed in components
    throw error;
  });
}
