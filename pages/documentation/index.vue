<template>
    <article class="page page--assessments" v-if="loaded">
        <div class="page--assessments__top">
            <img src="~/assets/img/assessment-bg.svg" alt="assessment top bg" class="page--assessments__top-img">
            <documentation-header></documentation-header>
        </div>
        <div class="container">
            <documentation-intro></documentation-intro>
            <documentation-title></documentation-title>
        </div>

        <documentation-cards></documentation-cards>
    </article>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'assessments',
    auth: false,
    data() {
        return {loaded: false}
    },
    async mounted() {
        console.log(localStorage.getItem('onboarding'));
        if(localStorage.getItem('onboarding') !== '0') {
            this.$store.dispatch('popup/popupState', { active: false, type: 'onboarding', component: 'popup-assessment-onboarding', title: 'pages.assessments.list.create.popup.title' });
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
            onboarding: state => state.assessments.onboarding
        })
    }
}
</script>
