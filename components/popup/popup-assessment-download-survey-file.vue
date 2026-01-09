<template>
  <div class="popup__content popup--small">
    <div class="description mb-6">
      <div v-html="$t('pages.assessments.downloadSurveyFile.helpTitle')" />
      <ul class="list-disc list-inside">
        <li>{{ $t('pages.assessments.downloadSurveyFile.help1') }}</li>
        <li>{{ $t('pages.assessments.downloadSurveyFile.help2') }}</li>
        <li>{{ $t('pages.assessments.downloadSurveyFile.help3') }}</li>
        <li>{{ $t('pages.assessments.downloadSurveyFile.help4') }}</li>
      </ul>
    </div>
    <div class="file__buttons flex justify-center">
      <button @click="onDownloadSurveyFile" type="button" class="btn btn--md">
        <span class="btn--opacity__target">Download Now</span>
        <!-- <img src="~/assets/img/ico-file-turqy.svg" /> -->
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-download-survey-file',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  methods: {
    ...mapActions({
      downloadSurveyFile: 'assessments/downloadSurveyFile',
      popupState: 'popup/popupState',
    }),

    async onDownloadSurveyFile() {
      await this.downloadSurveyFile(this.assessment.id);
    },
  },
};
</script>
