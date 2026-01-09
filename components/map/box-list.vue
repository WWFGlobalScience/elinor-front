<template>
  <div class="box-map font-montserrat">
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
    <!-- <div class="flex gap-2 items-center">
            <span
                class="w-3 h-3 block rounded-full"
                :class="'bg-' + getAssessmentColor(countryScore)"
            ></span>
            <p class="text-[14px]">
                {{ country.name }}
            </p>
        </div> -->
    <div
      class="flex items-start justify-start gap-1.5 pb-6 flex-col border-t border-grayy-border border-solid pt-[6px]"
    >
      <h5>
        {{ assessments.length }} Assessments
        {{ $t('pages.map.boxList.covering') }}
      </h5>

      <span v-if="countryHa > 0" class="text-[#9C9C9C] text-base font-semibold">
        {{
          countryHa.toLocaleString($i18n.locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        }}
        {{ $t('pages.map.boxList.ha') }}</span
      >
    </div>
    <ul>
      <li v-for="report in assessments">
        <div
          class="flex flex-row flex-wrap items-center justify-start gap-2 !py-6 border-solid border-b-1 border-grayy font-montserrat"
        >
          <div
            v-if="report.properties.score"
            class="flex justify-center items-center w-[56px] h-[56px] rounded-full"
            :class="'bg-' + getAssessmentColor(report.properties.score)"
          >
            <h4 class="text-white">
              {{ report.properties.score }}
            </h4>
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <h5
              v-if="report.properties.name"
              @click="detail(report)"
              class="cursor-pointer hover:text-turqy"
            >
              {{ report.properties.name }}
            </h5>
            <p
              v-if="report.properties.hectares"
              class="text-body-14 text-[#9C9C9C]"
            >
              {{
                Number(report.properties.hectares).toLocaleString($i18n.locale)
              }}
              ha
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'map-box-list',
  props: ['list', 'close', 'detail'],
  computed: {
    ...mapState({
      reports: (state) => state.reports.list,
      country: (state) => state.map.filters.country,
      management_area_countries: (state) =>
        state.countries.management_area_countries,
    }),
    assessments() {
      // console.log('list', this.list);
      return this.list.filter(
        (value, index, self) =>
          self.findIndex((v) => v.id === value.id) === index,
      );
    },
    countryScore() {
      return (
        this.assessments.reduce((a, b) => {
          return a + b.properties.score;
        }, 0) / this.assessments.length
      );
    },
    countryHa() {
      if (this.assessments.length > 0) {
        return this.assessments.reduce((a, b) => {
          return a + Number(b.properties.hectares);
        }, 0);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.visible = true;
  },
};
</script>
