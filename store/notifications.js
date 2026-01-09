export const state = () => ({
  notifications: {
    active: false,
    text: 'default.error.text',
    button: 'default.error.button',
  },
});

export const mutations = {
  notificationsState(state) {
    state.notifications.active = !state.notifications.active;
  },
  setNotification(state, payload) {
    state.notifications.active =
      payload.active !== undefined ? payload.active : true;
    state.notifications.text = payload.text || 'default.error.text';
    state.notifications.button = payload.button || 'default.error.button';
  },
  clearNotification(state) {
    state.notifications.active = false;
  },
};

export const actions = {
  notificationsState(state) {
    state.commit('notificationsState');
  },
  setNotification(state, payload) {
    state.commit('setNotification', payload);
  },
  clearNotification(state) {
    state.commit('clearNotification');
  },
};
