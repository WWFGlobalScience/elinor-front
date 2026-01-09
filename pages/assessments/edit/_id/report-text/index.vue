<template>
  <section class="section section--assessment-context">
    <!-- <report-assessment
            :keys="sortedScores"
            :form="form"
        ></report-assessment> -->
    <div class="container">
      <form class="form form--assessment-context">
        <h4>{{ $t('pages.assessments.view.tabs.report.title') }}</h4>
        <p class="note">
          {{ $t('pages.assessments.view.tabs.report.description') }}
        </p>
        <div class="form__group">
          <div class="form__row">
            <div class="input input--pr">
              <div class="label">
                {{
                  $t('pages.assessments.actions.generateReport.strengths.title')
                }}
              </div>
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
            </div>
          </div>
          <div class="form__row" v-if="sortedScores.strengths.length > 0">
            <div class="input input--pr">
              <div class="label">
                {{
                  $t('pages.assessments.actions.generateReport.strengths.label')
                }}
              </div>
              <div class="notes">
                {{
                  $t(
                    'pages.assessments.actions.generateReport.strengths.explanation',
                  )
                }}
              </div>
              <textarea
                name="strengths_explanation"
                placeholder=""
                :value="values.strengths_explanation"
                :maxlength="maxLength"
                @input="
                  values.strengths_explanation = $event.target.value;
                  save('strengths_explanation', $event.target.value);
                "
                @change="save('strengths_explanation', $event.target.value)"
              ></textarea>
              <div class="character-counter">
                {{ charCount('strengths_explanation') }} / {{ maxLength }}
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--pr">
              <div class="label">
                {{ $t('pages.assessments.actions.generateReport.needs.title') }}
              </div>
              <ul class="list-keys key-ko" v-if="sortedScores.needs.length > 0">
                <li v-for="key in sortedScores.needs">
                  {{ key.name }}
                </li>
              </ul>
              <div class="note" v-else>
                {{
                  $t(
                    'pages.assessments.actions.generateReport.needs.explanationNo',
                  )
                }}
              </div>
            </div>
          </div>
          <div class="form__row" v-if="sortedScores.needs.length > 0">
            <div class="input input--pr">
              <div class="label">
                {{ $t('pages.assessments.actions.generateReport.needs.label') }}
              </div>
              <div class="notes">
                {{
                  $t(
                    'pages.assessments.actions.generateReport.needs.explanation',
                  )
                }}
              </div>
              <textarea
                name="needs_explanation"
                placeholder=""
                :value="values.needs_explanation"
                :maxlength="maxLength"
                @input="
                  values.needs_explanation = $event.target.value;
                  save('needs_explanation', $event.target.value);
                "
                @change="save('needs_explanation', $event.target.value)"
              ></textarea>
              <div class="character-counter">
                {{ charCount('needs_explanation') }} / {{ maxLength }}
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--pr">
              <div class="label">
                {{
                  $t('pages.assessments.actions.generateReport.context.label')
                }}
              </div>
              <div class="notes">
                {{
                  $t(
                    'pages.assessments.actions.generateReport.context.explanation',
                  )
                }}
              </div>
              <textarea
                name="context"
                placeholder=""
                :value="values.context"
                :maxlength="maxLength"
                @input="
                  values.context = $event.target.value;
                  save('context', $event.target.value);
                "
                @change="save('context', $event.target.value)"
              ></textarea>
              <div class="character-counter">
                {{ charCount('context') }} / {{ maxLength }}
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="btn-area">
              <assessment-edit-generate-report-btn
                :disabled="!checkFields()"
                :sortedScores="sortedScores"
                :form="form"
              ></assessment-edit-generate-report-btn>
              <!-- <assessment-report-generate :keys="sortedScores" :form="form"></assessment-report-generate> -->
              <!-- <button type="button" class="btn btn--md btn--tertiary" :class="{ 'btn--disabled': !checkFields() }" @click="pdf">
                                {{ $t('default.generateReport') }}
                            </button> -->
            </div>
          </div>
        </div>
      </form>
      <div class="!mb-20"></div>
      <div class="section__bottom">
        <NuxtLink
          @click.prevent
          :to="`/assessments/edit/${id}/the-survey`"
          class="btn btn--md"
        >
          <img
            src="~/assets/img/arrow_left_alt-white.svg"
            :alt="$t('pages.assessments.edit.tabs.nextStep')"
          />
          <span class="btn--opacity__target">Prev: The Survey</span>
        </NuxtLink>
        <NuxtLink
          @click.prevent
          :to="`/assessments/edit/${id}/collaborators`"
          class="btn btn--md"
        >
          <span class="btn--opacity__target">Next: Collaborators</span>
          <img
            src="~/assets/img/arrow_right_alt.svg"
            :alt="$t('pages.assessments.edit.tabs.nextStep')"
          />
        </NuxtLink>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { jsPDF } from 'jspdf';

