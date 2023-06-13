<template>
    <section v-if="!loader.active" class="section section--assesment-edit-survey-question section--mt-0">
        <assessment-edit-survey-navigator mode="detail" :assessment="assessment" :id="id"></assessment-edit-survey-navigator>
        <assessment-edit-survey-question :assessment="assessment" :question="question" :qid="qid" :id="id"></assessment-edit-survey-question>
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
            questions: state => state.surveyquestions.list,
            loader: state => state.loader.loader
        }),
        question() {
            const filtered = this.questions.filter(question => question.id === parseInt(this.qid));
            return filtered[0];
        }
    }
}

</script>
