export const state = () => ({
    list: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    }
}

export const actions = {
    async fetchSupportSources(state, search) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching support sources...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v1/supportsources/?search=' + search
            });

            state.commit('setList', response.data.results)

            this.dispatch('loader/loaderState', {active: false})
        } catch (e) {
            console.error(e);
        }
    }
}
