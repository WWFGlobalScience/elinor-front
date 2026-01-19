import { isOfflineModeEnabled } from '~/config/offline-mode';

export default function ({ store, app, $axios }) {
  const locale = app.i18n.locales.find(
    (i) => i.code === app.i18n.getLocaleCookie(),
  );
  $axios.setHeader('Accept-Language', (locale && locale.code) || 'en-US');

  // CRITICAL: Sync store state with runtime config
  // The store's initial state is set at module load time (build-time),
  // but we need to update it with the actual runtime config value
  // Priority: app.$config (runtime) > defaults to false
  // const runtimeOfflineModeEnabled = app.$config?.offlineMode === true || false;
  // store.commit('layout/setOfflineModeEnabled', runtimeOfflineModeEnabled);

  // // Check if offline mode feature flag is enabled using current store state
  // const offlineModeEnabled = store.state.layout.offlineModeEnabled;

  // Skip dispatching these actions when offline mode feature flag is enabled
  // This prevents API calls when OFFLINE_MODE=true regardless of explicit offline state
  // if (!offlineModeEnabled) {
    store.dispatch('attributes/fetchAttributes');
    store.dispatch('surveyquestions/fetchSurveyQuestions');
  // }

  store.dispatch('countries/load');
}
