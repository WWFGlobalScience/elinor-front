<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <!-- Mobile hamburger button -->

      <!-- Logo centered -->
      <NuxtLink to="/" class="header__logo">
        <img src="~/assets/img/elinor.svg" alt="ELINOR" />
      </NuxtLink>
      <button
        @click="toggleMobileMenu"
        class="header__mobile-menu-toggle"
        aria-label="Toggle menu"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <component :is="'default-header-' + header" />
    </nav>
  </header>
</template>

<script>
export default {
  name: 'default-header',
  computed: {
    header() {
      const pages = this.$store.state.pageslatest.list;
      const filtered = pages.filter((p) => p.path === this.$route.path);
      return (filtered[0] && filtered[0].config.display.header) || 'page';
    },
  },
  methods: {
    toggleMobileMenu() {
      const currentState = this.$store.state.layout.mobileMenuOpen || false;
      this.$store.commit('layout/setMobileMenuOpen', !currentState);
    },
  },
};
</script>
