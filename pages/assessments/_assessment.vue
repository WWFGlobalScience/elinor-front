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
        await this.$store.dispatch( 'assessments/fetchCollaborators' )
        await this.$store.dispatch( 'managementareas/fetchMasVersions' ) 
        await this.$store.dispatch( 'managementareas/setMaVersion', this.assessment.management_area_version )
        await this.$store.dispatch( 'managementareas/fetchMasRoots' )
        await this.$store.dispatch( 'managementareas/setMaRoot', this.ma.version.management_area )
        await this.$store.dispatch( 'managementareas/fetchMasPas' )
        await this.$store.dispatch( 'managementareas/setMaPa', this.ma.version.protected_area )
        await this.$store.dispatch( 'managementareas/fetchMasGtypes' )
        await this.$store.dispatch( 'managementareas/setMaGtype', this.ma.version.governance_type )
        await this.$store.dispatch( 'managementareas/fetchMasAuthorities' )
        await this.$store.dispatch( 'managementareas/setMaAuthority', this.ma.version.management_authority )
        await this.$store.dispatch( 'managementareas/fetchMasStakeholdergroups' )
        await this.$store.dispatch( 'managementareas/setMaStakeholdergroups', this.ma.version.stakeholder_groups )
        await this.$store.dispatch( 'managementareas/fetchMasSs' )
        await this.$store.dispatch( 'managementareas/setMaSs', this.ma.version.support_sources )
        await this.$store.dispatch( 'loader/loaderState', '' )
        this.loaded = true
    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            mas: state => state.managementareas.mas,
            ma: state => state.managementareas.ma
        })
    },
    mounted() {
        console.log( this.$nuxt )
    }
    
}

</script>