export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title',
        type: 'default',
        props: null,
        onConfirm: null
    }
})

export const mutations = {
    popupState(state, {active, type, component, title, onConfirm, props}) {
        state.popup.active = active
        if (state.popup.active) {
            state.popup.component = component
            state.popup.title = title
            state.popup.type = type
            state.popup.props = props
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
    popupState( state, { active, type, component, title, onConfirm, props  } ) {
        state.commit( 'popupState', {
            active: active,
            component: component,
            title: title,
            onConfirm: onConfirm,
            type: type,
            props: props
        })
    }
}
