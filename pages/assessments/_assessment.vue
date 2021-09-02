<template>
    <article class="page page--assesment" v-if="loaded">
        <assessment-header></assessment-header>
        <assessment-tabs :id="id"></assessment-tabs>
        <transition name="fade">
            <nuxt-child />
        </transition>
    </article>
</template>

<script>

import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'assessment',
    auth: false,
    data() {
        return {
            id: this.$route.params.assessment,
            loaded: false,
            loaderText: this.$t( 'loading.assessment' )
        }
    },
    async fetch () {
        await this.$store.dispatch( 'loader/loaderState', 'Loading assessment' )

        await this.$store.dispatch( 'assessments/fetchAssessment', this.id )
        await this.$store.dispatch( 'managementareas/fetchManagementArea', this.assessment.management_area)
        await this.$store.dispatch( 'supportsources/fetchSupportSources')
        await this.$store.dispatch( 'stakeholdergroups/fetchStakeholderGroups')
        await this.$store.dispatch( 'governancetypes/fetchGovernanceTypes')
        await this.$store.dispatch( 'regions/fetchRegions')
        await this.$store.dispatch( 'collaborators/fetchCollaborators', this.id)
        await this.$store.dispatch( 'loader/loaderState', '' )
        this.loaded = true
    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
        })
    },
    mounted() {
        console.log( this.$nuxt )
    }

}

</script>
