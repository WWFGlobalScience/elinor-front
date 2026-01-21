<template>
  <section class="section section--assessment-survey section--mt-0">
    <div class="container">
      <div class="elinor__survey-progress">
        <div class="elinor__survey-dots">
          <template
            v-for="(attribute, index) in attributes"
            class="elinor__survey-dots-item"
          >
            <div
              class="item"
              :class="{
                'li-bg-2': isCurrentQuestionFromAttribute(attribute),
                'li-bg-1':
                  !isCurrentQuestionFromAttribute(attribute) &&
                  isAttributeSelected(attribute),
                completed: isAttributeCompleted(attribute),
              }"
            >
              <template
                v-for="(question, number) in getAttributeQuestions(attribute)"
              >
                <template v-if="!mode || mode === 'list'">
                  <a
                    role="button"
                    :content="getQuestionTooltip(number, attribute, question)"
                    v-tippy="{
                      arrow: false,
                      arrowType: 'round',
                      animation: 'fade',
                      theme: 'light',
                      placement: 'bottom-start',
                    }"
                    class="btn-opacity"
                    :class="{
                      'is--uncomplete': !isAnswered(question),
                      'is--answered': isAnswered(question),
                      current: isCurrentQuestion(question),
                    }"
                    @click="
                      handleQuestionClick(
                        question,
                        isAttributeSelected(attribute),
                      )
                    "
                  >
                  </a>
                </template>
                <template v-if="mode && mode === 'detail'">
                  <nuxt-link
                    v-if="isAttributeSelected(attribute)"
                    role="button"
                    class="btn-opacity"
                    :class="
                      !isAnswered(question) ? 'is--uncomplete' : 'bg-turqy'
                    "
                    :to="`/assessments/edit/${assessment.id}/the-survey/${question.id}`"
                  >
                  </nuxt-link>
                  <a
                    v-if="!isAttributeSelected(attribute)"
                    role="button"
                    class="btn-opacity is--uncomplete cursor-default"
                  >
                  </a>
                </template>
              </template>
            </div>
            <div
              v-if="index < attributes.length - 1"
              class="elinor__survey-dots-separator"
            ></div>
          </template>
          <!-- <li
                        class="elinor__survey-complete elinor__survey-complete--no-border"
                    >
                        <div class="index">
                            {{ completedQuestions }}
                        </div>
                        <div class="text">
                            <span>{{
                                $t(
                                    'pages.assessments.edit.tabs.survey.navigator.completed',
                                )
                            }}</span>
                            <span
                                >{{
                                    $t(
                                        'pages.assessments.edit.tabs.survey.navigator.outOf',
                                    )
                                }}
                                {{ totalQuestions }}</span
                            >
                        </div>
                    </li> -->
        </div>
      </div>
    </div>
    <div v-if="isOffline" class="is--offline-warning">
      <img src="~/assets/img/warning.svg" alt="Warning" />
      <span>
        {{ $t('pages.assessments.edit.offlineSurveyWarning') }}
      </span>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-edit-survey-navigator',
  props: ['mode', 'qid'],
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
      isOffline: (state) => state.layout.offline,
    }),
    completedQuestions() {
      return (this.assessment.surveyAnswers || []).filter((surveyAnswer) =>
        this.isAttributeSelected({
          id: surveyAnswer.question.attribute,
        }),
      ).length;
    },
    activeQuestions() {
      return this.questions.filter(
        (question) =>
          this.assessment.attributes.indexOf(question.attribute) !== -1,
      );
    },
    totalQuestions() {
      return this.activeQuestions.length;
    },
  },
  methods: {
    isAnswered(question) {
      return (
        this.isAttributeSelected({ id: question.attribute }) &&
        !!(this.assessment.surveyAnswers || []).find(
          (surveyAnswer) => surveyAnswer.question.id === question.id,
        )
      );
    },
    isAttributeCompleted(attribute) {
      if (!this.isAttributeSelected(attribute)) {
        return false;
      }

      const attributeQuestions = this.getAttributeQuestions(attribute);
      return attributeQuestions.every((question) => this.isAnswered(question));
    },
    getAttributeQuestions(attribute) {
      return this.questions.filter(
        (question) => question.attribute === attribute.id,
      );
    },
    isAttributeSelected(attribute) {
      return (this.assessment.attributes || []).indexOf(attribute.id) !== -1;
    },
    isCurrentQuestionFromAttribute(attribute) {
      const questionId = this.$route.params.qid;
      if (questionId) {
        return (
          this.questions.filter(
            (question) =>
              question.id === parseInt(questionId) &&
              question.attribute === attribute.id,
          ).length !== 0
        );
      }
    },
    isCurrentQuestion(question) {
      const questionId = this.$route.params.qid;
      return parseInt(questionId) === parseInt(question.id);
    },
    getQuestionTooltip(number, attribute, question) {
      return `${attribute.name}<strong>Q${number + 1} - ${
        question.text
      }</strong>`;
    },
    handleQuestionClick(question, isAttributeSelected) {
      const questionId = this.$route.params.qid;
      const assessmentId = this.$route.params.id;
      // Emit event to parent component
      this.$emit('question-clicked', question);

      // Scroll to the question after a short delay to allow expansion
      const headerHeight = document.querySelector('.header--page').offsetHeight;
      const tabHeight = document.querySelector('.section--tab').offsetHeight;
      const totalHeight = headerHeight + tabHeight + 70;
      if (!questionId) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$scrollTo(`.question-${question.id}`, {
              offset: -totalHeight,
              duration: 500,
            });
          }, 100);
        });
      } else {
        if (isAttributeSelected && !this.isOffline) {
          window.location.href = `/assessments/edit/${assessmentId}/the-survey/${question.id}/#question`;
        }
      }
    },
  },
};
</script>
