<template>
  <section
    class="section section--assessment-edit-survey-question elinor__question"
  >
    <div class="container">
      <header id="question" class="header--back">
        <nuxt-link :to="`/assessments/edit/${id}/the-survey`">
          <img src="~/assets/img/arrow_left_alt.svg" alt="" />
        </nuxt-link>
        <div class="content">
          <p class="kicker">{{ $t('pages.assessments.edit.tabs.survey.attribute.title') }}</p>
          <h4 class="title">{{ attribute.name }}</h4>
        </div>
      </header>
    </div>
    <div class="container" :id="`questionWrapper-${questionId}`">
      <div class="question-wrapper">
        <div>
          <div class="question-content">
            <!-- col -->
            <div class="question">
              <div class="question__index">
                <!-- <span class="bullet"></span> -->
                <div class="text-body-14 text-[#9C9C9C] mb-2">
                  {{
                    $t('pages.assessments.edit.tabs.survey.questions.question')
                  }}
                  {{
                    surveyQuestionNumber(
                      questionId,
                      assessment,
                      attributes,
                      questions,
                    )
                  }}
                  /
                  {{ totalSurveyQuestions(assessment, questions) }}
                </div>
              </div>
              <div class="question__title">
                {{ question.text }}
              </div>
            </div>
            <div class="answers">
              <header>
                <p>
                  {{
                    $t(
                      'pages.assessments.edit.tabs.survey.questions.selectAnswer',
                    )
                  }}
                </p>
                <!-- <a href="#" class="btn btn--sm" v-scroll-to="{
                                    el: '.elinor__question-help',
                                    offset: -40,
                                }">
                                    <span>{{ $t( 'pages.assessments.edit.tabs.survey.questions.help' ) }}</span>
                                    <img src="~/assets/img/ico-arrow-bottom-white.svg" alt="">
                                </a> -->
              </header>
              <form class="form" refs="editAssessmentSurvey">
                <div class="form__group">
                  <div
                    v-for="(choice, index) in [3, 2, 1, 0]"
                    class="form__row"
                  >
                    <!-- <div
                                            class="input input--radios input--radios-question"
                                        >
                                            <div class="radios__wrap">
                                                <div class="radio__wrap">
                                                    <div class="radio">
                                                        <input
                                                            type="radio"
                                                            name="answer"
                                                            :id="'answer-' + choice"
                                                            @click="
                                                                saveChoice(choice)
                                                            "
                                                            :checked="
                                                                isAnsweredWith(
                                                                    choice,
                                                                )
                                                            "
                                                        />
                                                        <img
                                                            src="~/assets/img/ico-ok.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <label
                                                :for="'answer-' + choice"
                                                class="label"
                                            >
                                                <span></span>
                                                <span
                                                    v-html="
                                                        question[
                                                            answersMapping[choice]
                                                        ]
                                                    "
                                                ></span>
                                            </label>
                                        </div> -->
                    <div class="radios__wrap">
                      <label class="custom-radio">
                        <input
                          type="radio"
                          name="answer"
                          :id="'answer-' + choice"
                          @click="saveChoice(choice)"
                          :checked="isAnsweredWith(choice)"
                        />

                        <span
                          class="custom-radio__label"
                          v-html="question[answersMapping[choice]]"
                        ></span>
                      </label>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="radios__wrap">
                      <label class="custom-radio">
                        <input
                          type="radio"
                          name="answer"
                          id="answer-null"
                          @click="saveChoice(null)"
                          :checked="isAnsweredWith(null)"
                        />

                        <span class="custom-radio__label">
                          {{
                            $t(
                              'pages.assessments.edit.tabs.survey.questions.dontKnow',
                            )
                          }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form__group">
                  <div class="form__row">
                    <div class="input">
                      <div class="label">
                        {{
                          $t(
                            'pages.assessments.edit.tabs.survey.questions.explanation',
                          )
                        }}
                      </div>
                      <textarea
                        name="explanation"
                        ref="textareaExplanation"
                        :placeholder="$t('default.typeHere')"
                        class="!h-[195px] !mb-[-10px]"
                        @change="saveExplanation($event.target.value)"
                        >{{ answer && answer.explanation }}</textarea
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="question-separator"></div>
          <div class="question-help">
            <div class="text-body-14 text-[#9C9C9C] mb-2">{{ $t('pages.assessments.edit.tabs.survey.questions.guidelines') }}</div>
            <div>
              <accordion
                :index="1"
                :title="
                  $t('pages.assessments.edit.tabs.survey.questions.rationale')
                "
                :content="question.rationale"
                :isOpen="true"
                :isSmall="true"
              />
              <accordion
                :index="2"
                :title="
                  $t('pages.assessments.edit.tabs.survey.questions.information')
                "
                :content="question.information"
                :isSmall="true"
              />
              <accordion
                :index="3"
                :title="
                  $t('pages.assessments.edit.tabs.survey.questions.guidance')
                "
                :content="question.guidance"
                :isSmall="true"
              />
            </div>
          </div>
        </div>
        <nav class="question__nav">
          <ul>
            <li>
              <nuxt-link
                v-if="previousSurveyQuestion"
                :to="`/assessments/edit/${id}/the-survey/${previousSurveyQuestion}/#question`"
                @click.native="updateState()"
                class="btn btn--md"
              >
                <img src="~/assets/img/arrow_left_alt-white.svg" />
                <span
                  >{{
                    $t('pages.assessments.edit.tabs.survey.questions.prev')
                  }}
                  Question</span
                >
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="nextSurveyQuestion"
                :to="`/assessments/edit/${id}/the-survey/${nextSurveyQuestion}/#question`"
                @click.native="updateState()"
                class="btn btn--md"
              >
                <span
                  >{{
                    $t('pages.assessments.edit.tabs.survey.questions.next')
                  }}
                  {{ $t('pages.assessments.edit.tabs.survey.questions.question') }}</span
                >
                <img src="~/assets/img/arrow_right_alt.svg" />
              </nuxt-link>
              <nuxt-link
                v-if="isLastQuestionInSurvey && !isOffline"
                :to="`/assessments/edit/${id}/report-text`"
                @click.native="updateState()"
                class="btn btn--md"
              >
                <span
                  >{{
                    $t('pages.assessments.edit.tabs.nextStep')
                  }}
                  {{ $t('pages.assessments.edit.tabs.survey.questions.question') }}</span
                >
                <img src="~/assets/img/arrow_right_alt.svg" />
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  surveyQuestionNumber,
  totalSurveyQuestions,
  previousSurveyQuestion,
  nextSurveyQuestion,
  isLastQuestionInSurvey,
} from '../../../config/assessment-progress';
import Accordion from '../../accordion/index.vue';
export default {
  name: 'assessment-edit-survey-question',
  components: {
    Accordion,
  },
  props: ['qid'],
  data() {
    return {
      questionId: parseInt(this.qid),
      id: this.$route.params.id,
      answersMapping: {
        0: 'poor_0',
        1: 'average_1',
        2: 'good_2',
        3: 'excellent_3',
      },
    };
  },
  mounted() {
    setTimeout(() => {
      // console.log(
      //   `questionWrapper-${this.questionId}`,
      //   document.getElementById(`questionWrapper-${this.questionId}`),
      // );
      if (document.getElementById(`questionWrapper-${this.questionId}`)) {
        window.scrollTo({ top: 0 });
      }
    }, 100);
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
      isOffline: (state) => state.layout.offline,
      offlineSurveyAnswers: (state) => state.assessments.offlineSurveyAnswers,
    }),
    question() {
      const filtered = this.questions.filter(
        (question) => question.id === parseInt(this.qid),
      );
      return filtered[0];
    },
    attribute() {
      const filtered = this.attributes.filter(
        (attribute) => attribute.id === this.question.attribute,
      );
      return filtered[0];
    },
    answer() {
      return this.assessment.surveyAnswers.find(
        (surveyAnswer) => surveyAnswer.question.id === this.question.id,
      );
    },
    previousSurveyQuestion() {
      return previousSurveyQuestion(
        this.questionId,
        this.assessment,
        this.attributes,
        this.questions,
      );
    },
    nextSurveyQuestion() {
      return nextSurveyQuestion(
        this.questionId,
        this.assessment,
        this.attributes,
        this.questions,
      );
    },
    isLastQuestionInSurvey() {
      return isLastQuestionInSurvey(
        this.questionId,
        this.assessment,
        this.attributes,
        this.questions,
      );
    },
  },
  methods: {
    ...mapActions({
      storeSurveyAnswer: 'assessments/storeSurveyAnswer',
      updateSurveyAnswer: 'assessments/updateSurveyAnswer',
    }),
    save(choice) {
      const data = {
        ...(this.answer && { id: this.answer.id }),
        assessmentId: this.assessment.id,
        questionId: this.question.id,
        choice,
        explanation: this.$refs.textareaExplanation.value,
      };

      if (!this.answer) {
        this.storeSurveyAnswer(data);
      } else {
        this.updateSurveyAnswer(data);
      }
    },
    saveChoice(choice) {
      this.save(choice);
    },
    saveExplanation() {
      if (this.answer) {
        this.save(this.answer.choice);
      }
    },
    isAnsweredWith(choice) {
      return this.answer && this.answer.choice === choice;
    },
    totalSurveyQuestions,
    surveyQuestionNumber,
    updateState() {
      // console.log('updateState');

      if (!this.isOffline) {
        this.$store.dispatch('assessments/fetchAssessment', this.id);
      }
    },
  },
};
</script>
