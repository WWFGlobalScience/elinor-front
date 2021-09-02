<template>
    <section class="section section--assessment-edit-ma">
        <managementarea-edit></managementarea-edit>
        <managementarea-map :mapedit="mapedit"></managementarea-map>
    </section>
</template>

<script>
export default {
    name: 'management-area-edit',
    auth: false,
    data() {
        return {
            mapedit: true
        }
    }
}
</script>
