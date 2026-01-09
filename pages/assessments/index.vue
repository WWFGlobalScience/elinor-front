<template>
  <article class="page page--assessments" v-if="loaded">
    <div class="page--assessments__top">
      <img
        src="~/assets/img/assessment-bg.svg"
        alt="assessment top bg"
        class="page--assessments__top-img"
      />
      <assessments-header></assessments-header>
    </div>
    <div class="page--assessments__top-actions container">
      <assessments-aggregate></assessments-aggregate>
      <div class="flex items-center gap-4 justify-end">
        <assessments-tutorial></assessments-tutorial>
        <div class="md:hidden">
          <assessments-create v-if="$auth.loggedIn"></assessments-create>
        </div>
      </div>
    </div>
    <div class="page--assessments__top-actions container">
      <assessments-search
        class="assessments-search-desktop"
      ></assessments-search>
      <assessments-filters
        class="assessments-filters-desktop"
      ></assessments-filters>
      <!-- Show filters button for mobile/tablet -->
      <button
        type="button"
        class="btn--show-filters-mobile"
        @click="showFiltersModal"
      >
        <span>{{ $t('pages.assessments.list.filters.showFilters') }}</span>
        <img src="~/assets/img/ico-filters-turqy.svg" alt="Filters" />
      </button>
    </div>
    <assessments-results></assessments-results>
  </article>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'assessments',
  auth: false,
  data() {
    return {
      loaded: false,
    };
  },
  async mounted() {
    // Check if offline mode feature flag is enabled
    // Defaults to true unless explicitly set to false
    let offlineModeEnabled = true;
    if (this.$config && this.$config.offlineMode === false) {
      offlineModeEnabled = false;
    } else if (process.env.OFFLINE_MODE === 'false') {
      offlineModeEnabled = false;
    }

    if (this.isOffline && this.assessmentId) {
      return this.$router.push(
        `/assessments/edit/${this.assessmentId}/the-survey`,
      );
    }

    // Skip fetching assessments if offline mode is enabled
    // Use cached data from vuex-persist (localStorage) instead
    if (offlineModeEnabled) {
      // Don't clear assessments - let vuex-persist restore cached data from localStorage
      this.loaded = true;
      return;
    }

    if (localStorage.getItem('onboarding') !== '0' && this.$auth.loggedIn) {
      this.$store.dispatch('popup/popupState', {
        active: true,
        type: 'onboarding',
        component: 'popup-assessment-onboarding',
        title: 'pages.assessments.list.create.popup.title',
      });
    }
    // fetchAssessments handles loader activation/deactivation internally
    // No need to activate/deactivate loader here to avoid counter mismatch
    await this.$store.dispatch('assessments/fetchAssessments');
    this.loaded = true;
  },
  fetchOnServer: false,
  computed: {
    ...mapState({
      loader: (state) => state.loader,
      onboarding: (state) => state.assessments.onboarding,
      assessmentId: (state) => state.assessments.assessment.id,
      isOffline: (state) => state.layout.offline,
    }),
  },
  methods: {
    showFiltersModal() {
      this.$store.dispatch('popup/popupState', {
        active: true,
        type: 'default',
        component: 'popup-assessments-filters-mobile',
        title: 'pages.assessments.list.filters.popup.title',
      });
    },
  },
};
</script>
