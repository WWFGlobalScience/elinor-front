export const state = () => ({
    loader: {
        active: false,
        text: ''
    }  
})

export const mutations = {
    loaderState( state, text ) {
        state.loader.active = !state.loader.active
        state.loader.text = text
    }
}

export const actions = {
    loaderState( state, text  ) {
        state.commit( 'loaderState', text )
    }
}