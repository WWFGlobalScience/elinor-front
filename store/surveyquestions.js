export const state = () => ({
  list: [],
});

export const mutations = {
  setList(state, payload) {
    state.list = payload;
  },
};

import { getOfflineModeFromStore } from '~/config/offline-mode';

export const actions = {
  async fetchSurveyQuestions(state) {
    // Check if offline mode feature flag is enabled using centralized utility
    const offlineModeEnabled = getOfflineModeFromStore(
      state.rootState.layout,
      this.app,
    );

    // Skip API call when offline mode feature flag is enabled
    // This prevents API calls when OFFLINE_MODE=true regardless of explicit offline state
    if (offlineModeEnabled) {
      // Ensure loader is deactivated when skipping API call
      this.dispatch('loader/loaderState', { active: false });
      return;
    }

    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Fetching questions...',
    });

    try {
      const response = await this.$axios({
        method: 'get',
        url: 'v2/surveyquestionlikerts/',
      });

      state.commit('setList', response.data.results);
      // Reset error flag on successful request
      this.commit('loader/setErrorOccurred', false, { root: true });
      // Deactivate loader on success
      this.dispatch('loader/loaderState', { active: false });
    } catch (e) {
      console.error('[fetchSurveyQuestions] Error:', e);
      // Error handling is done in axios plugin (onError interceptor)
      // which will show user-friendly error notification and forcefully deactivate loader
      // No need to deactivate loader here - axios interceptor already handled it
    }
  },
};
