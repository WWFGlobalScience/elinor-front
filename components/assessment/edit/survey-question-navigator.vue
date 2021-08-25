<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <ul class="elinor__survey-navigator">
                <li v-for="(question, index) in survey">
                    <nuxt-link :to="`/assessments/edit/${id}/the-survey/${index + 1}`" :class="[ 'btn--opacity', { 'is--uncomplete': assessment[question] === null } ]">
                    </nuxt-link>
                    </a>
                </li>
                <li class="elinor__survey-complete">
                    <div class="index">
                        {{  completedQuestions  }}
                    </div>
                    <div class="text">
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.completed' ) }}</span>
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.out-of' ) }} {{ survey.length }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-edit-survey-question-navigator',
    props: ['qid', 'id' ],
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        completedQuestions() {
            let completed = 0;
            this.survey.forEach((question) => {
                if(this.assessment[question]) {
                    completed++;
                }
            });
            return completed;
        }
    }
}
</script>
