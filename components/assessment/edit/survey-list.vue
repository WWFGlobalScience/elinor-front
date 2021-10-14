<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t( 'pages.assessments.content.assessment.tabs.survey.header.title' ) }}</h1>
            </header>
            <div class="elinor__survey-list">
                <div v-for="(question, index) in survey" :id="`question-${ index + 1 }`" :class="['elinor__survey-question', 'ui-rounded-border', { 'is--uncomplete': assessment[question] === null }]">
                    <div class="left">
                        <div class="txt">
                            <span class="txt__mark"></span>
                            {{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.question' ) }} {{ index + 1 }} / {{ survey.length }}</div>
                        <div class="question" v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${question}.question`)"></div>
                    </div>
                    <div class="right">
                        <div v-if="assessment[question] !== null" class="completed">
                            <div class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.answer' ) }} | {{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.score' ) }}: {{ assessment[question] }}</div>
                            <div class="answer">
                                <span v-if="assessment[question] !== 50" v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${question}.answers.${parseInt(assessment[question]) / 10}`)"></span>
                                <span v-else>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.unknown' ) }}</span>
                            </div>
                            <template v-if="assessment[question + '_text']">
                                <div class="txt txt--explanation">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.explanation' ) }}</div>
                                <div class="answer" v-html="assessment[question + '_text']"></div>
                            </template>
                        </div>
                        <div v-else class="uncompleted">
                            <div class="txt__uncomplete">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.not-completed' ) }}</div>
                            <nuxt-link :to="`/assessments/edit/${assessment.id}/the-survey/${index + 1}`" class="btn btn--opacity--child btn--uncomplete">
                                <span class="btn--opacity__target">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.answer-question' ) }}</span>
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
                    <span class="btn--opacity__target">Next step</span>
                    <img
                        src="~/assets/img/ico-button-arrow.svg"
                        alt="Next step"
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
