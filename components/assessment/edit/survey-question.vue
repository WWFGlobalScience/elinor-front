<template>
    <section  class="section section--assessment-edit-survey-question elinor__question">
        <div class="container">
            <header id="question" class="header--back">
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
                <nuxt-link :to="`/assessments/edit/${id}/the-survey`" class="elinor__back btn btn--border-turqy btn--opacity">
                    <img src="~/assets/img/ico-arrow-back-turqy.svg" alt="">
                    <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.back' ) }}</span>
                </nuxt-link>
            </header>
            <div class="">
                <div class="title-border">
                    <div class="content">
                        <p class="kicker uppercase">Attribute</p>
                        <h3 class="title uppercase">{{ attribute.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">

            <div class="g-grid--2-1-lg-0 gap-12">
                <div class="g-colspan--1-full-lg">
                    <!-- col -->
                    <div class="question">
                        <div class="question__index">
                            <span class="bullet"></span>
                            <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ surveyQuestionNumber(questionId, assessment, attributes, questions) }} / {{ totalSurveyQuestions(assessment, questions) }}</span>
                        </div>
                        <div class="question__title">
                            {{ question.text }}
                        </div>
                    </div>
                    <div class="answers">
                        <header>
                            <p>{{ $t( 'pages.assessments.edit.tabs.survey.questions.selectAnswer' ) }}</p>
                            <!-- <a href="#" class="btn btn--sm" v-scroll-to="{
                                el: '.elinor__question-help',
                                offset: -40,
                            }">
                                <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.help' ) }}</span>
                                <img src="~/assets/img/ico-arrow-bottom-white.svg" alt="">
                            </a> -->
                        </header>
                        <form class="form" refs="editAssessmentSurvey">
                            <div class="form__group">
                                <div v-for="(choice, index) in [3,2,1,0]" class="form__row">
                                    <div class="input input--radios input--radios-question">
                                        <div class="radios__wrap">
                                            <div class="radio__wrap">
                                                <div class="radio">
                                                    <input type="radio" name="answer" :id="'answer-' + choice" @click="saveChoice(choice)" :checked="isAnsweredWith(choice)">
                                                    <img src="~/assets/img/ico-ok.svg" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <label :for="'answer-'+ choice" class="label">
                                            <span></span>
                                            <span v-html="question[answersMapping[choice]]"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="form__row">
                                    <div class="input input--radios input--radios-question">
                                        <div class="radios__wrap">
                                            <div class="radio__wrap">
                                                <div class="radio">
                                                    <input type="radio" name="answer" id="answer-null" @click="saveChoice(null)" :checked="isAnsweredWith(null)">
                                                    <img src="~/assets/img/ico-ok.svg" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <label for="answer-null" class="label">
                                            <span></span>
                                            <span>{{ $t("pages.assessments.edit.tabs.survey.questions.dontKnow") }}</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="form__row form__row--mt-16">
                                    <div class="input input--pr">
                                        <div class="label">{{ $t( `pages.assessments.edit.tabs.survey.questions.explanation`) }}</div>
                                        <textarea name="explanation" ref="textareaExplanation" @change="saveExplanation($event.target.value)">{{ answer && answer.explanation }}</textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <nav class="question__nav">
                            <ul>
                                <li>
                                    <nuxt-link v-if="previousSurveyQuestion" :to="`/assessments/edit/${id}/the-survey/${previousSurveyQuestion}/#question`"
                                        @click.native="updateState()"
                                        class="btn--border-turqy btn--opacity--child">
                                        <img src="~/assets/img/ico-arrow-back-turqy.svg">
                                        <span>{{ $t('pages.assessments.edit.tabs.survey.questions.prev') }}</span>
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link v-if="nextSurveyQuestion" :to="`/assessments/edit/${id}/the-survey/${nextSurveyQuestion}/#question`"
                                        @click.native="updateState()"
                                        class="btn--border-turqy btn--opacity--child">
                                        <span>{{ $t('pages.assessments.edit.tabs.survey.questions.next') }}</span>
                                        <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                    </nuxt-link>
                                    <nuxt-link v-if="isLastQuestionInSurvey && !isOffline" :to="`/assessments/edit/${id}/collaborators`"
                                        @click.native="updateState()"
                                        class="btn--border-turqy btn--opacity--child">
                                        <span>{{ $t('pages.assessments.edit.tabs.nextStep') }}</span>
                                        <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                    </nuxt-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="g-colspan--1-full-lg">
                    <!-- col -->
                    <section class="section section--assessment-edit-survey-help elinor__question-help">
                        <div class="elinor__help">
                            <header>
                                <h3>{{ $t('pages.assessments.edit.tabs.survey.questions.rationale') }}</h3>
                            </header>
                            <ul>
                                <li v-html="question.rationale"></li>
                            </ul>
                        </div>
                        <div class="elinor__help">
                            <header>
                                <h3>{{ $t('pages.assessments.edit.tabs.survey.questions.information') }}</h3>
                            </header>
                            <ul>
                                <li v-html="question.information"></li>
                            </ul>
                        </div>
                        <div class="elinor__help">
                            <header>
                                <h3>{{ $t('pages.assessments.edit.tabs.survey.questions.guidance') }}</h3>
                            </header>
                            <ul>
                                <li v-html="question.guidance"></li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {surveyQuestionNumber, totalSurveyQuestions, previousSurveyQuestion, nextSurveyQuestion, isLastQuestionInSurvey} from '../../../config/assessment-progress';
export default {
    name: 'assessment-edit-survey-question',
    props: ['qid'],
    data() {
        return {
            questionId: parseInt( this.qid ),
            id: this.$route.params.id,
            answersMapping: {
                0: 'poor_0',
                1: 'average_1',
                2: 'good_2',
                3: 'excellent_3'
            }
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            attributes: state => state.attributes.list,
            questions: state => state.surveyquestions.list,
            isOffline: state => state.layout.offline,
            offlineSurveyAnswers: state => state.assessments.offlineSurveyAnswers,
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
            return this.assessment.surveyAnswers.find(surveyAnswer => surveyAnswer.question.id === this.question.id);
        },
        previousSurveyQuestion() {
            return previousSurveyQuestion(this.questionId, this.assessment, this.attributes, this.questions);
        },
        nextSurveyQuestion() {
            return nextSurveyQuestion(this.questionId, this.assessment, this.attributes, this.questions);
        },
        isLastQuestionInSurvey() {
            return isLastQuestionInSurvey(this.questionId, this.assessment, this.attributes, this.questions)
        }
    },
    methods: {
        ...mapActions({
            storeSurveyAnswer: 'assessments/storeSurveyAnswer',
            updateSurveyAnswer: 'assessments/updateSurveyAnswer'
        }),
        save(choice) {
            const data = {
                ...this.answer && {id: this.answer.id},
                assessmentId: this.assessment.id,
                questionId: this.question.id,
                choice,
                explanation: this.$refs.textareaExplanation.value
            };

            if (!this.answer) {
                this.storeSurveyAnswer(data);
            } else {
                this.updateSurveyAnswer(data);
            }
        },
        saveChoice(choice) {
            this.save(choice);
        },
        saveExplanation() {
            if(this.answer) {
                this.save(this.answer.choice);
            }
        },
        isAnsweredWith(choice) {
            return this.answer && this.answer.choice === choice;
        },
        totalSurveyQuestions,
        surveyQuestionNumber,
        updateState() {
            if (!this.isOffline) {
                this.$store.dispatch( 'assessments/fetchAssessment', this.id)
            }
        }

    }
}
</script>
