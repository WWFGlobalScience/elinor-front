<template>
  <div class="popup__content popup--assessment-toggle-attribute">
    <p class="c-text--base mb-6">
      {{ $t('pages.assessments.edit.tabs.survey.uncheckAttributeText') }}
    </p>
    <div class="flex gap-4">
      <div class="flex-1">
        <button
          type="button"
          class="btn btn--md !min-w-0 !w-full"
          @click="handleConfirm"
        >
          {{ $t('default.yes') }}
        </button>
      </div>
      <div class="flex-1">
        <button
          type="button"
          class="btn btn--md btn--tertiary !min-w-0 !w-full"
          @click="popupState(false, '', '')"
        >
          {{ $t('default.no') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-toggle-atribute',
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
    }),
  },
  mounted() {
    // console.log('this.popup', this.popup);
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    async handleConfirm() {
      if (this.popup.onConfirm && typeof this.popup.onConfirm === 'function') {
        await this.popup.onConfirm();
      }
      this.popupState({ active: false });
    },
  },
};
</script>
