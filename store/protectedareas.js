export const state = () => ({
    list: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    }
}

export const actions = {
    async fetchProtectedAreas(state, search) {
        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v1/protectedareas/?search=' + search
            });

            state.commit('setList', response.data.results)
        } catch (e) {
            console.error(e);
        }
    }
}
