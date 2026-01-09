<template>
  <form id="form--search" @submit="$event.preventDefault()" class="form">
    <div class="form__group">
      <div class="form__row">
        <div class="input input--ico">
          <input
            type="text"
            :placeholder="$t('pages.assessments.list.filters.search')"
            v-model="searchText"
          />
          <div class="input__ico">
            <button type="submit" form="form--search">
              <img src="~/assets/img/search.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'assessments-search',
  data() {
    return {
      timer: null,
      searchText: null,
    };
  },
  watch: {
    searchText(value) {
      this.delay(() => {
        this.search(value);
      }, 800);
    },
  },
  computed: {
    filtersApplied() {
      return Object.keys(this.filters).filter(
        (filterName) => this.filters[filterName] !== null,
      ).length;
    },
    ...mapState({
      filters: (state) => state.assessments.filters,
    }),
  },
  deactivated() {
    this.searchText = null;
  },
  methods: {
    ...mapActions({
      search: 'assessments/search',
    }),
    delay(fn, ms) {
      clearTimeout(this.timer);
      this.timer = setTimeout(fn, ms || 0);
    },
  },
};
</script>
