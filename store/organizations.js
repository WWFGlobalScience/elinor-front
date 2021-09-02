import qs from "qs";

export const state = () => ({
    list: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    },
    addToList(state, payload) {
        state.list.unshift(payload);
    }
}

export const actions = {
    async fetchOrganizations(state, search) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching organizations...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v1/organizations/?search=' + search,
            });

            state.commit('setList', response.data.results)

            this.dispatch('loader/loaderState', {active: true})
        } catch (e) {
            console.error(e);
        }
    },
    async createOrganization(state, name) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating collaborator...'
        })

        this.$axios({
            method: 'post',
            url: 'v1/organizations/',
            data: { name }
        }).then(response => {
            state.commit('addToList', response.data)
        }).catch(error => console.log(error))
    },
}
