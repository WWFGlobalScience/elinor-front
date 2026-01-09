<template>
  <section
    class="section section--assessment-edit-survey-attributes section--mt-0"
  >
    <div class="container">
      <div class="elinor__survey-attribute-wrapper">
        <header>
          <h1>
            {{ $t('pages.assessments.edit.tabs.survey.title') }}
          </h1>
        </header>
        <div class="elinor__survey-attribute-group">
          <h2 class="title-up uppercase">
            {{ $t('pages.assessments.edit.attributes') }}
          </h2>
          <ul class="elinor__survey-attribute-gird">
            <li
              v-for="(attribute, index) in requiredAttributes"
              class="elinor__survey-attribute-item item--mandatory"
            >
              <div class="item-pic">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=="
                />
              </div>
              <div class="item-content">
                <span class="title">{{ attribute.name }}</span>
                <span class="subtitle">{{ attribute.description }}</span>
                <a
                  href="#"
                  class="see-link"
                  v-scroll-to="{
                    el: '#anchor-attribute-' + attribute.id,
                    offset: -80,
                  }"
                >
                  {{ $t('pages.assessments.edit.seeQuestions') }}
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="elinor__survey-attribute-group">
          <div class="title-border">
            <h3 class="title">
              {{ $t('pages.assessments.edit.optionalAttributesTitle') }}
            </h3>
          </div>
          <p class="text-intro">
            {{ $t('pages.assessments.edit.optionalAttributesDescription') }}
          </p>
          <ul class="elinor__survey-attribute-gird">
            <li
              v-for="(attribute, index) in optionalAttributes"
              class="elinor__survey-attribute-item item--optional"
            >
              <div class="option-check">
                <input
                  :checked="isAttributeChecked(attribute)"
                  @click.stop="unCheckAttribute(attribute, $event)"
                  type="checkbox"
                  name="survey-attribute-optional"
                  id="survey-attribute-optional-1"
                />
                <div class="radio">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTcyMzIgNi44OTk5MUwxMC45NjYxIDBMMTIgMS4wNTAwNEw0LjE3MjMyIDlMMCA0Ljc2MjUxTDEuMDMzODkgMy43MTI0N0w0LjE3MjMyIDYuODk5OTFaIiBmaWxsPSIjMzU5RTk4Ii8+DQo8L3N2Zz4NCg=="
                  />
                </div>
                <div class="content">
                  <h4 class="title" for="survey-attribute-optional-1">
                    {{ attribute.name }}
                  </h4>
                  <h5 class="subtitle">
                    {{ attribute.description }}
                  </h5>
                </div>
              </div>
              <a
                href="#"
                class="see-link"
                v-scroll-to="{
                  el: '#anchor-attribute-' + attribute.id,
                  offset: -80,
                }"
              >
                See Questions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'assessment-edit-survey-attributes',
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
      attributes: (state) => state.attributes.list,
      assessment: (state) => state.assessments.assessment,
    }),
    requiredAttributes() {
      return this.attributes.filter((attribute) => attribute.required === true);
    },
    optionalAttributes() {
      return this.attributes.filter(
        (attribute) => attribute.required === false,
      );
    },
  },
  methods: {
    ...mapActions({
      toggleAttribute: 'assessments/toggleAttribute',
      removeSurveyAnswer: 'assessments/removeSurveyAnswer',
      popupState: 'popup/popupState',
    }),
    isAttributeChecked(attribute) {
      return this.assessment.attributes.indexOf(attribute.id) !== -1;
    },
    getAttributeAnswers(attribute) {
      return this.assessment.surveyAnswers.filter(
        (surveyAnswer) => surveyAnswer.question.attribute === attribute.id,
      );
    },
    onConfirmRemove(attribute) {
      return () => {
        var answers = this.getAttributeAnswers(attribute);
        answers.forEach((answer) => {
          this.removeSurveyAnswer(answer.id);
        });
        this.toggleAttribute({
          assessmentId: this.assessment.id,
          attributeId: attribute.id,
        });
        this.popupState(false, '', '');
        this.updateState();
      };
    },
    unCheckAttribute(attribute, event) {
      event.preventDefault();
      event.stopPropagation();
      if (
        this.isAttributeChecked(attribute) &&
        this.getAttributeAnswers(attribute).length > 0
      ) {
        this.popupState({
          active: true,
          type: 'confirmation',
          component: 'popup-assessment-toggle-attribute',
          title: 'pages.assessments.edit.tabs.survey.uncheckAttributeTitle',
          onConfirm: this.onConfirmRemove(attribute),
        });
      } else {
        this.toggleAttribute({
          assessmentId: this.assessment.id,
          attributeId: attribute.id,
        });
      }
    },
    updateState() {
      this.$store.dispatch('assessments/fetchAssessment', this.assessment.id);
    },
  },
};
</script>
