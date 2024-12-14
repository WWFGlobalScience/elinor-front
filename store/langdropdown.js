export const state = () => ({
    langdropdown: true,
});

export const mutations = {
    toggleLangDropdown(state) {
        state.langdropdown = !state.langdropdown;
    },
};

export const actions = {
    toggleLangDropdown(state) {
        state.commit('toggleLangDropdown');
    },
};
