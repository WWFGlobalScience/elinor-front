<template>
    <section class="section section--assessment-edit-survey-help elinor__question-help">
        <div class="container">
            <div class="elinor__help-border"></div>
            <div class="elinor__help">
                <header>
                    <h3>{{ $t('pages.assessments.edit.tabs.survey.questions.information') }}</h3>
                </header>
                <ul>
                    <li v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.information`)"></li>
                </ul>
            </div>
            <div class="elinor__help">
                <header>
                    <h3>{{ $t('pages.assessments.edit.tabs.survey.questions.guidance') }}</h3>
                </header>
                <ul>
                    <li v-html="$t( `pages.assessments.edit.tabs.survey.questions.items.${question}.guidance`)"></li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-edit-survey-help',
    props: ['qid'],
    data() {
        return {
            questionId: parseInt( this.qid )
        }
    },
    computed: {
        ...mapState({
            survey: state => state.assessments.survey
        }),
        question() {
            return this.survey[parseInt(this.qid) - 1];
        }
    },
}
</script>
