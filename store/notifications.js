export const state = () => ({
    notifications: {
        active: true,
        success: true,
        text: '' 
    }
})

export const mutations = {
    notificationsState( state, { text, success } ) {
        state.notifications.active = !state.notifications.active
        state.notifications.success = success
        state.notifications.text = text
    }
}

export const actions = {
    notificationsState( state, { text, success } ) {
        state.commit( 'notificationsState', { 
            text: text,
            success: success
        })
    }
}