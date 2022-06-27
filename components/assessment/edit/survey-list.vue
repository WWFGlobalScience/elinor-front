<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
            </header>
            <div class="elinor__survey-list">
                <div v-for="(question, index) in questions" :id="question.id" :class="['elinor__survey-question', 'ui-rounded-border', { 'is--uncomplete': assessment[question.key] === null }]">
                    <div class="left">
                        <div class="txt">
                            <span class="txt__mark"></span>
                            {{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ index + 1 }} / {{ survey.length }}</div>
                        <div class="question">{{question.text}}</div>
                    </div>
                    <div class="right">
                        <div :class="{completed: !!assessment[question.key], uncompleted: !assessment[question.key]}">
                            <template v-if="assessment[question.key]">
                                <div class="txt">{{ $t( 'pages.assessments.edit.tabs.survey.questions.answer' ) }} | {{ $t( 'pages.assessments.edit.tabs.survey.questions.score' ) }}: {{ assessment[question.key] }}</div>
                                <div class="answer">
                                    <span>{{getAnswerText(assessment[question.key], index)}}</span>
                                </div>
                                <template v-if="assessment[question.key + '_text']">
                                    <div class="txt txt--explanation">{{ $t( 'pages.assessments.edit.tabs.survey.questions.explanation' ) }}</div>
                                    <div class="answer" v-html="assessment[question.key + '_text']"></div>
                                </template>
                            </template>
                            <div v-if="!assessment[question.key]" class="txt__uncomplete">{{ $t( 'pages.assessments.edit.tabs.survey.questions.notCompleted' ) }}</div>
                            <nuxt-link :to="`/assessments/edit/${assessment.id}/the-survey/${index + 1}`" class="btn btn--opacity--child btn--uncomplete">
                                <span class="btn--opacity__target" v-if="!assessment[question.key]">{{ $t( 'pages.assessments.edit.tabs.survey.questions.answerQuestionButton' ) }}</span>
                                <span class="btn--opacity__target" v-if="assessment[question.key]">{{ $t( 'pages.assessments.edit.tabs.survey.questions.editQuestionButton' ) }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg">
                            </nuxt-link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
         <div class="container">
            <div class="section__bottom">
                <NuxtLink @click.prevent :to="`/assessments/edit/${assessment.id}/collaborators`"
                    class="btn btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.nextStep') }}</span>
                    <img
                        src="~/assets/img/ico-button-arrow.svg"
                        :alt="$t('pages.assessments.edit.tabs.nextStep')"
                    />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-edit-survey-list',
    methods: {
        getAnswerText(score, index) {
            const selectedQuestion = this.questions[index];
            switch (score) {
                case 10:
                    return selectedQuestion["poor_20"];
                case 20:
                    return selectedQuestion["average_30"];
                case 30:
                    return selectedQuestion["good_40"];
                case 40:
                    return selectedQuestion["excellent_50"];
                case 50:
                    return selectedQuestion["dontknow_10"];
            }
        },
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        questions() {
            return this.$store.state.surveyquestions.list;
        },
    },

}
</script>
