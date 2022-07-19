<template>
    <section class="section section--assessment-edit-managed-area">
        <ma-edit-selector v-if="assessment && assessment.management_area === null"></ma-edit-selector>
        <transition name="fade">
            <ma-edit-new v-if="assessment && assessment.management_area !== null"></ma-edit-new>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'assessment-management-area',
    layout: 'assessment-edit',
    mounted() {
        this.$store.dispatch('managementareas/fetchManagementAreas', '');
        this.$store.dispatch('managementareas/fetchAuthorities', '');
        this.$store.dispatch('stakeholdergroups/fetchStakeholderGroups', '');
        this.$store.dispatch('supportsources/fetchSupportSources', '');
        this.$store.dispatch('governancetypes/fetchGovernanceTypes', '');
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}

</script>
