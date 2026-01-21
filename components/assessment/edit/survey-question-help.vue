<template>
  <section
    class="section section--assessment-edit-survey-help elinor__question-help"
  >
    <div class="container">
      <div class="elinor__help-border"></div>
      <div class="elinor__help">
        <header>
          <h3>
            {{ $t('pages.assessments.edit.tabs.survey.questions.rationale') }}
          </h3>
        </header>
        <ul>
          <li v-html="question.rationale"></li>
        </ul>
      </div>
      <div class="elinor__help">
        <header>
          <h3>
            {{ $t('pages.assessments.edit.tabs.survey.questions.information') }}
          </h3>
        </header>
        <ul>
          <li v-html="question.information"></li>
        </ul>
      </div>
      <div class="elinor__help">
        <header>
          <h3>
            {{ $t('pages.assessments.edit.tabs.survey.questions.guidance') }}
          </h3>
        </header>
        <ul>
          <li v-html="question.guidance"></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-edit-survey-help',
  props: ['qid'],
  computed: {
    ...mapState({
      questions: (state) => state.surveyquestions.list,
    }),
    question() {
      const filtered = this.questions.filter(
        (question) => question.id === parseInt(this.qid),
      );
      return filtered[0];
    },
  },
};
</script>
