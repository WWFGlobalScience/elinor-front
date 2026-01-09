<template>
  <div v-if="assessment.management_area !== null && managementArea">
    <a @click="downloadPdf">
      <img src="~/assets/img/download-ico.svg" alt="Download Data" />
      <span>{{ $t('default.downloadSummary') }}</span>
    </a>
    <div class="report-wrap">
      <report-summary></report-summary>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: 'assessment-edit-summary-btn',
  data() {
    return {
      isReportGenerating: false,
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
    }),
  },
  mounted() {
    // console.log(this.managementArea);
    // console.log(this.assessment);
    if (this.isReportGenerating) {
      this.$store.dispatch('loader/loaderState', {
        active: true,
        text: 'Generating report...',
      });
    } else {
      this.$store.dispatch('loader/loaderState', {
        active: false,
        text: '',
      });
    }
  },
  methods: {
    saveFieldsForReportGeneration() {
      return Promise.resolve();
    },
    async downloadPdf() {
      this.isReportGenerating = true;

      this.$store.dispatch('loader/loaderState', {
        active: true,
        text: 'Generating report...',
      });

      try {
        await this.saveFieldsForReportGeneration();

        // Wait for SVG to be fully rendered
        await this.$nextTick();
        await new Promise((resolve) => setTimeout(resolve, 500));

        const element = document.getElementById('summary-report');

        // Use html2canvas to capture the content including SVG
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('l', 'px', [1445, 820]);

        const imgWidth = 1445;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('report-summary-assessment.pdf');

        this.isReportGenerating = false;
        this.$store.dispatch('loader/loaderState', {
          active: false,
          text: '',
        });
      } catch (error) {
        console.error('PDF generation error:', error);
        this.isReportGenerating = false;
        this.$store.dispatch('loader/loaderState', {
          active: false,
          text: '',
        });
        this.$toast.error(
          this.$t('pages.assessments.actions.generateReport.error'),
        );
      }
    },
  },
};
</script>
