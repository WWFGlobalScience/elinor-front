<template>
    <div :id="'country-report-'+index" class="page-report">
        <report-aside />
        <div class="content-report">
            <header class="mt-5 ml-16 flex justify-start gap-8 items-center border-grayy-border border-b pb-4">
                <div class="flex gap-2 flex-col items-center">
                    <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                        :class="'bg-' + getAssessmentColor(countryScore)">
                        <span class="text-white text-[40px] font-montserratSemiBoldPdf">
                            {{ countryScore }}
                        </span>
                    </div>
                    <span class="uppercase text-grayy-lighter font-bold text-[12px] font-montserratSemiBoldPdf">out of 100</span>
                </div>
                <div class="text">
                    <h1 class="text-[56px] leading-none font-montserratSemiBoldPdf text-grayy">
                        {{ countries.find(c => c.code ==  selectedCountry).name }}
                    </h1>
                </div>
            </header>

            <div class="h-full pt-8 static">
                <table class="table-score-assessment">
                    <thead>
                        <tr>
                            <th class="title-col"></th>
                            <template v-for="attribute in attributes">
                                <th class="title-col">{{ attribute.name }}</th>
                            </template>
                        </tr>
                    </thead>
                    <tbody v-for="assessment in assessments.slice(index * 6,index * 6 + 6)">
                        <tr>
                            <th colspan="11" class="title-row">
                                <span><h3>{{assessment.name}}</h3></span>
                            </th>
                        </tr>
                        <tr class="wrapper-row">
                            <td><span class="dot-row" :class="'bg-' + getAssessmentColor(assessment.score)">{{ assessment.score }}</span></td>

                            <td v-for="attribute in attributes"
                                :set="att = assessment.attributes.find(a => a.attribute == attribute.name)">
                                    <span class="dot-col" :class="[att ? 'bg-' + getAttributeColor(att.score) : 'bg-grayy-lighter']">
                                        {{ att ? att.score : '-' }}
                                    </span>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: 'report-pages-country',
    props: ['index','assessments', 'selectedCountry'],
    computed: {
        ...mapState({
            attributes: state => state.attributes.list,
            countries: state => state.countries.list
        }),
        countryScore(){
            var sum = this.assessments.reduce( function(a, b){
                return a + b.score;
            }, 0);
            return (sum / this.assessments.length).toFixed(0)
        }
    }
};
</script>
