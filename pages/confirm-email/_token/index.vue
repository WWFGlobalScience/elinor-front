<template>
  <div></div>
</template>

<script>
export default {
  name: 'confirm-email',
  auth: 'guest',
  mounted() {
    // console.log(this.$route.params.token);
    this.$store.dispatch(
      'authentication/confirmEmail',
      this.$route.params.token,
    );
  },
};
</script>
