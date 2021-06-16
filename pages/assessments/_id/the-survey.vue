<template>
    <section class="section section--assessment-survey section--mt-0">
        <assessment-survey-navigator :assessment="assessment"></assessment-survey-navigator>
        <assessment-survey-list :assessment="assessment"></assessment-survey-list>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'assessment-survey',
    layout: 'assessment',
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}

</script>