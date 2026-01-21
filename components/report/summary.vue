<template>
  <div class="summary-report" id="summary-report">
    <div class="summary-report-side">
      <div
        v-if="assessment && assessment.score !== null"
        class="flex gap-1 flex-col items-center mr-6 w-[89px]"
      >
        <div
          class="flex justify-center items-center w-[89px] h-[89px] rounded-full"
          :class="'bg-' + getAssessmentColor(assessment.score)"
        >
          <span class="text-white text-[36px] font-semibold">
            {{ assessment.score }}
          </span>
        </div>
        <span
          class="uppercase text-[#9C9C9C] font-medium text-[10px] leading-[15px]"
          >{{ $t('pages.assessments.outOf100') }}</span
        >
      </div>
      <div class="assessment-info-list">
        <div class="assessment-info">
          <div class="label">Managed area</div>
          <div class="value">
            {{
              assessment.management_area !== null &&
              managementArea &&
              managementArea.name
                ? managementArea.name
                : '-'
            }}
          </div>
        </div>
        <div class="assessment-info">
          <div class="label">Country</div>
          <div class="value">
            {{
              assessment.management_area !== null &&
              managementArea &&
              managementArea.countries &&
              managementArea.countries.length > 0
                ? managementArea.countries
                    .map((country) => country.name)
                    .join(', ')
                : '-'
            }}
          </div>
        </div>
        <div class="assessment-info">
          <div class="label">Year Established</div>
          <div class="value">
            {{ assessment && assessment.year ? assessment.year : '-' }}
          </div>
        </div>
        <div class="assessment-info">
          <div class="label">Size</div>
          <div class="value">
            {{
              assessment.management_area !== null &&
              managementArea &&
              managementArea.reported_size
                ? managementArea.reported_size + ' ha'
                : '-'
            }}
          </div>
        </div>
        <div class="assessment-info">
          <div class="label">Governance type</div>
          <div class="value">
            {{
              assessment.management_area !== null &&
              managementArea &&
              managementArea.governance_type
                ? managementArea.governance_type.name
                : '-'
            }}
          </div>
        </div>
        <!-- <div class="assessment-info">
                    <div class="label">Management objectives</div>
                    <div class="value">{{ (assessment.management_area !== null && managementArea.objectives) ? managementArea.objectives : '-' }}</div>
                </div> -->
      </div>
    </div>
    <div class="summary-report-main">
      <div class="summary-report-main-header">
        <h1>{{ assessment && assessment.name ? assessment.name : '-' }}</h1>
        <p>{{ assessment && assessment.year ? assessment.year : '-' }}</p>
      </div>

      <assessment-score-chart-edit></assessment-score-chart-edit>

      <div class="legend">
        <div class="legend-item">
          <div class="legend-item-color" style="--color: #e35d5e"></div>
          <div class="legend-item-text">
            <strong>0-2: PLAN</strong>
            for addressing severe governance gaps
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-item-color" style="--color: #fbbe21"></div>
          <div class="legend-item-text">
            <strong>3-5: BUILD</strong>
            upon initial progress to address major governance gaps
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-item-color" style="--color: #bcbc16"></div>
          <div class="legend-item-text">
            <strong>6-8: STRENGTHEN</strong>
            governance by addressing minor gaps
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-item-color" style="--color: #029262"></div>
          <div class="legend-item-text">
            <strong>9-10: MAINTAIN</strong>
            strong governance and monitor potential threats
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'report-summary',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
    }),
    safeManagementArea() {
      return this.managementArea || {};
    },
    safeCountries() {
      return this.safeManagementArea.countries || [];
    },
  },
  mounted() {
    // console.log(this.assessment);
    // console.log(this.managementArea);
  },
  methods: {
    // getAssessmentColor(score) {
    //     return this.$store.getters.getAssessmentColor(score);
    // },
  },
};
</script>
