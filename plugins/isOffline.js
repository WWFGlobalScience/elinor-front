import Vue from 'vue'

export default ({ app, store, $auth }, inject) => {
    inject('isOffline', Vue.observable({
        isOffline: $auth.loggedIn && store.getters['assessments/getAssessmentOffline']?.id === $auth.user?.id
    }))
}
