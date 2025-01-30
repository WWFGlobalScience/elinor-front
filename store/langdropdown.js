export const state = () => ({
    langdropdown: true,
});

export const mutations = {
    toggleLangDropdown(state) {
        state.langdropdown = !state.langdropdown;
    },
    closeDropdown(state) {
        state.langdropdown = true;
    }
};

export const actions = {
    toggleLangDropdown(state) {
        state.commit('toggleLangDropdown');
    },
    closeDropdown(state) {
        state.commit('closeDropdown');
    }
};
