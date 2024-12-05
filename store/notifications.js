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
};

export const actions = {
    notificationsState(state) {
        state.commit('notificationsState');
    },
};
