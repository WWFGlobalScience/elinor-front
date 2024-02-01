<template>
    <div class="popup__content">
        <section class="border-b pb-12 mb-10">
            <div class="elinor-card--question pt-0">
                <span class="elinor-card--question__number text-black">1</span>
                <div class="elinor-card--question__info">
                    <h2 class="font-bold" v-html="$t('pages.assessments.list.aggregateReport.subtitle')"/>
                </div>
            </div>
            <form class="form form--assessment grid grid-cols-4 gap-6">
                <div class="input input--multiselect col-span-3 md:col-span-4">
                    <label class="label">{{
                            $t('pages.assessments.list.aggregateReport.byManagementAreas')
                        }}</label>
                    <div class="multiselect__wrap">
                        <multiselect
                            :value="filters.managementAreas"
                            track-by="id"
                            label="name"
                            :options="managementAreas"
                            :multiple="true" :searchable="true" :showLabels="false"
                            :allow-empty="false" open-direction="bottom" :hide-selected="true"
                            @input="onManagementAreaSelect"
                            @search-change="fetchManagementAreas">
                            <span slot="noOptions" slot-scope="props">{{ $t('pages.assessments.list.aggregateReport.managementAreaNoOptions') }}</span>
                            <span slot="noResult" slot-scope="props">{{ $t('pages.assessments.list.aggregateReport.managementAreaNoResults') }}</span>
                        </multiselect>
                        <div class="multiselect__caret">
                            <img src="~/assets/img/ico-select-turqy.svg">
                        </div>
                    </div>
                </div>
                <div :class="{'input--error': errors.year !== null}" class="input input--multiselect col-span-1 md:col-span-4">
                    <label class="label">{{ $t('pages.assessments.list.aggregateReport.byYear') }}*</label>
                    <div class="multiselect__wrap">
                        <multiselect
                            :value="filters.year"
                            :options="years"
                            :multiple="false"
                            :searchable="true"
                            :showLabels="false"
                            :allow-empty="false"
                            open-direction="bottom"
                            :hide-selected="true"
                            @input="onYearSelect($event)"
                        >
                            <span slot="noResult">{{ $t('default.noresults') }}</span>
                        </multiselect>
                        <div class="multiselect__caret">
                            <img src="~/assets/img/ico-select-turqy.svg">
                        </div>
                    </div>
                    <p class="msg msg--error" v-if="errors.year !== null">
                        {{ errors.year }}
                    </p>
                </div>
                <div :class="{'input--error': errors.countries !== null}" class="input input--multiselect col-span-2 md:col-span-4">
                    <label class="label"
                    >{{ $t("pages.assessments.list.aggregateReport.byCountries") }}*</label>
                    <div class="multiselect__wrap">
                        <multiselect
                            :value="filters.countries"
                            track-by="code"
                            label="name"
                            :options="countries"
                            :multiple="true"
                            :searchable="true"
                            :showLabels="false"
                            :allow-empty="true"
                            :hide-selected="true"
                            @input="onCountrySelect($event)"
                        >
                            <span slot="noResult" slot-scope="props">{{ $t("default.noresults") }}</span>
                        </multiselect>
                        <div class="multiselect__caret">
                            <img
                                src="~/assets/img/ico-select-turqy.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p class="msg msg--error" v-if="errors.countries !== null">
                        {{ errors.countries }}
                    </p>
                </div>
                <div :class="{'input--error': errors.type !== null}" class="input input--multiselect col-span-2 md:col-span-4">
                    <label class="label">{{ $t('pages.assessments.list.aggregateReport.byType') }}*</label>
                    <div class="multiselect__wrap">
                        <multiselect :value="filters.type" :options="types.map(type => { return {id: type, name: $t('pages.assessments.collectionMethods.' + type)}})" :multiple="false"
                                     track-by="id"
                                     label="name"
                                     :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom"
                                     :hide-selected="true" @input="onTypeSelect($event)">
                            <span slot="noResult">{{ $t('default.noresults') }}</span>
                        </multiselect>
                        <div class="multiselect__caret">
                            <img src="~/assets/img/ico-select-turqy.svg">
                        </div>
                    </div>
                    <p class="msg msg--error" v-if="errors.type !== null">
                        {{ errors.type }}
                    </p>
                </div>
            </form>
        </section>
        <section
            class="border-b pb-12 mb-10"
            v-if="filters.managementAreas.length || filters.countries.length || filters.year || filters.type"
        >
            <h3 class="mb-10" v-html="$t('pages.assessments.list.aggregateReport.filtersSelected')"/>
            <ul class="filters-selected flex flex-row justify-items-start items-center flex-wrap gap-3">
                <li class="elinor__tag" v-for="(managementArea, index) in filters.managementAreas">
                    <span class="text">{{ managementArea.name }}</span>
                    <a
                        @click="onRemoveFilter('managementAreas', index)"
                        role="button"
                        class="icon"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-close-popup.svg" alt="Delete"/>
                        <span class="visually-hidden">{{ $t("default.delete") }}</span>
                    </a>
                </li>
                <li class="elinor__tag" v-for="(country, index) in filters.countries">
                    <span class="text">{{ country.name }}</span>
                    <a
                        @click="onRemoveFilter('countries', index)"
                        role="button"
                        class="icon"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-close-popup.svg" alt="Delete"/>
                        <span class="visually-hidden">{{ $t("default.delete") }}</span>
                    </a>
                </li>
                <li class="elinor__tag" v-if="filters.year">
                    <span class="text">{{ filters.year }}</span>
                    <a
                        @click="onRemoveFilter('year')"
                        role="button"
                        class="icon"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-close-popup.svg" alt="Delete"/>
                        <span class="visually-hidden">{{ $t("default.delete") }}</span>
                    </a>
                </li>
                <li class="elinor__tag" v-if="filters.type">
                    <span class="text">{{ filters.type.name }}</span>
                    <a
                        @click="onRemoveFilter('type')"
                        role="button"
                        class="icon"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-close-popup.svg" alt="Delete"/>
                        <span class="visually-hidden">{{ $t("default.delete") }}</span>
                    </a>
                </li>
            </ul>
        </section>
        <section class="border-b pb-12 mb-10" v-if="assessments.length">
            <h3 class="mb-2" v-html="$t('pages.assessments.list.aggregateReport.assessments')"/>
            <p class="w-[100%] text-right mb-4"><span class="text-turqy-darker font-bold">{{
                    assessments.length
                }}</span> {{ $t('pages.assessments.list.aggregateReport.covering') }} {{ covering }} {{$t('pages.assessments.list.aggregateReport.coveringHA')}}</p>
            <ul class="ui-rounded-border p-0">
                <li
                    class="flex flex-row items-stretch justify-between p-0 mb-0"
                    :class="{ 'border-b': index !== assessments.length - 1 }"
                    v-for="(assessment, index) in assessments"
                    :key="index"
                >
                    <div
                        class="flex md:flex-col flex-row md:items-start items-center md:justify-items-start justify-between flex-grow p-6 gap-5">
                        <div
                            class="flex justify-center items-center w-[56px] h-[56px] rounded-full flex-shrink-0 flex-grow-0"
                            :class="{
                  'bg-good': assessment.score >= 60,
                  'bg-average': assessment.score < 60 && assessment.score >=30,
                  'bg-poor': assessment.score < 30
                }"
                        >
                            <span class="text-white text-[24px] font-semibold">{{ assessment.score }}</span>
                        </div>
                        <div class="flex-grow">
                            <h4 class="font-bold text-turqy-darker text-[14px] mb-1">{{ assessment.name }}</h4>
                            <span class="text-[14px] text-grey">{{ assessment.management_area.reported_size || 0 }} {{ $t('pages.assessments.list.aggregateReport.coveringHA') }}</span>
                        </div>
                        <div class="flex-grow-0 flex flex-col align-center justify-center md:text-left text-center">
                            <span class="text-[12px] text-grey mb-1"
                                  v-html="$t('pages.assessments.list.aggregateReport.year')"/>
                            <span class="text-[12px]">{{ assessment.year }}</span>
                        </div>
                    </div>
                    <div class="flex-grow-0 border-l p-6 flex flex-col justify-center items-center">
                        <div class="input input--checkbox">
                            <div class="checkbox">
                                <input type="checkbox" @change="onToggleAssessment(assessment.id, $event.target.value)"
                                       :checked="selectedAssessments.indexOf(assessment.id) !== -1">
                                <img src="~/assets/img/ico-checkbox.svg">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="border-b pb-12 mb-10">
            <div class="elinor-card--question pt-0">
                <span class="elinor-card--question__number text-black">2</span>
                <div class="elinor-card--question__info">
                    <h2 class="font-bold" v-html="$t('pages.assessments.list.aggregateReport.giveName')"/>
                </div>
            </div>
            <div class="name">
                <div class="input">
                    <input
                        type="text"
                        name="name"
                        :class="{'input--error': errors.name.length > 0}"
                        :placeholder="$t('pages.assessments.list.aggregateReport.giveNamePlaceholder')"
                        :value="name"
                        @change="name = $event.target.value"
                    />
                    <template v-if="errors.name.length">
                        <p class="msg msg--error" v-for="error in errors.name">
                            {{ error }}
                        </p>
                    </template>
                </div>
            </div>
        </section>
        <button
            @click="pdf"
            class="btn--border-turqy btn--opacity--child"
            type="button"
        >
            <span class="btn--opacity__target">{{ $t("pages.assessments.list.aggregateReport.create") }}</span>
            <img src="~/assets/img/ico-list-bullets-turqy.svg"/>
        </button>
        <p class="msg msg--error" v-if="errors.assessments">
            {{ errors.assessments }}
        </p>
        <div class="report-wrap" v-if="assessments.length > 0">
            <template v-for="(item, index) in Math.ceil(assessments.length/6)">
                <report-pages-aggregate :index="index"
                                        :assessments="assessments.filter(assessment => selectedAssessments.indexOf(assessment.id) !== -1)"
                                        :name="name" :selected-filters="filters"></report-pages-aggregate>
            </template>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {jsPDF} from "jspdf";

