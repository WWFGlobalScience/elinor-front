<template>
    <section class="section section--assessment-survey-list">
        <div class="container">
            <header>
                <h1>{{ $t('pages.assessments.view.tabs.survey.title') }}</h1>
            </header>

            <assessment-score-chart></assessment-score-chart>

            <div class="elinor__survey-list">
                <template v-for="(attribute, index) in attributes">
                    <div
                        class="title-border"
                        :id="`anchor-attribute-${attribute.id}`"
                    >
                        <div class="title-dot-wrapper">
                            <span
                                class="title-dot"
                                :class="
                                    isAttributeChecked(attribute) &&
                                    getScoreByAttribute(attribute) !== null
                                        ? 'bg-' +
                                          getAttributeColor(
                                              getScoreByAttribute(attribute),
                                          )
                                        : 'bg-grayy-lighter'
                                "
                            >
                                <template v-if="isAttributeChecked(attribute)">
                                    {{
                                        getScoreByAttribute(attribute) !== null
                                            ? getScoreByAttribute(
                                                  attribute,
                                              ).toFixed(0)
                                            : '-'
                                    }}
                                </template>
                            </span>
                            <h3 class="title uppercase">
                                {{ attribute.name }}
                            </h3>
                        </div>

                        <div class="title-aside">
                            <span
                                v-if="attribute.required === true"
                                class="att-wrap mandatori-att"
                            >
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=="
                                />
                                <span>{{
                                    $t(
                                        'pages.assessments.view.tabs.survey.attributes.mandatory',
                                    )
                                }}</span>
                            </span>
                            <span
                                v-if="
                                    attribute.required === false &&
                                    !isAttributeChecked(attribute)
                                "
                                class="att-wrap inactive-att"
                            >
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzlFOUU5RSIvPgo8L3N2Zz4K"
                                />
                                <span>{{
                                    $t(
                                        'pages.assessments.view.tabs.survey.attributes.inactive',
                                    )
                                }}</span>
                            </span>
                            <span
                                v-if="
                                    attribute.required === false &&
                                    isAttributeChecked(attribute)
                                "
                                class="att-wrap active-att"
                            >
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTAuNSIgc3Ryb2tlPSIjMzU5RTk4Ii8+CjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwLjUiIHN0cm9rZT0iIzQzQTBCRCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjc5MzMgMTMuNjg5OEwyMy40ODMxIDFMMjUuNDE0MiAyLjkzMTE2TDEwLjc5MzMgMTcuNTUyMUwzIDkuNzU4ODVMNC45MzExNiA3LjgyNzY4TDEwLjc5MzMgMTMuNjg5OFoiIGZpbGw9IiMzNTlFOTgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC43OTMzIDEzLjY4OThMMjMuNDgzMSAxTDI1LjQxNDIgMi45MzExNkwxMC43OTMzIDE3LjU1MjFMMyA5Ljc1ODg1TDQuOTMxMTYgNy44Mjc2OEwxMC43OTMzIDEzLjY4OThaIiBmaWxsPSIjNDNBMEJEIi8+Cjwvc3ZnPgo="
                                />
                                <span>{{
                                    $t(
                                        'pages.assessments.view.tabs.survey.attributes.active',
                                    )
                                }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="description-wrap">
                        <p>{{ attribute.description }}</p>
                    </div>

                    <div
                        v-for="(question, index) in getAttributeQuestions(
                            attribute,
                        )"
                        :class="[
                            'elinor__survey-question',
                            'ui-rounded-border',
                            'question-' + question.id,
                            {
                                'is--uncomplete': isAnswered(question),
                                'is--inactive': !isAttributeChecked(attribute),
                            },
                        ]"
                    >
                        <div class="left">
                            <div class="txt">
                                <span class="txt__mark"></span>
                                {{
                                    $t(
                                        'pages.assessments.edit.tabs.survey.questions.question',
                                    )
                                }}
                                {{ index + 1 }} /
                                {{ getAttributeQuestions(attribute).length }}
                            </div>
                            <div class="question" v-html="question.text"></div>
                        </div>
                        <div class="right">
                            <div
                                v-if="isAttributeChecked(attribute)"
                                :class="{
                                    completed: !!isAnswered(question),
                                    uncompleted: !isAnswered(question),
                                }"
                            >
                                <template v-if="isAnswered(question)">
                                    <div class="txt">
                                        {{
                                            $t(
                                                'pages.assessments.edit.tabs.survey.questions.answer',
                                            )
                                        }}
                                        |
                                        {{
                                            $t(
                                                'pages.assessments.edit.tabs.survey.questions.score',
                                            )
                                        }}:
                                        <span
                                            class="dot-score"
                                            :class="
                                                'bg-' +
                                                getAnswerColor(
                                                    getAnswerChoice(question),
                                                )
                                            "
                                        >
                                            {{
                                                getAnswerChoice(question) !==
                                                null
                                                    ? getAnswerChoice(question)
                                                    : '-'
                                            }}
                                        </span>
                                    </div>
                                    <div class="answer">
                                        <span
                                            v-html="
                                                question[
                                                    answersMapping[
                                                        getAnswerChoice(
                                                            question,
                                                        )
                                                    ]
                                                ]
                                            "
                                        ></span>
                                    </div>
                                    <template
                                        v-if="getAnswerExplanation(question)"
                                    >
                                        <div class="txt txt--explanation">
                                            {{
                                                $t(
                                                    'pages.assessments.edit.tabs.survey.questions.explanation',
                                                )
                                            }}
                                        </div>
                                        <div
                                            class="answer"
                                            v-html="
                                                getAnswerExplanation(question)
                                            "
                                        ></div>
                                    </template>
                                </template>
                                <div
                                    v-if="!isAnswered(question)"
                                    class="txt__uncomplete"
                                >
                                    {{
                                        $t(
                                            'pages.assessments.edit.tabs.survey.questions.notCompleted',
                                        )
                                    }}
                                </div>
                            </div>
                            <div
                                v-if="!isAttributeChecked(attribute)"
                                class="q-msg"
                            >
                                <p class="txt__inactive">
                                    The attribute which contains this questions
                                    is not selected
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'assessment-survey-list',
    data() {
        return {
            answersMapping: {
                0: 'poor_0',
                1: 'average_1',
                2: 'good_2',
                3: 'excellent_3',
            },
            scoreColors: ['poor', 'average', 'good', 'excellent'],
        };
    },
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment,
            attributes: (state) => state.attributes.list,
            questions: (state) => state.surveyquestions.list,
            isOffline: (state) => state.layout.offline,
            offlineSurveyAnswers: (state) =>
                state.assessments.offlineSurveyAnswers,
        }),
        surveyAnswers() {
            return this.assessment.surveyAnswers || [];
        },
    },
    methods: {
        getAttributeQuestions(attribute) {
            return this.questions.filter(
                (question) => question.attribute === attribute.id,
            );
        },
        isAnswered(question) {
            return (
                this.surveyAnswers.filter(
                    (surveyAnswer) => surveyAnswer.question.id === question.id,
                ).length === 1
            );
        },
        getAnswerChoice(question) {
            const answer = this.surveyAnswers.filter(
                (surveyAnswer) => surveyAnswer.question.id === question.id,
            );
            if (answer.length === 1) {
                return answer[0].choice;
            }
        },
        getAnswerExplanation(question) {
            const answer = this.surveyAnswers.filter(
                (surveyAnswer) => surveyAnswer.question.id === question.id,
            );
            if (answer.length === 1) {
                return answer[0].explanation;
            }
        },
        isAttributeChecked(attribute) {
            return this.assessment.attributes.indexOf(attribute.id) !== -1;
        },
        getScoreByAttribute(attribute) {
            if (this.isAttributeChecked(attribute)) {
                var answers = this.surveyAnswers.filter(
                    (surveyAnswer) =>
                        surveyAnswer.choice !== null &&
                        surveyAnswer.question.attribute === attribute.id,
                );
                if (!answers.length) {
                    return null;
                }
                var sumValues = answers.reduce(function (s, a) {
                    return s + a.choice;
                }, 0);

                return ((10 / 3) * sumValues) / Object.keys(answers).length; //score out of 10
            } else {
                return 0;
            }
        },
        getAnswerColor(choice) {
            return choice !== null ? this.scoreColors[choice] : 'grayy-lighter';
        },
    },
};
</script>
