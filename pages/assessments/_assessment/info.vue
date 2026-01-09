<template>
  <section
    class="section section--assessment-info section--ma-data section--assessment-map tab-content"
  >
    <managementarea-data />
    <managementarea-map />
    <managementarea-zones />
  </section>
</template>

<script>
export default {
  name: 'info',
  auth: false,
  data() {
    return {
      mapedit: false,
    };
  },
};
</script>
