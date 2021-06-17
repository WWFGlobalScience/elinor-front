<template>
    <section class="section section--assesment-edit-survey section--mt-0">
        <assessment-edit-survey-navigator :assessment="assessment"></assessment-edit-survey-navigator>
        <assessment-edit-survey-list :assessment="assessment"></assessment-edit-survey-list>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'assessnent-survey',
    layout: 'assessment-edit',
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}

</script>