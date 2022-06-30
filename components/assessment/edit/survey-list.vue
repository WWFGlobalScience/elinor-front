<template>
    <section class="section section--assessment-survey-list mt-8">
        <div class="container">
            <!-- <header>
                <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
            </header> -->
            <div class="elinor__survey-list">
                <div class="title-border">
                    <h3 class="title uppercase">Resource boundaries</h3>                  
                    <div class="title-aside">
                        <span class="att-wrap mandatori-att">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/>
                             <span>Mandatori</span>
                        </span>
                    </div>
                </div>
                <div class="description-wrap">
                    <p>Short Descipttion Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>

                <div class="title-border">
                    <h3 class="title uppercase">Monitoring and enforcement</h3>                  
                    <div class="title-aside">
                        <span class="att-wrap inactive-att">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzlFOUU5RSIvPgo8L3N2Zz4K'/>
                             <span>Inactive attribute</span>
                        </span>
                    </div>
                </div>
                <div class="description-wrap">
                    <p>Short Descipttion Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>


                <div class="title-border">
                    <h3 class="title uppercase">Resource boundaries</h3>                  
                    <div class="title-aside">
                        <span class="att-wrap active-att">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgc3Ryb2tlPSIjMzU5RTk4Ii8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwLjUiIHN0cm9rZT0iIzQzQTBCRCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjc5MzMgMTMuNjg5OEwyMy40ODMxIDFMMjUuNDE0MiAyLjkzMTE2TDEwLjc5MzMgMTcuNTUyMUwzIDkuNzU4ODVMNC45MzExNiA3LjgyNzY4TDEwLjc5MzMgMTMuNjg5OFoiIGZpbGw9IiMzNTlFOTgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC43OTMzIDEzLjY4OThMMjMuNDgzMSAxTDI1LjQxNDIgMi45MzExNkwxMC43OTMzIDE3LjU1MjFMMyA5Ljc1ODg1TDQuOTMxMTYgNy44Mjc2OEwxMC43OTMzIDEzLjY4OThaIiBmaWxsPSIjNDNBMEJEIi8+Cjwvc3ZnPgo='/>
                             <span>Active attribute</span>
                        </span>
                    </div>
                </div>
                <div class="description-wrap">
                    <p>Short Descipttion Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>

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