export default {
  name: 'assessment-context',
  layout: 'assessment-edit',
  data() {
    return {
      id: this.$route.params.id,
      sortedScores: {
        strengths: [],
        needs: [],
      },
      form: {
        strengths: '',
        needs: '',
        context: '',
      },
      maxLength: 600,
      values: {
        strengths_explanation: '',
        needs_explanation: '',
        context: '',
      },
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes,
      popup: (state) => state.popup.popup,
    }),
  },
  watch: {
    assessment: {
      deep: true,
      handler() {
        if (this.assessment && this.assessment.strengths_explanation) {
          this.form.strengths = this.assessment.strengths_explanation;
          // this.values.strengths_explanation = this.assessment.strengths_explanation;
        }
        if (this.assessment && this.assessment.needs_explanation) {
          this.form.needs = this.assessment.needs_explanation;
          // this.values.needs_explanation = this.assessment.needs_explanation;
        }
        if (this.assessment && this.assessment.context) {
          this.form.context = this.assessment.context;
          // this.values.context = this.assessment.context;
        }

        if (
          this.assessment &&
          this.assessment.surveyAnswers &&
          this.attributes.list
        ) {
          this.getAttributeScores();
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('assessments/fetchAssessment', this.id);
    await this.$store.dispatch('assessments/fetchReport', this.id);
    this.values.strengths_explanation = this.assessment.strengths_explanation;
    this.values.needs_explanation = this.assessment.needs_explanation;
    this.values.context = this.assessment.context;
  },
  methods: {
    ...mapActions({
      fetchAssessment: 'assessments/fetchAssessment',
      editAssessment: 'assessments/editAssessment',
      editAssessmentField: 'assessments/editAssessmentField',
      updateAssessmentProgress: 'assessments/updateAssessmentProgress',
      editAssessmentFileField: 'assessments/editAssessmentFileField',
    }),
    charCount(field) {
      return (this.values[field] || '').length;
    },
    checkFields() {
      return (
        this.assessment.strengths_explanation !== '' &&
        this.assessment.needs_explanation !== '' &&
        this.assessment.context !== ''
      );
    },
    save(field, value) {
      this.editAssessmentField({ field, value, id: this.id });
      // Keep form object in sync for report generation
      if (field === 'strengths_explanation') {
        this.form.strengths = value;
      } else if (field === 'needs_explanation') {
        this.form.needs = value;
      } else if (field === 'context') {
        this.form.context = value;
      }
    },
    getAttributeScores() {
      var answers = this.assessment.surveyAnswers;
      var attributes = this.attributes.list;
      // Calculate the sums and group data (while tracking count)
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
      // console.log('scores', scores/sortedScores.length);

      // console.log('final scores', scores);
    },
    saveFieldsForReportGeneration() {
      return Promise.all();
    },
    pdf() {
      this.isReportGenerating = true;

      const doc = new jsPDF('a4', 'px', [595, 842]);

      doc.html(document.querySelector('#key-governances'), {
        callback: function (doc) {
          doc.setFont('Montserrat-Medium', 'normal');
          doc.setFont('Montserrat-SemiBold', 'normal');
          doc.setFont('Montserrat-Bold', 'normal');
          doc.internal.write(0, 'Tw');

          doc.addPage([595, 842], 'a4');
          doc.html(document.querySelector('#total-scores-page-1'), {
            callback: function (doc) {
              doc.addPage([595, 842], 'a4');
              doc.html(document.querySelector('#total-scores-page-2'), {
                callback: function (doc) {
                  doc.internal.write(0, 'Tw');
                  doc.save('report-score-assessment.pdf');

                  // popup.clearFieldsAfterReportGeneration();
                  // clearing fields after report generation is proper to keep the code robust but a redundant move
                  // as the report will overwirte any uncleared fields upon generating a new report. For this reason
                  // we dont currently need to show the user a message if field clearing fails. We also dont need to wait
                  // for the fields to be cleared before closing the popup.
                  // popup.isReportGenerating = false;
                  // popup.close();
                },
                x: 0,
                y: 1684,
              });
            },
            x: 0,
            y: 842,
          });
        },
        x: 0,
        y: 0,
      });
    },
  },
};
</script>
