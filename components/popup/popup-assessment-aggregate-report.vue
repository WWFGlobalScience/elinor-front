<template>
  <div class="popup__content">
    <section class="border-b pb-12 mb-10">
      <div class="elinor-card--question pt-0">
        <span class="elinor-card--question__number text-black">1</span>
        <div class="elinor-card--question__info">
          <h2 class="font-bold" v-html="$t('pages.assessments.popup.aggregateReport.title')"/>
        </div>
      </div>
      <form class="form form--assessment grid grid-cols-4 gap-6">
          <div class="input input--multiselect col-span-3 md:col-span-4">
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
          <div class="input input--multiselect col-span-1 md:col-span-4">
            <label class="label">{{ $t('pages.assessments.popup.aggregateReport.year.title') }}*</label>
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
          </div>
          <div class="input input--multiselect col-span-2 md:col-span-4">
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
          </div>
          <div class="input input--multiselect col-span-1 md:col-span-4">
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
          <div class="input input--multiselect col-span-1 md:col-span-4">
            <label class="label">{{ $t('pages.assessments.popup.aggregateReport.realm.title') }}*</label>
            <div class="multiselect__wrap">
              <multiselect
                  :value="filters.realm"
                  :options="realms"
                  :multiple="false"
                  :searchable="true"
                  :showLabels="false"
                  :allow-empty="false"
                  open-direction="bottom"
                  :hide-selected="true"
                  @input="onRealmSelect($event)"
              >
                <span slot="noResult">{{ $t('default.noresults') }}</span>
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg">
              </div>
            </div>
          </div>
      </form>
    </section>
    <section
        class="border-b pb-12 mb-10"
        v-if="filters.managementAreas.length || filters.countries.length || filters.year || filters.realm || filters.type"
    >
      <h3 class="mb-10" v-html="$t('pages.assessments.popup.filtersSelected.title')"/>
      <ul class="filters-selected flex flex-row justify-items-start items-center flex-wrap gap-3">
        <li class="elinor__tag" v-for="(managementArea, index) in filters.managementAreas">
          <span class="text">{{ managementArea.name }}</span>
          <a
              @click="onRemoveFilter('managementAreas', index)"
              role="button"
              class="icon"
              title="Delete"
          >
            <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
            <span class="visually-hidden">{{$t("default.delete") }}</span>
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
            <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
            <span class="visually-hidden">{{$t("default.delete") }}</span>
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
            <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
            <span class="visually-hidden">{{$t("default.delete") }}</span>
          </a>
        </li>
        <li class="elinor__tag" v-if="filters.realm">
          <span class="text">{{ filters.realm }}</span>
          <a
              @click="onRemoveFilter('realm')"
              role="button"
              class="icon"
              title="Delete"
          >
            <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
            <span class="visually-hidden">{{$t("default.delete") }}</span>
          </a>
        </li>
        <li class="elinor__tag" v-if="filters.type">
          <span class="text">{{ filters.type }}</span>
          <a
              @click="onRemoveFilter('type')"
              role="button"
              class="icon"
              title="Delete"
          >
            <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
            <span class="visually-hidden">{{$t("default.delete") }}</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="border-b pb-12 mb-10" v-if="assessments.length">
      <h3 class="mb-2" v-html="$t('pages.assessments.popup.selectedAssessments.title')"/>
      <p class="w-[100%] text-right mb-4"><span class="text-turqy-darker font-bold">{{ assessments.length }}</span> {{ $t('pages.assessments.popup.selectedAssessments.description') }}</p>
      <ul class="ui-rounded-border p-0">
        <li
            class="flex flex-row items-stretch justify-between p-0 mb-0"
            :class="{ 'border-b': index !== assessments.length - 1 }"
            v-for="(assessment, index) in assessments"
            :key="index"
        >
          <div class="flex md:flex-col flex-row md:items-start items-center md:justify-items-start justify-between flex-grow p-6 gap-5">
            <div
                class="flex justify-center items-center w-[56px] h-[56px] rounded-full flex-shrink-0 flex-grow-0"
                :class="{
                  'bg-good': assessment.score >= 60,
                  'bg-average': assessment.score < 60 && assessment.score >=30,
                  'bg-poor': assessment.score < 30
                }"
            >
              <!-- TODO check scores for background color classes -->
              <span class="text-white text-[24px] font-semibold">{{assessment.score}}</span>
            </div>
            <div class="flex-grow">
              <h4 class="font-bold text-turqy-darker text-[14px] mb-1">{{assessment.name}}</h4>
              <span class="text-[14px] text-grey">1340 ha</span><!--TODO retrieve value -->
            </div>
            <div class="flex-grow-0 flex flex-col align-center justify-center md:text-left text-center">
              <span class="text-[12px] text-grey mb-1" v-html="$t('pages.assessments.popup.selectedAssessments.year')"/>
              <span class="text-[12px]">{{assessment.year}}</span>
            </div>
          </div>
          <div class="flex-grow-0 border-l p-6 flex flex-col justify-center items-center">
            <div class="input input--checkbox">
              <div class="checkbox">
                <input type="checkbox" @change="onToggleAssessment(assessment.id, $event.target.value)" :checked="selectedAssessments.indexOf(assessment.id) !== -1">
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
          <h2 class="font-bold" v-html="$t('pages.assessments.popup.name.title')"/>
        </div>
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
    </section>
    <button
        @click="pdf"
        type="button"
        class="btn--border-turqy btn--opacity--child"
    >
      <span class="btn--opacity__target">{{ $t("pages.assessment.aggregateReport.buttons.pdf") }}</span>
      <img src="~/assets/img/ico-list-bullets-turqy.svg"/>
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
