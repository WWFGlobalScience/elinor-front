<template>
  <div class="popup__content popup--assessment-publish">
    <!-- <h4 class="c-title--modal c-title--modal--alert mb-2">
            {{
                $t(
                    'pages.assessments.edit.tabs.publish-settings.finalize.popup.confirmationTitle',
                )
            }}
        </h4> -->
    <p class="c-text--base mb-6">
      {{
        $t(
          'pages.assessments.edit.tabs.publish-settings.finalize.popup.confirmationDescription',
        )
      }}
    </p>
    <div class="flex items-center gap-2">
      <div class="flex-1">
        <button
          @click="popup.onConfirm()"
          type="button"
          class="btn btn--md !min-w-[0px] !w-full"
        >
          <span>{{ $t('default.yes') }}</span>
        </button>
      </div>
      <div class="flex-1">
        <button
          @click="cancel()"
          type="button"
          class="btn btn--md btn--tertiary !min-w-[0px] !w-full"
        >
          <span>{{ $t('default.no') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'popup-assessment-publish',
  methods: {
    cancel() {
      this.$store.dispatch('popup/popupState', { active: false });
    },
  },
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
    }),
  },
};
</script>
