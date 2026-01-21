<template>
  <div
    class="fixed top-0 left-0 w-screen z-50 h-screen flex items-center justify-center"
  >
    <h4 class="text-center">Logging out...</h4>
  </div>
</template>

<script>
export default {
  name: 'logout',
  auth: false,
  mounted() {
    this.$store.dispatch('authentication/logout');
  },
};
</script>
