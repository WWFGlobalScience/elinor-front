import Vue from 'vue'

export default ({ app, store, $auth }, inject) => {
    inject('isOffline', !!$auth.user && store.getters['assessments/getAssessmentOffline']?.id === $auth.user?.id)
}
