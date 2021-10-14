<template>
    <section  class="section section--assessment-edit-survey-question elinor__question">
        <div class="container">
            <header id="question" class="header--back">
                <h1>{{ $t( 'pages.assessments.content.assessment.tabs.survey.header.title' ) }}</h1>
                <nuxt-link to="./" class="elinor__back btn--opacity">
                    <img src="~/assets/img/ico-arrow-back-turqy.svg">
                    <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.back' ) }}</span>
                </nuxt-link>
            </header>
            <div class="">
                <div class="question">
                    <div class="question__index">
                        <span class="bullet"></span>
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.question' ) }} {{ questionId }} / {{ survey.length }}</span>
                    </div>
                    <div class="question__title">
                        {{ $t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${question}.question` ) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container--sm">
            <div class="answers">
                <header>
                    <p>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.select' ) }}</p>
                    <a href="#" class="btn btn--sm" v-scroll-to="{
                        el: '.elinor__question-help',
                        offset: -200,
                    }">
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.help' ) }}</span>
                        <img src="~/assets/img/ico-arrow-bottom-white.svg">
                    </a>
                </header>
                <form class="form" refs="editAssessmentSurvey">
                    <div class="form__group">
                        <div v-for="(answer, index) in [10,20,30,40,50]" class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" :id="'answer-' + answer" :value="answer" @change="save(answer)" :checked="assessment[question] === answer">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label :for="'answer-'+ answer" class="label">
                                    <span></span>
                                    <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${question}.answers.${index + 1}` )"></span>
                                </label>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--pr">
                                <div class="label">{{ $t( `pages.assessments.content.assessment.tabs.survey.data.questions.default.explanation`) }}</div>
                                <textarea name="explanation" @change="saveExplanation($event.target.value)">{{ assessment[question + '_text'] }}</textarea>
                            </div>
                        </div>
                    </div>
                </form>
                <nav class="question__nav">
                    <ul>
                        <li>
                            <nuxt-link v-if="questionId > 1" :to="`/assessments/edit/${id}/the-survey/${questionId - 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <img src="~/assets/img/ico-arrow-back-turqy.svg">
                                <span>Prev</span>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link v-if="questionId < survey.length" :to="`/assessments/edit/${id}/the-survey/${questionId + 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <span>Next</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                            <nuxt-link v-if="questionId === survey.length" :to="`/assessments/edit/${id}/collaborators`" class="btn--border-turqy btn--opacity--child">
                                <span>Next step</span>
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
            id: this.$route.params.id
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        question() {
            return this.survey[parseInt(this.qid) - 1];
        }
    },
    methods: {
        ...mapActions({
            editAssessmentField: 'assessments/editAssessmentField'
        }),
        save(value) {
            const field = this.question;
            this.editAssessmentField( {field, value, id: this.assessment.id});
        },
        saveExplanation(value) {
            const field = this.question + '_text';
            this.editAssessmentField( {field, value, id: this.assessment.id});
        }
    }
}
</script>
