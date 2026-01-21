<template>
  <section class="section section--assessment-survey-list mt-8">
    <div class="container">
      <div class="survey-list-notes-wrapper">
        <div class="survey-list-notes">
          <p>
            {{ $t('pages.assessments.edit.tabs.survey.description1') }}
          </p>
          <p>
            {{ $t('pages.assessments.edit.tabs.survey.description2') }}
          </p>
        </div>
        <!-- <div class="btn btn--md btn--tertiary">
                    <span class="btn--opacity__target">Clear Data</span>
                </div> -->
      </div>
      <div class="elinor__survey-list">
        <div class="survey-list-header">
          <!-- <h4>Survey answers</h4> -->
          <button class="expand-all-btn" @click="toggleAllAttributes">
            <img
              src="~/assets/img/expand_all.svg"
              alt="arrow"
              v-if="!allAttributesExpanded"
              class="w-6 h-6"
            />
            <img
              src="~/assets/img/collapse_all.svg"
              alt="arrow"
              v-if="allAttributesExpanded"
              class="w-6 h-6"
            />
            {{ allAttributesExpanded ? 'Collapse all' : 'Expand all' }}
          </button>
        </div>
        <template v-for="(attribute, index) in attributes">
          <div class="attribute-dropdown">
            <!-- Clickable Header -->
            <div
              class="attribute-header"
              :class="{ 'is-expanded': isAttributeExpanded(attribute.id) }"
              @click="toggleAttribute(attribute.id)"
            >
              <div class="dropdown-arrow"></div>
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
                          getAttributeColor(getScoreByAttribute(attribute))
                        : 'bg-grayy-lighter'
                    "
                  >
                    <template v-if="isAttributeChecked(attribute)">
                      {{
                        getScoreByAttribute(attribute) !== null
                          ? getScoreByAttribute(attribute).toFixed(0)
                          : '-'
                      }}
                    </template>
                  </span>
                  <h3 class="title">
                    {{ attribute.name }}
                  </h3>
                </div>
                <AttributeItem :attribute="attribute"></AttributeItem>
                <!-- 
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
                                                'pages.assessments.edit.mandatoryAttribute',
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
                                                'pages.assessments.edit.inactiveAttribute',
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
                                            $t('pages.assessments.edit.activeAttribute')
                                        }}</span>
                                    </span>
                                </div> -->
              </div>
            </div>

            <!-- Collapsible Content -->
            <div
              class="attribute-content"
              v-show="isAttributeExpanded(attribute.id)"
            >
              <div class="description-wrap">
                <p>{{ attribute.description }}</p>
              </div>
              <div
                v-for="(question, index) in getAttributeQuestions(attribute)"
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
                            'bg-' + getAnswerColor(getAnswerChoice(question))
                          "
                        >
                          {{
                            getAnswerChoice(question) !== null
                              ? getAnswerChoice(question)
                              : '-'
                          }}
                        </span>
                      </div>
                      <div class="answer">
                        <span
                          v-html="
                            question[
                              answersMapping[getAnswerChoice(question)]
                            ] ||
                            $t(
                              'pages.assessments.edit.tabs.survey.questions.dontKnow',
                            )
                          "
                        ></span>
                      </div>
                      <template v-if="getAnswerExplanation(question)">
                        <div class="txt txt--explanation">
                          {{
                            $t(
                              'pages.assessments.edit.tabs.survey.questions.explanation',
                            )
                          }}
                        </div>
                        <div
                          class="answer"
                          v-html="getAnswerExplanation(question)"
                        ></div>
                      </template>
                    </template>
                    <div v-if="!isAnswered(question)" class="txt__uncomplete">
                      {{
                        $t(
                          'pages.assessments.edit.tabs.survey.questions.notCompleted',
                        )
                      }}
                    </div>
                    <nuxt-link
                      :to="`/assessments/edit/${assessment.id}/the-survey/${question.id}`"
                      class="btn btn--opacity--child btn--uncomplete btn--md"
                      :class="{ 'btn--tertiary': isAnswered(question) }"
                    >
                      <span v-if="!isAnswered(question)">
                        {{
                          $t(
                            'pages.assessments.edit.tabs.survey.questions.answerQuestionButton',
                          )
                        }}</span
                      >
                      <span v-if="isAnswered(question)">
                        {{
                          $t(
                            'pages.assessments.edit.tabs.survey.questions.editQuestionButton',
                          )
                        }}
                      </span>
                    </nuxt-link>
                  </div>
                  <div v-if="!isAttributeChecked(attribute)" class="q-msg">
                    <p class="txt__inactive">
                      {{
                        $t(
                          'pages.assessments.edit.tabs.survey.inactiveAttribute',
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="container">
      <div class="section__bottom">
        <NuxtLink
          @click.prevent
          :to="`/assessments/edit/${assessment.id}/managed-area`"
          class="btn btn--md"
        >
          <img
            src="~/assets/img/arrow_left_alt-white.svg"
            :alt="$t('pages.assessments.edit.tabs.nextStep')"
          />
          <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.survey.questions.prev') }}: Managed Area</span>
        </NuxtLink>
        <NuxtLink
          @click.prevent
          :to="`/assessments/edit/${assessment.id}/report-text`"
          class="btn btn--md"
        >
          <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.survey.questions.next') }}: Report Text</span>
          <img
            src="~/assets/img/arrow_right_alt.svg"
            alt=""
            :alt="$t('pages.assessments.edit.tabs.nextStep')"
          />
        </NuxtLink>
      </div>
      <!-- <div class="section__bottom">
                <NuxtLink
                    @click.prevent
                    :to="`/assessments/edit/${assessment.id}/collaborators`"
                    v-if="!isOffline"
                    class="btn btn--opacity--child"
                >
                    <span class="btn--opacity__target">
                        {{ $t('pages.assessments.edit.tabs.nextStep') }}
                    </span>
                    <img
                        src="~/assets/img/ico-button-arrow.svg"
                        :alt="$t('pages.assessments.edit.tabs.nextStep')"
                    />
                </NuxtLink>
            </div> -->
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AttributeItem from './attribute-item.vue';
export default {
  name: 'assessment-edit-survey-list',
  components: {
    AttributeItem,
  },
  data() {
    return {
      answersMapping: {
        0: 'poor_0',
        1: 'average_1',
        2: 'good_2',
        3: 'excellent_3',
      },
      scoreColors: ['poor', 'average', 'good', 'excellent'],
      expandedAttributes: {}, // Track which attributes are expanded
    };
  },
  mounted() {
    const assessmentOffline = this.assessment?.checkout;
    if (
      !!assessmentOffline &&
      this.$auth.loggedIn &&
      assessmentOffline !== this.$auth.user?.id
    ) {
      this.popupState({
        active: true,
        component: 'popup-assessment-offline',
        type: 'xs',
        onClose: () => this.$router.back(),
        title: 'pages.assessments.edit.tabs.survey.offlinePopupTitle',
      });
    }
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
      isOffline: (state) => state.layout.offline,
    }),
    allAttributesExpanded() {
      return this.attributes.every((attribute) =>
        this.isAttributeExpanded(attribute.id),
      );
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    getAttributeQuestions(attribute) {
      return this.questions.filter(
        (question) => question.attribute === attribute.id,
      );
    },
    isAnswered(question) {
      return !!this.assessment.surveyAnswers.find(
        (surveyAnswer) => surveyAnswer.question.id === question.id,
      );
    },
    getAnswerChoice(question) {
      return this.assessment.surveyAnswers.find(
        (surveyAnswer) => surveyAnswer.question.id === question.id,
      )?.choice;
    },
    getAnswerExplanation(question) {
      return this.assessment.surveyAnswers.find(
        (surveyAnswer) => surveyAnswer.question.id === question.id,
      )?.explanation;
    },
    isAttributeChecked(attribute) {
      return this.assessment.attributes.indexOf(attribute.id) !== -1;
    },
    getScoreByAttribute(attribute) {
      if (this.isAttributeChecked(attribute)) {
        const answers = this.assessment.surveyAnswers.filter(
          (surveyAnswer) =>
            surveyAnswer.choice !== null &&
            surveyAnswer.question.attribute === attribute.id,
        );
        if (!answers.length) {
          return null;
        }

        const sumValues = answers.reduce(function (s, a) {
          return s + a.choice;
        }, 0);
        const score = ((10 / 3) * sumValues) / Object.keys(answers).length; //score out of 10
        return parseFloat(score.toFixed(0));
      }

      return 0;
    },
    getAnswerColor(choice) {
      return choice !== null ? this.scoreColors[choice] : 'grayy-lighter';
    },
    toggleAttribute(attributeId) {
      this.$set(
        this.expandedAttributes,
        attributeId,
        !this.expandedAttributes[attributeId],
      );
    },
    isAttributeExpanded(attributeId) {
      return this.expandedAttributes[attributeId] || false;
    },
    expandAttribute(attributeId) {
      this.$set(this.expandedAttributes, attributeId, true);
    },
    expandAttributeByQuestionId(questionId) {
      // Find the attribute that contains this question
      const question = this.questions.find((q) => q.id === questionId);
      if (question) {
        this.expandAttribute(question.attribute);
      }
    },
    expandAllAttributes() {
      this.attributes.forEach((attribute) => {
        this.$set(this.expandedAttributes, attribute.id, true);
      });
    },
    collapseAllAttributes() {
      this.attributes.forEach((attribute) => {
        this.$set(this.expandedAttributes, attribute.id, false);
      });
    },
    toggleAllAttributes() {
      const allExpanded = this.attributes.every((attribute) =>
        this.isAttributeExpanded(attribute.id),
      );

      if (allExpanded) {
        this.collapseAllAttributes();
      } else {
        this.expandAllAttributes();
      }
    },
  },
};
</script>
