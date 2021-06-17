<template>
    <section class="section section--assesment-edit-survey-question section--mt-0">
        <assessment-edit-survey-question-navigator :assessment="assessment" :id="id"></assessment-edit-survey-question-navigator>
        <assessment-edit-survey-question :assessment="assessment" :question="question" :qid="qid" :id="id"></assessment-edit-survey-question>
        <assessment-edit-survey-question-help></assessment-edit-survey-question-help>
    </section>
</template>


<script>
import { mapActions } from 'vuex'

export default {
    name: 'assessment-survey-question',
    layout: 'assessment-edit',
    data() {
        return {
            id: this.$route.params.id,
            qid: this.$route.params.qid,
        }
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        },
        question() {
            return this.assessment.survey[ this.qid - 1 ]
        }
    }
}

</script>