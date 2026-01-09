export const state = () => ({
  sent: false,
  errors: {},
});

export const mutations = {
  setSent(state, payload) {
    state.sent = payload;
  },
  setErrors(state, payload) {
    state.errors = payload;
  },
};

export const actions = {
  reset({ commit }) {
    commit('setSent', false);
    commit('setErrors', {});
  },
  async contact(state, { name, subject, email, message, recaptcha }) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Sending contact...',
    });

    try {
      let url = 'v2/contactelinoradmins';
      const data = { name, subject, email, message, recaptcha };
      const response = await this.$axios({ method: 'post', url, data });
      state.commit('setSent', true);
    } catch (error) {
      state.commit('setSent', false);
      state.commit('setErrors', error.response.data);
    } finally {
      this.dispatch('loader/loaderState', { active: false });
    }
  },
};
