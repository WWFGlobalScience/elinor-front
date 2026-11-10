<template>
  <article class="page page--assessments" v-if="loaded">
    <div class="page--assessments__top">
      <img
        src="~/assets/img/assessment-bg.svg"
        :alt="$t('pages.assessments.meta.imageAlt')"
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
        <img src="~/assets/img/ico-filters-turqy.svg" :alt="$t('default.filters')" />
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
  mounted() {
    this.initAssessmentsPage();
  },
  activated() {
    this.showOnboardingIfNeeded();
  },
  deactivated() {
    if (this.$store.state.popup.popup.type === 'onboarding') {
      this.$store.dispatch('popup/popupState', { active: false });
    }
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
    showOnboardingIfNeeded() {
      if (localStorage.getItem('onboarding') !== '0' && this.$auth.loggedIn) {
        this.$store.dispatch('popup/popupState', {
          active: true,
          type: 'onboarding',
          component: 'popup-assessment-onboarding',
          title: 'pages.assessments.list.create.popup.title',
        });
      }
    },
    async initAssessmentsPage() {
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

      this.showOnboardingIfNeeded();

      if (offlineModeEnabled) {
        this.loaded = true;
        return;
      }

      await this.$store.dispatch('assessments/fetchAssessments');
      this.loaded = true;
    },
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
