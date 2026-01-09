<template>
  <div class="page page-cover" id="assessment-report-pages-cover">
    <assessment-report-partials-header></assessment-report-partials-header>
    <div class="content h-[644px]">
      <assessment-report-partials-cover-aside></assessment-report-partials-cover-aside>
      <assessment-report-partials-cover-content
        :keys="keys"
        :form="form"
      ></assessment-report-partials-cover-content>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-report-pages-cover',
  props: ['keys', 'form'],
};
</script>
