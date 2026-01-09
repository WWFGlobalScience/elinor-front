<template>
  <form
    action=""
    class="map-filters map-filters-desktop absolute z-10 top-4 right-[60px] flex flex-row gap-4"
  >
    <div class="map-filters__item">
      <div class="input input--multiselect">
        <div class="multiselect__wrap multiselect__wrap--map">
          <multiselect
            :value="country"
            :options="countries"
            track-by="code"
            label="name"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :placeholder="$t('pages.map.filters.form.placeholders.countries')"
            @input="onFilterChanged('country', $event ? $event : null)"
          ></multiselect>
          <div class="multiselect__caret">
            <img src="~/assets/img/ico-select-turqy.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="map-filters__item">
      <div class="input input--multiselect">
        <div class="multiselect__wrap multiselect__wrap--map">
          <multiselect
            :value="attribute"
            :placeholder="$t('pages.map.filters.form.placeholders.attributes')"
            :options="attributesSorted"
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
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'map-form',
  props: ['mapCountries', 'attributes'],
  computed: {
    ...mapState({
      attribute: (state) => state.map.filters.attribute,
      country: (state) => state.map.filters.country,
    }),
    attributesSorted() {
      return ['All Attributes', ...this.attributes.sort((a, b) => a.localeCompare(b))];
    },
    countries() {
      const state = this.$store.state;
      const englishCountries = state.countries.list['en'];
      const localeCountries = state.countries.list[this.$i18n.locale];

      const englishCountriesCodes = englishCountries
        .filter((country) => this.mapCountries.indexOf(country.name) !== -1)
        .map((country) => country.code);

      console.log('attributes', this.attributes);
      //   console.log('englishCountries', englishCountries);
      // console.log('localeCountries', localeCountries);
      // console.log('mapCountries', this.mapCountries);
      // console.log('englishCountriesCodes', englishCountriesCodes);
      return localeCountries.filter(
        (country) => englishCountriesCodes.indexOf(country.code) !== -1,
      );
    },
  },
  methods: {
    ...mapActions({
      filter: 'map/filter',
      removeFilter: 'map/removeFilter',
    }),
    onFilterChanged(name, value) {
      if (value) {
        if (value === 'All Attributes') {
          this.removeFilter(name);
          return;
        }
        this.filter({ name, value });
      } else {
        this.removeFilter(name);
      }
    },
    getAttributeById(id) {
      if (id) {
        return this.attributes.filter((attribute) => attribute.id === id)[0];
      }
    },
  },
};
</script>
