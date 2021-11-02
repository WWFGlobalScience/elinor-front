<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t('pages.assessments.view.tabs.survey.title') }}</h1>
            </header>
            <div class="elinor__survey-list">
                <div v-for="(question, index) in survey" :id="`question-${ index + 1 }`" class="elinor__survey-question ui-rounded-border">
                    <div class="left">
                        <div class="txt">{{ $t( 'pages.assessments.edit.tabs.survey.questions.question' ) }} {{ index + 1 }}</div>
                        <div class="question" v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.question`)"></div>
                    </div>
                    <div class="right">
                        <div class="txt">{{ $t( 'pages.assessments.edit.tabs.survey.questions.answer' ) }} | {{ $t( 'pages.assessments.edit.tabs.survey.questions.score' ) }}: {{ assessment[ question ] }} </div>
                        <div class="answer">
                            <span v-if="assessment[ question ] !== 50" v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.answers.${parseInt(assessment[ question ]) / 10}`)"></span>
                            <span v-else>{{ $t( 'pages.assessments.edit.tabs.survey.questions.unknown' ) }}</span>
                        </div>
                        <template v-if="assessment[ question + '_text' ] !== ''">
                            <div class="txt txt--explanation">{{ $t( 'pages.assessments.edit.tabs.survey.questions.explanation' ) }}</div>
                            <div class="answer" v-if="assessment[ question + '_text' ] !== ''" v-html="assessment[ question + '_text' ]"></div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-survey-list',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        })
    }
}
</script>
