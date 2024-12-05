export const state = () => ({
    dropdown: true,
});

export const mutations = {
    toggleDropdown(state) {
        state.dropdown = !state.dropdown;
    },
};

export const actions = {
    toggleDropdown(state) {
        state.commit('toggleDropdown');
    },
};
