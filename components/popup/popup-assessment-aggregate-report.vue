<template>
  <div class="popup__content popup--aggregate-report">
    <p>
      {{ $t('pages.assessments.list.aggregateReport.description') }}
    </p>
    <div class="flex flex-col gap-4">
      <div class="font-bold">Select filters</div>
      <form class="form form--assessment grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="input input--multiselect tags-nostyle">
          <div class="multiselect__wrap">
            <multiselect
              :value="filters.managementAreas"
              track-by="id"
              label="name"
              :options="filteredManagementAreas"
              :multiple="true"
              :searchable="true"
              :showLabels="false"
              :allow-empty="false"
              :placeholder="$t('pages.assessments.list.create.popup.labels.ma')"
              open-direction="bottom"
              :hide-selected="true"
              @input="onManagementAreaSelect"
              @search-change="fetchManagementAreas"
            >
              <span slot="noOptions" slot-scope="props">{{
                $t(
                  'pages.assessments.list.aggregateReport.managementAreaNoOptions',
                )
              }}</span>
              <span slot="noResult" slot-scope="props">{{
                $t(
                  'pages.assessments.list.aggregateReport.managementAreaNoResults',
                )
              }}</span>
            </multiselect>
            <div class="multiselect__caret">
              <img src="~/assets/img/ico-select-turqy.svg" />
            </div>
          </div>
        </div>
        <div
          :class="{ 'input--error': errors.countries !== null }"
          class="input input--multiselect tags-nostyle"
        >
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
              :placeholder="
                $t('pages.assessments.list.create.popup.labels.country')
              "
              @input="onCountrySelect($event)"
            >
              <span slot="noResult" slot-scope="props">{{
                $t('default.noresults')
              }}</span>
            </multiselect>
            <div class="multiselect__caret">
              <img src="~/assets/img/ico-select-turqy.svg" alt="" />
            </div>
          </div>
          <p class="msg msg--error" v-if="errors.countries !== null">
            {{ errors.countries }}
          </p>
        </div>
        <div
          :class="{ 'input--error': errors.year !== null }"
          class="input input--multiselect tags-nostyle"
        >
          <div class="multiselect__wrap">
            <multiselect
              :value="filters.year"
              :options="years"
              :multiple="true"
              :searchable="true"
              :showLabels="false"
              :allow-empty="false"
              :placeholder="
                $t('pages.assessments.list.create.popup.labels.year')
              "
              open-direction="bottom"
              :hide-selected="true"
              @input="onYearSelect($event)"
            >
              <span slot="noResult">{{ $t('default.noresults') }}</span>
            </multiselect>
            <div class="multiselect__caret">
              <img src="~/assets/img/ico-select-turqy.svg" />
            </div>
          </div>
          <p class="msg msg--error" v-if="errors.year !== null">
            {{ errors.year }}
          </p>
        </div>
        <div
          :class="{ 'input--error': errors.type !== null }"
          class="input input--multiselect"
        >
          <div class="multiselect__wrap">
            <multiselect
              :value="filters.type"
              :placeholder="
                $t('pages.assessments.list.create.popup.labels.type')
              "
              :options="
                types.map((type) => {
                  return {
                    id: type,
                    name: $t('pages.assessments.collectionMethods.' + type),
                  };
                })
              "
              :multiple="false"
              track-by="id"
              label="name"
              :searchable="true"
              :showLabels="false"
              :allow-empty="false"
              open-direction="bottom"
              :hide-selected="true"
              @input="onTypeSelect($event)"
            >
              <span slot="noResult">{{ $t('default.noresults') }}</span>
            </multiselect>
            <div class="multiselect__caret">
              <img src="~/assets/img/ico-select-turqy.svg" />
            </div>
          </div>
          <p class="msg msg--error" v-if="errors.type !== null">
            {{ errors.type }}
          </p>
        </div>
      </form>
      <div
        v-if="
          filters.managementAreas.length ||
          filters.countries.length ||
          filters.year.length ||
          filters.type
        "
      >
        <ul
          class="filters-selected flex flex-row justify-items-start items-center flex-wrap gap-2"
        >
          <li
            class="elinor__tag"
            v-for="(managementArea, index) in filters.managementAreas"
          >
            <span class="text">{{ managementArea.name }}</span>
            <a
              @click="onRemoveFilter('managementAreas', index)"
              role="button"
              class="icon"
              title="Delete"
            >
              <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
              <span class="visually-hidden">{{ $t('default.delete') }}</span>
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
              <span class="visually-hidden">{{ $t('default.delete') }}</span>
            </a>
          </li>
          <li class="elinor__tag" v-for="(year, index) in filters.year">
            <span class="text">{{ year }}</span>
            <a
              @click="onRemoveFilter('year', index)"
              role="button"
              class="icon"
              title="Delete"
            >
              <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
              <span class="visually-hidden">{{ $t('default.delete') }}</span>
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
              <img src="~/assets/img/ico-close-popup.svg" alt="Delete" />
              <span class="visually-hidden">{{ $t('default.delete') }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="assessments.length">
        <!-- <h4
                    class="mb-2"
                    v-html="
                        $t('pages.assessments.list.aggregateReport.assessments')
                    "
                /> -->
        <p class="w-[100%] text-body-14 font-medium mb-4">
          Found
          <span class="text-turqy font-bold">{{ assessments.length }}</span>
          {{ $t('pages.assessments.list.aggregateReport.covering') }}
          {{ covering }}
          {{ $t('pages.assessments.list.aggregateReport.coveringHA') }}
        </p>
        <ul class="assessments-list">
          <li v-for="(assessment, index) in assessments" :key="index">
            <label class="assessment-item" :for="`assessment-${assessment.id}`">
              <div
                class="score-box"
                :class="{
                  'bg-good': assessment.score >= 60,
                  'bg-average': assessment.score < 60 && assessment.score >= 30,
                  'bg-poor': assessment.score < 30,
                }"
              >
                <span class="text-white text-[22px] font-semibold">{{
                  assessment.score || '-'
                }}</span>
              </div>
              <div class="content">
                <div class="name">
                  {{ assessment.name }}
                </div>
                <div class="info">
                  <span class="year">
                    {{ assessment.year }}
                  </span>
                  <span class="separator">|</span>
                  <span class="type">
                    {{ assessment.management_area.reported_size || 0 }}
                    {{
                      $t('pages.assessments.list.aggregateReport.coveringHA')
                    }}
                  </span>
                </div>
              </div>
              <div class="checkbox-box">
                <div class="checkbox">
                  <input
                    :id="`assessment-${assessment.id}`"
                    type="checkbox"
                    @change="onToggleAssessment(assessment.id)"
                    :value="true"
                    :checked="selectedAssessments.indexOf(assessment.id) !== -1"
                  />
                  <img src="~/assets/img/check_box_blank.svg" />
                  <img src="~/assets/img/check_box.svg" />
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- <section class="border-b pb-4 mb-4" v-if="assessments.length === 0">
            <h4
                class="mb-2"
                v-html="
                    $t('pages.assessments.list.aggregateReport.assessments')
                "
            />
            <div class="mt-5 border p-5 text-center">
                <p>There are no assessments to show, set search parameters above to show assessments</p>
            </div>
        </section> -->
    <div class="flex flex-col gap-4">
      <div class="font-bold">
        {{ $t('pages.assessments.list.aggregateReport.giveName') }}
      </div>
      <div class="name !max-w-[389px]">
        <div class="input">
          <input
            type="text"
            name="name"
            :class="{ 'input--error': errors.name.length > 0 }"
            :placeholder="
              $t('pages.assessments.list.aggregateReport.giveNamePlaceholder')
            "
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
    </div>
    <div class="pt-[50px]">
      <button
        @click="pdf"
        class="btn btn--new-sm"
        :class="{ 'btn--disabled': !isValid }"
        type="button"
      >
        {{ $t('pages.assessments.list.aggregateReport.create') }}
      </button>
    </div>
    <p class="msg msg--error" v-if="errors.assessments">
      {{ errors.assessments }}
    </p>
    <div class="report-wrap" v-if="assessments.length > 0">
      <template v-for="(item, index) in Math.ceil(assessments.length / 6)">
        <report-pages-aggregate
          :index="index"
          :assessments="
            assessments.filter(
              (assessment) => selectedAssessments.indexOf(assessment.id) !== -1,
            )
          "
          :name="name"
          :selected-filters="filters"
        ></report-pages-aggregate>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { jsPDF } from 'jspdf';

