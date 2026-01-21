<template>
  <div class="popup__content popup__report">
    <div>
      <p v-show="!isPublish">{{ $t('popup.generateReport.description') }}</p>
      <p v-show="isPublish">{{ $t('popup.generateReport.descriptionPublish') }}</p>
      <div class="btn-area">
        <button type="button" class="btn btn--md" @click="openContextTab" v-show="!isPublish">
          {{ $t('popup.generateReport.btnOpenTab') }}
        </button>
        <button
          type="button"
          class="btn btn--md btn--tertiary"
          @click="downloadPdf"
        >
          <span v-if="!isReportGenerating && !isPublish">{{
            $t('popup.generateReport.btnAllGood')
          }}</span>
          <span v-else-if="isPublish && !isReportGenerating">{{ $t('popup.generateReport.btnGenerate') }}</span>
          <span v-else>{{ $t('popup.generateReport.btnGenerating') }}</span>
        </button>
        <button type="button" class="btn btn--md btn--no-border" @click="close">
          {{ $t('default.cancel') }}
        </button>
      </div>
    </div>
    <div class="report-wrap">
      <assessment-report-generate
        :keys="sortedScores"
        :form="form"
      ></assessment-report-generate>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  name: 'popup-assessment-generate-report',
  data() {
    return {
      sortedScores: [],
      isReportReady: false,
      isReportGenerating: false,
      isPublish: false,
      form: {
        strengths: '',
        needs: '',
        context: '',
      },
    };
  },

  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes,
      popup: (state) => state.popup.popup,
    }),
  },
  mounted() {
    this.$store.dispatch('assessments/fetchReport', this.assessment.id);
    this.form.strengths = this.assessment.strengths_explanation;
    this.form.needs = this.assessment.needs_explanation;
    this.form.context = this.assessment.context;
    // console.log(this.assessment);
    if (this.assessment.status === 10) {
      this.isPublish = true;
    }
    if (
      this.assessment.strengths_explanation &&
      this.assessment.needs_explanation &&
      this.assessment.context
    ) {
      this.isReportReady = true;
    }
    this.$nextTick(() => {
      this.getAttributeScores();
    });
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      editAssessmentField: 'assessments/editAssessmentField',
    }),
    openContextTab() {
      this.popupState({ active: false });
      this.$router.push(`/assessments/edit/${this.assessment.id}/report-text`);
    },
    close() {
      this.popupState({ active: false });
    },
    getAttributeScores() {
      var answers = this.assessment.surveyAnswers;
      var attributes = this.attributes.list;
      // Calculate the sums and group data (while tracking count)
      const groupedAnswers = answers.reduce(function (acc, a) {
        if (!acc[a.question.attribute]) {
          var name = attributes.find((obj) => {
            return obj.id == a.question.attribute;
          }).name;
          acc[a.question.attribute] = {
            name: name,
            sum: a.choice,
            count: 1,
          };
          return acc;
        }
        acc[a.question.attribute].sum += a.choice;
        acc[a.question.attribute].count += 1;
        return acc;
      }, {});

      // Create new array from grouped data and compute the average
      const result = Object.keys(groupedAnswers).map(function (k) {
        const item = groupedAnswers[k];
        return {
          name: item.name,
          score: ((10 / 3) * item.sum) / item.count,
        };
      });
      this.sortedScores = result.sort((a, b) => {
        return b.score - a.score;
      });
    },
    saveFieldsForReportGeneration() {
      console.log(this.form);
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

        const id = document.getElementById('report-assessment-generate');
        const idObjectives = document.getElementById(
          'objectives-pages-wrapper',
        );
        const idScores = document.getElementById('scores-pages-wrapper');
        // console.log('idScores', idScores);
        const scale = 2;
        const coverPage = id.querySelector('.page-cover');
        const objectivesPages =
          idObjectives.querySelectorAll('.page-objectives');
        const scoresPages = idScores.querySelectorAll('.page-scores');
        // Use html2canvas to capture the content including SVG
        // console.log('scoresPages', scoresPages);
        // const doc = new jsPDF('p', 'px', 'a4');
        const doc = new jsPDF('a4', 'px', [595, 842]);

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

        this.isReportGenerating = false;
        this.close();
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
