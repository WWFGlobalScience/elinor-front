<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <!-- <div class="lg:block" id="mobile-menu">
          <img src="~/assets/img/elinor-icon-turqy.svg">
      </div> -->
      <component :is="'default-header-' + header" />
    </nav>
  </header>
</template>

<script>
export default {
  name: "default-header",
  computed: {
    header() {
      const pages = this.$store.state.pages.list;
      const filtered = pages.filter((p) => p.path === this.$route.path);
      return (filtered[0] && filtered[0].config.display.header) || 'page';
    }
  }
};
</script>
