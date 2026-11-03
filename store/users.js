import { toastApiError } from '~/config/api-error';

export const state = () => ({
  users: [],
  user: {},
});

export const mutations = {
  setUsers(state, payload) {
    state.users = payload;
  },
};

export const actions = {
  async fetchUsers(state) {
    try {
      let users = await this.$axios.$get(`v2/users/`);
      state.commit('setUsers', users.results);
    } catch (error) {
      toastApiError(this, error);
    }
  },
  async findUsers(state, username) {
    try {
      let users = await this.$axios.$get('v2/users/?search=' + username);
      state.commit('setUsers', users.results);
    } catch (error) {
      toastApiError(this, error);
    }
  },
  async findUser(state, id) {
    try {
      let response = await this.$axios.$get('v2/users/' + id);
      return response.data;
    } catch (error) {
      toastApiError(this, error);
    }
  },
};
