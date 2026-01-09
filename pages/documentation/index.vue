<template>
  <article class="page page--documentation page--flushed">
    <section class="section section--banner">
      <img src="~/assets/img/documentation-section.jpg" alt="" />
      <div class="container">
        <div class="flex flex-col gap-4 sm:gap-2">
          <h1>
            {{ $t('pages.documentation.header.title') }}
          </h1>
          <div class="sm:text-[14px] sm:leading-[22px] text-white max-w-[692px]">
            {{ $t('pages.documentation.intro.text') }}
          </div>
        </div>
      </div>
    </section>
    <section class="section section--mt-medium section--documentation">
      <div class="container flex flex-col gap-6">
        <documentation-card
          v-for="(document, index) in documents"
          :document="document"
          :key="index"
        />
        <div class="row-btn row-btn--center">
          <documentation-btn-more v-if="nextPage !== null" :load-more="load" />
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'documentation',
  auth: false,
  data() {
    return {
      sortBy: 'publication_date',
      sortOrder: 'desc',
    };
  },
  computed: {
    ...mapState({
      documents: (state) => state.documents.list,
      nextPage: (state) => state.documents.pagination.next,
    }),
  },
  methods: {
    ...mapActions({
      fetchDocuments: 'documents/fetchDocuments',
    }),
    load() {
      this.fetchDocuments({
        page: this.nextPage,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
    },
  },
  mounted() {
    this.load();
    // console.log(this.documents);
  },
};
</script>
