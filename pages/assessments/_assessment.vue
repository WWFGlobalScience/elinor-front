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
    fetchOnServer: false,
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
        })
    },
    mounted() {
        this.$store.dispatch( 'assessments/fetchAssessment', this.id )
        this.$store.dispatch( 'supportsources/fetchSupportSources')
        this.$store.dispatch( 'stakeholdergroups/fetchStakeholderGroups')
        this.$store.dispatch( 'governancetypes/fetchGovernanceTypes')
        this.$store.dispatch( 'regions/fetchRegions')
        this.$store.dispatch( 'collaborators/fetchCollaborators', this.id)
        this.loaded = true;
    }

}

</script>
