<template>
    <div v-if="loaded">
        <report-pages-key-governances :keys="keys" :form="form"></report-pages-key-governances>
        <report-pages-total-scores></report-pages-total-scores>
    </div>
</template>
<script>
import { mapState } from 'vuex';

import { jsPDF } from "jspdf";
import "../../assets/fonts/montserrat/Montserrat-Medium-normal.js";
import "../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js";
import "../../assets/fonts/montserrat/Montserrat-Bold-bold.js";

export default {
    name: "report-assessment",
    props: ['keys', 'form'],
    data() {
        return {
            loaded: false
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            report: state => state.assessments.report,
        })
    },
    mounted() {
        this.$store.dispatch( 'assessments/fetchReport', this.assessment.id )
        this.$store.dispatch('surveyquestions/fetchSurveyQuestions');
        //this.$store.dispatch( 'managementareas/fetchManagementArea', this.assessment.management_area )
        this.loaded = true
    },
    methods: {
        getAttributteColor(score){            
            if(score <= 2){
                return this.scoreColors[0]
            }else if(score <= 5){
                return this.scoreColors[1]
            }else if(score <= 8){
                return this.scoreColors[2]
            }else{
                return this.scoreColors[3]
            }
        },
        pdf() {
            var doc = new jsPDF("l", "px", [1440, 1024]);
            var pdfjs = document.querySelector("#key-governances");
            doc.html(pdfjs, {
                callback: function (doc) {
                    doc.setFont("Montserrat-Medium", "normal");
                    doc.setFont("Montserrat-SemiBold", "normal");
                    doc.setFont("Montserrat-Bold", "normal");
                    doc.internal.write(0, "Tw");

                    doc.addPage([1440, 1024],"l");
                    doc.html(document.querySelector("#total-scores"), {
                        callback: function(doc) {
                            doc.setFont("Montserrat-Medium", "normal");
                            doc.setFont("Montserrat-SemiBold", "normal");
                            doc.setFont("Montserrat-Bold", "normal");
                            doc.internal.write(0, "Tw");
                            doc.save("report-score-assessment.pdf");
                        },
                        x: 0,
                        y: 1024,
                    });
                },
                x: 0,
                y: 0,
            });
        }
    }
};
</script>
<style>
#report-wrap{
    height: 1px;
    width: 1px;
    overflow:hidden;
}
</style>