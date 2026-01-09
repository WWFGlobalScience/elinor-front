<template>
  <div>
    <div class="assessment__btns">
      <a
        v-if="
          $auth.loggedIn &&
          isAssessmentCollaborator($auth, assessment) &&
          !isSurveyOffline
        "
        @click="
          popupState({
            active: true,
            component: 'popup-assessment-generate-report',
            title: 'default.generateReport',
          })
        "
      >
        <img src="~/assets/img/description.svg" />
        <span>{{ $t('default.generateReport') }}</span>
      </a>
      <!-- <NuxtLink v-if="
                    $auth.loggedIn && isAssessmentCollaborator($auth, assessment) &&
                    !isSurveyOffline
                "
                :to="`/assessments/edit/${assessment.id}/report-text`"
            >
                <img src="~/assets/img/description.svg" />
                <span>{{ $t('default.generateReport') }}</span>
            </NuxtLink> -->
      <span class="separator" v-if="$auth.loggedIn &&
      isAssessmentCollaborator($auth, assessment) &&
      !isSurveyOffline"></span>
      <assessment-edit-summary-btn
        v-if="$auth.loggedIn &&
        isAssessmentCollaborator($auth, assessment) &&
        !isSurveyOffline"
      ></assessment-edit-summary-btn>
      <!-- <a
            v-if="assessment.status !== 10 && !isSurveyOffline"
            @click="download"
            >
                <img src="~/assets/img/download-ico.svg" alt="Download Data" />
                <span>{{ $t('default.downloadSummary') }}</span>
            </a> -->
      <span class="separator" v-if="
          $auth.loggedIn &&
          isCreator() &&
          assessment.status !== 10 &&
          !isSurveyOffline"></span>
      <a
        v-if="
          $auth.loggedIn &&
          isCreator() &&
          assessment.status !== 10 &&
          !isSurveyOffline
        "
        @click="destroy"
        class="delete-btn"
      >
        <img src="~/assets/img/delete.svg" alt="Delete" />
        <span>Delete Assessment</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  isAssessmentCollaborator,
  isAssessmentObserver,
} from '~/config/assessment-roles';

export default {
  name: 'assessment-edit-header-btns',
  props: ['type'],
  data() {
    return {
      isSurveyTab: this.isSurveyRoute(),
      hasConnection: navigator.onLine,
    };
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    // console.log(this.assessment);
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
    isOfflineModeEnabled() {
      // Check runtime config (available in client-side) or fallback to process.env
      // Defaults to true unless explicitly set to false
      if (this.$config && this.$config.offlineMode === false) {
        return false;
      }
      if (process.env.OFFLINE_MODE === 'false') {
        return false;
      }
      return true;
    },
    isSurveyOffline() {
      // Only check checkout if offline mode is enabled
      return this.isOfflineModeEnabled && !!this.assessment.checkout;
    },
  },
  watch: {
    $route() {
      this.isSurveyTab = this.isSurveyRoute();
    },
  },
  methods: {
    isAssessmentObserver,
    ...mapActions({
      popupState: 'popup/popupState',
      downloadAssessment: 'assessments/downloadAssessment',
      setOffline: 'assessments/setOffline',
      setOnline: 'assessments/setOnline',
    }),
    isCreator() {
      return this.assessment.created_by === this.$auth.user.id;
    },
    isSurveyRoute() {
      return [
        'assessments-edit-id-the-survey-qid',
        'assessments-edit-id-the-survey',
      ].includes(this.$router.currentRoute.name);
    },
    contact() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-contact',
        title: 'pages.assessments.actions.contact.title',
      });
    },
    flag() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-flag',
        title: 'pages.assessments.actions.flag.title',
      });
    },
    destroy() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-delete',
        title: 'pages.assessments.actions.delete.subtitle',
      });
    },

    infoToDestroy() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-delete-info',
        title: 'pages.assessments.actions.delete-info.title',
      });
    },
    download() {
      this.downloadAssessment(this.assessment.id);
    },
    isAssessmentCollaborator,
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
    updateOnlineStatus({ type }) {
      this.hasConnection = type === 'online';
    },
    onClickOfflineButton() {
      if (this.hasConnection) {
        if (this.isSurveyOffline) {
          this.setOnline();
        } else {
          this.setOffline();
        }
      } else {
        this.popupState({
          active: true,
          component: 'popup-assessment-without-connection',
          title:
            'pages.assessments.edit.tabs.survey.withoutConnectionPopupTitle',
        });
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
};
</script>
