<template>
  <div class="popup__content popup--filters-mobile">
    <h4 class="c-title--modal mb-6">
      {{ $t('pages.map.filters.title') }}
    </h4>

    <!-- Filters -->
    <form class="form form--ma-selector form--mt-0">
      <div class="form__group">
        <!-- Countries -->
        <div class="form__row mb-4">
          <div class="input input--multiselect w-full">
            <label class="label mb-2">{{
              $t('pages.map.filters.form.placeholders.countries')
            }}</label>
            <div class="multiselect__wrap multiselect__wrap--map">
              <multiselect
                :value="country"
                :options="countries"
                track-by="code"
                label="name"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                :placeholder="
                  $t('pages.map.filters.form.placeholders.countries')
                "
                @input="onFilterChanged('country', $event ? $event : null)"
              ></multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- Attributes -->
        <div class="form__row mb-4">
          <div class="input input--multiselect w-full">
            <label class="label mb-2">{{
              $t('pages.map.filters.form.placeholders.attributes')
            }}</label>
            <div class="multiselect__wrap multiselect__wrap--map">
              <multiselect
                :value="attribute"
                :placeholder="
                  $t('pages.map.filters.form.placeholders.attributes')
                "
                :options="['', ...attributes]"
                :multiple="false"
                :showLabels="false"
                :allow-empty="true"
                open-direction="bottom"
                @input="onFilterChanged('attribute', $event ? $event : null)"
              >
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" alt="" />
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
            $t('pages.map.filters.apply')
          }}</span>
          <img src="~/assets/img/ico-filters-turqy.svg" />
        </button>
        <button
          type="button"
          @click="resetFilters"
          class="btn--border-turqy btn--opacity--child w-full"
        >
          <span class="btn--opacity__target">{{
            $t('pages.map.filters.reset')
          }}</span>
        </button>
      </section>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-map-filters-mobile',
  props: {
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      attribute: (state) => state.map.filters.attribute,
      country: (state) => state.map.filters.country,
    }),
    countries() {
      // Get countries from store - this will be populated when map data is loaded
      const state = this.$store.state;
      const englishCountries = state.countries.list['en'] || [];
      const localeCountries = state.countries.list[this.$i18n.locale] || [];

      // Get map countries from props if available, otherwise use all countries
      const mapCountries = this.props?.mapCountries || [];

      if (mapCountries.length === 0) {
        return localeCountries;
      }

      const englishCountriesCodes = englishCountries
        .filter((country) => mapCountries.indexOf(country.name) !== -1)
        .map((country) => country.code);

      return localeCountries.filter(
        (country) => englishCountriesCodes.indexOf(country.code) !== -1,
      );
    },
    attributes() {
      // Get attributes from props if available
      return this.props?.attributes || [];
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      filter: 'map/filter',
      removeFilter: 'map/removeFilter',
    }),
    onFilterChanged(name, value) {
      if (value) {
        this.filter({ name, value });
      } else {
        this.removeFilter(name);
      }
    },
    resetFilters() {
      this.removeFilter('country');
      this.removeFilter('attribute');
    },
  },
};
</script>
