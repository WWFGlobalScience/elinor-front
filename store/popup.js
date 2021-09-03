export const state = () => ({
    popup: {
        active: false,
        component: '',
        title: 'default.filters.popup.title',
        type: 'default',
        props: null
    }
})

export const mutations = {
    popupState(state, {active, type, component, title, props}) {
        state.popup.active = active
        if (state.popup.active) {
            state.popup.component = component
            state.popup.title = title
            state.popup.type = type
            state.popup.props = props
        } else {
            state.popup.component = state.popup.component
            state.popup.title = state.popup.title
            state.popup.type = 'default'
        }
    }
}

export const actions = {
    popupState(state, {active, type, component, title, props}) {
        state.commit('popupState', {active, type, component, title, props});
    }
}
