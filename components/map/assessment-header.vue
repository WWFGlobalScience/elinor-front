<template>
  <div
    class="flex flex-row flex-wrap items-center justify-start gap-2 border-b-1 border-grayy font-montserrat"
  >
    <div
      v-if="assessment.score"
      class="flex justify-center items-center w-[40px] h-[40px] rounded-full"
      :class="'bg-' + getAssessmentColor(assessment.score)"
    >
      <p class="text-white text-s font-bold leading-4">
        {{ assessment.score }}
      </p>
    </div>
    <div class="flex flex-1 flex-col gap-1">
      <p v-if="assessment.name" class="font-semibold text-[12px] leading-4">
        {{ assessment.name }}
      </p>
      <p
        v-if="assessment.year"
        class="text-[#9C9C9C] text-[12px] leading-[22px]"
      >
        {{ assessment.year }} - Version {{ assessment.published_version }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-assessment-header',
  props: ['assessment'],
};
</script>