export default {
  name: 'popup-assessment-download-aggregate-report',
  data() {
    return {
      name: null,
      isMounted: false,
      filteredManagementAreas: [],
      // years: [],
      types: [10, 30],
      errors: {
        name: [],
        assessments: null,
        countries: null,
        year: null,
        type: null,
      },
    };
  },
  computed: {
    ...mapState({
      filters: (state) => state.assessments.aggregateReport.filters,
      assessments: (state) => state.assessments.aggregateReport.assessments,
      selectedAssessments: (state) =>
        state.assessments.aggregateReport.selectedAssessments,
      report: (state) => state.assessments.aggregateReport.report,
      managementAreas: (state) => state.managementareas.list,
      assessmentsList: (state) => state.assessments.list,
      // countries: (state) => state.countries.management_area_countries,
      countries: (state) => state.assessments.countries,
      years: (state) => state.assessments.years,
    }),
    covering() {
      return this.assessments.reduce(function (a, b) {
        const size = b.management_area.reported_size;
        return a + (size ? size : 0);
      }, 0);
    },
    isValid() {
      // Check validation without mutating state
      const hasSelectedAssessments = this.selectedAssessments.length > 0;
      const hasValidName =
        this.name !== null && this.name !== '' && this.name.length <= 50;
      return hasSelectedAssessments && hasValidName;
    },
  },
  watch: {
    name() {
      this.updateErrors();
    },
    selectedAssessments: {
      handler() {
        if (this.isMounted) {
          this.updateErrors();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch('assessments/fetchCountries');
    this.$store.commit('assessments/resetAggregateReportData');
    this.$nextTick(() => {
      this.setFilteredManagementAreas();
      this.isMounted = true;
    });
  },
  methods: {
    ...mapActions({
      filterAggregateReport: 'assessments/filterAggregateReport',
      removeFilterAggregateReport: 'assessments/removeFilterAggregateReport',
      toggleAssessmentAggregateReport:
        'assessments/toggleAssessmentAggregateReport',
      fetchManagementAreas: 'managementareas/fetchManagementAreas',
      popupState: 'popup/popupState',
    }),
    setFilteredManagementAreas() {
      // console.log(this.managementAreas);
      // console.log(this.assessmentsList);
      // console.log();
      this.filteredManagementAreas = this.managementAreas.filter((ma) =>
        this.assessmentsList.some((a) => a.management_area === ma.id),
      );
      // return this.managementAreas.filter(ma => this.assessmentsList.some(a => a.management_area.id === ma.id));
    },
    onManagementAreaSelect(managementArea) {
      this.filterAggregateReport({
        field: 'managementAreas',
        value: managementArea,
      });
    },
    onCountrySelect(countries) {
      this.filterAggregateReport({
        field: 'countries',
        value: countries,
      });
    },
    onYearSelect(year) {
      this.filterAggregateReport({ field: 'year', value: year });
    },
    onTypeSelect(type) {
      this.filterAggregateReport({ field: 'type', value: type });
    },
    onToggleAssessment(assessmentId, selected) {
      this.toggleAssessmentAggregateReport({ assessmentId, selected });
    },
    onRemoveFilter(field, index = null) {
      this.removeFilterAggregateReport({ field, index });
    },
    updateErrors() {
      // Update errors without causing infinite loops
      // Only update errors, don't reset all of them
      this.errors.assessments = null;
      this.errors.name = [];

      if (this.selectedAssessments.length === 0) {
        this.errors.assessments = this.$t(
          'pages.assessments.list.aggregateReport.selectedAssessmentsError',
        );
      }

      if (this.name === null || this.name === '') {
        this.errors.name.push(
          this.$t('pages.assessments.list.aggregateReport.nameRequiredError'),
        );
      } else {
        if (this.name.length > 50) {
          this.errors.name.push(
            this.$t('pages.assessments.list.aggregateReport.nameLengthError'),
          );
        }
      }
    },
    validate() {
      this.errors = {
        name: [],
        assessments: null,
        countries: null,
        year: null,
        type: null,
      };
      /*
            if(this.filters.countries.length === 0){
                this.errors.countries = this.$t('default.required');
            }

            if(this.filters.year === null) {
                this.errors.year = this.$t('default.required');
            }

            if(this.filters.type === null) {
                this.errors.type = this.$t('default.required');
            }
*/
      if (this.selectedAssessments.length === 0) {
        this.errors.assessments = this.$t(
          'pages.assessments.list.aggregateReport.selectedAssessmentsError',
        );
      }

      if (this.name === null || this.name === '') {
        this.errors.name.push(
          this.$t('pages.assessments.list.aggregateReport.nameRequiredError'),
        );
      } else {
        if (this.name.length > 50) {
          this.errors.name.push(
            this.$t('pages.assessments.list.aggregateReport.nameLengthError'),
          );
        }
      }

      return this.errors.name.length === 0 && this.errors.assessments === null;
    },
    pdf() {
      if (this.validate()) {
        var doc = new jsPDF('l', 'px', [1440, 1024]);
        this.generatePDFRecursive(0, doc);
        this.popupState({ active: false });
      }
    },
    generatePDFRecursive(i, doc) {
      if (i < Math.ceil(this.selectedAssessments.length / 6)) {
        doc.html(document.querySelector(`#aggregate-report-${i}`), {
          callback: (doc) => {
            doc.setFont('Montserrat-Medium', 'normal');
            doc.setFont('Montserrat-SemiBold', 'normal');
            doc.setFont('Montserrat-Bold', 'normal');
            doc.internal.write(0, 'Tw');

            if (i + 1 < Math.ceil(this.selectedAssessments.length / 6)) {
              doc.addPage([1440, 1024], 'l');
              this.generatePDFRecursive(i + 1, doc);
            } else {
              doc.save('aggregate-report.pdf');
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

<style lang="scss" scoped>
@import '~/assets/scss/core/variables';

.form--assessment {
  // Force single column below tablet breakpoint
  @media (max-width: $tablet-breakpoint) {
    grid-template-columns: 1fr !important;
  }

  // Two columns on tablet and above
  @media (min-width: $tablet-breakpoint-min) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
