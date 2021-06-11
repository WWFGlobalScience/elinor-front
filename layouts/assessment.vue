<template>
    <div id="app">
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'layout-assessment',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    },
    methods: {
        ...mapActions({
            getAssessment: 'assessments/getAssessment',
            getFirstMa: 'ma/getFirstMa'
        })
    },
    mounted() {
        this.getAssessment( this.id )
        this.getFirstMa()
    }
}
</script>