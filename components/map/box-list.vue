<template>
    <div class="box-map font-montserrat">
        <button @click="close" type="button" class="btn--opacity absolute right-4 top-4 z-50">
            <img src="~/assets/img/ico-close-popup.svg" />
        </button>
        <div class="p-4 flex gap-2 items-center">
            <span class="w-3 h-3 block rounded-full" :class="'bg-' + getAssessmentColor(countryScore)"></span>
            <p class="text-[14px]">
                {{ country }}
            </p>
        </div>
        <div class="p-4 flex items-center justify-start gap-2 bg-turqy-lighter border-t border-grayy-border">
            <p class="text-m font-light">
                <strong class="font-bold text-turqy">{{ list.length }}</strong>
                Assessments
                <span v-if="countryHa > 0"> covering <br>
                    {{ countryHa.toLocaleString($i18n.locale, { minimumFractionDigits: 0, maximumFractionDigits: 0}) }} ha</span>
            </p>
        </div>
        <ul>
            <li v-for="report in list.filter(element => element.geometry.type == 'MultiPolygon')">
                <div class="flex flex-row flex-wrap items-center justify-start gap-2 p-4 border-b-1 border-grayy font-montserrat">
                    <div v-if="report.properties.score" class="flex justify-center items-center w-[40px] h-[40px] rounded-full" :class="'bg-' + getAssessmentColor(report.properties.score)">
                        <p class="text-white text-s font-bold leading-4 ">
                            {{ report.properties.score }}
                        </p>
                    </div>
                    <div class="flex flex-1 flex-col gap-0">
                        <p v-if="report.properties.name" 
                            @click="detail(report)"
                            class="font-montserrat font-semibold text-turqy text-[14px] leading-4 cursor-pointer"
                            >
                            {{ report.properties.name }}
                        </p>
                        <p v-if="report.properties.hectares" class="text-dark text-xs font-semibold leading-4">
                            {{ Number(report.properties.hectares).toLocaleString($i18n.locale) }} ha
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "map-box-list",
    props: ["list", "close","detail"],
    computed: {
        ...mapState({
            reports: state => state.reports.list,
            country: state => state.map.filters.country,
            management_area_countries: state => state.countries.management_area_countries,
        }),
        countryScore(){
            return this.list.reduce((a, b) => { return a + b.properties.score}, 0) / this.reports.length
        },
        countryHa(){
            var filtered = this.list.filter((report) => report.properties.hectares)
            if(filtered.length > 0){
                return (filtered.reduce((a, b) => { return a + Number(b.properties.hectares)}, 0) / filtered.length)
            }else{
                return 0
            }
        }
    },
    created() {
        this.visible = true;
    },
};
</script>
