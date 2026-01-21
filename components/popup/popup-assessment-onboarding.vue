<template>
  <div class="popup__content">
    <button type="button" class="popup__close-btn" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <mask id="mask0_8702_757" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
          <rect width="20" height="20" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_8702_757)">
          <path d="M9.80556 11.3611L4.36111 16.8056C4.15741 17.0093 3.89815 17.1111 3.58333 17.1111C3.26852 17.1111 3.00926 17.0093 2.80556 16.8056C2.60185 16.6019 2.5 16.3426 2.5 16.0278C2.5 15.713 2.60185 15.4537 2.80556 15.25L8.25 9.80556L2.80556 4.36111C2.60185 4.15741 2.5 3.89815 2.5 3.58333C2.5 3.26852 2.60185 3.00926 2.80556 2.80556C3.00926 2.60185 3.26852 2.5 3.58333 2.5C3.89815 2.5 4.15741 2.60185 4.36111 2.80556L9.80556 8.25L15.25 2.80556C15.4537 2.60185 15.713 2.5 16.0278 2.5C16.3426 2.5 16.6019 2.60185 16.8056 2.80556C17.0093 3.00926 17.1111 3.26852 17.1111 3.58333C17.1111 3.89815 17.0093 4.15741 16.8056 4.36111L11.3611 9.80556L16.8056 15.25C17.0093 15.4537 17.1111 15.713 17.1111 16.0278C17.1111 16.3426 17.0093 16.6019 16.8056 16.8056C16.6019 17.0093 16.3426 17.1111 16.0278 17.1111C15.713 17.1111 15.4537 17.0093 15.25 16.8056L9.80556 11.3611Z" fill="white"/>
        </g>
      </svg>
    </button>
    <div class="left-content">
      <div>
        <h3 class="text-turqy">
          {{ $t('pages.assessments.popup.title') }}
        </h3>
        <p class="text-[14px] leading-[24px] text-[#2E2E2E] font-medium mt-2">
          {{ $t('pages.assessments.popup.text') }}
        </p>
      </div>
      <div class="steps">
        <div
          class="step"
          v-for="i in 7"
          :key="i"
          @click="setActiveStep(i)"
          :class="{ isActive: activeIndex === i }"
        >
          <div class="step-number">
            {{ i }}
          </div>
          <span class="body-text-14 bold">
            {{ $t(`pages.assessments.popup.step-${i}.title`) }}
          </span>
        </div>
      </div>
      <label class="custom-radio custom-radio--desktop">
        <input
          type="checkbox"
          name="answer"
          id="dontShowAgain"
          value="1"
          :checked="false"
          @change="dontShowAgain($event.target.value)"
        />
        <span class="custom-radio__label !text-[12px] !font-medium">{{
          $t('pages.assessments.popup.label')
        }}</span>
      </label>
    </div>
    <div class="right-content">
      <div class="image-content">
        <popup-onboarding-images :activeIndex="activeIndex" />
      </div>
      <div class="text-content">
        <div
          class="text-content-item"
          v-for="i in 7"
          :key="i"
          :class="{ isActive: activeIndex === i }"
        >
          <h4 class="text-turqy">
            {{ $t(`pages.assessments.popup.step-${i}.title`) }}
          </h4>
          <div class="font-medium">
            <p>{{ $t(`pages.assessments.popup.step-${i}.text`) }}</p>
            <ul v-if="i === 1">
              <li>
                {{ $t(`pages.assessments.popup.step-${i}.li-1`) }}
              </li>
              <li>
                {{ $t(`pages.assessments.popup.step-${i}.li-2`) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="btn-row">
          <button
            class="btn"
            @click="prevStep"
            :class="{ 'btn--disabled': activeIndex === 1 }"
          >
            {{ $t('pages.assessments.edit.tabs.survey.questions.prev') }}
          </button>
          <button
            class="btn"
            @click="nextStep"
            :class="{ 'btn--disabled': activeIndex === 7 }"
          >
          {{ $t('pages.assessments.edit.tabs.survey.questions.next') }}
          </button>
        </div>
        <label class="custom-radio custom-radio--mobile">
          <input
            type="checkbox"
            name="answer"
            id="dontShowAgainMobile"
            value="1"
            :checked="false"
            @change="dontShowAgain($event.target.value)"
          />
          <span class="custom-radio__label !text-[12px] !font-medium">{{
            $t('pages.assessments.popup.label')
          }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-onboarding',
  data() {
    return {
      activeIndex: 1, // Default to first step
    };
  },
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    setActiveStep(stepIndex) {
      this.activeIndex = stepIndex;
    },
    prevStep() {
      this.activeIndex--;
    },
    nextStep() {
      this.activeIndex++;
    },
    createAssessment() {
      this.popupState({
        active: true,
        component: 'popup-assessment-create',
        title: 'pages.assessments.list.create.popup.title',
      });
    },
    close() {
      this.popupState({ active: false });
    },
    dontShowAgain() {
      localStorage.setItem('onboarding', '0');
      this.close();
    },
  },
};
</script>
