<template>
  <section
    v-if="!loader.active || isOffline"
    class="section section--assesment-edit-survey section--mt-0"
  >
    <assessment-edit-survey-header></assessment-edit-survey-header>
    <assessment-edit-survey-navigator
      @question-clicked="handleQuestionClick"
    ></assessment-edit-survey-navigator>
    <!-- <assessment-edit-survey-attributes></assessment-edit-survey-attributes> -->
    <assessment-edit-survey-list ref="surveyList"></assessment-edit-survey-list>
    <button
      v-show="showScrollToTop"
      @click="scrollToTop"
      class="scroll-to-top-btn"
      :class="{ 'is--visible': showScrollToTop }"
      aria-label="Scroll to top"
    >
      <img src="~/assets/img/arrow_upward_alt.svg" alt="Scroll to top" />
    </button>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessnent-survey',
  layout: 'assessment-edit',
  data() {
    return {
      showScrollToTop: false,
    };
  },
  mounted() {
    this.$store.dispatch('assessments/fetchAssessment', this.assessmentId);
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState({
      loader: (state) => state.loader.loader,
      isOffline: (state) => state.layout.offline,
      assessmentId: (state) => state.assessments.assessment.id,
    }),
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300;
    },
    handleQuestionClick(question) {
      // Expand the attribute containing this question
      this.$refs.surveyList.expandAttributeByQuestionId(question.id);
    },
  },
};
</script>
