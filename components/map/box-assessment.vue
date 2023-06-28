<template>
    <div class="box-map font-montserrat">
        <button @click="close" type="button" class="btn--opacity absolute right-4 top-4 z-50">
            <img src="~/assets/img/ico-close-popup.svg" />
        </button>
        <div class="flex flex-row flex-wrap items-center justify-start gap-2 p-4 border-b-1 border-grayy font-montserrat">
            <div class="flex justify-center items-center w-[52px] h-[52px] rounded-full" :class="'bg-' + getAssessmentColor(assessment.properties.score)">
                <p class="text-white text-[24px] font-bold leading-4 ">
                    {{ assessment.properties.score }}
                </p>
            </div>
            <div class="flex flex-1 flex-col gap-0">
                <p class="font-montserrat font-semibold text-turqy text-[14px] leading-4">
                    {{ assessment.properties.name }}
                </p>
            </div>
        </div>

        <div class="wrap">
            <div class="pt-2 pb-2 pr-4 pl-4 flex flex-col justify-start gap-2 bg-turqy-lighter border-t border-grayy-border">
                <div v-if="assessment.properties.management_area" class="flex flex-col">
                    <p class="text-xs font-semibold text-grayy-lighter leading-4">
                        Name of Management Area
                    </p>
                    <p class="text-s font-semibold leading-6">
                        {{ assessment.properties.management_area.name }}
                    </p>
                </div>
                <div class="flex flex-row justify-start gap-8">
                    <div v-if="assessment.properties.year" class="flex flex-col ">
                        <p class="text-xs font-semibold text-grayy-lighter leading-4">
                            Year
                        </p>
                        <p class="text-s font-semibold leading-6">
                            {{ assessment.properties.year }}
                        </p>
                    </div>
                    <div v-if="assessment.properties.published_version" class="flex flex-col ">
                        <p class="text-xs font-semibold text-grayy-lighter leading-4">
                            Version
                        </p>
                        <p class="text-s font-semibold leading-6">
                            {{ assessment.properties.published_version }}
                        </p>
                    </div>
                    <div v-if="assessment.properties.hectares || assessment.properties.reported_size" class="flex flex-col">
                        <p class="text-xs font-semibold text-grayy-lighter leading-4">
                            Area Size
                        </p>
                        <p class="text-s font-semibold leading-6">
                            {{ assessment.properties.hectares || assessment.properties.reported_size }} h
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col chart-content pb-4 pr-4 pl-4 border-grayy-borde border-t border-b">
                <map-score-chart v-if="loaded" :width="288" :height="288"></map-score-chart>
                <p class="text-s font-semibold leading-4">
                    By <br>Attributes
                </p>
            </div>
        </div>
        <div class="flex justify-center p-2">
            <nuxt-link
                :to="`/assessments/${assessment.id}/info/`"
                class="btn btn--opacity--child">
                <span class="btn--opacity__target">Go to Full Assessment</span>
                <img src="~/assets/img/ico-button-arrow.svg" />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-box-list",
    props: ["assessment", "close"],
    data() {
        return {
            loaded: false,
        }
    },
    async mounted(){
        await this.$store.dispatch( 'assessments/fetchAssessment', this.assessment.id )
        this.loaded = true
    }
};
</script>
