<template>
  <article class="page page--flushed page--news">
    <section class="section section--banner">
      <img src="~/assets/img/news-section.jpg" alt="" />
      <div class="container">
        <h1>
          {{ $t('pages.news.header.title') }}
        </h1>
      </div>
    </section>
    <section class="section section--news">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-1 gap-6">
          <news-card
            v-for="(newsInstance, index) in visibleNews"
            :instance="newsInstance"
            :key="index"
          />
        </div>

        <!-- Pagination component -->
        <news-pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="news.length"
          :per-page="perPage"
          @page-change="goToPage"
        />
      </div>
    </section>
  </article>
</template>

<script>
import locales from '../../locales';
const perPage = 9;
export default {
  name: 'news',
  auth: false,
  data() {
    return {
      currentPage: 1,
      perPage,
    };
  },
  computed: {
    news() {
      const currentLanguage = this.$i18n.locales.find(
        (lang) => lang.code === this.$i18n.locale,
      );
      return locales[currentLanguage.code].news;
    },
    totalPages() {
      return Math.ceil(this.news.length / this.perPage);
    },
    visibleNews() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.news.slice(start, end);
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
      // Scroll to top of news section for better UX
      this.$nextTick(() => {
        const newsSection = document.querySelector('.section--news');
        if (newsSection) {
          newsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
  },
  // Reset to first page when language changes
  watch: {
    '$i18n.locale'() {
      this.currentPage = 1;
    },
  },
};
</script>
