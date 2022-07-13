export const state = () => ({
    list: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    }
}

export const actions = {
    async fetchAttributes(state) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching attributes...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v2/attributes/?ordering=order'
            });

            state.commit('setList', response.data.results)

            this.dispatch('loader/loaderState', {active: false})
        } catch (e) {
            console.error(e);
        }
    }
}
