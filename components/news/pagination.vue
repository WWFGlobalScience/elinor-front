<template>
  <div class="pagination-wrapper">
    <div class="pagination">
      <!-- Previous button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-btn pagination-btn--prev !pl-2.5"
        :class="{ 'pagination-btn--disabled': currentPage === 1 }"
      >
        <div class="pagination-btn-icon">
          <img
            src="~/assets/img/keyboard_arrow_right.svg"
            class="rotate-180"
            alt="Previous"
          />
          <img
            src="~/assets/img/keyboard_arrow_right-white.svg"
            class="rotate-180"
            alt="Previous"
          />
        </div>
        <span>{{ $t('pagination.previous') }}</span>
      </button>

      <!-- Page numbers -->
      <div class="pagination-pages">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="pagination-btn pagination-btn--page"
          :class="{ 'pagination-btn--active': page === currentPage }"
        >
          {{ page }}
        </button>

        <!-- Ellipsis for skipped pages -->
        <span v-if="showStartEllipsis" class="pagination-ellipsis">...</span>
        <span v-if="showEndEllipsis" class="pagination-ellipsis">...</span>
      </div>

      <!-- Next button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-btn pagination-btn--next !pr-2.5"
        :class="{ 'pagination-btn--disabled': currentPage === totalPages }"
      >
        <span>{{ $t('pagination.next') }}</span>
        <div class="pagination-btn-icon">
          <img src="~/assets/img/keyboard_arrow_right.svg" alt="Next" />
          <img src="~/assets/img/keyboard_arrow_right-white.svg" alt="Next" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news-pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startItem() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    endItem() {
      const end = this.currentPage * this.perPage;
      return end > this.totalItems ? this.totalItems : end;
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;

      if (this.totalPages <= maxVisible) {
        // Show all pages if total is small
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show smart pagination with ellipsis
        if (this.currentPage <= 3) {
          // Show first 3 pages + last page
          for (let i = 1; i <= 3; i++) {
            pages.push(i);
          }
          pages.push(this.totalPages);
        } else if (this.currentPage >= this.totalPages - 2) {
          // Show first page + last 3 pages
          pages.push(1);
          for (let i = this.totalPages - 2; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Show current page with neighbors + first and last
          pages.push(1);
          for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push(this.totalPages);
        }
      }

      return pages;
    },
    showStartEllipsis() {
      return this.visiblePages.length > 0 && this.visiblePages[0] > 1;
    },
    showEndEllipsis() {
      return (
        this.visiblePages.length > 0 &&
        this.visiblePages[this.visiblePages.length - 1] < this.totalPages
      );
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    },
  },
};
</script>
