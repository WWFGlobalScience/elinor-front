<template>
  <header class="header--page">
    <div class="container">
      <h1 class="mb-0">
        <img src="~/assets/img/ico-assessments-turqy.svg" alt="" />
        <span>{{ $t('pages.documentation.header.title') }}</span>
      </h1>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'assessments-header',
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
  },
};
</script>
