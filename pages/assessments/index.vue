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
            loaderText: this.$t( 'loading.assessments' ),
            loaded: false
        }
    },
    async mounted() {
        await this.$store.dispatch( 'loader/loaderState', 'Loading assessments' )
        await this.$store.dispatch( 'assessments/fetchAssessments' )
        await this.$store.dispatch( 'loader/loaderState', '' )
        this.loaded = true

    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            loader: state => state.loader
        })
    }
}
</script>
