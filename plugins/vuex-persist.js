import VuexPersistence from 'vuex-persist';
import { LOCAL_STORAGE_KEY } from '~/config/localStorageKey';

export default ({ store }) => {
  new VuexPersistence({
    key: LOCAL_STORAGE_KEY,
    storage: {
      getItem: (key) => {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          console.warn('Failed to get item from localStorage:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          if (error.name === 'QuotaExceededError') {
            console.warn(
              'localStorage quota exceeded, clearing old data and retrying...',
            );
            try {
              // Clear old data and retry
              localStorage.clear();
              localStorage.setItem(key, value);
            } catch (retryError) {
              console.error(
                'Failed to save to localStorage even after clearing:',
                retryError,
              );
            }
          } else {
            console.error('Failed to save to localStorage:', error);
          }
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn('Failed to remove item from localStorage:', error);
        }
      },
    },
    reducer: (state) => {
      const stateCopy = { ...state };

      if (stateCopy.assessments) {
        // remove search property from state
        const { search, ...assessmentsPropertiesToPersist } =
          stateCopy.assessments;
        stateCopy.assessments = assessmentsPropertiesToPersist;
      }

      // Exclude map state to prevent localStorage quota issues
      if (stateCopy.map) {
        const { list, countrySourceData, ...mapPropertiesToPersist } =
          stateCopy.map;
        stateCopy.map = mapPropertiesToPersist;
      }

      // CRITICAL: Exclude offlineModeEnabled from persistence
      // This must be determined at runtime from app.$config (set from OFFLINE_MODE env var)
      // Persisting it causes stale values to override the runtime configuration
      if (stateCopy.layout) {
        const { offlineModeEnabled, ...layoutPropertiesToPersist } =
          stateCopy.layout;
        stateCopy.layout = layoutPropertiesToPersist;
      }

      return stateCopy;
    },
  }).plugin(store);
};
