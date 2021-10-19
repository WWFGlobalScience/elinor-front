<template>
    <section class="section section--assessment-info">
        <managementarea-data></managementarea-data>
        <managementarea-map></managementarea-map>
        <managementarea-zones></managementarea-zones>
    </section>
</template>

<script>

export default {
    name: 'info',
    auth: false,
    data() {
        return {
            mapedit: false
        }
    }
}

</script>