export default {
    name: "popup-assessment-download-aggregate-report",
    data() {
        return {
            name: null,
            years: [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3, new Date().getFullYear() - 4],
            types: [10, 30],
            selectedAssessments: [],
            errors: {name: [], assessments: null, countries: null, year: null, type: null}
        };
    },
    computed: {
        ...mapState({
            filters: (state) => state.assessments.aggregateReport.filters,
            assessments: (state) => state.assessments.aggregateReport.assessments,
            report: (state) => state.assessments.aggregateReport.report,
            managementAreas: state => state.managementareas.list,
            countries: state => state.countries.list,
        }),
        covering() {
            return this.assessments.reduce(function (a, b) {
                const size = b.management_area.reported_size;
                return a + (size ? size : 0);
            }, 0);
        }
    },
    methods: {
        ...mapActions({
            filterAggregateReport: "assessments/filterAggregateReport",
            removeFilterAggregateReport: "assessments/removeFilterAggregateReport",
            fetchManagementAreas: 'managementareas/fetchManagementAreas',
            popupState: "popup/popupState",
        }),

        onManagementAreaSelect(managementArea) {
            this.filterAggregateReport({field: 'managementAreas', value: managementArea});
        },
        onCountrySelect(countries) {
            this.filterAggregateReport({field: 'countries', value: countries});
        },
        onYearSelect(year) {
            this.filterAggregateReport({field: 'year', value: year});
        },
        onTypeSelect(type) {
            this.filterAggregateReport({field: 'type', value: type});
        },
        onToggleAssessment(assessmentId, value) {
            this.selectedAssessments = this.selectedAssessments.filter(id => id !== assessmentId);
            if (value) {
                this.selectedAssessments.push(assessmentId)
            }
        },
        onRemoveFilter(field, index = null) {
            this.removeFilterAggregateReport({field, index});
        },
        validate() {
            this.errors = {name: [], assessments: null, countries: null, year: null, type: null};

            if(this.filters.countries.length === 0){
                this.errors.countries = this.$t('default.required');
            }

            if(this.filters.year === null) {
                this.errors.year = this.$t('default.required');
            }

            if(this.filters.type === null) {
                this.errors.type = this.$t('default.required');
            }

            if(this.selectedAssessments.length === 0){
                this.errors.assessments = this.$t('pages.assessments.list.aggregateReport.selectedAssessmentsError');
            }

            if(this.name === null || this.name === '') {
                this.errors.name.push(this.$t('pages.assessments.list.aggregateReport.nameRequiredError'))
            } else {
                if(this.name.length > 50) {
                    this.errors.name.push(this.$t('pages.assessments.list.aggregateReport.nameLengthError'))
                }
            }

            console.log(this.errors);
            return this.errors.name.length === 0 && this.errors.assessments === null;
        },
        pdf() {
            if(this.validate()) {
                var doc = new jsPDF("l", "px", [1440, 1024]);
                this.generatePDFRecursive(0, doc)
            }
        },
        generatePDFRecursive(i, doc) {
            if (i < Math.ceil(this.selectedAssessments.length / 6)) {
                doc.html(document.querySelector(`#aggregate-report-${i}`), {
                    callback: (doc) => {
                        doc.setFont("Montserrat-Medium", "normal");
                        doc.setFont("Montserrat-SemiBold", "normal");
                        doc.setFont("Montserrat-Bold", "normal");
                        doc.internal.write(0, "Tw");

                        if (i + 1 < Math.ceil(this.selectedAssessments.length / 6)) {
                            doc.addPage([1440, 1024], "l");
                            this.generatePDFRecursive(i + 1, doc);
                        } else {
                            doc.save("aggregate-report.pdf");
                        }
                    },
                    x: 0,
                    y: i * 1024,
                });
            }
        }
    },
};
</script>
