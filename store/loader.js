export const state = () => ({
    loader: {
        active: false,
        text: ''
    }  
})

export const mutations = {
    loaderState( state, { active, text } ) {
        state.loader.active = active
        state.loader.text = text
    }
}

export const actions = {
    loaderState( state, { active, text }  ) {
        state.commit( 'loaderState', { 
            active: active,
            text: text
        })
    }
}