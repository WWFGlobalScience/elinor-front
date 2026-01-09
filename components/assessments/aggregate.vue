<template>
  <div class="assessments-aggregate-area">
    <button
      type="button"
      class="btn btn--border-turqy btn--new-sm"
      @click="
        popupState({
          active: true,
          component: 'popup-assessment-download-report',
          title: 'pages.assessments.list.DownloadReport.title',
        })
      "
    >
      <span class="btn--opacity__target">{{
        $t('pages.assessments.list.DownloadReport.title')
      }}</span>
      <div class="icon-area">
        <img src="~/assets/img/ico-download-2.svg" alt="Download Data" />
        <img src="~/assets/img/ico-down-white.svg" alt="Download Data" />
      </div>
    </button>
    <button
      type="button"
      class="btn btn--border-turqy btn--new-sm"
      @click="
        popupState({
          active: true,
          component: 'popup-assessment-aggregate-report',
          title: 'pages.assessments.list.aggregateReport.title',
        })
      "
    >
      <span class="btn--opacity__target">{{
        $t('pages.assessments.list.aggregateReport.button')
      }}</span>
      <div class="icon-area">
        <img src="~/assets/img/ico-doc.svg" />
        <img src="~/assets/img/report-w.svg" />
      </div>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'assessments-aggregate',
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      download: 'assessments/downloadAssessments',
    }),
  },
};
</script>
