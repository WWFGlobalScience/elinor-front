<template>
    <div v-if="loaded">
        <report-pages-key-governances :keys="keys" :form="form"></report-pages-key-governances>
        <report-pages-total-scores-page1></report-pages-total-scores-page1>
        <report-pages-total-scores-page2></report-pages-total-scores-page2>
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
        this.loaded = true
    },
    methods: {
        pdf() {
            var doc = new jsPDF("l", "px", [1440, 1024]);
            var pdfjs = document.querySelector("#key-governances");
            doc.html(pdfjs, {
                callback: function (doc) {
                    doc.setFont("Montserrat-Medium", "normal");
                    doc.setFont("Montserrat-SemiBold", "normal");
                    doc.setFont("Montserrat-Bold", "normal");
                    doc.internal.write(0, "Tw");

                    doc.html(document.querySelector("#total-scores-page-1"), {
                        callback: function(doc2) {
                            doc2.setFont("Montserrat-Medium", "normal");
                            doc2.setFont("Montserrat-SemiBold", "normal");
                            doc2.setFont("Montserrat-Bold", "normal");
                            doc2.internal.write(0, "Tw");

                            doc2.html(document.querySelector("#total-scores-page-2"), {
                                callback: function(doc3) {
                                    doc3.setFont("Montserrat-Medium", "normal");
                                    doc3.setFont("Montserrat-SemiBold", "normal");
                                    doc3.setFont("Montserrat-Bold", "normal");
                                    doc3.internal.write(0, "Tw");
                                    doc3.save("report-score-assessment.pdf");
                                },
                                x: 0,
                                y: 1024,
                            });
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
