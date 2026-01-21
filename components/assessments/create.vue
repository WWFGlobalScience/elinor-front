<template>
  <button
    type="button"
    class="btn btn--md"
    @click="
      popupState({
        active: true,
        component: 'popup-assessment-create',
        title: 'pages.assessments.list.create.popup.title',
      })
    "
  >
    <span class="btn--opacity__target">{{
      $t('pages.assessments.list.createButton')
    }}</span>
    <img src="~/assets/img/add_circle.svg" />
  </button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'assessments-create',
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    checkCreateQuery() {
      if (this.$route.query.create) {
        this.popupState({
          active: true,
          component: 'popup-assessment-create',
          title: 'pages.assessments.list.create.popup.title',
        });
        // this.$router.replace({ query: { ...this.$route.query, create: undefined } });
      }
    },
  },
  mounted() {
    this.checkCreateQuery();
  },
  watch: {
    '$route.query.create'() {
      this.checkCreateQuery();
    },
  },
};
</script>
