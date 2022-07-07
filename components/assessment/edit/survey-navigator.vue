<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <ul class="elinor__survey-navigator">
                <li v-for="(question, index) in activeQuestions">

                    <a href="#" :class="[ 'btn--opacity', { 'is--uncomplete': isAnswered(question)} ]"
                    v-scroll-to="{
                        el: `.question-${question.id}`,
                        offset: -70
                    }">
                    </a>
                </li>
                <li class="elinor__survey-complete">
                    <div class="index">
                        {{  completedQuestions  }}
                    </div>
                    <div class="text">
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.navigator.completed' ) }}</span>
                        <span>{{ $t( 'pages.assessments.edit.tabs.survey.navigator.outOf' ) }} {{ totalQuestions }}</span>
                    </div>
                </li>
            </ul>
            
            <div class="elinor__survey-progress">
                <ul class="elinor__survey-dots">
                    <li class="li-bg-1">
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity"></a>
                    </li>
                    <li class="li-bg-2">
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                    </li>
                    <li>
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                    </li>
                    <li>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                    </li>
                    <li>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                    </li>
                    <li>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                        <a href="#" class="btn-opacity is--uncomplete"></a>
                    </li>
                    <li class="elinor__survey-complete elinor__survey-complete--no-border">
                        <div class="index">
                            9
                        </div>
                        <div class="text">
                            <span>{{ $t( 'pages.assessments.edit.tabs.survey.navigator.completed' ) }}</span>
                            <span>{{ $t( 'pages.assessments.edit.tabs.survey.navigator.outOf' ) }} {{ totalQuestions }}</span>
                        </div>
                    </li>
                    
                </ul>

            </div>

        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-edit-survey-navigator',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            questions: state => state.surveyquestions.list,
        }),
        completedQuestions() {
            return this.assessment.surveyAnswers.length;
        },
        activeQuestions() {
            return this.questions.filter(question => this.assessment.attributes.indexOf(question.attribute) !== -1);
        },
        totalQuestions() {
            return this.activeQuestions.length;
        }
    },
    methods: {
        isAnswered(question) {
            return false;
        }
    }
}
</script>
