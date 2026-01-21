<template>
  <div class="popup__content popup--download-report">
    <p>
      {{ $t('pages.assessments.list.DownloadReport.description') }}
    </p>
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <span class="text-gray-500">{{ $t('default.loadingData') }}...</span>
    </div>
    <div v-else class="flex flex-col gap-4">
        <form id="form--search" class="form">
            <div class="form__group">
              <div class="form__row">
                <div class="input input--ico">
                  <input
                    type="text"
                    :placeholder="$t('pages.assessments.list.DownloadReport.Search')"
                    v-model="searchText"
                  />
                  <div class="input__ico">
                    <button type="submit" form="form--search">
                      <img src="~/assets/img/search.svg" />
                    </button>
                  </div>
                  <div class="input__ico input__ico--close" v-if="searchText">
                    <button type="button" @click="clearSearch">
                      <img src="~/assets/img/ico-close-popup.svg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        <div class="font-bold">{{ $t('default.selectFilter') }}</div>
        <form class="form form--assessment grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="input input--multiselect tags-nostyle">
            <div class="multiselect__wrap">
                <multiselect
                :value="filters.managementAreas"
                :options="filteredManagementAreas"
                track-by="id"
                label="name"
                :multiple="true"
                :searchable="true"
                :showLabels="false"
                :allow-empty="false"
                :placeholder="$t('pages.assessments.list.DownloadReport.ManagedArea')"
                open-direction="bottom"
                :hide-selected="true"
                @input="onManagementAreaSelect"
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
            class="input input--multiselect tags-nostyle"
            >
            <div class="multiselect__wrap">
                <multiselect
                :value="filters.countries"
                :options="countries"
                :multiple="true"
                :searchable="true"
                :showLabels="false"
                :allow-empty="true"
                :hide-selected="true"
                :placeholder="
                    $t('pages.assessments.list.DownloadReport.Country')
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
            </div>
            <div
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
                    $t('pages.assessments.list.DownloadReport.Year')
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
            </div>
            <div
            class="input input--multiselect"
            >
            <div class="multiselect__wrap">
                <multiselect
                :value="filters.type"
                :placeholder="
                    $t('pages.assessments.list.DownloadReport.Type')
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
                <span class="text">{{ country }}</span>
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
        <div>
            <p class="w-[100%] text-body-14 font-medium mb-4">
            Found
            <span class="text-turqy font-bold">{{ assessmentsCount }}</span>
            {{ assessmentsCount === 1 ? $t('pages.assessments.list.totalSingular') : $t('pages.assessments.list.totalPlural') }}
            </p>
            <ul class="assessments-list"  v-if="assessments.length">
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
        <!-- Give name section -->
        <!-- <div class="pt-[50px]">
            <button
            @click="pdf"
            class="btn btn--new-sm"
            :class="{ 'btn--disabled': !isValid }"
            type="button"
            >
            {{ $t('pages.assessments.list.aggregateReport.create') }}
            </button>
        </div> -->
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
        <div class="flex justify-between items-center">
            <div>
                <div v-if="isFiltered">
                    <span class="text-turqy font-bold">{{ selectedAssessments.length }}</span> {{ selectedAssessments.length === 1 || selectedAssessments.length === 0 ? $t('default.AssessmentSelectedSingular') : $t('default.AssessmentSelectedPlural')  }}
                </div>
            </div>
            <button class="btn btn--new-sm" :class="{ 'btn--disabled': selectedAssessments.length === 0 && isFiltered }" @click="generateReport">
              {{ $t('pages.assessments.list.DownloadReport.title') }}
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { jsPDF } from 'jspdf';

