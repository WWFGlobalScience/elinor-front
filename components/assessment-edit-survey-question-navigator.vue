<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <ul class="elinor__survey-navigator">
                <li v-for="(question, index) in assessment.survey">
                    <nuxt-link :to="`/assessments/edit/${id}/the-survey/${index + 1}`" :class="[ 'btn--opacity', { 'is--uncomplete': question.answer == null } ]">
                    </nuxt-link>
                    </a>
                </li>
                <li class="elinor__survey-complete">
                    <div class="index">
                        {{  completedQuestions  }}
                    </div>
                    <div class="text">
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.completed' ) }}</span>
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.out-of' ) }} {{ assessment.survey.length }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'assessment-edit-survey-question-navigator',
    props: [ 'assessment', 'qid', 'id' ],
    computed: {
        completedQuestions() {
            return this.assessment.survey.filter( ( item ) => {
                if ( item.answer != null ) {
                    return true
                } else {
                    return false
                }
            }).length
        }
    }
}
</script>