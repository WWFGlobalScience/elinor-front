import qs from 'qs';

export const state = () => ({
    list: [],
});

export const mutations = {
    setList(state, payload) {
        state.list = payload;
    },
    addToList(state, payload) {
        state.list.unshift(payload);
    },
};

export const actions = {
    async fetchOrganizations(state, search) {
        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v2/organizations/?search=' + search,
            });

            state.commit('setList', response.data.results);
        } catch (e) {
            console.error(e);
        }
    },
    async createOrganization(state, name) {
        const response = await this.$axios({
            method: 'post',
            url: 'v2/organizations/',
            data: { name },
        });
        const organization = response.data;
        state.commit('addToList', organization);
        return organization;
    },
};
