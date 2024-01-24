export const state = () => ({
    sidebar: true,
    offline: false
})

export const mutations = {
    toggleSidebar( state ) {
        state.sidebar = !state.sidebar
    },
    setOffline( state, {isOffline} ) {
        state.offline = isOffline
    }
}

export const actions = {
    toggleSidebar( state ) {
        state.commit( 'toggleSidebar' )
    },
    setOffline( state, { isOffline } ) {
        state.commit( 'setOffline', { isOffline })
    }
}
