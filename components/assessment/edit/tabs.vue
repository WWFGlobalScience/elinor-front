<template>
  <section
    class="section section--tab section--mt-10"
    :class="{ 'is--sticky': isScrolled }"
    :style="{ top: stickyTop }"
  >
    <div class="container">
      <ul v-if="!isOffline || !isOfflineModeEnabled" class="elinor__tabs">
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/assessment-data/`"
            :class="[
              'btn--tab btn--ok',
              { 'btn--error': !progress.data.complete },
            ]"
          >
            <span class="icon-area" v-if="progress.data.complete">
              <img src="~/assets/img/check_circle.svg" />
              <img src="~/assets/img/check_circle.svg" />
            </span>
            <span class="icon-area" v-else>
              <img src="~/assets/img/cancel.svg" />
              <img src="~/assets/img/cancel-hover.svg" />
            </span>
            <span class="txt">{{
              $t('pages.assessments.edit.tabs.data.tabButton')
            }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/managed-area`"
            :class="[
              'btn--tab btn--ok',
              { 'btn--error': !progress.managed_area.complete },
            ]"
          >
            <span class="icon-area" v-if="progress.managed_area.complete">
              <img src="~/assets/img/check_circle.svg" />
              <img src="~/assets/img/check_circle.svg" />
            </span>
            <span class="icon-area" v-else>
              <img src="~/assets/img/cancel.svg" />
              <img src="~/assets/img/cancel-hover.svg" />
            </span>
            <span class="txt">{{
              $t('pages.assessments.edit.tabs.managementArea.tabButton')
            }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/the-survey/`"
            :class="[
              'btn--tab btn--ok',
              { 'btn--error': !progress.survey.complete },
            ]"
          >
            <span class="icon-area" v-if="progress.survey.complete">
              <img src="~/assets/img/check_circle.svg" />
              <img src="~/assets/img/check_circle.svg" />
            </span>
            <span class="icon-area" v-else>
              <img src="~/assets/img/cancel.svg" />
              <img src="~/assets/img/cancel-hover.svg" />
            </span>
            <span class="txt">{{
              $t('pages.assessments.edit.tabs.survey.tabButton')
            }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/report-text`"
            :class="['btn--tab', { 'btn--error': !progress.context.complete }]"
          >
            <!-- <span class="icon-area" v-if="progress.context.complete">
                            <img src="~/assets/img/check_circle.svg" />
                            <img src="~/assets/img/check_circle.svg" />
                        </span>
                        <span class="icon-area" v-else>
                            <img src="~/assets/img/cancel.svg" />
                            <img src="~/assets/img/cancel-hover.svg" />
                        </span> -->
            <span class="txt">
              {{ $t('pages.assessments.edit.tabs.context.tabButton') }}
            </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/collaborators`"
            :class="[
              'btn--tab',
              { 'btn--error': !progress.collaborators.complete },
            ]"
          >
            <span class="bullet">{{ progress.collaborators.filled }}</span>
            <span class="txt">
              {{ $t('pages.assessments.edit.tabs.collaborators.tabButton') }}
            </span>
          </nuxt-link>
        </li>

        <li v-if="!progress.published">
          <nuxt-link
            :to="`/assessments/edit/${id}/publish-settings`"
            :class="[
              'btn--tab btn--tab-percent',
              {
                'btn--error': progress.overall_percentage < 100,
                'btn--tab-disabled !hidden': progress.overall_percentage < 100,
              },
            ]"
          >
            <span class="txt">Publish Settings</span>
          </nuxt-link>
        </li>
      </ul>
      <ul v-else class="elinor__tabs">
        <li>
          <nuxt-link
            :to="`/assessments/edit/${id}/the-survey/`"
            :class="[
              'btn--tab btn--ok',
              { 'btn--error': !progress.survey.complete },
            ]"
          >
            <span class="icon-area" v-if="progress.survey.complete">
              <img src="~/assets/img/ico-ok.svg" />
            </span>
            <span class="icon-area" v-else>
              <img src="~/assets/img/cancel.svg" />
              <img src="~/assets/img/cancel-hover.svg" />
            </span>
            <span class="txt">{{
              $t('pages.assessments.edit.tabs.survey.tabButton')
            }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-edit-tab',
  props: ['id'],
  data() {
    return {
      isScrolled: false,
      headerHeight: 0,
    };
  },
  computed: {
    stickyTop() {
      return this.isScrolled ? `${this.headerHeight}px` : 'auto';
    },
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      progress: (state) => state.assessments.progress,
      layoutOffline: (state) => state.layout.offline,
    }),
    isOfflineModeEnabled() {
      // Check runtime config (available in client-side) or fallback to process.env
      // Defaults to true unless explicitly set to false
      if (this.$config && this.$config.offlineMode === false) {
        return false;
      }
      if (process.env.OFFLINE_MODE === 'false') {
        return false;
      }
      return true;
    },
    isOffline() {
      // Only return true if offline mode feature flag is enabled
      // Check runtime config (via $config) or fallback to process.env
      // Defaults to true unless explicitly set to false
      let offlineModeEnabled = true;
      if (this.$config && this.$config.offlineMode === false) {
        offlineModeEnabled = false;
      } else if (process.env.OFFLINE_MODE === 'false') {
        offlineModeEnabled = false;
      }
      return offlineModeEnabled && this.layoutOffline;
    },
  },
  mounted() {
    // console.log(this.progress);
    this.calculateHeaderHeight();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.calculateHeaderHeight);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.calculateHeaderHeight);
  },
  methods: {
    calculateHeaderHeight() {
      const header = document.querySelector('.header--page');
      if (header) {
        this.headerHeight = header.offsetHeight;
        // console.log(header.offsetHeight, header.height);
      }
    },
    handleScroll() {
      this.calculateHeaderHeight();
      this.isScrolled = window.scrollY > 0;
    },
    getPublishTabText() {
      const status = this.assessment.status;
      const percentage = this.progress.overall_percentage;
      let key;
      if (isNaN(percentage) || percentage < 100) {
        key = 'preparing';
      }
      if (percentage === 100 && status === 90) {
        key = 'ready';
      }

      if (percentage === 100 && status === 10) {
        key = 'edit';
      }

      return this.$t(
        'pages.assessments.edit.tabs.publish-settings.tabButton.' + key,
      );
    },
    getPublishPercentage() {
      return isNaN(this.progress.overall_percentage)
        ? 0
        : Math.floor(this.progress.overall_percentage);
    },
  },
};
</script>
