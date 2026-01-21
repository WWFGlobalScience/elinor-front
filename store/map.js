export const state = () => ({
  // Note: list and countrySourceData are excluded from vuex-persist to prevent localStorage quota issues
  list: [],
  filters: { country: undefined, attribute: undefined, range: undefined },
  countrySourceData: { coordinates: [] },
});

export const mutations = {
  setList(state, payload) {
    state.list = payload;
  },
  addFilter(state, { name, value }) {
    state.filters[name] = value;
  },
  removeFilter(state, payload) {
    state.filters[payload] = undefined;
  },
  resetFilters(state) {
    state.filters = {
      country: undefined,
      attribute: undefined,
      range: undefined,
    };
  },
  setCountrySourceData(state, coordinates) {
    state.countrySourceData = { coordinates: coordinates };
  },
};

export const actions = {
  async fetchMap(state) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Getting map data...',
    });

    try {
      const response = await this.$axios({
        method: 'get',
        url: 'v2/reports/assessments/geojson/',
      });
      state.commit('resetFilters');
      // console.log('response.data.features', response.data.features.filter(f => f.properties.published_version));
      state.commit('setList', response.data.features.filter(f => f.properties.published_version));
    } finally {
      this.dispatch('loader/loaderState', {
        active: false,
        text: '',
      });
    }
  },

  filter(state, { name, value }) {
    state.commit('resetFilters');
    state.commit('addFilter', { name, value });
  },
  removeFilter(state, filterName) {
    state.commit('removeFilter', filterName);
  },
  resetFilters(state) {
    state.commit('resetFilters');
  },
  updateCountrySourceData(state, coordinates) {
    state.commit('setCountrySourceData', coordinates);
  },
};
