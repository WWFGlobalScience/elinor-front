<template>
    <section  class="section section--assessment-edit-survey-question elinor__question">
        <div class="container">
            <header id="question" class="header--back">
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
                <nuxt-link to="./" class="elinor__back btn--opacity">
                    <img src="~/assets/img/ico-arrow-back-turqy.svg">
                    <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.back' ) }}</span>
                </nuxt-link>
            </header>
            <div class="">
                <div class="question">
                    <div class="question__index">
                        <span class="bullet"></span>
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ questionId }} / {{ survey.length }}</span>
                    </div>
                    <div class="question__title">
                        {{ question.text }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container--sm">
            <div class="answers">
                <header>
                    <p>{{ $t( 'pages.assessments.edit.tabs.survey.questions.selectAnswer' ) }}</p>
                    <a href="#" class="btn btn--sm" v-scroll-to="{
                        el: '.elinor__question-help',
                        offset: -200,
                    }">
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.help' ) }}</span>
                        <img src="~/assets/img/ico-arrow-bottom-white.svg">
                    </a>
                </header>
                <form class="form" refs="editAssessmentSurvey">
                    <div class="form__group">
                        <div v-for="(score, index) in [10, 20, 30, 40, 50]" class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" :id="'answer-' + score" :value="score"
                                                   @change="save(score)"
                                                   :checked="assessment[question.key] === score">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label :for="'answer-'+ score" class="label">
                                    <span></span>
                                    <span>{{ getAnswerText(score, questionId) }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--pr">
                                <div class="label">{{ $t( `pages.assessments.edit.tabs.survey.questions.explanation`) }}</div>
                                <textarea name="explanation" @change="saveExplanation($event.target.value)">{{ assessment[question.key + '_text'] }}</textarea>
                            </div>
                        </div>
                    </div>
                </form>
                <nav class="question__nav">
                    <ul>
                        <li>
                            <nuxt-link v-if="questionId > 1" :to="`/assessments/edit/${id}/the-survey/${questionId - 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <img src="~/assets/img/ico-arrow-back-turqy.svg">
                                <span>{{ $t('pages.assessments.edit.tabs.survey.questions.prev') }}</span>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link v-if="questionId < survey.length" :to="`/assessments/edit/${id}/the-survey/${questionId + 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <span>{{ $t('pages.assessments.edit.tabs.survey.questions.next') }}</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                            <nuxt-link v-if="questionId === survey.length" :to="`/assessments/edit/${id}/collaborators`" class="btn--border-turqy btn--opacity--child">
                                <span>{{ $t('pages.assessments.edit.tabs.nextStep') }}</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'assessment-edit-survey-question',
    props: ['qid'],
    data() {
        return {
            questionId: parseInt( this.qid ),
            id: this.$route.params.id,
            question: null
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        question() {
            let question = this.$store.state.surveyquestions.list[this.questionId - 1];
            console.log(this.questionId, this.qid)
            if (!question) {
                this.$store.dispatch('surveyquestions/fetchSurveyQuestions').then(() => {
                    console.log(this.$store.state.surveyquestions, this.$store.state.surveyquestions.list, this.$store.state.surveyquestions.list[this.questionId - 1]);
                    question =  this.$store.state.surveyquestions.list[this.questionId - 1];
                        console.log(question);
                    }
                )
            }
            return question;
        }
    },
    methods: {
        ...mapActions({
            editAssessmentField: 'assessments/editAssessmentField'
        }),
        save(value) {
            const field = this.question.key;
            this.editAssessmentField({field, value, id: this.assessment.id});
        },
        saveExplanation(value) {
            const field = this.question.key + '_text';
            this.editAssessmentField({field, value, id: this.assessment.id});
        },
        getAnswerText(score, index) {
            switch (score) {
                case 10:
                    return this.question["poor_20"];
                case 20:
                    return this.question["average_30"];
                case 30:
                    return this.question["good_40"];
                case 40:
                    return this.question["excellent_50"];
                case 50:
                    return this.question["dontknow_10"];
            }
        },
    }
}
</script>
