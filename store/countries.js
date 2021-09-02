export const state = () => ({
    list: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    }
}

export const actions = {
    async fetchCountries(state, search) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching countries...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v1/countries/?search=' + search
            });

            state.commit('setList', response.data.results)

            this.dispatch('loader/loaderState', {active: true})
        } catch (e) {
            console.error(e);
        }
    }
}
