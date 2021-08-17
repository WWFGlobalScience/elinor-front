<template>
    <article class="page page--assessments" v-if="loaded">
        <assessments-header></assessments-header>
        <assessments-create></assessments-create>
        <assessments-filters></assessments-filters>
        <assessments-results></assessments-results>
    </article>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'assessments',
    data() {
        return {
            loaderText: this.$t( 'loading.assessments' ),
            loaded: false
        }
    },
    async fetch () {
        await this.$store.dispatch( 'loader/loaderState', 'Loading assessments' )
        await this.$store.dispatch( 'assessments/fetchAssessments' )
        await this.$store.dispatch( 'managementareas/fetchMasVersions' )
        await this.$store.dispatch( 'users/fetchUsers' )
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
