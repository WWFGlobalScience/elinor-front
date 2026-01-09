<template>
  <div class="report-assessment" id="report-assessment-generate">
    <assessment-report-pages-cover
      :keys="keys"
      :form="form"
    ></assessment-report-pages-cover>
    <assessment-report-pages-objectives
      :keys="keys"
      :form="form"
    ></assessment-report-pages-objectives>
    <assessment-report-pages-scores></assessment-report-pages-scores>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-report-generate',
  props: ['keys', 'form'],
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  mounted() {
    this.$store.dispatch('assessments/fetchReport', this.assessment.id);
  },
};
</script>
