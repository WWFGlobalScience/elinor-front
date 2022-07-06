<template>
    <section  class="section section--assessment-edit-survey-question elinor__question">
        <div class="container">
            <header id="question" class="header--back">
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
                <nuxt-link to="./" class="elinor__back btn btn--border-turqy btn--opacity">
                    <img src="~/assets/img/ico-arrow-back-turqy.svg">
                    <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.back' ) }}</span>
                </nuxt-link>
            </header>
            <div class="">
                <div class="title-border">
                    <h3 class="title uppercase">{{ attribute.name }}</h3>
                </div>
                <div class="question">
                    <div class="question__index">
                        <span class="bullet"></span>
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ questionId }} / {{ questions.length }}</span>
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
                        offset: -40,
                    }">
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.help' ) }}</span>
                        <img src="~/assets/img/ico-arrow-bottom-white.svg">
                    </a>
                </header>
                <form class="form" refs="editAssessmentSurvey">
                    <div class="form__group">
                        <div v-for="(choice, index) in [10,20,30,40,50]" class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" :id="'answer-' + choice" @click="saveChoice(choice)" :checked="isAnsweredWith(choice)">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label :for="'answer-'+ choice" class="label">
                                    <span></span>
                                    <span v-html="question[answersMapping[choice]]"></span>
                                </label>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--pr">
                                <div class="label">{{ $t( `pages.assessments.edit.tabs.survey.questions.explanation`) }}</div>
                                <textarea name="explanation" @change="saveExplanation($event.target.value)">{{ answer && answer.explanation }}</textarea>
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
                            <nuxt-link v-if="questionId < questions.length" :to="`/assessments/edit/${id}/the-survey/${questionId + 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <span>{{ $t('pages.assessments.edit.tabs.survey.questions.next') }}</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                            <nuxt-link v-if="questionId === questions.length" :to="`/assessments/edit/${id}/collaborators`" class="btn--border-turqy btn--opacity--child">
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
            answersMapping: {
                10: 'dontknow_10',
                20: 'poor_20',
                30: 'average_30',
                40: 'good_40',
                50: 'excellent_50'
            }
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            attributes: state => state.attributes.list,
            questions: state => state.surveyquestions.list
        }),
        question() {
            const filtered = this.questions.filter(question => question.id === parseInt(this.qid));
            return filtered[0];
        },
        attribute() {
            const filtered = this.attributes.filter(attribute => attribute.id === this.question.attribute);
            return filtered[0];
        },
        answer() {
            const answer = this.assessment.surveyAnswers.filter(surveyAnswer => surveyAnswer.question.id === this.question.id);
            return answer[0] || null;
        }
    },
    methods: {
        ...mapActions({
            storeSurveyAnswer: 'assessments/storeSurveyAnswer',
            updateSurveyAnswer: 'assessments/updateSurveyAnswer'
        }),

        save(choice, explanation) {
            const answer = this.assessment.surveyAnswers.filter(surveyAnswer => surveyAnswer.question.id === this.question.id);
            if(answer.length === 0) {
                const data = {assessmentId: this.assessment.id, questionId: this.question.id, choice};
                if(explanation) {
                    data.explanation = explanation;
                }
                this.storeSurveyAnswer(data);
            } else {
                this.updateSurveyAnswer( {id: answer[0].id, assessmentId: this.assessment.id, questionId: this.question.id, choice, explanation});
            }
        },
        saveChoice(choice) {
            this.save(choice);
        },
        saveExplanation(explanation) {
            if(this.answer !== null) {
                this.save(this.answer.choice, explanation);
            }
        },
        isAnsweredWith(choice) {
            return this.answer && this.answer.choice === choice;
        },
        isExplanationDisabled() {
            const answer = this.assessment.surveyAnswers.filter(surveyAnswer => surveyAnswer.question.id === this.question.id);
            return answer.length === 0;
        }

    }
}
</script>
