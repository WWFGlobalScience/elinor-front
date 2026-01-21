<template>
  <div class="filters-container">
    <div class="filters-container__item input input--multiselect">
      <div class="multiselect__wrap">
        <multiselect
          :placeholder="
            $t('pages.assessments.list.filters.popup.placeholders.countries')
          "
          :value="getCountryByCode(management_area_country)"
          track-by="code"
          label="name"
          :options="[
            { value: 'all', name: 'All Countries' },
            ...management_area_countries,
          ]"
          :multiple="false"
          :searchable="false"
          :showLabels="false"
          :allow-empty="false"
          open-direction="bottom"
          @input="onFilterChanged('management_area_countries', $event.code)"
        >
        </multiselect>
      </div>
    </div>
    <div class="filters-container__item input input--multiselect">
      <div class="multiselect__wrap">
        <multiselect
          :placeholder="
            $t('pages.assessments.list.filters.popup.placeholders.year')
          "
          :value="filters['year']"
          :options="[
            $t('pages.assessments.list.filters.popup.placeholders.year'),
            ...years,
          ]"
          :multiple="false"
          :searchable="false"
          :showLabels="false"
          :allow-empty="true"
          open-direction="bottom"
          @input="onFilterChanged('year', $event)"
        >
        </multiselect>
      </div>
    </div>
    <div class="filters-container__item input input--multiselect">
      <div class="multiselect__wrap">
        <multiselect
          :value="getStatusById(filters.status)"
          :placeholder="
            $t('pages.assessments.list.filters.popup.placeholders.status')
          "
          track-by="id"
          label="name"
          :options="statuses"
          :multiple="false"
          :searchable="false"
          :showLabels="false"
          :allow-empty="true"
          open-direction="bottom"
          @input="onFilterChanged('status', $event.id)"
        >
        </multiselect>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'assessments-filters',
  data() {
    return {
      // years: [new Date().getFullYear() - 1, new Date().getFullYear()],
      statuses: [
        {
          id: 'all',
          name: this.$t(
            'pages.assessments.list.filters.popup.placeholders.status',
          ),
        },
        { id: 90, name: this.$t('pages.assessments.statuses.90') },
        { id: 80, name: this.$t('pages.assessments.statuses.80') },
        { id: 10, name: this.$t('pages.assessments.statuses.10') },
      ],
    };
  },
  mounted() {
    this.$store.dispatch('assessments/fetchCountries');
    this.$store.dispatch('countries/fetchCountries');
  },
  computed: {
    ...mapState({
      filters: (state) => state.assessments.filters,
      management_area_countries: (state) => state.assessments.allCountries,
      management_area_country: (state) =>
        state.assessments.filters.management_area_countries,
      years: (state) => state.assessments.allYears,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      resetFilters: 'assessments/resetFilters',
      filter: 'assessments/filter',
      removeFilter: 'assessments/removeFilter',
    }),
    onFilterChanged(name, value) {
      if (
        value !== 'all' &&
        value !==
          this.$t('pages.assessments.list.filters.popup.placeholders.year') &&
        value !==
          this.$t('pages.assessments.list.filters.popup.placeholders.status')
      ) {
        this.filter({ name, value });
      } else {
        this.filter({ name, value: null });
      }

      // this.filter({ name, value });
    },
    getCountryByCode(code) {
      if (code) {
        return this.management_area_countries.filter(
          (country) => country.code === code,
        )[0];
      }
    },
    getStatusById(id) {
      if (id) {
        return this.statuses.filter((status) => status.id === id)[0];
      }
    },
  },
};
</script>
