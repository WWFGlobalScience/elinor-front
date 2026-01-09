<template>
  <NuxtLink
    :to="linkTo"
    class="assessment-card--mobile"
    @click.native="scrollToTop"
  >
    <div class="badge-area">
      <div
        v-if="assessment.status == 10"
        class="badge"
        :class="'bg-' + badgeColor"
      >
        {{ assessment.score || '-' }}
      </div>
      <div v-else class="badge">-</div>
      <div class="badge-label uppercase">
        {{ $t('pages.assessments.outOf100') }}
      </div>
    </div>
    <div class="content-area">
      <div class="status-row">
        <div
          v-if="assessment.data_policy === 90 && assessment.status === 10"
          class="assessment-status status--published"
        >
          <span class="text">{{ $t('pages.assessments.published') }}</span>
        </div>
        <div
          v-if="assessment.data_policy === 10 && assessment.status === 10"
          class="assessment-status status--ready"
        >
          <span class="text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <mask
                id="mask0_7700_7245"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="16"
              >
                <rect width="16" height="16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_7700_7245)">
                <path
                  d="M6.36713 10.1L12.0171 4.45C12.1505 4.31667 12.306 4.25 12.4838 4.25C12.6616 4.25 12.8171 4.31667 12.9505 4.45C13.0838 4.58333 13.1505 4.74167 13.1505 4.925C13.1505 5.10833 13.0838 5.26667 12.9505 5.4L6.8338 11.5333C6.70046 11.6667 6.54491 11.7333 6.36713 11.7333C6.18935 11.7333 6.0338 11.6667 5.90046 11.5333L3.0338 8.66667C2.90046 8.53333 2.83657 8.375 2.84213 8.19167C2.84769 8.00833 2.91713 7.85 3.05046 7.71667C3.1838 7.58333 3.34213 7.51667 3.52546 7.51667C3.7088 7.51667 3.86713 7.58333 4.00046 7.71667L6.36713 10.1Z"
                  fill="#144651"
                />
              </g>
            </svg>
            {{ $t('pages.assessments.finalized') }}</span
          >
        </div>
        <div
          v-if="assessment.status === 90 && completionPercentage === 100"
          class="assessment-status status--ready"
        >
          <span class="text"
            >100% {{ $t('pages.assessments.readyToPublish') }}</span
          >
        </div>
        <div
          v-if="assessment.status === 90 && completionPercentage < 100"
          class="assessment-status status--pending"
        >
          <div class="edit">
            <img src="~/assets/img/edit.svg" alt="edit" />
            <span>Edit</span>
          </div>
          <span class="text">
            {{ completionPercentage }}%
            {{ $t('pages.assessments.toCompleted') }}
          </span>
        </div>
      </div>
      <h4>{{ assessment.name || '-' }}</h4>
      <div class="bottom-content">
        <div class="flex items-center gap-2">
          <div class="year">
            {{ assessment.year }}
          </div>
          <span class="separator text-[#9C9C9C]">|</span>
          <div class="name">
            {{ assessment.person_responsible.first_name }}
            {{ assessment.person_responsible.last_name }}
          </div>
        </div>
        <div class="management-area">
          {{
            (assessment.management_area_countries &&
              assessment.management_area_countries.name) ||
            '-'
          }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import { calculateProgress } from '~/config/assessment-progress';
import { isAssessmentObserver } from '~/config/assessment-roles';

export default {
  name: 'assessment-card-mobile',
  props: {
    assessment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    badgeColor() {
      return this.getAssessmentColor(this.assessment.score);
    },
    completionPercentage() {
      return parseFloat(
        calculateProgress(this.assessment).overall_percentage.toFixed(0),
      );
    },
    linkTo() {
      if (
        !this.$auth.loggedIn ||
        this.assessment.status === 10 ||
        isAssessmentObserver(this.$auth, this.assessment)
      ) {
        return `/assessments/${this.assessment.id}/info`;
      } else if (
        this.$auth.loggedIn ||
        this.assessment.status !== 10 ||
        !isAssessmentObserver(this.$auth, this.assessment)
      ) {
        return `/assessments/edit/${this.assessment.id}/assessment-data`;
      }
      return `#`;
    },
  },
  methods: {
    getAssessmentColor(score) {
      if (score >= 80) return 'excellent';
      if (score >= 60) return 'good';
      if (score >= 40) return 'average';
      return 'poor';
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/core/variables';

.assessment-card--mobile {
  @apply bg-[#F9F9F9] rounded-[16px] p-4 flex gap-4 items-center;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 36px;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s;

  // Make full width and remove border-radius below tablet breakpoint
  @media (max-width: $tablet-breakpoint) {
    //border-radius: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    // Add grey divider between cards (border-top except for first card)
    //border-top: 1px solid #dadada;

    &:first-child {
      border-top: none;
    }
  }

  @media (max-width: 576px) {
    gap: 0 16px;
  }

  .badge-area {
    @apply flex flex-col items-center gap-2;
    grid-column: 1;
    grid-row: 1 / -1;
    @apply py-8;

    @media (max-width: 576px) {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    //padding-left: 16px;
    align-self: center;

    .badge {
      @apply bg-[#DADADA] text-white rounded-full flex items-center justify-center font-semibold;
      width: 84px;
      height: 84px;
      font-size: 33px;

      @media (max-width: 576px) {
        width: 64px;
        height: 64px;
        font-size: 26px;
      }

      @media (max-width: 360px) {
        width: 56px;
        height: 56px;
        font-size: 22px;
      }

      &.bg-poor {
        @apply bg-poor;
      }
      &.bg-average {
        @apply bg-average;
      }
      &.bg-good {
        @apply bg-good;
      }
      &.bg-excellent {
        @apply bg-excellent;
      }
    }

    .badge-label {
      @apply text-[#8F999C] font-medium;
      font-size: 15px;
      line-height: 1.25;

      @media (max-width: 576px) {
        font-size: 12px;
      }
    }
  }

  .content-area {
    grid-column: 2;
    @apply flex flex-col;
    width: 100%;
    gap: 0;
    row-gap: 0;

    .status-row {
      @apply flex flex-col items-start w-full;
      grid-column: 2;
      grid-row: 1;
      margin: 0;
      padding: 0;
      padding-bottom: 0;
      line-height: 1;
      gap: 0;

      .assessment-status {
        @apply flex flex-col items-start w-full uppercase;
        gap: 0;
        margin: 0;
        padding: 0;
        padding-bottom: 0;

        .edit {
          @apply flex items-center gap-1;

          img {
            @apply w-[24px] h-[24px];
          }

          span {
            @apply text-[#43A0BD] text-base font-medium;
          }

          // Add 16px bottom margin to edit button on mobile (below tablet breakpoint)
          @media (max-width: $tablet-breakpoint) {
            margin-bottom: 16px;
          }
        }

        .text {
          @apply text-[color:var(--Dark-blue,#144651)] text-center font-montserrat font-bold tracking-[0.48px];
          border-radius: 4px;
          background: rgba(20, 70, 81, 0.12);
          font-size: 12px;
          line-height: 1.2;
          padding: 4px 8px;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;

          // Add 8px spacing below status text on mobile (below tablet breakpoint)
          @media (max-width: $tablet-breakpoint) {
            margin-bottom: 8px;
          }
        }

        &.status--published {
          .text {
            @apply text-[#1A981D] bg-[#32EC3630];
          }
        }

        &.status--pending {
          @apply text-[#8F999C];
        }
      }
    }

    h4 {
      @apply text-lg font-semibold text-[color:var(--Dark,#2E2E2E)];
      grid-column: 2;
      grid-row: 2;
      margin: 0;
      padding: 0;
      padding-top: 0;
      line-height: 1.3;
      margin-top: 0;

      // Add 8px spacing above title on mobile (after status-row, below tablet breakpoint)
      @media (max-width: $tablet-breakpoint) {
        margin-top: 8px;
      }
    }

    .bottom-content {
      grid-column: 2;
      grid-row: 3;
      @apply flex flex-col gap-1 mt-0;
      font-size: 14px;
      line-height: 1.25;

      // Add 8px spacing above bottom content on mobile (after h4, below tablet breakpoint)
      @media (max-width: $tablet-breakpoint) {
        margin-top: 8px;
      }

      .year,
      .name {
        @apply text-[#2E2E2E];
      }
      

      .management-area {
        @apply text-[#9C9C9C];
      }
    }
  }
}
</style>
