export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title',
        type:'default',
        onConfirm: null
    }
})

export const mutations = {
    popupState( state, { active, type, component, title, onConfirm } ) {
        state.popup.active = active
        if (state.popup.active ) {
            state.popup.component = component
            state.popup.title = title
            state.popup.onConfirm = onConfirm
        }  else {
            state.popup.component = state.popup.component
            state.popup.title = state.popup.title
            state.popup.onConfirm = null
            state.popup.type = 'default'
        }
    }
}

export const actions = {
    popupState( state, { active, type, component, title, onConfirm  } ) {
        state.commit( 'popupState', {
            active: active,
            component: component,
            title: title,
            onConfirm: onConfirm,
            type: type
        })
    }
}
