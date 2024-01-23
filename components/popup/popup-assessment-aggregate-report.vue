<template>
    <div class="popup__content">
        <h1 v-html="$t('pages.assessments.popup.aggregateReport.title')"/>
        <div class="filters">
            <form class="form">
                <div class="form__group">
                    <div class="container--sm">
                        <div class="form__row">
                            <div class="input input--multiselect">
                                <label class="label">{{
                                        $t('pages.assessments.popup.aggregateReport.managementArea.title')
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
                                        <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                    </multiselect>
                                    <div class="multiselect__caret">
                                        <img src="~/assets/img/ico-select-turqy.svg">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--multiselect">
                                <label class="label"
                                >{{ $t("pages.assessments.popup.aggregateReport.countries.title") }}*</label>
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
                                        @input="
                                        onCountrySelect($event)
                                    "
                                    >
                                    <span slot="noResult" slot-scope="props"
                                    >{{ $t("default.noresults") }}
                                    </span>
                                    </multiselect>
                                    <div class="multiselect__caret">
                                        <img
                                            src="~/assets/img/ico-select-turqy.svg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--multiselect">
                                <label class="label">{{ $t('pages.assessments.popup.aggregateReport.year.title') }}*</label>
                                <div class="multiselect__wrap">
                                    <multiselect :value="filters.year" :options="years" :multiple="false"
                                                 :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom"
                                                 :hide-selected="true" @input="onYearSelect($event)">
                                        <span slot="noResult">{{ $t('default.noresults') }}</span>
                                    </multiselect>
                                    <div class="multiselect__caret">
                                        <img src="~/assets/img/ico-select-turqy.svg">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--multiselect">
                                <label class="label">{{ $t('pages.assessments.popup.aggregateReport.realm.title') }}*</label>
                                <div class="multiselect__wrap">
                                    <multiselect :value="filters.realm" :options="realms" :multiple="false"
                                                 :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom"
                                                 :hide-selected="true" @input="onRealmSelect($event)">
                                        <span slot="noResult">{{ $t('default.noresults') }}</span>
                                    </multiselect>
                                    <div class="multiselect__caret">
                                        <img src="~/assets/img/ico-select-turqy.svg">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__row form__row--mt-16">
                            <div class="input input--multiselect">
                                <label class="label">{{ $t('pages.assessments.popup.aggregateReport.type.title') }}*</label>
                                <div class="multiselect__wrap">
                                    <multiselect :value="filters.type" :options="types" :multiple="false"
                                                 :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom"
                                                 :hide-selected="true" @input="onTypeSelect($event)">
                                        <span slot="noResult">{{ $t('default.noresults') }}</span>
                                    </multiselect>
                                    <div class="multiselect__caret">
                                        <img src="~/assets/img/ico-select-turqy.svg">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ul class="filters-selected" v-if="filters.managementAreas.length || filters.countries.length || filters.year || filters.realm || filters.type">
                <li v-for="(managementArea, index) in filters.managementAreas">
                    {{ managementArea.name }}
                    <a
                        @click="onRemoveFilter('managementAreas', index)"
                        role="button"
                        class="btn btn--rounded"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                        <span class="visually-hidden">{{$t("default.delete") }}</span>
                    </a>
                </li>
                <li v-for="(country, index) in filters.countries">
                    {{ country.name }}
                    <a
                        @click="onRemoveFilter('countries', index)"
                        role="button"
                        class="btn btn--rounded"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                        <span class="visually-hidden">{{$t("default.delete") }}</span>
                    </a>
                </li>
                <li v-if="filters.year">
                    {{ filters.year }}
                    <a
                        @click="onRemoveFilter('year')"
                        role="button"
                        class="btn btn--rounded"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                        <span class="visually-hidden">{{$t("default.delete") }}</span>
                    </a>
                </li>
                <li v-if="filters.realm">
                    {{ filters.realm }}
                    <a
                        @click="onRemoveFilter('realm')"
                        role="button"
                        class="btn btn--rounded"
                        title="Delete"
                    >
                        <img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                        <span class="visually-hidden">{{$t("default.delete") }}</span>
                    </a>
                </li>
                <li v-if="filters.type">
                    {{ filters.type }}<a
                    @click="onRemoveFilter('type')"
                    role="button"
                    class="btn btn--rounded"
                    title="Delete"
                >
                    <img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                    <span class="visually-hidden">{{$t("default.delete") }}</span>
                </a>
                </li>
            </ul>
        </div>
        <div class="assessments">
            <ul>
                <li v-for="(assessment, index) in assessments" :key="index">
                    {{assessment.name}}
                    <input type="checkbox" @change="onToggleAssessment(assessment.id, $event.target.value)" :checked="selectedAssessments.indexOf(assessment.id) !== -1">
                </li>
            </ul>
        </div>
        <div class="name">
            <div class="input">
                <label class="label"
                >{{$t("pages.assessments.popup.aggregateReport.name.label")}}*</label
                >
                <input
                    type="text"
                    name="name"
                    placeholder="Name here"
                    :value="name"
                    @change="name = $event.target.value"
                />
            </div>
        </div>
        <button
            @click="pdf"
            type="button"
            class="btn--border-turqy btn--opacity--child"
        >
            <span class="btn--opacity__target">{{ $t("pages.assessment.aggregateReport.buttons.pdf") }}</span>
            <img src="~/assets/img/ico-file-turqy.svg"/>
        </button>
        <div class="report-wrap" v-if="assessments.length > 0">
            <template v-for="(item, index) in Math.ceil(assessments.length/6)">
                <report-pages-aggregate :index="index" :assessments="assessments.filter(assessment => selectedAssessments.indexOf(assessment.id) !== -1)" :name="name" :selected-filters="filters"></report-pages-aggregate>
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
            realms: ['public', 'private'],
            types: [],
            selectedAssessments: []
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
        onRealmSelect(realm) {
            this.filterAggregateReport({field: 'realm', value: realm});
        },
        onTypeSelect(type) {
            this.filterAggregateReport({field: 'type', value: type});
        },
        onToggleAssessment(assessmentId, value) {
            this.selectedAssessments = this.selectedAssessments.filter(id => id !== assessmentId);
            if(value) {
                this.selectedAssessments.push(assessmentId)
            }
        },
        onRemoveFilter(field, index = null) {
            this.removeFilterAggregateReport({field, index});
        },
        pdf() {
            var doc = new jsPDF("l", "px", [1440, 1024]);
            this.generatePDFRecursive(0, doc)
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
                            doc.addPage([1440, 1024],"l");
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
