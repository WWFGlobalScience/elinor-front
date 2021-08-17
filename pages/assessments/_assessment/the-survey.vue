<template>
    <section class="section section--assessment-survey section--mt-0">
        <assessment-survey-navigator :survey="survey"></assessment-survey-navigator>
        <assessment-survey-list :assessment="assessment" :survey="survey"></assessment-survey-list>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'assessment-survey',
    props: [ 'assessment' ],
    computed: {
        survey() {
            return this.$store.state.assessments.survey
        }
    }
    
}

</script>