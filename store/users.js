export const state = () => ({
    users: [],
    user: {}
})

export const mutations = {
    setUsers( state, payload ) {
        state.users = payload
    }
}

export const actions = {
    async fetchUsers( state ) {
        let users = await this.$axios.$get( `v1/users/` )
        state.commit( 'setUsers', users )
    }
}
