<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    class="checkmark-green"
  >
    <circle cx="12" cy="12" r="10" fill="#E4F0F4" />
    <path
      d="M9 12l2 2 4-4"
      stroke="#029262"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>
</template>

<script>
export default {
  name: 'checkmark-green',
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
  },
};
</script>

<style scoped>
.checkmark-green {
  display: inline-block;
  vertical-align: middle;
}
</style>
