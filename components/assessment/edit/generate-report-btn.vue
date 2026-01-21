<template>
  <div>
    <!-- <a @click="downloadPdf">
            <img src="~/assets/img/download-ico.svg" alt="Download Data" />
            <span>{{ $t('default.downloadSummary') }}</span>
        </a> -->
    <div class="report-wrap">
      <assessment-report-generate
        :keys="sortedScores"
        :form="form"
      ></assessment-report-generate>
    </div>
    <button
      type="button"
      class="btn btn--md btn--tertiary"
      @click="downloadPdf"
    >
      {{ $t('default.generateReport') }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: 'assessment-edit-generate-report-btn',
  props: ['disabled', 'sortedScores', 'form'],
  data() {
    return {
      isReportGenerating: false,
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  mounted() {
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
      setTimeout(() => {
        // this.isReportGenerating = false;
        return Promise.resolve();
      }, 3000);
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

        const id = document.getElementById('report-assessment-generate');
        const idObjectives = document.getElementById(
          'objectives-pages-wrapper',
        );
        const idScores = document.getElementById('scores-pages-wrapper');
        // console.log('idScores', idScores);

        const coverPage = id.querySelector('.page-cover');
        const objectivesPages =
          idObjectives.querySelectorAll('.page-objectives');
        const scoresPages = idScores.querySelectorAll('.page-scores');
        // Use html2canvas to capture the content including SVG
        // console.log('scoresPages', scoresPages);
        // const doc = new jsPDF('p', 'px', 'a4');
        const doc = new jsPDF('a4', 'px', [595, 842]);
        const scale = 2;
        const coverPageCanvas = await html2canvas(coverPage, {
          scale: scale,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const coverPageImgData = coverPageCanvas.toDataURL('image/png');
        doc.addImage(coverPageImgData, 'PNG', 0, 0, 595, 842);

        // console.log('objectivesPages', objectivesPages);
        for (const objectivesPage of objectivesPages) {
          doc.addPage();
          const objectivesPageCanvas = await html2canvas(objectivesPage, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });
          const objectivesPageImgData =
            objectivesPageCanvas.toDataURL('image/png');
          doc.addImage(objectivesPageImgData, 'PNG', 0, 0, 595, 842);
        }

        for (const scoresPage of scoresPages) {
          doc.addPage();
          const scoresPageCanvas = await html2canvas(scoresPage, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });
          const scoresPageImgData = scoresPageCanvas.toDataURL('image/png');
          doc.addImage(scoresPageImgData, 'PNG', 0, 0, 595, 842);
        }

        doc.save('generated-report-assessment.pdf');

        // this.isReportGenerating = false;
        // this.$store.dispatch('loader/loaderState', {
        //     active: false,
        //     text: '',
        // });
      } catch (error) {
        console.error('PDF generation error:', error);
        this.$toast.error(
          this.$t('pages.assessments.actions.generateReport.error'),
        );
      }

      this.isReportGenerating = false;
      this.$store.dispatch('loader/loaderState', {
        active: false,
        text: '',
      });
    },
  },
};
</script>
