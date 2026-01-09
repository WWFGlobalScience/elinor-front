<template>
  <section class="section section--ma-data tab-content">
    <div class="container">
      <div class="elinor__data-wrap gap-8 md:gap-[84px] max-w-[692px]">
        <div class="elinor__data-list">
          <ul class="elinor__data-grid">
            <li class="elinor__data elinor__data--full">
              <span class="title">
                {{
                  $t('pages.assessments.actions.generateReport.strengths.title')
                }}
              </span>
              <span class="data">
                <ul
                  class="list-keys key-ok"
                  v-if="sortedScores.strengths.length > 0"
                >
                  <li v-for="key in sortedScores.strengths">
                    {{ key.name }}
                  </li>
                </ul>
                <div class="note" v-else>
                  {{
                    $t(
                      'pages.assessments.actions.generateReport.strengths.explanationNo',
                    )
                  }}
                </div>
              </span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">
                {{
                  $t('pages.assessments.actions.generateReport.strengths.label')
                }}
              </span>
              <span class="data">{{
                assessment.strengths_explanation || 'N/A'
              }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">
                {{ $t('pages.assessments.actions.generateReport.needs.title') }}
              </span>
              <span class="data">
                <ul
                  class="list-keys key-ko"
                  v-if="sortedScores.needs.length > 0"
                >
                  <li v-for="key in sortedScores.needs">{{ key.name }}</li>
                </ul>
                <div class="note" v-else>
                  {{
                    $t(
                      'pages.assessments.actions.generateReport.needs.explanationNo',
                    )
                  }}
                </div>
              </span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">
                {{ $t('pages.assessments.actions.generateReport.needs.label') }}
              </span>
              <span class="data">{{
                assessment.needs_explanation || 'N/A'
              }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">
                {{
                  $t('pages.assessments.actions.generateReport.context.label')
                }}
              </span>
              <span class="data">{{ assessment.context || 'N/A' }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'report-text',
  data() {
    return {
      sortedScores: {
        strengths: [],
        needs: [],
      },
      id: this.$route.params.id,
      loader: {
        active: false,
      },
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes,
    }),
  },
  watch: {
    assessment: {
      deep: true,
      handler() {
        this.getAttributeScores();
      },
    },
  },
  mounted() {
    // console.log('mounted');
    this.sortedScores = {
      strengths: [],
      needs: [],
    };
    this.$nextTick(() => {
      this.getAttributeScores();
    });
  },
  methods: {
    getAttributeScores() {
      var answers = this.assessment.surveyAnswers;
      var attributes = this.attributes.list;
      // Calculate the sums and group data (while tracking count)
      // console.log('answers', answers);
      const groupedAnswers = answers
        .filter((answer) => answer.choice !== null)
        .reduce(function (acc, a) {
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
      // console.log('groupedAnswers', groupedAnswers);
      // Create new array from grouped data and compute the average
      const result = Object.keys(groupedAnswers).map(function (k) {
        const item = groupedAnswers[k];
        const score = ((10 / 3) * item.sum) / item.count;
        return {
          name: item.name,
          score: score.toFixed(0),
        };
      });
      const sortedScores = result.sort((a, b) => {
        return b.score - a.score;
      });

      let scores = {
        strengths: [],
        needs: [],
      };
      sortedScores.forEach((score) => {
        if (score.score > 5) {
          scores.strengths.push(score);
        } else {
          scores.needs.push(score);
        }
      });
      this.sortedScores = scores;
      // let scores = 0;
      // this.sortedScores.forEach(score => {
      //     console.log(score.name, score.score);
      //     scores += score.score;
      // });
      // // console.log('scores', scores);

      // console.log('sortedScores', this.sortedScores);
    },
  },
};
</script>
