export const state = () => ({
  loader: {
    active: 0,
    text: '',
    showText: false,
    errorOccurred: false, // Flag to prevent reactivation after errors
  },
});

export const mutations = {
  loaderState(state, { active, isOffline, text, showText }) {
    if (isOffline) {
      state.loader.active = 0;
    } else {
      // If an error occurred, prevent reactivating the loader
      if (state.loader.errorOccurred && active) {
        return;
      }
      const oldActive = state.loader.active;
      state.loader.active = Math.max(
        0,
        active ? state.loader.active + 1 : state.loader.active - 1,
      );
      // Debug logging to track loader counter
      if (oldActive !== state.loader.active) {
      }
    }

    state.loader.text = text || '';
    state.loader.showText = showText || false;
  },
  disableLoader(state) {
    const oldActive = state.loader.active;
    state.loader.active = 0;
    if (oldActive !== 0) {
    }
  },
  setErrorOccurred(state, value) {
    state.loader.errorOccurred = value;
  },
  setErrorOccurred(state, value) {
    state.loader.errorOccurred = value;
  },
};

export const actions = {
  loaderState(state, payload) {
    const isOffline = state.rootState.layout.offline;

    // Check if offline mode feature flag is enabled
    // This prevents loader from activating when OFFLINE_MODE=true
    const offlineModeEnabled =
      state.rootState.layout?.offlineModeEnabled || false;

    // Disable loader if offline mode is enabled OR if explicitly offline
    if (isOffline || offlineModeEnabled) {
      state.commit('disableLoader');
    } else {
      state.commit('loaderState', { ...payload, isOffline });
    }
  },
};
