<template>
  <div class="box-map">
    <button
      @click="close"
      type="button"
      class="btn--opacity absolute right-4 top-4 z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <mask
          id="mask0_7708_8266"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="8"
          y="8"
          width="24"
          height="24"
        >
          <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_7708_8266)">
          <path
            d="M20.0127 21.8562L14.2607 27.6046C14.0041 27.8614 13.693 27.9869 13.3274 27.981C12.9615 27.9754 12.6502 27.8443 12.3936 27.5878C12.1369 27.3313 12.0086 27.0174 12.0086 26.6461C12.0086 26.2748 12.1369 25.9609 12.3936 25.7044L18.1283 19.9728L12.3767 14.2681C12.1198 14.0116 11.9943 13.6977 12.0002 13.3264C12.0058 12.9554 12.1369 12.6417 12.3936 12.3852C12.6502 12.1284 12.9643 12 13.3358 12C13.7073 12 14.0213 12.1284 14.278 12.3852L20.0127 18.1337L25.7205 12.3852C25.9771 12.1284 26.2882 12 26.6538 12C27.0197 12 27.331 12.1284 27.5876 12.3852C27.8625 12.6597 28 12.978 28 13.3402C28 13.7023 27.8625 14.0116 27.5876 14.2681L21.8528 19.9728L27.6044 25.7217C27.8614 25.9782 27.9898 26.2891 27.9898 26.6545C27.9898 27.0202 27.8614 27.3313 27.6044 27.5878C27.3298 27.8626 27.0113 28 26.6489 28C26.2866 28 25.9771 27.8626 25.7205 27.5878L20.0127 21.8562Z"
            fill="#2E2E2E"
          />
        </g>
      </svg>
    </button>
    <div
      class="flex flex-row flex-wrap items-center justify-start gap-2 pb-4 border-b-1 border-solid border-[#E7E7E7] font-montserrat"
    >
      <div
        class="flex justify-center items-center w-[52px] h-[52px] rounded-full"
        :class="'bg-' + getAssessmentColor(assessment.properties.score)"
      >
        <p class="text-white text-[24px] font-bold leading-4">
          {{ assessment.properties.score }}
        </p>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <h5 v-if="assessment.properties.name">
          {{ assessment.properties.name }}
        </h5>
        <p
          v-if="assessment.properties.year"
          class="text-[#9C9C9C] text-[12px] leading-[22px]"
        >
          {{ assessment.properties.year }} - Version
          {{ assessment.properties.published_version }}
        </p>
      </div>
    </div>

    <div class="wrap">
      <div
        class="flex flex-col border-b-1 border-solid border-[#E7E7E7] py-4 px-2"
        v-if="assessment.properties.management_area"
      >
        <p class="text-body-12 font-semibold text-[#9C9C9C]">
          {{ $t('pages.map.boxAssessment.managedArea') }}
        </p>
        <p class="text-body-14 font-semibold">
          {{ assessment.properties.management_area.name }}
        </p>
      </div>
      <div
        class="flex flex-col border-b-1 border-solid border-[#E7E7E7] py-4 px-2"
        v-if="
          assessment.properties.hectares || assessment.properties.reported_size
        "
      >
        <p class="text-body-12 font-semibold text-[#9C9C9C]">
          {{ $t('default.areaSize') }}
        </p>
        <p class="text-body-14 font-semibold">
          {{
            assessment.properties.hectares ||
            assessment.properties.reported_size
          }}
          h
        </p>
      </div>
      <div class="flex flex-col items-center justify-center py-6">
        <map-score-chart
          v-if="loaded"
          :width="300"
          :height="300"
        ></map-score-chart>
      </div>
    </div>
    <div class="flex justify-center">
      <nuxt-link
        :to="`/assessments/${assessment.id}/info/`"
        class="btn btn--opacity--child w-full !justify-center"
      >
        <span class="btn--opacity__target">See Full Assessment</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-box-assessment',
  props: ['assessment', 'close'],
  data() {
    return {
      loaded: false,
    };
  },
  async mounted() {
    await this.$store.dispatch(
      'assessments/fetchAssessment',
      this.assessment.id,
    );
    this.loaded = true;
  },
};
</script>
