<template>
  <transition name="fade">
    <div v-if="notifications.active" class="elinor__notifications">
      <div class="container">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <strong class="block mb-4">{{ $t('default.error.title') }}</strong>
            <p class="mb-0">{{ $t(notifications.text) }}</p>
          </div>
          <button
            type="button"
            class="text-grayy-lighter hover:opacity-70 transition-opacity text-2xl leading-none p-0 bg-transparent border-0 cursor-pointer"
            @click="dismissNotification"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
        <button
          type="button"
          class="btn btn--opacity--child mt-4"
          @click="reloadPage"
        >
          <span class="btn--opacity__target">{{
            $t(notifications.button)
          }}</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'default-notifications',
  computed: {
    notifications() {
      return this.$store.state.notifications.notifications;
    },
  },
  methods: {
    reloadPage() {
      // Reset error flag before reload (though reload will reset everything anyway)
      this.$store.commit('loader/setErrorOccurred', false);
      window.location.reload();
    },
    dismissNotification() {
      this.$store.dispatch('notifications/clearNotification');
      // Reset error flag so loader can work normally again
      this.$store.commit('loader/setErrorOccurred', false);
    },
  },
};
</script>
