
export const state = () => ({
    loader: {
        active: 0,
        text: ''
    }
})

export const mutations = {
    loaderState( state, {active, text}) {
        state.loader.active = active ? state.loader.active + 1 : state.loader.active - 1;
        state.loader.text = text || ''
    }
}

export const actions = {
    loaderState(state, payload) {
        state.commit( 'loaderState', payload )
    }
}
