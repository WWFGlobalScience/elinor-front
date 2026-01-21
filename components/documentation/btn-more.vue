<template>
  <a @click="loadMore()" role="button" class="btn btn--opacity--child">
    <span class="btn--opacity__target">{{
      $t('pages.documentation.body.cards.button')
    }}</span>
    <img src="~/assets/img/ico-select-white.svg" alt="" />
  </a>
</template>

<script>
export default {
  name: 'documentation-btn-more',
  props: ['loadMore'],
};
</script>
