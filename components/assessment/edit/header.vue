<template>
  <header class="header--page" :class="{ 'have_score': assessment && assessment.score !== null }">
      <div class="container">
          <NuxtLink to="/assessments" class="back-btn">
              <img src="~/assets/img/arrow_left_alt.svg" />
              <span>{{ $t('pages.assessments.edit.title') }}</span>
          </NuxtLink>
      </div>
      <div class="container">
          <div
              v-if="assessment && assessment.score !== null"
              class="flex gap-1 flex-col items-center mr-6"
          >
              <div
                  class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                  :class="'bg-' + getAssessmentColor(assessment.score)"
              >
                  <span class="text-white text-[36px] font-semibold">
                      {{ assessment.score }}
                  </span>
              </div>
              <span
                  class="uppercase text-[#9C9C9C] font-medium text-[10px] leading-[15px]"
                  >{{ $t('pages.assessments.outOf100') }}</span
              >
          </div>
          <div class="text flex-1">
              <div class="flex justify-between items-center">
                  <h2>{{ assessment.name }}</h2>
                  <div class="header__save relative">
                      <assessment-status class="mb-7"></assessment-status>
                      <span class="progress-percentage" v-if="!progress.published">
                          {{ getPublishPercentage() }}% completed
                      </span>
                      <!-- <template v-if="assessment.status !== 10">
                          <button
                              type="submit"
                              form="form--assessment-edit"
                              class="btn btn--md"
                              :class="{ 'is--saved': isSaved }"
                              @click="savedAssessment"
                          >
                              <span class="btn--opacity__target">{{
                                  $t('pages.assessments.edit.saveButton')
                              }}</span>
                          </button>
                      </template> -->
                  </div>
              </div>
              <!-- <p class="assessment__year">
                  {{ $t('pages.assessments.edit.year') }}
                  {{ assessment.year }}
              </p> -->
              <assessment-edit-header-btns v-if="!isScrolled || assessment.score !== null" type="edit" />
          </div>
          <div class="last-edit"
              v-if="
                  isLastEdit && lastEdit
              "
          >
              {{
                  $t('default.save.autosave') +
                  ' ' +
                  lastEdit.fromNow()
              }}
          </div>
          <div class="last-edit"
              v-if="
                  isSaved
              "
          >
              Your progress has been saved successfully!
          </div>
      </div>
      <!-- <p
          v-if="wasSurveyOfflineModeInitiatedByCurrentUser"
          class="container text-red-400 text-sm pt-1"
      >
          {{ $t('pages.assessments.edit.offlineSurveyWarning') }}
      </p> -->
  </header>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'assessment-edit-header',
  data() {
      return {
          isScrolled: false,
          isSaved: false,
          isLastEdit: false,
      };
  },
  computed: {
      ...mapState({
          assessment: (state) => state.assessments.assessment,
          progress: (state) => state.assessments.progress,
          isOffline: (state) => state.layout.offline,
      }),
      lastEdit() {
          const lastEditValue = this.assessment?.last_edit;
          if (!lastEditValue) {
              return null;
          }
          const momentObj = moment(lastEditValue);
          return momentObj.isValid() ? momentObj : null;
      },
      wasSurveyOfflineModeInitiatedByCurrentUser() {
          return this.assessment.checkout === this.$auth.user.id;
      },
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
      'assessment.last_edit': {
          handler(newVal) {
              this.isLastEdit = newVal !== null && newVal !== undefined;

              setTimeout(() => {
                  this.isLastEdit = false;
              }, 3000);
          },
          immediate: true,
      },
  },
  methods: {
      handleScroll() {
          this.isScrolled = window.scrollY > 0;
      },
      getPublishPercentage() {
          return isNaN(this.progress.overall_percentage)
              ? 0
              : Math.floor(this.progress.overall_percentage);
      },
      savedAssessment() {
          this.isSaved = true;
          setTimeout(() => {
              this.isSaved = false;
          }, 3000);
      },
  },
};
</script>