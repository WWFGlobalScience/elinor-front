export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title',
        type:'default'
    }  
})

export const mutations = {
    popupState( state, { active, type, component, title } ) {
        state.popup.active = active
        if (state.popup.active ) {
            state.popup.component = component
            state.popup.title = title
            state.popup.type = type
        }  else {
            state.popup.component = state.popup.component
            state.popup.title = state.popup.title
            state.popup.type = 'default'
        }
    }
}

export const actions = {
    popupState( state, { active, type, component, title } ) {
        console.log( 'Click' )
        state.commit( 'popupState', {
            active: active, 
            component: component,
            title: title,
            type: type
        })
    }
}