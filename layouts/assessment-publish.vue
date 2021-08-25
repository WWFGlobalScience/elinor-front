<template>
    <div id="app">
        <div :class="[ 'app__content', { 'is--overlay': popup.active } ]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <article class="page page--assessment">
                    <assessment-header :assessment="assessment"></assessment-header>
                    <assessment-tabs :id="id"></assessment-tabs>
                    <Nuxt />
                </article>
            </main>
        </div>
        <default-loader></default-loader>
        <popup-default-min></popup-default-min>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'layout-assessment-publish',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        },
        loader() {
            return this.$store.state.loader.loader
        },
        popup() {
            return this.$store.state.popup.popup
        }
    },
    methods: {
        ...mapActions({
            getAssessment: 'assessments/getAssessment',
            getFirstMa: 'ma/getFirstMa'
        })
    },
    created() {
        this.getAssessment( this.id )
        this.getFirstMa()
    }
}
</script>