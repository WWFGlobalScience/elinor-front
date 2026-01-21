<template>
  <section class="section section--ma-info">
    <ma-data :ma="ma" :mode="mode"></ma-data>
    <ma-map :ma="ma"></ma-map>
    <ma-zones :ma="ma"></ma-zones>
    <ma-assessments :assessments="assessments"></ma-assessments>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ma-info',
  layout: 'ma',
  data() {
    return {
      mode: 'ma',
    };
  },
  computed: {
    assessments() {
      return this.$store.state.assessments.list;
    },
    ma() {
      return this.$store.state.ma.ma;
    },
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(value * 1000).format('MM/DD/YYYY');
      }
    },
  },
};
</script>
