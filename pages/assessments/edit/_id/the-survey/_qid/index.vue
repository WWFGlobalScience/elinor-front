<template>
    <section class="section section--assesment-edit-survey-question section--mt-0">
        <assessment-edit-survey-question-navigator :assessment="assessment" :id="id"></assessment-edit-survey-question-navigator>
        <assessment-edit-survey-question :assessment="assessment" :question="question" :qid="qid" :id="id"></assessment-edit-survey-question>
        <assessment-edit-survey-question-help :qid="qid" ></assessment-edit-survey-question-help>
    </section>
</template>


<script>
import {mapActions, mapState} from 'vuex'

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
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        question() {
            return this.survey[ this.qid - 1 ]
        }
    }
}

</script>
