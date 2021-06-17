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
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.question' ) }} {{ questionId }} / {{ assessment.survey.length }}</span>
                    </div>
                    <div class="question__title">
                        {{ $t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${qid}.question` ) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container--sm">
            <div class="answers">
                <header>
                    <p>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.select' ) }}</p>
                    <a href="#" class="elinor__back btn--opacity" v-scroll-to="{
                        el: '.elinor__question-help',
                        offset: -200,
                    }">
                        <span>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.help' ) }}</span>
                        <img src="~/assets/img/ico-arrow-bottom-turqy.svg">
                    </a>
                </header>
                <form class="form" refs="editAssessmentSurvey">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" id="answer-1" value="1" @change="submit">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label for="answer-1" class="label">
                                    <span>1</span>
                                    <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${qid}.answers.1` )"></span>}</label>
                                    </label>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" id="answer-2" value="2" @change="submit">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label for="answer-2" class="label">
                                    <span>2</span>
                                    <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${qid}.answers.2` )"></span>}</label>
                                </label>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" id="answer-3" value="3" @change="submit">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label for="answer-3" class="label">
                                    <span>3</span>
                                    <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${questionId - 1 }.answers.3` )"></span>}</label>
                                </label>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" id="answer-4" value="4" @change="submit">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label for="answer-4" class="label">
                                    <span>4</span>
                                    <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${qid}.answers.4` )"></span>}</label>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" name="answer" id="answer-5" value="5" @change="submit">
                                            <img src="~/assets/img/ico-ok.svg">
                                        </div>
                                    </div>
                                </div>
                                <label for="answer-5" class="label"><span>5</span> <span v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.default.unknown`)"></span></label>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--pr">
                                <div class="label">{{ $t( `pages.assessments.content.assessment.tabs.survey.data.questions.default.explanation`) }}</div>
                                <textarea name="explanation"></textarea>
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
                            <nuxt-link v-if="questionId < assessment.survey.length" :to="`/assessments/edit/${id}/the-survey/${questionId + 1}/#question`" class="btn--border-turqy btn--opacity--child">
                                <span>Next</span>
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
import { mapActions } from 'vuex'
export default {
    name: 'assessment-edit-survey-question',
    props: [ 'assessment', 'question', 'qid' ],
    data() {
        return {
            questionId: parseInt( this.qid ),
            id: this.$route.params.id
        }
    },
    methods: {
        ...mapActions({
            editAssessment: 'assessments/editAssessment'
        }),
        submit() {
            event.preventDefault()
            setTimeout( function() {
                this.editAssessment( {
                form: this.$refs.editAssessmentSurvey,
                id: this.id
                })
            }.bind( this ), 300)
        }
    }
}
</script>