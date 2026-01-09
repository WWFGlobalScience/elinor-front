<template>
  <section class="section section--ma-data">
    <div class="container">
      <div class="elinor__data-wrap gap-8 md:gap-[84px]">
        <div
          class="flex justify-between flex-grow items-center management-plan-content"
        >
          <h4>
            {{ $t('pages.assessments.view.tabs.info.managementPlanFileTitle') }}
          </h4>
          <a
            v-if="assessment.management_plan_file"
            target="_blank"
            class="btn btn--md"
            :href="assessment.management_plan_file"
          >
            <span class="btn--opacity__target">{{
              $t('pages.assessments.view.tabs.info.buttons.managementPlanFile')
            }}</span>
            <img src="~/assets/img/download-white.svg" alt="Download" />
          </a>
          <span v-else class="text-grayy-lighter">No document provided</span>
        </div>
        <div class="elinor__people"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'assessment-management-plan',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/core/variables';

.management-plan-content {
  padding-top: 40px;
  padding-bottom: 40px;
  // Make responsive - stack vertically on mobile (below tablet breakpoint)
  @media (max-width: $tablet-breakpoint) {
    @apply flex-col items-start gap-4;
    margin-top: -36px;
  }
}
</style>
