<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t( 'pages.assessments.content.assessment.tabs.survey.header.title' ) }}</h1>
            </header>
            <div class="elinor__survey-list">
                <div v-for="(question, index) in assessment.survey" :id="`question-${ index + 1 }`" class="elinor__survey-question ui-rounded-border">
                    <div class="left">
                        <div class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.question' ) }} {{ index + 1 }}</div>
                        <div class="question" v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${index + 1}.question`)"></div>
                    </div>
                    <div class="right">
                        <div class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.answer' ) }} | {{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.score' ) }}: 4</div>
                        <div class="answer">
                            <span v-if="question.answer != 5" v-html="$t( `pages.assessments.content.assessment.tabs.survey.data.questions.items.${index + 1}.answers.${question.answer}`)"></span>
                            <span v-else>{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.unknown' ) }}</span>
                        </div>
                        <div class="txt txt--explanation">{{ $t( 'pages.assessments.content.assessment.tabs.survey.data.questions.default.explanation' ) }}</div>
                        <div class="answer" v-html="question.explanation"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'assessment-survey-list',
    props: [ 'assessment' ]
}
</script>