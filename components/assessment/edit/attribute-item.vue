<template>
  <div
    class="attribute-checkbox"
    :class="{ checked: isAttributeChecked(attribute) }"
    @click.stop="unCheckAttribute(attribute, $event)"
  >
    <div class="attribute-checkbox-icon" v-if="!checkIsLoading()">
      <img
        src="~/assets/img/check_circle.svg"
        alt="Checkbox checked"
        v-if="isAttributeChecked(attribute)"
      />
      <img
        src="~/assets/img/radio_button_unchecked-gray.svg"
        alt="Checkbox unchecked"
        v-else
      />
    </div>
    <div class="attribute-checkbox-loader-spinner" v-if="checkIsLoading()">
      <div class="vs__spinner"></div>
    </div>
    <span class="attribute-checkbox-label">{{
      !isAttributeChecked(attribute)
        ? $t('pages.assessments.edit.inactiveAttribute')
        : $t('pages.assessments.edit.activeAttribute')
    }}</span>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'attribute-item',
  data() {
    return {
      isAttributeLoading: false,
    };
  },
  props: {
    attribute: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  methods: {
    ...mapActions({
      toggleAttribute: 'assessments/toggleAttribute',
      removeSurveyAnswer: 'assessments/removeSurveyAnswer',
      popupState: 'popup/popupState',
    }),
    checkIsLoading() {
      // console.log('isAttributeLoading', this.isAttributeLoading);
      return this.isAttributeLoading;
    },
    isAttributeChecked(attribute) {
      setTimeout(() => {
        this.isAttributeLoading = false;
      }, 2000);
      return this.assessment.attributes.indexOf(attribute.id) !== -1;
    },
    getAttributeAnswers(attribute) {
      return this.assessment.surveyAnswers.filter(
        (surveyAnswer) => surveyAnswer.question.attribute === attribute.id,
      );
    },
    async onConfirmRemove(attribute) {
      return async () => {
        var answers = this.getAttributeAnswers(attribute);
        answers.forEach((answer) => {
          this.removeSurveyAnswer(answer.id);
        });
        await this.toggleAttribute({
          assessmentId: this.assessment.id,
          attributeId: attribute.id,
        });
        this.popupState(false, '', '');
        await this.updateState();
      };
    },
    async unCheckAttribute(attribute, event) {
      event.preventDefault();
      event.stopPropagation();
      this.isAttributeLoading = true;
      if (
        this.isAttributeChecked(attribute) &&
        this.getAttributeAnswers(attribute).length > 0
      ) {
        this.popupState({
          active: true,
          type: 'confirmation',
          component: 'popup-assessment-toggle-attribute',
          title: 'pages.assessments.edit.tabs.survey.uncheckAttributeTitle',
          onConfirm: await this.onConfirmRemove(attribute),
        });
      } else {
        await this.toggleAttribute({
          assessmentId: this.assessment.id,
          attributeId: attribute.id,
        });
      }
    },
    async updateState() {
      await this.$store.dispatch(
        'assessments/fetchAssessment',
        this.assessment.id,
      );
    },
  },
};
</script>
