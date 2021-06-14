export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title'
    }  
})

export const mutations = {
    popupState( state, { component, title } ) {
        state.popup.active = !state.popup.active
        if (state.popup.active ) {
            state.popup.component = component
            state.popup.title = title
        }  else {
            state.popup.component = state.popup.component
            state.popup.title = state.popup.title
        }
    }
}

export const actions = {
    popupState( state, { component, title } ) {
        state.commit( 'popupState', { 
            component: component,
            title: title
        })
    }
}