<template>
  <button
    type="submit"
    form="form--assessment-create"
    class="btn btn--opacity--child"
  >
    <span class="btn--opacity__target">{{ name }}</span>
    <img src="~/assets/img/ico-button-arrow.svg" />
  </button>
</template>

<script>
export default {
  name: 'buttons-btn-cta',
  props: ['name'],
};
</script>
