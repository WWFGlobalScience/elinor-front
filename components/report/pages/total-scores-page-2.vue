<template>
    <div id="total-scores-page-2" class="page-report">
        <report-aside :logo="false" />
        <div class="content-report">
            <div v-if="report.attributes" class="container-report">
                <div class="col-report">
                    <div
                        v-for="attribute in attributes.slice(5, 7)"
                        :set="
                            group = report.attributes.find(
                                (a) => a.attribute == attribute.name,
                            )
                        "
                        class="card-report ui-rounded-border"
                    >
                        <template v-if="isAttributeChecked(attribute)">
                            <div
                                class="dot-value"
                                :class="
                                    'bg-' +
                                    (group
                                        ? getAttributeColor(group.score)
                                        : 'grayy-lighter')
                                "
                            >
                                {{
                                    group && group.score !== null
                                        ? group.score.toFixed(0)
                                        : '-'
                                }}
                            </div>
                        </template>
                        <template v-else>
                            <div class="dot-value bg-grayy-lighter">-</div>
                        </template>
                        <h3 class="title">{{ attribute.name }}</h3>
                        <h4 class="text">
                            {{ attribute.description }}
                        </h4>
                        <ul>
                            <li
                                v-for="question in questions.filter(
                                    (q) => q.attribute == attribute.id,
                                )"
                            >
                                <p>{{ question.text }}</p>
                                <template v-if="group">
                                    <span
                                        :set="
                                            currentAnswer = group.answers.find(
                                                (a) =>
                                                    a.question == question.key,
                                            )
                                        "
                                    >
                                        {{
                                            currentAnswer &&
                                            currentAnswer.choice !== null
                                                ? currentAnswer.choice
                                                : '-'
                                        }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span> - </span>
                                </template>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-report legend">
                    <div
                        v-for="attribute in attributes.slice(7, 10)"
                        :set="
                            group = report.attributes.find(
                                (a) => a.attribute == attribute.name,
                            )
                        "
                        class="card-report ui-rounded-border"
                    >
                        <div
                            class="dot-value"
                            :class="
                                'bg-' +
                                (group
                                    ? getAttributeColor(group.score)
                                    : 'grayy-lighter')
                            "
                        >
                            {{
                                group && group.score !== null
                                    ? group.score.toFixed(0)
                                    : '-'
                            }}
                        </div>
                        <h3 class="title">{{ attribute.name }}</h3>
                        <h4 class="text">
                            {{ attribute.description }}
                        </h4>
                        <ul>
                            <li
                                v-for="question in questions.filter(
                                    (q) => q.attribute == attribute.id,
                                )"
                            >
                                <p>{{ question.text }}</p>
                                <template v-if="group">
                                    <span
                                        :set="
                                            currentAnswer = group.answers.find(
                                                (a) =>
                                                    a.question == question.key,
                                            )
                                        "
                                    >
                                        {{
                                            currentAnswer &&
                                            currentAnswer.choice !== null
                                                ? currentAnswer.choice
                                                : '-'
                                        }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span> - </span>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div class="rounded-3xl bg-turqy-lighter p-3">
                        <table
                            class="table-score-values table-score-values--report block"
                        >
                            <tr>
                                <th></th>
                                <th>
                                    {{ $t('pages.report.totalScores.indicator')
                                    }}<br />{{
                                        $t('pages.report.totalScores.value')
                                    }}
                                </th>
                                <th>
                                    {{ $t('pages.report.totalScores.attribute')
                                    }}<br />{{
                                        $t('pages.report.totalScores.value')
                                    }}
                                </th>
                                <th>
                                    {{ $t('pages.report.totalScores.aggregate')
                                    }}<br />{{
                                        $t('pages.report.totalScores.value')
                                    }}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <div class="item-legend">
                                        <span
                                            class="w-5 h-5 rounded-full bg-poor"
                                        ></span>
                                        <p class="text">
                                            {{
                                                $t(
                                                    'pages.report.totalScores.plan.title',
                                                )
                                            }}
                                        </p>
                                    </div>
                                </td>
                                <td class="num">0</td>
                                <td class="num">0-2</td>
                                <td class="num">0-29</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="hr">
                                    <div
                                        class="flex justify-center items-center"
                                    >
                                        <span class="description">{{
                                            $t(
                                                'pages.report.totalScores.plan.description',
                                            )
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="item-legend">
                                        <span
                                            class="w-5 h-5 rounded-full bg-average"
                                        ></span>
                                        <p class="text">
                                            {{
                                                $t(
                                                    'pages.report.totalScores.build.title',
                                                )
                                            }}
                                        </p>
                                    </div>
                                </td>
                                <td class="num">1</td>
                                <td class="num">3-5</td>
                                <td class="num">30-59</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="hr">
                                    <div
                                        class="flex justify-center items-center"
                                    >
                                        <span class="description">{{
                                            $t(
                                                'pages.report.totalScores.build.description',
                                            )
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="item-legend">
                                        <span
                                            class="w-5 h-5 rounded-full bg-good"
                                        ></span>
                                        <p class="text">
                                            {{
                                                $t(
                                                    'pages.report.totalScores.strengthen.title',
                                                )
                                            }}
                                        </p>
                                    </div>
                                </td>
                                <td class="num">2</td>
                                <td class="num">6-8</td>
                                <td class="num">60-89</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="hr">
                                    <div
                                        class="flex justify-center items-center"
                                    >
                                        <span class="description">{{
                                            $t(
                                                'pages.report.totalScores.strengthen.description',
                                            )
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="item-legend">
                                        <span
                                            class="w-5 h-5 rounded-full bg-excellent"
                                        ></span>
                                        <p class="text">
                                            {{
                                                $t(
                                                    'pages.report.totalScores.maintain.title',
                                                )
                                            }}
                                        </p>
                                    </div>
                                </td>
                                <td class="num">3</td>
                                <td class="num">9-10</td>
                                <td class="num">90-100</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="hr">
                                    <div
                                        class="flex justify-center items-center"
                                    >
                                        <span
                                            class="description border-transparent"
                                            >{{
                                                $t(
                                                    'pages.report.totalScores.maintain.description',
                                                )
                                            }}</span
                                        >
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'report-pages-total-scores-page-2',
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment,
            report: (state) => state.assessments.report,
            attributes: (state) => state.attributes.list,
            questions: (state) => state.surveyquestions.list,
        }),
    },
    methods: {
        isAttributeChecked(attribute) {
            if (this.assessment.attributes) {
                return this.assessment.attributes.indexOf(attribute.id) !== -1;
            }

            return false;
        },
    },
};
</script>
