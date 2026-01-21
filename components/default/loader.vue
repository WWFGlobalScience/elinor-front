<template>
  <transition name="fade">
    <div class="elinor__loader" v-show="loader.active > 0 && !isOffline">
      <div class="loader__group">
        <svg
          class="animate-spin mb-2 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#43A0BD"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="#43A0BD"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <div class="loader__txt" v-if="loader.showText">{{ loader.text }}</div>
      </div>
      <div class="loader__bg"></div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { getOfflineModeFromStore } from '~/config/offline-mode';

export default {
  name: 'default-loader',
  computed: {
    ...mapState({
      loader: (state) => state.loader.loader,
      isOffline: (state) => state.layout.offline,
    }),
    mounted() {
      console.log('isOffline', this.isOffline);
    },
    // isOffline() {
    //   // Check if offline mode feature flag is enabled using centralized utility
    //   const offlineModeEnabled = getOfflineModeFromStore(
    //     this.$store.state.layout,
    //     this,
    //   );

    //   // Hide loader when offline mode feature flag is enabled
    //   // This prevents loader from showing when OFFLINE_MODE=true
    //   // even if the user hasn't explicitly gone offline
    //   if (offlineModeEnabled) {
    //     return true;
    //   }

    //   // Otherwise, only hide when explicitly offline
    //   return this.layoutOffline || false;
    // },
  },
};
</script>
