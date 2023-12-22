<template>
    <div class="popup__content popup--filters">
        <h4 class="c-title--modal mb-6">
            Select countries to generate report
        </h4>
        <form class="form form--ma-selector form--mt-0">
            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--1-2">
                        <div class="multiselect__wrap">
                            <multiselect :placeholder="$t('pages.assessments.list.country-report.popup.placeholders.countries')"
                                :value="getCountryByCode(country)"
                                track-by="code"
                                label="name"
                                :options="management_area_countries"
                                :multiple="false"
                                :searchable="false"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                @input="onCountryChanged($event.code)" >
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="mt-10">
                <div v-if="country !== null && report !== null && report.length === 0" class="mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">{{ $t('pages.assessments.list.country-report.popup.countryWithoutAssessments') }}</strong>
                </div>
                <button v-if="country !== null && report !== null && report.length > 0" type="button" @click="onApply" class="btn--border-turqy btn--opacity--child btn--tab-disabled"  style="float: left">
                    <span class="btn--opacity__target">{{ $t( 'pages.assessments.list.country-report.popup.apply' ) }}</span>
                    <img src="~/assets/img/ico-filters-turqy.svg">
                </button>
                <div style="clear: both"></div>
            </section>
            <div class="report-wrap" v-if="report !== null">
                <template v-for="(item, index) in Math.ceil(report.length/6)">
                    <report-pages-country :index="index" :assessments="filteredAssessments" :selected-country="country"></report-pages-country>
                </template>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {jsPDF} from "jspdf";

export default {
    name: 'popup-assessments-country-report',
    data() {
        return {
            country: null,
            report: null
        }
    },
    mounted() {
        this.$store.dispatch('countries/fetchCountries');
    },
    computed: {
        ...mapState({
            management_area_countries: state => state.countries.management_area_countries,
            assessments: state => state.assessments.list,
        }),
        filteredAssessments() {
            return this.report.sort((a,b) => { return b.score - a.score } );
        }
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
        onApply() {
            const doc = new jsPDF("l", "px", [1440, 1024]);
            this.generatePDFRecursive(0, doc)
        },
        onCountryChanged(value) {
            this.country = value;
            this.$axios({
                method: 'get',
                url: `v2/reports/assessments/?management_area_countries=${value}`
            }).then( ( response ) => {
                this.report = response.data.results
            })
        },
        getCountryByCode(code) {
            if(code) {
                return this.management_area_countries.filter(country => country.code === code)[0];
            }
        },
        generatePDFRecursive(i, doc) {
            if (i < Math.ceil(this.report.length / 6)) {
                doc.html(document.querySelector(`#country-report-${i}`), {
                    callback: (doc) => {
                        doc.setFont("Montserrat-Medium", "normal");
                        doc.setFont("Montserrat-SemiBold", "normal");
                        doc.setFont("Montserrat-Bold", "normal");
                        doc.internal.write(0, "Tw");

                        if (i + 1 < Math.ceil(this.report.length / 6)) {
                            doc.addPage([1440, 1024],"l");
                            this.generatePDFRecursive(i + 1, doc);
                        } else {
                            doc.save("report-score-country.pdf");
                        }
                    },
                    x: 0,
                    y: i * 1024,
                });
            }
        }
    }
}
</script>
