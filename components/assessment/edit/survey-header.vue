<template>
  <div class="survey-header">
      <div class="container">
          <div class="progress-text">
              {{
                  $t(
                      'pages.assessments.edit.tabs.survey.navigator.completed',
                  )
              }} <span>{{ completedQuestions }}</span> 
               to {{ totalQuestions }}
          </div>
          <div class="header-btns">
              <div class="assessment__btns relative">
                  <a
                      v-if="
                          !isSurveyOffline &&
                          isAssessmentCollaborator($auth, assessment) &&
                          !isAssessmentObserver($auth, assessment)
                      "
                      @click="downloadSurveyFile"
                      role="button"
                      title="Download survey"
                      >
                      <span>{{ $t('default.downloadSurveyFile') }}</span>
                  </a>
                  <span class="separator"></span>
                  <a
                      v-if="
                          !isSurveyOffline &&
                          isAssessmentCollaborator($auth, assessment) &&
                          !isAssessmentObserver($auth, assessment)
                      "
                      @click="uploadSurveyFile"
                      role="button"
                      title="Upload survey"
                      >
                      <span>{{ $t('default.uploadSurveyFile') }}</span>
                  </a>
              </div>
              <div class="switchers-container">
                  <div class="switchers" :class="{ 'is--offline': isSurveyOffline }">
                      <span :class="{ 'is--active': !isSurveyOffline }" @click="toggleConnection">
                          online
                      </span>
                      <span :class="{ 'is--active': isSurveyOffline }" @click="toggleConnection">
                          offline
                      </span>
                  </div>
                  <div 
                      class="cursor-pointer relative"
                      @mouseenter="isInfoTooltipOpen = true"
                      @mouseleave="isInfoTooltipOpen = false"
                  >
                      <img src="~/assets/img/info.svg" alt="Info" />
                      <div class="absolute w-[400px] top-full right-0 bg-white shadow-md px-3 py-2 z-20 mt-2" v-if="isInfoTooltipOpen">
                          <p class="text-sm text-[#2E2E2E] font-medium leading-6">{{ $t('pages.assessments.edit.offlineSurveyInfo') }}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  isAssessmentCollaborator,
  isAssessmentObserver,
} from '~/config/assessment-roles';

export default {
  name: 'assessment-edit-survey-header',
  data() {
      return {
          hasConnection: navigator.onLine,
          isInfoTooltipOpen: false,
      };
  },
  computed: {
      ...mapState({
          assessment: (state) => state.assessments.assessment,
          attributes: (state) => state.attributes.list,
          questions: (state) => state.surveyquestions.list,
          isOffline: (state) => state.layout.offline,
          isNetworkError: (state) => state.layout.isNetworkError,
          isSurveyOffline: (state) => !!state.assessments.assessment.checkout,
      }),
      completedQuestions() {
          return (this.assessment.surveyAnswers || []).filter(
              (surveyAnswer) =>
                  this.isAttributeSelected({
                      id: surveyAnswer.question.attribute,
                  }),
          ).length;
      },
      activeQuestions() {
          return this.questions.filter(
              (question) =>
                  this.assessment.attributes.indexOf(question.attribute) !==
                  -1,
          );
      },
      totalQuestions() {
          return this.activeQuestions.length;
      },
  },
  mounted() {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    //   console.log('hasConnection', navigator); 
  },
  methods: {
      isAssessmentCollaborator,
      isAssessmentObserver,
      ...mapActions({
          popupState: 'popup/popupState',
          downloadAssessment: 'assessments/downloadAssessment',
          setOffline: 'assessments/setOffline',
          setOnline: 'assessments/setOnline',
          
      }),
      updateOnlineStatus({ type }) {
          this.hasConnection = type === 'online';
      },
      isAttributeSelected(attribute) {
          return (
              (this.assessment.attributes || []).indexOf(attribute.id) !== -1
          );
      },
      downloadSurveyFile() {
          this.popupState({
              active: true,
              component: 'popup-assessment-download-survey-file',
              title: 'pages.assessments.downloadSurveyFile.title',
          });
      },
      uploadSurveyFile() {
          this.popupState({
              active: true,
              component: 'popup-assessment-upload-survey-file',
              title: 'pages.assessments.uploadSurveyFile.title',
          });
      },
      toggleConnection() {
        // Example usage
        // Example usage
        this.$store.dispatch('layout/checkNetworkStatus').then(() => {
        //   console.log('isNetworkError', this.isNetworkError);
        if (!this.isNetworkError) {
              if (this.isSurveyOffline) {
                  this.setOnline();
              } else {
                  this.setOffline();
              }
          } else {
              this.popupState({
                  active: true,
                  component: 'popup-assessment-without-connection',
                  title: 'pages.assessments.edit.tabs.survey.withoutConnectionPopupTitle',
              });
          }
        });

        // return;

      },
  },
};
</script>