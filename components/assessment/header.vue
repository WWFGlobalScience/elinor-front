<template>
  <header class="header--page header--page__assessment">
    <div class="container">
      <a href="/assessments" class="back-btn">
        <img src="~/assets/img/arrow_left_alt.svg" />
        <span>
          {{ $t('pages.assessments.view.tabs.info.title') }}
        </span>
      </a>
    </div>
    <div
      class="container flex justify-start gap-8 sm:gap-4 items-start header-assessment-content"
    >
      <div
        v-if="assessment && assessment.score !== null"
        class="flex gap-2 flex-col items-start justify-center"
      >
        <div
          class="flex justify-center items-center w-[80px] h-[80px] md:w-[64px] md:h-[64px] sm:w-[56px] sm:h-[56px] rounded-full"
          :class="'bg-' + getAssessmentColor(assessment.score)"
        >
          <span class="text-white text-[36px] font-bold md:text-[26px] sm:text-[22px]">
            {{ assessment.score }}
          </span>
        </div>
        <span
          class="uppercase text-[#9C9C9C] font-medium text-[10px] leading-[15px] w-full text-center"
          >{{ $t('pages.assessments.outOf100') }}</span
        >
      </div>
      <div class="text">
        <p class="assessment__year">
          {{ $t('pages.assessments.view.year') }}
          {{ assessment.year }} - {{ $t('default.version') }}
          {{ assessment.published_version }}
        </p>
        <h2 class="assessment__name">{{ assessment.name }}</h2>
        <!-- <assessment-actions type="show" /> -->
      </div>
      <div class="header__save ml-auto justify-start">
        <assessment-status></assessment-status>
      </div>
    </div>
    <div class="container mt-4">
      <div class="assessment__btns">
        <a
          v-if="$auth.loggedIn && !isCreator()"
          @click="contact"
          role="button"
          class="btn btn--border-turqy !border-0 !p-2 !m-0 group"
          title="Contact"
        >
          <img
            src="~/assets/img/mail.svg"
            alt="Contact"
            class="!transform-none"
          />
          <span class="!ml-1 group-hover:underline">{{
            $t('default.contactAdministrator')
          }}</span>
        </a>
        <span
          v-if="$auth.loggedIn && !isCreator()"
          class="text-[#DADADA] ml-0 mr-1"
          >|</span
        >
        <a
          v-if="$auth.loggedIn && !isCreator()"
          @click="flag"
          role="button"
          class="btn btn--border-turqy !border-0 !p-2 !m-0 group"
          title="Flag"
        >
          <img src="~/assets/img/flag.svg" alt="Flag" class="!transform-none" />
          <span class="!ml-1 group-hover:underline">{{
            $t('default.flag')
          }}</span>
        </a>
      </div>
      <assessment-edit-header-btns v-if="assessment.score !== null" type="publish" />
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'assessment-header',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    getAssessmentColor(score) {
      if (score >= 80) return 'excellent';
      if (score >= 60) return 'good';
      if (score >= 40) return 'average';
      return 'poor';
    },
    isCreator() {
      if (!this.$auth.loggedIn || !this.assessment) {
        return false;
      }
      return this.assessment.created_by === this.$auth.user.id;
    },
    contact() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-contact',
        title: 'pages.assessments.actions.contact.title',
      });
    },
    flag() {
      this.popupState({
        active: true,
        type: 'xs',
        component: 'popup-assessment-flag',
        title: 'pages.assessments.actions.flag.title',
      });
    },
  },
};
</script>
