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
  async fetchStakeholderGroups(state, search) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'statusMessaging.loader.stakeholdergroups.fetchingStakeHolderGroups',
    });

    try {
      const response = await this.$axios({
        method: 'get',
        url: 'v2/stakeholdergroups/?search=' + search,
      });

      state.commit('setList', response.data.results);

      this.dispatch('loader/loaderState', { active: false });
    } catch (e) {
      toastApiError(this, e);
    }
  },
};
