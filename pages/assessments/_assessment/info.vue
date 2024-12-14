<template>
    <section class="section section--assessment-info">
        <managementarea-data />
        <assessment-management-plan />
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
