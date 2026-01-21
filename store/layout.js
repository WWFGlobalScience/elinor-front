import { isOfflineModeEnabled } from '~/config/offline-mode';

export const state = () => ({
  sidebar: true,
  offline: false,
  mobileMenuOpen: false,
  isNetworkError: false,
  // CRITICAL: Default to false. This will be synced with runtime config (app.$config.offlineMode)
  // in the onload middleware. Must be set to false by default to ensure offline mode is opt-in
  offlineModeEnabled: false,
});

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setOffline(state, { isOffline }) {
    // Only allow setting offline state if feature flag is enabled
    // if (state.offlineModeEnabled) {
    //   state.offline = isOffline;
    // } else {
    //   state.offline = false;
    // }
    state.offline = isOffline;
  },
  setMobileMenuOpen(state, isOpen) {
    state.mobileMenuOpen = isOpen;
  },
  setOfflineModeEnabled(state, value) {
    // Update offline mode enabled state from runtime config
    // This ensures the store is in sync with the actual runtime configuration
    state.offlineModeEnabled = value === true;
  },
  setIsNetworkError(state, value) {
    state.isNetworkError = value;
  }
};

export const actions = {
  toggleSidebar(state) {
    state.commit('toggleSidebar');
  },
  setOffline(state, { isOffline }) {
    // Only allow setting offline state if feature flag is enabled
    // if (!state.state.offlineModeEnabled) {
    //   return;
    // }
    state.commit('setOffline', { isOffline });
    state.commit('loader/disableLoader', null, { root: true });
  },
  async checkNetworkStatus({ commit }) {
    try {
      await this.$axios.get('v2/assessments/');
      // If successful, we have network
      commit('setIsNetworkError', false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 404 means network is working (we got a response), just resource not found
        commit('setIsNetworkError', false);
      } else {
        // Other errors might indicate actual network issues
        commit('setIsNetworkError', true);
      }
    }
  },
  
};
