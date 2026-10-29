import { toastApiError } from '~/config/api-error';

export const state = () => ({
  list: [],
});

export const mutations = {
  setList(state, payload) {
    state.list = payload;
  },
};

export const actions = {
  async fetchSupportSources(state, search) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'statusMessaging.loader.supportsources.fetchingSupportSources',
    });

    try {
      const response = await this.$axios({
        method: 'get',
        url: 'v2/supportsources/?search=' + search,
      });

      state.commit('setList', response.data.results);

      this.dispatch('loader/loaderState', { active: false });
    } catch (e) {
      toastApiError(this, e);
    }
  },
};
