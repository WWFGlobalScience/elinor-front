
export const state = () => ({
    loader: {
        active: 0,
        text: ''
    }
})

export const mutations = {
    loaderState( state, {active, isOffline, text}) {
        if (isOffline) {
            state.loader.active = 0;
        } else {
            state.loader.active = Math.max(0, active ? state.loader.active + 1 : state.loader.active - 1);
        }

        state.loader.text = text || ''
    },
    disableLoader( state) {
        state.loader.active = 0;
    }
}

export const actions = {
    loaderState(state, payload) {
        const isOffline = state.rootState.layout.offline;
        if (isOffline) {
            state.commit('disableLoader')
        } else {
            state.commit('loaderState', { ...payload, isOffline })
        }
    }
}
