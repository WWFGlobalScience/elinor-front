<template>
    <div id="app">
        <div :class="[ 'app__content', { 'is--overlay': popup.active } ]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <article class="page page--assessment-edit">
                    <assessment-edit-header></assessment-edit-header>
                    <assessment-edit-tabs :id="$route.params.id"></assessment-edit-tabs>
                    <Nuxt />
                </article>
                <default-footer></default-footer>
            </main>
        </div>
        <default-loader></default-loader>
        <popup-default></popup-default>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'layout-assessment-edit',
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
            fetchAssessment: 'assessments/fetchAssessment',
        })
    },
    watch: {
        assessment(assessment) {
            if(assessment && assessment.status === 10) {
                this.$router.push(`/assessments/${this.$route.params.id}/info`)
            }
        }
    },
    created() {
        this.fetchAssessment(this.$route.params.id);
    }
}
</script>
