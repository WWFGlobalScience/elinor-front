<template>
  <div class="popup__content popup--news-detail">
    <div class="news-detail">
      <div class="news-header">
        <div class="news-meta">
          <p class="news-date">{{ formatDate(news.date) }}</p>
          <h3>{{ news.title }}</h3>
        </div>
      </div>
      <div class="news-body">
        <div class="news-text" v-html="news.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup-news-detail',
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  computed: {
    news() {
      return this.props?.news || {};
    },
  },
  methods: {
    close() {
      this.$store.dispatch('popup/popupState', { active: false });
    },
    formatDate(dateString) {
      if (!dateString) return '';

      // Parse the date string (assuming format like "2-28-2024" or "6-20-2022")
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return dateString;

      // Format as "4 July 2025"
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      return date.toLocaleDateString('en-GB', options);
    },
  },
};
</script>

<style lang="scss" scoped>
.news-detail {
  .news-header {
    .news-meta {
      @apply flex flex-col items-start gap-2.5;
      .news-date {
        @apply text-[#9C9C9C] text-sm font-semibold leading-[26px];
      }
    }
  }

  .news-body {
    .news-text {
      @apply text-base leading-[30px] pt-5;

      p {
        @apply mb-[9px] last:mb-0;
      }

      p:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
