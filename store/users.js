export const state = () => ({
    users: [],
    user: {}
})

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    }
}

export const actions = {
    async fetchUsers(state) {
        let users = await this.$axios.$get(`v2/users/`)
        state.commit('setUsers', users.results)
    },
    async findUsers(state, username) {
        let users = await this.$axios.$get('v2/users/?search=' + username)
        state.commit('setUsers', users.results)
    },
    async findUser(state, id) {
        let response = await this.$axios.$get('v2/users/' + id)
        return response.data;
    }
}
