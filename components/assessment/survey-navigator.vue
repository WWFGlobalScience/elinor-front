<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <ul class="elinor__survey-navigator">
                <li v-for="(question, index) in survey">
                    <a href="#" :class="[ 'btn--opacity', { 'is--uncomplete': assessment[question] === null } ]"
                       v-scroll-to="{
                        el: `#question-${index + 1}`,
                        offset: -70
                    }">
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-survey-navigator',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            survey: state => state.assessments.survey
        })
    }
}
</script>
