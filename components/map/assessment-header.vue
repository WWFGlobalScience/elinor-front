<template>
    <div class="flex flex-row flex-wrap items-center justify-start gap-2 p-4 border-b-1 border-grayy font-montserrat">
        <div v-if="assessment.score" class="flex justify-center items-center w-[40px] h-[40px] rounded-full" :class="'bg-' + getAssessmentColor(assessment.score)">
            <p class="text-white text-s font-bold leading-4 ">
                {{ assessment.score }}
            </p>
        </div>
        <div class="flex flex-1 flex-col gap-0">
            <p v-if="assessment.name" class="font-montserrat font-semibold text-turqy text-[14px] leading-4">
                {{ assessment.name }}
            </p>
            <p v-if="assessment.year" class="text-dark text-xs font-semibold leading-4">
                Year {{ assessment.year }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-assessment-header",
    props: ["assessment"]
};
</script>
