<template>
    <button
        v-if="assessments.length > 0"
        @click="pdf"
        role="button"
        class="btn btn--border-turqy btn--sm ml-auto"
        title="Report"
    >
        <img src="~/assets/img/ico-download.png" alt="Download" />
        <span>{{ $t('pages.report.country.download') }}</span>
        <div class="report-wrap">
            <template v-for="(item, index) in Math.ceil(report.length / 6)">
                <report-pages-country
                    :index="index"
                    :assessments="filteredAssessments"
                ></report-pages-country>
            </template>
        </div>
    </button>
</template>
<script>
import { mapState } from 'vuex';

import { jsPDF } from 'jspdf';
import '../../assets/fonts/montserrat/Montserrat-Medium-normal.js';
import '../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js';
import '../../assets/fonts/montserrat/Montserrat-Bold-bold.js';

export default {
    name: 'report-country',
    data() {
        return {
            report: [],
        };
    },
    computed: {
        ...mapState({
            filters: (state) => state.assessments.filters,
            assessments: (state) => state.assessments.list,
        }),
        filteredAssessments() {
            //return this.report.filter(a => a.id)
            return this.report.sort((a, b) => {
                return b.score - a.score;
            });
        },
    },
    watch: {
        assessments() {
            this.$axios({
                method: 'get',
                url: `v2/reports/assessments/?management_area_countries=${this.filters.management_area_countries}&status=${this.filters.status || ''}&year=${this.filters.year || ''}`,
            }).then((response) => {
                this.report = response.data.results;
            });
        },
    },
    methods: {
        pdf() {
            var doc = new jsPDF('l', 'px', [1440, 1024]);
            this.generatePDFRecursive(0, doc);
        },
        generatePDFRecursive(i, doc) {
            if (i < Math.ceil(this.report.length / 6)) {
                doc.html(document.querySelector(`#country-report-${i}`), {
                    callback: (doc) => {
                        doc.setFont('Montserrat-Medium', 'normal');
                        doc.setFont('Montserrat-SemiBold', 'normal');
                        doc.setFont('Montserrat-Bold', 'normal');
                        doc.internal.write(0, 'Tw');

                        if (i + 1 < Math.ceil(this.report.length / 6)) {
                            doc.addPage([1440, 1024], 'l');
                            this.generatePDFRecursive(i + 1, doc);
                        } else {
                            doc.save('report-score-country.pdf');
                        }
                    },
                    x: 0,
                    y: i * 1024,
                });
            }
        },
    },
};
</script>
