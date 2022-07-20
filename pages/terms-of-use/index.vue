<template>
  <article class="page page--flushed">
    <section class="section section--main">
      <img src="~/assets/img/methodology-section.jpg" alt="" />
    </section>
    <section class="section section--terms">
      <div class="container">
        <h1 class="c-title--main">{{ $t('pages.termsOfUse.title') }}</h1>
        <div class="g-grid--3-1-lg">
          <div class="g-colspan--2-full-lg">
            <div class="info-block"  v-html="content">
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
<script>
import content from '../../content/terms-of-use';

export default {
    name: "terms-of-use",
    auth: false,
    data() {
        return {
            content
        }
    }
};
</script>
