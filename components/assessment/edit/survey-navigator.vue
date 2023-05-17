<template>
    <section class="section section--assessment-survey section--mt-0">
        <div class="container">
            <div class="elinor__survey-progress">
                <ul class="elinor__survey-dots">
                    <li
                        v-for="(attribute, index) in attributes"
                        :class="{
                            'li-bg-2': isCurrentQuestionFromAttribute(
                                attribute
                            ),
                            'li-bg-1':
                                !isCurrentQuestionFromAttribute(attribute) &&
                                isAttributeSelected(attribute)
                        }"
                    >
                        <template
                            v-for="(question, number) in getAttributeQuestions(
                                attribute
                            )"
                        >
                            <template v-if="!mode || mode === 'list'">
                                <a
                                    role="button"
                                    :content="
                                        getQuestionTooltip(
                                            number,
                                            attribute,
                                            question
                                        )
                                    "
                                    v-tippy="{
                                        arrow: false,
                                        arrowType: 'round',
                                        animation: 'fade',
                                        theme: 'light',
                                        placement: 'bottom-start'
                                    }"
                                    class="btn-opacity bg-poor"
                                    :class="{
                                        'is--uncomplete': !isAnswered(question)
                                    }"
                                    v-scroll-to="{
                                        el: `.question-${question.id}`,
                                        offset: -70
                                    }"
                                >
                                </a>
                            </template>
                            <template v-if="mode && mode === 'detail'">
                                <nuxt-link
                                    v-if="isAttributeSelected(attribute)"
                                    role="button"
                                    class="btn-opacity"
                                    :class="{
                                        'is--uncomplete': !isAnswered(question)
                                    }"
                                    :to="
                                        `/assessments/edit/${assessment.id}/the-survey/${question.id}`
                                    "
                                >
                                </nuxt-link>
                                <a
                                    v-if="!isAttributeSelected(attribute)"
                                    role="button"
                                    class="btn-opacity"
                                >
                                </a>
                            </template>
                        </template>
                    </li>
                    <li
                        class="elinor__survey-complete elinor__survey-complete--no-border"
                    >
                        <div class="index">
                            {{ completedQuestions }}
                        </div>
                        <div class="text">
                            <span>{{
                                $t(
                                    "pages.assessments.edit.tabs.survey.navigator.completed"
                                )
                            }}</span>
                            <span
                                >{{
                                    $t(
                                        "pages.assessments.edit.tabs.survey.navigator.outOf"
                                    )
                                }}
                                {{ totalQuestions }}</span
                            >
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "assessment-edit-survey-navigator",
    props: ["mode"],
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            attributes: state => state.attributes.list,
            questions: state => state.surveyquestions.list
        }),
        completedQuestions() {
            return this.assessment.surveyAnswers.filter(surveyAnswer =>
                this.isAttributeSelected({
                    id: surveyAnswer.question.attribute
                })
            ).length;
        },
        activeQuestions() {
            return this.questions.filter(
                question =>
                    this.assessment.attributes.indexOf(question.attribute) !==
                    -1
            );
        },
        totalQuestions() {
            return this.activeQuestions.length;
        }
    },
    methods: {
        isAnswered(question) {
            return (
                this.isAttributeSelected({ id: question.attribute }) &&
                this.assessment.surveyAnswers.filter(
                    surveyAnswer => surveyAnswer.question.id === question.id
                ).length === 1
            );
        },
        getAttributeQuestions(attribute) {
            return this.questions.filter(
                question => question.attribute === attribute.id
            );
        },
        isAttributeSelected(attribute) {
            return this.assessment.attributes.indexOf(attribute.id) !== -1;
        },
        isCurrentQuestionFromAttribute(attribute) {
            const questionId = this.$route.params.qid;
            if (questionId) {
                return (
                    this.questions.filter(
                        question =>
                            question.id === parseInt(questionId) &&
                            question.attribute === attribute.id
                    ).length !== 0
                );
            }
        },
        getQuestionTooltip(number, attribute, question) {
            return `${attribute.name}<strong>Q${number + 1} - ${
                question.text
            }</strong>`;
        }
    }
};
</script>
