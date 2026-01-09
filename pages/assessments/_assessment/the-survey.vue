<template>
  <section class="section section--assessment-survey section--mt-0">
    <assessment-survey-navigator
      @question-clicked="handleQuestionClick"
    ></assessment-survey-navigator>
    <assessment-survey-list ref="surveyList"></assessment-survey-list>

    <!-- Scroll to top button -->
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
export default {
  name: 'assessment-survey',
  auth: false,
  data() {
    return {
      showScrollToTop: false,
    };
  },
  mounted() {
    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    // Remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleQuestionClick(question) {
      // Expand the attribute containing this question
      this.$refs.surveyList.expandAttributeByQuestionId(question.id);
    },
    handleScroll() {
      // Show button when scrolled down more than 300px
      this.showScrollToTop = window.scrollY > 300;
    },
    scrollToTop() {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
