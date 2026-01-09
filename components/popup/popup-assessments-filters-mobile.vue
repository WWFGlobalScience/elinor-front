<template>
  <div class="popup__content popup--filters-mobile">
    <h4 class="c-title--modal mb-6">
      {{ $t('pages.assessments.list.filters.popup.title') }}
    </h4>

    <!-- Search -->
    <div class="form__group mb-6">
      <label class="label mb-2">{{
        $t('pages.assessments.list.filters.search')
      }}</label>
      <form
        id="form--search-modal"
        @submit="$event.preventDefault()"
        class="form"
      >
        <div class="form__group">
          <div class="form__row">
            <div class="input input--ico w-full">
              <input
                type="text"
                :placeholder="$t('pages.assessments.list.filters.search')"
                v-model="searchText"
              />
              <div class="input__ico">
                <button type="submit" form="form--search-modal">
                  <img src="~/assets/img/search.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Filters -->
    <form class="form form--ma-selector form--mt-0">
      <div class="form__group">
        <!-- Countries -->
        <div class="form__row mb-4">
          <div class="input input--multiselect w-full">
            <label class="label mb-2">{{
              $t('pages.assessments.list.filters.popup.labels.countries')
            }}</label>
            <div class="multiselect__wrap">
              <multiselect
                :placeholder="
                  $t(
                    'pages.assessments.list.filters.popup.placeholders.countries',
                  )
                "
                :value="getCountryByCode(management_area_country)"
                track-by="code"
                label="name"
                :options="[
                  {
                    value: 'all',
                    name: $t(
                      'pages.assessments.list.filters.popup.placeholders.countries',
                    ),
                  },
                  ...management_area_countries,
                ]"
                :multiple="false"
                :searchable="false"
                :showLabels="false"
                :allow-empty="false"
                open-direction="bottom"
                @input="
                  onFilterChanged('management_area_countries', $event.code)
                "
              >
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
          </div>
        </div>

        <!-- Year -->
        <div class="form__row mb-4">
          <div class="input input--multiselect w-full">
            <label class="label mb-2">{{
              $t('pages.assessments.list.filters.popup.labels.year')
            }}</label>
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
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="form__row mb-4">
          <div class="input input--multiselect w-full">
            <label class="label mb-2">{{
              $t('pages.assessments.list.filters.popup.labels.status')
            }}</label>
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
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <section class="mt-6 flex flex-col gap-3">
        <button
          type="button"
          @click="popupState({ active: false })"
          class="btn--border-turqy btn--opacity--child w-full"
        >
          <span class="btn--opacity__target">{{
            $t('pages.assessments.list.filters.popup.apply')
          }}</span>
          <img src="~/assets/img/ico-filters-turqy.svg" />
        </button>
        <button
          type="button"
          @click="handleResetFilters"
          class="btn--border-turqy btn--opacity--child w-full"
        >
          <span class="btn--opacity__target">{{
            $t('pages.assessments.list.filters.popup.reset')
          }}</span>
        </button>
      </section>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessments-filters-mobile',
  data() {
    return {
      timer: null,
      searchText: null,
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
    this.searchText = this.filters.search || null;
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
  watch: {
    searchText(value) {
      this.delay(() => {
        this.search(value);
      }, 800);
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      resetFilters: 'assessments/resetFilters',
      filter: 'assessments/filter',
      removeFilter: 'assessments/removeFilter',
      search: 'assessments/search',
    }),
    delay(fn, ms) {
      clearTimeout(this.timer);
      this.timer = setTimeout(fn, ms || 0);
    },
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
    handleResetFilters() {
      this.resetFilters();
      // Close the modal after resetting filters
      this.popupState({ active: false });
    },
  },
};
</script>
