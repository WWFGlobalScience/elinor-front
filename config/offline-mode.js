/**
 * Centralized utility for determining offline mode status
 *
 * ⚠️  IMPORTANT: Default behavior: OFFLINE_MODE is disabled (false) unless explicitly set to 'true'
 * This ensures that offline mode is opt-in rather than opt-out
 *
 * NOTE: This function is primarily for build-time configuration. For runtime access,
 * use app.$config.offlineMode directly, which is set in nuxt.config.js publicRuntimeConfig
 *
 * @param {Object} context - Optional context object (e.g., Vue app instance, Nuxt context)
 * @returns {boolean} - true if offline mode is enabled, false otherwise (defaults to false)
 */
export const isOfflineModeEnabled = (context = null) => {
  // Priority 1: Check runtime config (available in client-side via app.$config)
  // This is set in nuxt.config.js publicRuntimeConfig
  if (context && context.$config && context.$config.offlineMode !== undefined) {
    return context.$config.offlineMode === true;
  }

  // Priority 2: Check process.env (available at build-time/server-side)
  // Only enable if explicitly set to 'true'
  if (
    typeof process !== 'undefined' &&
    process.env &&
    process.env.OFFLINE_MODE !== undefined
  ) {
    return process.env.OFFLINE_MODE === 'true';
  }

  // Default: offline mode is disabled (FALSE)
  return false;
};

/**
 * Get offline mode status from Vuex store layout state
 * Falls back to checking config/environment if store value is undefined
 *
 * @param {Object} storeState - Vuex store state (e.g., store.state.layout)
 * @param {Object} context - Optional context object (e.g., Vue app instance)
 * @returns {boolean} - true if offline mode is enabled, false otherwise
 */
export const getOfflineModeFromStore = (storeState, context = null) => {
  // If store has explicit value, use it
  if (storeState && storeState.offlineModeEnabled !== undefined) {
    return storeState.offlineModeEnabled === true;
  }

  // Otherwise, fall back to checking config/environment
  return isOfflineModeEnabled(context);
};
