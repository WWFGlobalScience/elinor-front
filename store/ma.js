export const state = () => ({
  mas: [],
  ma: {},
  edit: {
    maOrigin: null,
    maSelector: {
      value: null,
      options: ['Management Area 1', 'Management Area 2', 'Management Area 3'],
    },
  },
});

export const mutations = {
  setMas(state, payload) {
    state.mas = payload;
  },
  setMa(state, payload) {
    state.ma = payload;
  },
  setFirstMa(state, payload) {
    state.ma = payload;
  },
  maSelectorChange(state, payload) {
    state.edit.maSelector.value = payload;
    state.edit.maOrigin = payload == null ? 'new' : 'old';
  },
  maSelectorNew(state) {
    state.edit.maOrigin = 'new';
  },
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export const actions = {
  async getMas(state) {
    try {
      const mas = await fetchJson(
        'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas',
      );
      state.commit('setMas', mas);
    } catch (error) {
      console.error('[getMas] Error:', error);
      this.commit(
        'notifications/setNotification',
        {
          active: true,
          text: 'default.error.network',
          button: 'default.error.button',
        },
        { root: true },
      );
    }
  },
  async getMa(state, id) {
    try {
      const ma = await fetchJson(
        `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas/${id}`,
      );
      state.commit('setMa', ma);
    } catch (error) {
      console.error('[getMa] Error:', error);
      this.commit(
        'notifications/setNotification',
        {
          active: true,
          text: 'default.error.network',
          button: 'default.error.button',
        },
        { root: true },
      );
    }
  },
  async getFirstMa(state) {
    try {
      const mas = await fetchJson(
        'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas',
      );
      state.commit('setFirstMa', mas[0]);
    } catch (error) {
      console.error('[getFirstMa] Error:', error);
      this.commit(
        'notifications/setNotification',
        {
          active: true,
          text: 'default.error.network',
          button: 'default.error.button',
        },
        { root: true },
      );
    }
  },
  maSelectorChange(state, value) {
    state.commit('maSelectorChange', value);
  },
  maSelectorNew(state) {
    state.commit('maSelectorNew');
    this.dispatch('ma/maSelectorChange', null);
  },
};
