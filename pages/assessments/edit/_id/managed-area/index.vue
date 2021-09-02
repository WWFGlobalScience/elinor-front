<template>
    <section class="section section--assessment-edit-managed-area">
        <ma-edit-selector v-if="assessment && assessment.management_area === null"></ma-edit-selector>
        <transition name="fade">
            <ma-edit-exists v-if="false"></ma-edit-exists>
        </transition>
        <transition name="fade">
            <ma-edit-new v-if="assessment && assessment.management_area !== null"></ma-edit-new>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'assessment-management-area',
    layout: 'assessment-edit',
    computed: {
        assessment() {
            const assessment = this.$store.state.assessments.assessment;
            if(assessment && assessment.management_area && assessment.management_area.id) {
                this.$store.dispatch('managementareas/fetchManagementArea', assessment.management_area.id)
            }
            return this.$store.state.assessments.assessment
        }
    }
}

</script>