export default {
  name: 'popup-assessment-download-report',
  data() {
    return {
      name: null,
      isMounted: false,
      isLoading: false,
      localFilters: {
        managementAreas: [],
        countries: [],
        year: [],
        type: null,
      },
      selectedAssessments: [],
      types: [10, 30],
      searchText: '',
    };
  },
  computed: {
    ...mapState({
      reportData: (state) => state.assessments.reportData,
    }),
    filters() {
      return this.localFilters;
    },
    isFiltered() {
      return this.localFilters.managementAreas.length > 0 ||
        this.localFilters.countries.length > 0 ||
        this.localFilters.year.length > 0 ||
        this.localFilters.type !== null ||
        this.searchText !== '';
    },
    assessmentsCount() {
      return this.isFiltered ? this.assessments.length : this.reportData.length;
    },
    filteredManagementAreas() {
      if (!this.reportData || !this.reportData.length) return [];
      const maMap = new Set();
      this.reportData.forEach((assessment) => {
        if (assessment.management_area) {
          maMap.add({
            name: assessment.management_area.name,
            id: assessment.management_area.id,
          });
        }
      });
    //   console.log(maMap);
      return Array.from(maMap).sort((a, b) => a.name.localeCompare(b.name));
    },
    countries() {
      if (!this.reportData || !this.reportData.length) return [];
      const countrySet = new Set();
      this.reportData.forEach((assessment) => {
        if (assessment.management_area?.countries) {
          assessment.management_area.countries.forEach((country) => {
            countrySet.add(country);
          });
        }
      });
    //   console.log(countryMap);
      return Array.from(countrySet).sort((a, b) => a.localeCompare(b));
    },
    // Extract unique years from reportData
    years() {
      if (!this.reportData || !this.reportData.length) return [];
      const yearsSet = new Set();
      this.reportData.forEach((assessment) => {
        if (assessment.year) {
          yearsSet.add(assessment.year);
        }
      });
      return Array.from(yearsSet).sort((a, b) => b - a);
    },
    // Filter assessments locally based on selected filters
    assessments() {
      if (!this.reportData || !this.reportData.length) return [];
    //   console.log(this.localFilters);
      const hasFilters =
        this.localFilters.managementAreas.length > 0 ||
        this.localFilters.countries.length > 0 ||
        this.localFilters.year.length > 0 ||
        this.localFilters.type !== null ||
        this.searchText !== '';

      if (!hasFilters) return [];

      return this.reportData.filter((assessment) => {
        // Filter by search text
        if (this.searchText !== '') {
          if (!assessment.name.toLowerCase().includes(this.searchText.toLowerCase())) {
            return false;
          }
        }

        // Filter by management area
        if (this.localFilters.managementAreas.length > 0) {
          const maIds = this.localFilters.managementAreas.map((ma) => ma.id);
          if (!maIds.includes(assessment.management_area?.id)) {
            return false;
          }
        }

        // Filter by country
        if (this.localFilters.countries.length > 0) {
          const assessmentCountries = assessment.management_area?.countries || [];
          const hasMatchingCountry = this.localFilters.countries.some((country) =>
            assessmentCountries.includes(country),
          );
          if (!hasMatchingCountry) {
            return false;
          }
        }

        // Filter by year
        if (this.localFilters.year.length > 0) {
          if (!this.localFilters.year.includes(assessment.year)) {
            return false;
          }
        }

        // Filter by type (collection method)
        if (this.localFilters.type !== null) {
          if (assessment.collection_method !== this.localFilters.type.id) {
            return false;
          }
        }

        return true;
      });
    },
    covering() {
      return this.assessments.reduce(function (a, b) {
        const size = b.management_area?.reported_size;
        return a + (size ? size : 0);
      }, 0);
    },
    isValid() {
      const hasSelectedAssessments = this.selectedAssessments.length > 0;
      const hasValidName =
        this.name !== null && this.name !== '' && this.name.length <= 50;
      return hasSelectedAssessments && hasValidName;
    },
  },
  watch: {
    selectedAssessments: {
      handler(newSelectedAssessments) {
        // console.log(newSelectedAssessments);
      },
      deep: true,
    },
    // name() {
    //   this.updateErrors();
    // },
    // selectedAssessments: {
    //   handler() {
    //     if (this.isMounted) {
    //       this.updateErrors();
    //     }
    //   },
    //   deep: true,
    // },
    // Auto-select/deselect assessments when filter results change
    assessments: {
      handler(newAssessments) {
        // Remove selected assessments that are no longer in the filtered list
        const assessmentIds = newAssessments.map((a) => a.id);
        this.selectedAssessments = this.selectedAssessments.filter((id) =>
          assessmentIds.includes(id),
        );
      },
      deep: true,
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      await this.$store.dispatch('assessments/fetchReportData');
    } finally {
      this.isLoading = false;
      this.$nextTick(() => {
        this.isMounted = true;
      });
    }
    // console.log(this.reportData);
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    onManagementAreaSelect(managementArea) {
      this.localFilters.managementAreas = managementArea;
    },
    onCountrySelect(countries) {
      this.localFilters.countries = countries;
    },
    onYearSelect(year) {
      this.localFilters.year = year;
    },
    onTypeSelect(type) {
      this.localFilters.type = type;
    },
    onToggleAssessment(assessmentId) {
      const index = this.selectedAssessments.indexOf(assessmentId);
      if (index === -1) {
        this.selectedAssessments.push(assessmentId);
      } else {
        this.selectedAssessments.splice(index, 1);
      }
    },
    onRemoveFilter(field, index = null) {
      if (Array.isArray(this.localFilters[field])) {
        if (index !== null) {
          this.localFilters[field].splice(index, 1);
        }
      } else {
        this.localFilters[field] = null;
      }
    },
    clearSearch() {
      this.searchText = '';
    },
    generateReport() {
        let reportData = [];
        if(this.selectedAssessments.length > 0) {
            reportData = this.reportData.filter((assessment) => this.selectedAssessments.includes(assessment.id));
        } else {
            reportData = this.reportData;
        }
        
        // CSV headers matching the report.csv structure
        const headers = [
            'id', 'created_on', 'created_by', 'updated_on', 'updated_by', 'published_version',
            'name', 'organization', 'status', 'data_policy', 'person_responsible',
            'person_responsible_role', 'person_responsible_role_other', 'year',
            'count_community', 'count_ngo', 'count_academic', 'count_government',
            'count_private', 'count_indigenous', 'count_gender_female', 'count_gender_male',
            'count_gender_nonbinary', 'count_gender_prefer_not_say', 'consent_given',
            'consent_given_written', 'management_plan_file', 'collection_method',
            'collection_method_text', 'strengths_explanation', 'needs_explanation', 'context',
            'management_area__id', 'management_area__created_on', 'management_area__created_by',
            'management_area__updated_on', 'management_area__updated_by', 'management_area__name',
            'management_area__protected_area', 'management_area__wdpa_protected_area',
            'management_area__date_established', 'management_area__version_date',
            'management_area__management_authority', 'management_area__recognition_level',
            'management_area__stakeholder_groups', 'management_area__support_sources',
            'management_area__governance_type', 'management_area__countries',
            'management_area__regions', 'management_area__reported_size',
            'management_area__geospatial_sources', 'management_area__objectives',
            'resource_boundaries__score', 'boundary_known__choice', 'boundary_known__explanation',
            'boundary_defined__choice', 'boundary_defined__explanation',
            'enforcement__score', 'penalties_frequency__choice', 'penalties_frequency__explanation',
            'penalties_fair__choice', 'penalties_fair__explanation',
            'capacity_for_adaptive_management__score', 'ecological_monitoring_used__choice',
            'ecological_monitoring_used__explanation', 'social_monitoring_used__choice',
            'social_monitoring_used__explanation', 'climatechange_monitored__choice',
            'climatechange_monitored__explanation', 'multiple_knowledge_social__choice',
            'multiple_knowledge_social__explanation', 'multiple_knowledge_integrated__choice',
            'multiple_knowledge_integrated__explanation', 'climatechange_managed__choice',
            'climatechange_managed__explanation',
            'operational_capacity__score', 'management_capacity__choice',
            'management_capacity__explanation', 'sufficient_staff__choice',
            'sufficient_staff__explanation', 'staff_capacity__choice', 'staff_capacity__explanation',
            'sufficient_budget__choice', 'sufficient_budget__explanation', 'budget_secure__choice',
            'budget_secure__explanation', 'sufficient_equipment__choice',
            'sufficient_equipment__explanation',
            'inclusive_and_equitable_management__score', 'stakeholder_agency__choice',
            'stakeholder_agency__explanation', 'vulnerable_defined_rights__choice',
            'vulnerable_defined_rights__explanation', 'benefits_shared__choice',
            'benefits_shared__explanation', 'supportive_networks__choice',
            'supportive_networks__explanation', 'climatechange_incorporated__choice',
            'climatechange_incorporated__explanation',
            'clearly_defined_rights_and_decision_making__score', 'stakeholder_harvest_rights__choice',
            'stakeholder_harvest_rights__explanation', 'stakeholder_develop_rules__choice',
            'stakeholder_develop_rules__explanation', 'stakeholder_exclude_others__choice',
            'stakeholder_exclude_others__explanation', 'legislation_exists__choice',
            'legislation_exists__explanation', 'exercise_rights__choice',
            'exercise_rights__explanation',
            'clear_and_congruent_regulations__score', 'rights_governance__choice',
            'rights_governance__explanation', 'management_levels_cohesive__choice',
            'management_levels_cohesive__explanation', 'regulations_exist__choice',
            'regulations_exist__explanation', 'management_plan__choice',
            'management_plan__explanation',
            'transparency_and_accountability__score', 'governance_accountable__choice',
            'governance_accountable__explanation', 'timely_information__choice',
            'timely_information__explanation', 'conflict_resolution_access__choice',
            'conflict_resolution_access__explanation',
            'perceived_ecological_outcomes__score', 'outcomes_achieved_ecological__choice',
            'outcomes_achieved_ecological__explanation',
            'perceived_social_outcomes__score', 'outcomes_achieved_social__choice',
            'outcomes_achieved_social__explanation',
            'score'
        ];

        // Helper function to escape CSV values
        const escapeCSV = (value) => {
            if (value === null || value === undefined) return '';
            const str = String(value);
            // If contains comma, quote, or newline, wrap in quotes and escape existing quotes
            if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        // Helper function to get value from attributes data
        const getAttributeValue = (assessment, key) => {
            // Check if the key is an attribute-related key (ends with __score, __choice, or __explanation)
            if (!assessment.attributes) return null;
            
            const attributes = assessment.attributes;
            // Handle attribute score keys like "resource_boundaries__score"
            if (key.endsWith('__score')) {
                const attrKey = key.replace('__score', '');
                // If attributes is an object with the attribute key
                if (attributes[attrKey] !== undefined) {
                    return typeof attributes[attrKey] === 'object' 
                    ? attributes[attrKey].score 
                    : attributes[attrKey];
                }
                // If attributes is an array, find by key
                if (Array.isArray(attributes)) {
                    // console.log('array', attrKey);
                    const attr = attributes.find(a => a.attribute.replace(/_/g, ' ').toLowerCase() === attrKey.replace(/_/g, ' ').toLowerCase());
                    // console.log('attr', attr);
                    return attr ? attr.score : null;
                }
                return null;
            }
            
            // Handle question choice/explanation keys like "boundary_known__choice" or "boundary_known__explanation"
            if (key.endsWith('__choice') || key.endsWith('__explanation')) {
                const suffix = key.endsWith('__choice') ? '__choice' : '__explanation';
                const questionKey = key.replace(suffix, '');
                const field = suffix === '__choice' ? 'choice' : 'explanation';
                // console.log('questionKey', questionKey);
                // console.log('field', field);
                // If attributes is an array
                if (Array.isArray(attributes)) {
                    for (const attr of attributes) {
                        if (attr.answers && Array.isArray(attr.answers)) {
                            const answer = attr.answers.find(q => q.question === questionKey);
                            // console.log('answer', answer);
                            // if(answer !== undefined) {
                            //     console.log(`${questionKey} ${field}`, answer[field]);
                            // }
                            if (answer !== undefined) return answer[field];
                        }
                    }
                }
                
                return null;
            }
            
            return null;
        };

        // Helper function to get nested value with __ notation
        const getValue = (obj, key) => {
            // First check if the value exists directly on the object (flattened format)
            if (obj[key] !== undefined) {
                const value = obj[key];
                if (Array.isArray(value)) {
                    return value.join(', ');
                }
                return value;
            }
            
            // Check if this is an attribute-related key and try to get from attributes
            if (key.endsWith('__score') || key.endsWith('__choice') || key.endsWith('__explanation')) {
                if (!key.startsWith('management_area__')) {
                    const attrValue = getAttributeValue(obj, key);
                    if (attrValue !== null) return attrValue;
                }
            }
            
            // Handle nested keys with __ notation (like management_area__name)
            if (key.includes('__')) {
                const parts = key.split('__');
                let value = obj;
                for (const part of parts) {
                    if (value && typeof value === 'object') {
                        // Convert camelCase to snake_case for nested objects
                        value = value[part] || value[part.replace(/_([a-z])/g, (g) => g[1].toUpperCase())];
                    } else {
                        return '';
                    }
                }
                // Handle arrays (like countries, regions)
                if (Array.isArray(value)) {
                    return value.join(', ');
                }
                return value;
            }
            
            return obj[key];
        };

        // Build CSV content
        const csvRows = [];
        
        // Add header row
        csvRows.push(headers.join(','));
        
        // Add data rows
        reportData.forEach((assessment) => {
            const row = headers.map((header) => {
                const value = getValue(assessment, header);
                return escapeCSV(value);
            });
            // console.log(row);
            csvRows.push(row.join(','));
        });

        // return null;
        const csvContent = csvRows.join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `elinor_report_${timestamp}.csv`;
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.popupState({ active: false });
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
