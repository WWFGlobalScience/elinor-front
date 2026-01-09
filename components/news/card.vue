<template>
  <div class="card__news" @click="showNewsDetail">
    <div class="header">
      <div class="title-group">
        <p class="date">{{ formatDate(instance.date) }}</p>
        <h3>{{ instance.title }}</h3>
      </div>
    </div>
    <div class="footer">
      <button @click="showNewsDetail" class="text-[#3A90AB]">
        {{ $t('buttons.readNews') }}
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <mask
          id="mask0_7699_8683"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_7699_8683)">
          <path
            d="M16.6115 12.75H5.25C5.03717 12.75 4.859 12.6781 4.7155 12.5345C4.57183 12.391 4.5 12.2128 4.5 12C4.5 11.7871 4.57183 11.609 4.7155 11.4655C4.859 11.3218 5.03717 11.25 5.25 11.25H16.6115L13.3193 7.95771C13.1706 7.80887 13.0972 7.63479 13.099 7.43546C13.101 7.23612 13.1744 7.05888 13.3193 6.90371C13.4744 6.74871 13.6526 6.66862 13.8538 6.66346C14.0551 6.65829 14.2333 6.73329 14.3885 6.88846L18.8673 11.3672C18.9609 11.4609 19.0269 11.5596 19.0652 11.6635C19.1037 11.7673 19.123 11.8795 19.123 12C19.123 12.1205 19.1037 12.2326 19.0652 12.3365C19.0269 12.4403 18.9609 12.539 18.8673 12.6327L14.3885 17.1115C14.2397 17.2601 14.0631 17.3335 13.8587 17.3317C13.6542 17.3297 13.4744 17.2512 13.3193 17.0962C13.1744 16.941 13.0994 16.7654 13.0943 16.5692C13.0891 16.373 13.1641 16.1974 13.3193 16.0422L16.6115 12.75Z"
            fill="#3A90AB"
          />
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

const maxCharacters = 300;

export default {
  name: 'news-card',
  props: ['instance'],
  data() {
    return {
      expanded: false,
      text:
        this.instance.text.length > maxCharacters
          ? this.instance.text.substring(0, maxCharacters) + '...'
          : this.instance.text,
      maxCharacters,
    };
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    toggleExpanded() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.text = this.instance.text;
      } else {
        this.text = this.instance.text.substring(0, maxCharacters) + '...';
      }
    },
    showNewsDetail() {
      this.popupState({
        active: true,
        component: 'popup-news-detail',
        title: 'News Detail',
        type: 'news',
        props: {
          news: this.instance,
        },
      });
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
