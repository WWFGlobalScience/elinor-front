<template>
    <article class="page page--flushed" v-if="loaded">

        <news-header/>

        <section class="section section--mt-medium section--news">
            <div class="container">
                <news-title/>
                <news-card/>
                <div class="row-btn row-btn--center">
                    <news-btn-more/>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'news',
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
