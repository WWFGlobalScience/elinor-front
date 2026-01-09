<template>
  <div class="popup__content popup__delete">
    <!-- <p class="mb-6">
            {{ $t('pages.assessments.actions.delete.subtitle') }}
        </p> -->
    <p class="c-text--base mb-6 mt-6">
      {{ $t('pages.assessments.actions.delete.text') }}
    </p>
    <div class="flex gap-4">
      <div class="flex-1">
        <button
          type="button"
          class="btn btn--md !min-w-0 w-full"
          @click="confirm()"
        >
          {{ $t('default.yes') }}
        </button>
      </div>
      <div class="flex-1">
        <button
          type="button"
          class="btn btn--md btn--tertiary !min-w-0 w-full"
          @click="close()"
        >
          {{ $t('default.no') }}
        </button>
      </div>
    </div>
    <!-- <div class="btn-row">
            <button
                @click="confirm"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">
                    {{ $t('default.yes') }}</span
                >
            </button>
            <button
                type="button"
                @click="close"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">
                    {{ $t('default.no') }}</span
                >
            </button>
            <div style="clear: both"></div>
        </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-delete',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      popup: (state) => state.popup.popup,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      deleteAssessment: 'assessments/deleteAssessment',
    }),
    confirm() {
      this.deleteAssessment(this.assessment.id);
      this.popupState({ active: false });
    },
    close() {
      this.popupState({ active: false });
    },
  },
};
</script>
