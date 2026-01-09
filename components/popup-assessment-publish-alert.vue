<template>
  <div class="popup__content popup--assessment-publish">
    <h4 class="c-title--modal c-title--modal--alert mb-2">
      {{
        $t(
          'pages.assessments.edit.tabs.publish-settings.publish.alert.popup.confirmationTitle',
        )
      }}
    </h4>
    <p class="c-text--base mb-6">
      {{
        $t(
          'pages.assessments.edit.tabs.publish-settings.publish.alert.popup.confirmationDescription',
        )
      }}
    </p>
    <div class="g-grid--1">
      <div>
        <button
          @click="cancel()"
          type="button"
          class="btn--border-turqy btn--opacity--child"
        >
          <span class="btn--opacity__target">{{ $t('default.close') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup-assessment-publish-alert',
  methods: {
    cancel() {
      this.$store.dispatch('popup/popupState', { active: false });
    },
  },
};
</script>
