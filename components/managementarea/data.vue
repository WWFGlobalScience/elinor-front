<template>
  <div class="section--ma-data">
    <div class="container">
      <div class="elinor__data-wrap gap-8 md:gap-6">
        <div class="elinor__data-list">
          <ul class="elinor__data-grid">
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.managementAreaName')
              }}</span>
              <span class="data">{{ managementArea.name }}</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.protectedArea')
              }}</span>
              <span class="data">{{
                managementArea.protected_area
                  ? managementArea.protected_area.name
                  : 'N/A'
              }}</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.dateEstablished')
              }}</span>
              <span class="data">{{ managementArea.date_established }}</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.reportedSize')
              }}</span>
              <span class="data">{{ managementArea.reported_size }} h</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.containedBy')
              }}</span>
              <span class="data">{{
                managementArea.containedby
                  ? managementArea.containedby.name
                  : 'N/A'
              }}</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.governanceType')
              }}</span>
              <span class="data">{{
                managementArea.governance_type &&
                managementArea.governance_type.name
              }}</span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.assessments.view.tabs.info.labels.managementAuthority',
                )
              }}</span>
              <span class="data">{{
                managementArea.management_authority &&
                managementArea.management_authority.name
              }}</span>
            </li>
          </ul>
          <div class="elinor__data-separator"></div>
          <ul class="elinor__data-grid">
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.recognitionLevel')
              }}</span>
              <span class="data">{{
                managementArea.recognition_level &&
                managementArea.recognition_level.join(', ')
              }}</span>
            </li>

            <!--<li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.assessments.view.tabs.info.labels.stakeholder-groups' ) }}</span>
                            <span class="data">
                                {{ managementArea.stakeholder_groups && managementArea.stakeholder_groups.map(stakeholderGroup => stakeholderGroup.name).join(', ') }}
                            </span>
                        </li>-->

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.supportSources')
              }}</span>
              <span class="data">
                {{
                  safeSupportSources.length > 0
                    ? safeSupportSources
                        .map((supportSource) => supportSource.name)
                        .join(', ')
                    : 'N/A'
                }}
              </span>
            </li>
          </ul>
          <div class="elinor__data-separator"></div>
          <ul class="elinor__data-grid">
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.countries')
              }}</span>
              <span class="data">
                {{
                  safeCountries.length > 0
                    ? safeCountries.map((country) => country.name).join(', ')
                    : 'N/A'
                }}
              </span>
            </li>

            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t('pages.assessments.view.tabs.info.labels.regions')
              }}</span>
              <span class="data">
                {{
                  safeRegions.length > 0
                    ? safeRegions.map((region) => region.name).join(', ')
                    : 'N/A'
                }}
              </span>
            </li>
          </ul>
          <div class="elinor__data-separator"></div>
          <div
            class="flex justify-between flex-grow items-center management-plan-content"
          >
            <h4>
              {{
                $t('pages.assessments.view.tabs.info.managementPlanFileTitle')
              }}
            </h4>
            <a
              v-if="assessment.management_plan_file"
              target="_blank"
              class="btn btn--md"
              :href="assessment.management_plan_file"
            >
              <span class="btn--opacity__target">{{
                $t(
                  'pages.assessments.view.tabs.info.buttons.managementPlanFile',
                )
              }}</span>
              <img src="~/assets/img/download-white.svg" alt="Download" />
            </a>
            <span v-else class="text-grayy-lighter">No document provided</span>
          </div>
        </div>
        <assessment-people></assessment-people>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'managementarea-data',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
    }),
    // Ensure arrays exist before accessing them
    safeSupportSources() {
      return this.managementArea?.support_sources || [];
    },
    safeCountries() {
      return this.managementArea?.countries || [];
    },
    safeRegions() {
      return this.managementArea?.regions || [];
    },
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
