export const state = () => ({
    dropdown: true,
});

export const mutations = {
    toggleDropdown(state) {
        state.dropdown = !state.dropdown;
    },
    closeDropdown(state) {
        state.dropdown = true;
    }
};

export const actions = {
    toggleDropdown(state) {
        state.commit('toggleDropdown');
    },
    closeDropdown(state) {
        state.commit('closeDropdown');
    }
};
