<template>
    <div id="total-scores-page-1" class="page-report">
            <report-aside />
            <div class="content-report">
                <report-header />

                <div v-if="report.attributes" class="container-report">
                    <div class="col-report">
                        <div v-for="attribute in attributes.slice(0,3)"
                             :set="group = report.attributes.find(a => a.attribute == attribute.name)"
                             class="card-report ui-rounded-border">
                            <template v-if="isAttributeChecked(attribute)">
                                <div class="dot-value"
                                     :class="'bg-' + (group ? getAttributeColor(group.score) : 'grayy-lighter')">
                                    {{ group && group.score !== null ? group.score.toFixed(0) : '-' }}
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
                                <li v-for="question in questions.filter(q => q.attribute == attribute.id)">
                                    <p>{{ question.text }}</p>
                                    <template v-if="group">
                                    <span
                                        :set="currentAnswer = group.answers.find(a => a.question == question.key)"
                                    >
                                        {{
                                            currentAnswer && currentAnswer.choice !== null ? currentAnswer.choice : '-'
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

                    <div class="col-report">
                        <div v-for="attribute in attributes.slice(3,5)"
                             :set="group = report.attributes.find(a => a.attribute == attribute.name)"
                             class="card-report ui-rounded-border">
                            <div class="dot-value"
                                 :class="'bg-' + (group ? getAttributeColor(group.score) : 'grayy-lighter')">
                                {{ group && group.score !== null ? group.score.toFixed(0) : '-' }}
                            </div>
                            <h3 class="title">{{ attribute.name }}</h3>
                            <h4 class="text">
                                {{ attribute.description }}
                            </h4>
                            <ul>
                                <li v-for="question in questions.filter(q => q.attribute == attribute.id)">
                                    <p>{{ question.text }}</p>
                                    <template v-if="group">
                                    <span
                                        :set="currentAnswer = group.answers.find(a => a.question == question.key)"
                                    >
                                        {{
                                            currentAnswer && currentAnswer.choice !== null ? currentAnswer.choice : '-'
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
                </div>
            </div>
        </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "report-pages-total-scores-page-1",
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            report: state => state.assessments.report,
            attributes: state => state.attributes.list,
            questions: state => state.surveyquestions.list,
        })
    },
    methods: {
        isAttributeChecked(attribute) {
            if(this.assessment.attributes){
                return this.assessment.attributes.indexOf(attribute.id) !== -1;
            }

            return false
        },
    }
};
</script>
