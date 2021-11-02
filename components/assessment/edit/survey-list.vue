<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
            </header>
            <div class="elinor__survey-list">
                <div v-for="(question, index) in survey" :id="`question-${ index + 1 }`" :class="['elinor__survey-question', 'ui-rounded-border', { 'is--uncomplete': assessment[question] === null }]">
                    <div class="left">
                        <div class="txt">
                            <span class="txt__mark"></span>
                            {{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ index + 1 }} / {{ survey.length }}</div>
                        <div class="question" v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.question`)"></div>
                    </div>
                    <div class="right">
                        <div :class="{completed: !!assessment[question], uncompleted: !assessment[question]}">
                            <template v-if="assessment[question]">
                                <div class="txt">{{ $t( 'pages.assessments.edit.tabs.survey.questions.answer' ) }} | {{ $t( 'pages.assessments.edit.tabs.survey.questions.score' ) }}: {{ assessment[question] }}</div>
                                <div class="answer">
                                    <span v-if="assessment[question] !== 50" v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.answers.${parseInt(assessment[question]) / 10}`)"></span>
                                    <span v-else>{{ $t( 'pages.assessments.edit.tabs.survey.questions.unknown' ) }}</span>
                                </div>
                                <template v-if="assessment[question + '_text']">
                                    <div class="txt txt--explanation">{{ $t( 'pages.assessments.edit.tabs.survey.questions.explanation' ) }}</div>
                                    <div class="answer" v-html="assessment[question + '_text']"></div>
                                </template>
                            </template>
                            <div v-if="!assessment[question]" class="txt__uncomplete">{{ $t( 'pages.assessments.edit.tabs.survey.questions.notCompleted' ) }}</div>
                            <nuxt-link :to="`/assessments/edit/${assessment.id}/the-survey/${index + 1}`" class="btn btn--opacity--child btn--uncomplete">
                                <span class="btn--opacity__target" v-if="!assessment[question]">{{ $t( 'pages.assessments.edit.tabs.survey.questions.answerQuestionButton' ) }}</span>
                                <span class="btn--opacity__target" v-if="assessment[question]">{{ $t( 'pages.assessments.edit.tabs.survey.questions.editQuestionButton' ) }}</span>
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
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        }),
        questions() {
            return this.$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items`);
        }
    },
    mounted() {
        console.log(this.$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items`));

    }

}
</script>
