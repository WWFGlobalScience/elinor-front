<template>
  <article class="page page--flushed">
    <section class="section section--banner">
      <img src="~/assets/img/methodology-section.jpg" alt="" />
      <div class="container">
        <h1>
          {{ $t('pages.termsOfUse.title') }}
        </h1>
      </div>
    </section>
    <section class="section section--terms">
      <div class="container">
        <div class="info-block" v-html="content"></div>
      </div>
    </section>
  </article>
</template>
<script>
import locales from '../../locales';

export default {
  name: 'terms-of-use',
  auth: false,
  computed: {
    content() {
      const currentLanguage = this.$i18n.locales.find(
        (lang) => lang.code === this.$i18n.locale,
      );
      return locales[currentLanguage.code].termsOfUse;
    },
  },
};
</script>
