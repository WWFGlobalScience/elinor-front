export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title'
    }  
})

export const mutations = {
    popupState( state, { active, component, title } ) {
        state.popup.active = active
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
    popupState( state, { active, component, title } ) {
        console.log( 'Click' )
        state.commit( 'popupState', {
            active: active, 
            component: component,
            title: title
        })
    }
}