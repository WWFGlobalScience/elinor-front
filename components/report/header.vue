<template>
    <header class="mt-5 ml-16 flex justify-start gap-8 items-center border-grayy-border border-b pb-4">
        <div class="flex gap-2 flex-col items-center">
            <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                :class="'bg-' + getAssessmentColor(report.score)">
                <span class="text-white text-[40px] font-montserratSemiBoldPdf">
                    {{ report.score }}
                </span>
            </div>
            <span class="uppercase text-grayy-lighter font-bold text-[12px] font-montserratSemiBoldPdf">out of 100</span>
        </div>
        <div class="text">
            <p v-if="report.management_area_countries && report.management_area_countries.countries" 
                class="text-[14px] font-semibold uppercase text-grayy-lighter font-montserratNormalPdf">
                    {{ report.management_area.countries.join( ', ' ) }}
            </p>
            <h1 class="text-[56px] leading-none font-montserratSemiBoldPdf">
                {{ report.name }}
            </h1>
            <p class=" mt-2 text-[24px] font-montserratSemiBoldPdf uppercase text-grayy-lighter">
                {{ $t("pages.assessments.list.year") }} {{ report.year }}
            </p>
        </div>
    </header>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "report-header",
    computed: {
        ...mapState({
            report: state => state.assessments.report
        })
    }
};
</script>
