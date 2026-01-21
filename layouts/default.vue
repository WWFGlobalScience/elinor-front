<template>
  <div id="app">
    <div :class="['app__content', { 'is--overlay': popup.active }]">
      <default-header></default-header>
      <!-- Mobile overlay when sidebar is open -->
      <div
        v-if="isMobileMenuOpen"
        class="sidebar__mobile-overlay"
        @click="closeMobileMenu"
      ></div>
      <main role="main">
        <default-sidebar></default-sidebar>
        <div class="app__content__main">
          <Nuxt keep-alive />
          <default-footer></default-footer>
        </div>
      </main>
    </div>
    <default-loader></default-loader>
    <default-notification
      v-if="$nuxt.nuxt.err || $store.state.notifications.notifications.active"
    ></default-notification>
    <popup-default
      v-if="!['news', 'video', 'onboarding'].includes(popup.type)"
    ></popup-default>
    <popup-news v-if="['news', 'video'].includes(popup.type)"></popup-news>
    <popup-onboarding v-if="popup.type === 'onboarding'"></popup-onboarding>
  </div>
</template>

<script>
import { getOfflineModeFromStore } from '~/config/offline-mode';

export default {
  name: 'layout-default',
  computed: {
    loader() {
      return this.$store.state.loader.loader;
    },
    popup() {
      return this.$store.state.popup.popup;
    },
    isMobileMenuOpen() {
      return this.$store.state.layout.mobileMenuOpen || false;
    },
  },
  methods: {
    closeMobileMenu() {
      this.$store.commit('layout/setMobileMenuOpen', false);
    },
  },
  mounted() {
    // Only initialize offline state if feature flag is enabled using centralized utility
    const offlineModeEnabled = getOfflineModeFromStore(
      this.$store.state.layout,
      this,
    );
    if (offlineModeEnabled) {
      const isOffline =
        this.$auth.loggedIn &&
        this.$store.state.assessments.assessment?.checkout ===
          this.$auth.user.id;
      this.$store.dispatch('layout/setOffline', { isOffline });
    }

    // Ensure loader is deactivated immediately after frontend initialization
    // The loader should NOT wait for backend/API data - it's only for frontend loading
    // Frontend is now loaded, so deactivate any loader that might be active
    this.$nextTick(() => {
      // Immediately deactivate loader - frontend initialization is complete
      // The loader should not rely on backend data at all
      this.$store.commit('loader/disableLoader');
      this.$store.commit('loader/setErrorOccurred', false);
    });
  },
};
</script>
