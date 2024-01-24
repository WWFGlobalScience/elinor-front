export default ({ app, store, $auth }, inject) => {
    inject('isOffline', !!store.state.assessment?.offline)//!!$auth.user && store.state.assessment?.offline?.id === $auth.user?.id)
}
