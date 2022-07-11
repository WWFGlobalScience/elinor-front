<template>
    <article class="page page--documentation" v-if="loaded">

        <div class="page--assessments__top">
            <img src="~/assets/img/assessment-bg.svg" alt="assessment top bg" class="page--assessments__top-img">
            <documentation-header></documentation-header>
        </div>

        <div class="container">
            <documentation-intro/>
            <documentation-title/>
        </div>

        <section class="section section--mt-medium section--documentation">
            <div class="container">
                <documentation-card/>
                <div class="row-btn">
                    <documentation-btn-more/>
                </div>
            </div>
        </section>
    </article>
</template>



<script>
import { mapState } from 'vuex'
export default {
    name: 'documentation',
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
