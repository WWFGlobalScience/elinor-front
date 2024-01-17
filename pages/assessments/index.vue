<template>
    <article class="page page--assessments" v-if="loaded">
        <div class="page--assessments__top">
            <img src="~/assets/img/assessment-bg.svg" alt="assessment top bg" class="page--assessments__top-img">
            <assessments-header></assessments-header>
            <assessments-create v-if="$auth.loggedIn"></assessments-create>
        </div>
        <assessments-filters></assessments-filters>
        <assessments-results></assessments-results>
    </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'assessments',
    auth: false,
    data() {
        return {
            loaded: false,
        }
    },
    async mounted() {
        if (this.$isOffline.isOffline && this.assessmentId) {
          return this.$router.push(`/assessments/edit/${this.assessmentId}/the-survey`)
        }
        if(localStorage.getItem('onboarding') !== '0' && this.$auth.loggedIn) {
            this.$store.dispatch('popup/popupState', { active: true, type: 'onboarding', component: 'popup-assessment-onboarding', title: 'pages.assessments.list.create.popup.title' });
        }
        this.$store.dispatch( 'loader/loaderState', {
            active: true,
            text: 'Loading assessments...'
        } )
        await this.$store.dispatch( 'assessments/fetchAssessments' )
        this.$store.dispatch( 'loader/loaderState', {active: false} )
        this.loaded = true;

    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            loader: state => state.loader,
            onboarding: state => state.assessments.onboarding,
            assessmentId: state => state.assessments.assessment.id,
        })
    }
}
</script>
