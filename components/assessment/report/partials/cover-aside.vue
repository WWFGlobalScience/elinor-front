<template>
  <div class="cover-aside aside">
    <div
      v-if="assessment && assessment.score !== null"
      class="flex gap-1 flex-col items-center mr-6 w-[66px] mt-[-33px]"
    >
      <div
        class="flex justify-center items-center w-[66px] h-[66px] rounded-full"
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
    <div
      v-else
      class="flex gap-1 flex-col items-center mr-6 w-[66px] mt-[-33px]"
    >
      <div
        class="flex justify-center items-center w-[66px] h-[66px] rounded-full"
        :class="'bg-grayy-lighter'"
      >
        <span class="text-white text-[36px] font-semibold"></span>
      </div>
      <span
        class="uppercase text-[#9C9C9C] font-medium text-[10px] leading-[15px]"
        >{{ $t('pages.assessments.outOf100') }}</span
      >
    </div>

    <div class="legend">
      <div class="legend-item" v-if="assessment.score <= 29">
        <div class="legend-item-color" style="--color: #e35d5e"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.plan.title') }}</strong>
          {{ $t('report.cover.legend.plan.description') }}
        </div>
      </div>
      <div
        class="legend-item"
        v-if="assessment.score > 29 && assessment.score <= 59"
      >
        <div class="legend-item-color" style="--color: #fbbe21"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.build.title') }}</strong>
          {{ $t('report.cover.legend.build.description') }}
        </div>
      </div>
      <div
        class="legend-item"
        v-if="assessment.score > 59 && assessment.score <= 89"
      >
        <div class="legend-item-color" style="--color: #bcbc16"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.strengthen.title') }}</strong>
          {{ $t('report.cover.legend.strengthen.description') }}
        </div>
      </div>
      <div
        class="legend-item"
        v-if="assessment.score > 89 && assessment.score <= 100"
      >
        <div class="legend-item-color" style="--color: #029262"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.maintain.title') }}</strong>
          {{ $t('report.cover.legend.maintain.description') }}
        </div>
      </div>
    </div>
    <div class="info-list">
      <div class="info">
        <div class="label">Managed area</div>
        <div class="value">
          {{
            assessment.management_area !== null && managementArea.name
              ? managementArea.name
              : '-'
          }}
        </div>
      </div>
      <div class="info">
        <div class="label">Country</div>
        <div class="value">
          {{
            assessment.management_area !== null &&
            managementArea.countries.length > 0
              ? managementArea.countries
                  .map((country) => country.name)
                  .join(', ')
              : '-'
          }}
        </div>
      </div>
      <div class="info">
        <div class="label">{{ $t('pages.report.aside.year') }}</div>
        <div class="value">{{ assessment.year }}</div>
      </div>
      <div class="info">
        <div class="label">{{ $t('pages.report.aside.size') }}</div>
        <div class="value">
          {{
            assessment.management_area !== null && managementArea.reported_size
              ? managementArea.reported_size + ' ha'
              : '-'
          }}
        </div>
      </div>
      <div class="info">
        <div class="label">{{ $t('pages.report.aside.governanceType') }}</div>
        <div class="value">
          {{
            assessment.management_area !== null &&
            managementArea.governance_type
              ? managementArea.governance_type.name
              : '-'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-report-partials-cover-aside',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
    }),
  },
  mounted() {
    // console.log(this.assessment);
    // console.log(this.managementArea);
  },
};
</script>
