<template>
  <div class="cover-content">
    <div class="title-wrap">
      <div class="date">
        {{ $t('newReport.generateBy') }}
        {{
          new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        }}
      </div>
      <h1>{{ assessment.name }}</h1>
      <div class="year">{{ assessment.year }}</div>
    </div>
    <div>
      <h4>Attribute scores</h4>
      <assessment-report-partials-score-chart></assessment-report-partials-score-chart>
    </div>
    <div class="text-box">
      <h4 class="title">ASSESSMENT SUMMARY</h4>
      <div class="text-box-content">
        <div class="text block">{{ summary }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'assessment-report-partials-cover-content',
  props: ['keys', 'form'],
  data() {
    return {
      summary: '',
      sortedScores: [],
      collection_methods: [
        this.$t('pages.assessments.collectionMethods.10'),
        this.$t('pages.assessments.collectionMethods.30'),
      ],
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
      attributes: (state) => state.attributes.list,
    }),
  },
  mounted() {
    this.getAttributeScores();
    this.$nextTick(() => {
      // console.log('sortedScores', this.sortedScores);
      this.getSummary();
    });
  },
  methods: {
    getSummary() {
      // console.log('assessment', this.assessment);
      const date = new Date(this.assessment.created_on).toLocaleDateString(
        'en-GB',
        { day: '2-digit', month: 'long', year: 'numeric' },
      );
      const collectionMethods = this.assessment.collection_method
        ? ` via ${this.$t('pages.assessments.collectionMethods.' + this.assessment.collection_method).toLowerCase()}`
        : '';
      let summary =
        'An Elinor assessment of the governance and management of ' +
        this.managementArea.name +
        ' was conducted' +
        collectionMethods +
        ' on ' +
        date +
        '. The assessment measured ' +
        this.assessment.attributes.length +
        ' attributes associated with equitable and effective governance';

      const strengths = this.sortedScores.slice(0, 2);

      if (strengths.length > 0) {
        const strengthsSummary = strengths
          .map((strength) => strength.name)
          .reduce((acc, curr, idx, arr) => {
            if (arr.length > 1 && idx === arr.length - 1) {
              if (arr.length === 2) {
                return acc + ' and ' + curr;
              } else {
                return acc + ', and ' + curr;
              }
            }
            if (acc === '') return curr;
            return acc + ', ' + curr;
          }, '');
        summary += `. The assessment results suggest that ${strengthsSummary} are strong in ${this.managementArea.name}`;
      } else {
        // summary += `The results suggest that there may be a need to attend to perceived ecological outcomes and perceived social outcomes in ${this.managementArea.name}.`;
      }
      const needs = this.sortedScores.slice(3, 5);

      if (needs.length > 0) {
        const needsSummary = needs
          .map((need) => need.name)
          .reduce((acc, curr, idx, arr) => {
            if (arr.length > 1 && idx === arr.length - 1) {
              if (arr.length === 2) {
                return acc + ' and ' + curr;
              } else {
                return acc + ', and ' + curr;
              }
            }
            if (acc === '') return curr;
            return acc + ', ' + curr;
          }, '');
        if (strengths.length > 0) {
          summary += `, and that there may be a need to attend to ${needsSummary}`;
        } else {
          summary += `. The assessment results suggest that ${needsSummary} are needed in ${this.managementArea.name}`;
        }
      } else {
        // summary += `The results suggest that resource boundaries and enforcement are strong in  ${this.managementArea.name}.`;
      }
      const scoreStatement = this.$t(
        `pages.methodologyPage.scoreTable.${this.getAssessmentStatus(this.assessment.score)}.description`,
      ).toLowerCase();

      summary += `. The overall suggestion is to ${scoreStatement}.`;

      // console.log('summary', summary);

      this.summary = summary;
    },
    getAssessmentStatus(score) {
      if (score <= 29) {
        return 'plan';
      } else if (score <= 59) {
        return 'build';
      } else if (score <= 89) {
        return 'strengthen';
      } else {
        return 'maintain';
      }
    },
    getAttributeScores() {
      var answers = this.assessment.surveyAnswers;
      var attributes = this.attributes;
      // Calculate the sums and group data (while tracking count)
      const groupedAnswers = answers.reduce(function (acc, a) {
        if (!acc[a.question.attribute]) {
          var name = attributes.find((obj) => {
            return obj.id == a.question.attribute;
          }).name;
          acc[a.question.attribute] = {
            name: name,
            sum: a.choice,
            count: 1,
          };
          return acc;
        }
        acc[a.question.attribute].sum += a.choice;
        acc[a.question.attribute].count += 1;
        return acc;
      }, {});

      // Create new array from grouped data and compute the average
      const result = Object.keys(groupedAnswers).map(function (k) {
        const item = groupedAnswers[k];
        return {
          name: item.name,
          score: ((10 / 3) * item.sum) / item.count,
        };
      });
      this.sortedScores = result.sort((a, b) => {
        return b.score - a.score;
      });
    },
  },
};
</script>
