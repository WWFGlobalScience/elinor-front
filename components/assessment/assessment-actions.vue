<template>
  <div class="assessment__btns">
    <a
      v-if="false && assessment.status === 10"
      @click="download"
      role="button"
      class="btn btn--secondary"
      title="Download Data"
      ><img src="~/assets/img/ico-download.svg" alt="Download Data" />
      <span>{{ $t('default.downloadData') }}</span></a
    >
    <template v-if="$auth.loggedIn">
      <a
        v-if="isAssessmentCollaborator($auth, assessment) && !isSurveyOffline"
        @click="
          popupState({
            active: true,
            component: 'popup-assessment-generate-report',
            title: 'default.generateReport',
          })
        "
        role="button"
        class="btn btn--secondary"
        title="Report"
      >
        <svg>
          <path
            d="M8.75 8.75h5M8.75 11.25h5M16.25 3.125H3.75a.625.625 0 0 0-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 0 0-.625-.625ZM6.25 3.125v13.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ $t('default.generateReport') }}</span>
      </a>
      <a
        v-if="
          !isSurveyOffline &&
          isAssessmentCollaborator($auth, assessment) &&
          !isAssessmentObserver($auth, assessment)
        "
        @click="downloadSurveyFile"
        role="button"
        class="btn btn--border-turqy btn--sm"
        title="Download survey"
        ><img src="~/assets/img/ico-arrow-down.svg" alt="Download survey" />
        <span>{{ $t('default.downloadSurveyFile') }}</span></a
      >
      <a
        v-if="
          !isSurveyOffline &&
          isAssessmentCollaborator($auth, assessment) &&
          !isAssessmentObserver($auth, assessment)
        "
        @click="uploadSurveyFile"
        role="button"
        class="btn btn--border-turqy btn--sm"
        title="Upload survey"
        ><img src="~/assets/img/ico-arrow-up.svg" alt="Upload survey" />
        <span>{{ $t('default.uploadSurveyFile') }}</span></a
      >
      <a
        v-if="isSurveyTab && isOfflineModeEnabled"
        @click="onClickOfflineButton"
        role="button"
        class="btn btn--border-turqy btn--sm"
        :class="{ disabled: !hasConnection }"
        title="Offline"
        ><svg>
          <path
            d="M8.75 8.75h5M8.75 11.25h5M16.25 3.125H3.75a.625.625 0 0 0-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 0 0-.625-.625ZM6.25 3.125v13.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span> Turn {{ isSurveyOffline ? 'online' : 'offline' }} </span>
      </a>
      <a
        v-if="!isCreator() && !isSurveyOffline"
        @click="contact"
        role="button"
        class="btn btn--border-turqy !border-0 !p-2 !m-0 group"
        title="Contact"
        ><img
          src="~/assets/img/mail.svg"
          alt="Contact"
          class="!transform-none"
        />
        <span class="!ml-1 group-hover:underline">{{
          $t('default.contactAdministrator')
        }}</span></a
      >
      <span class="text-[#DADADA] mx-4">|</span>
      <a
        v-if="!isCreator() && !isSurveyOffline"
        @click="flag"
        role="button"
        class="btn btn--border-turqy !border-0 !p-2 !m-0 group"
        title="Flag"
        ><img src="~/assets/img/flag.svg" alt="Flag" class="!transform-none" />
        <span class="!ml-1 group-hover:underline"
          >{{ $t('default.flag') }}
        </span></a
      >
      <a
        v-if="isCreator() && assessment.status !== 10 && !isSurveyOffline"
        @click="destroy"
        role="button"
        class="btn btn--rounded"
        title="Delete"
        ><img src="~/assets/img/ico-trash2.svg" alt="Delete" />
        <span class="visually-hidden">{{ $t('default.delete') }}</span></a
      >
      <a
        v-if="isCreator() && assessment.status === 10 && !isSurveyOffline"
        @click="infoToDestroy"
        role="button"
        class="btn btn--rounded"
        title="Delete"
        ><img src="~/assets/img/ico-trash2.svg" alt="Delete" />
        <span class="visually-hidden">{{ $t('default.delete') }}</span></a
      >
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  isAssessmentCollaborator,
  isAssessmentObserver,
} from '~/config/assessment-roles';

export default {
  name: 'assessment-actions',
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
