<template>
    <section class="section section--assessment-info">
        <managementarea-data></managementarea-data>
        <managementarea-map :mapedit="mapedit"></managementarea-map>
        <!--<managementarea-zones></managementarea-zones>-->
    </section>
</template>

<script>

export default {
    name: 'info',
    data() {
        return {
            mapedit: false
        }
    }
}

</script>