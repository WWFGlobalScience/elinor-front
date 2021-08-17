import moment from 'moment'

export const state = () => ({
    mas: {
        roots: [],
        versions: [],
        authorities: [],
        zones: [],
        regions: [],
        pas: [],
        stakeholdergroups: [],
        gtypes: [],
        ss: []
    },
    ma: {
        root: {},
        version: {},
        authority: [],
        zones: [],
        regions: [],
        pa: {},
        stakeholdergroups: [],
        gtype: {},
        ss: []
    }
})

export const mutations = {
    setMasVersions( state, payload ) {
        state.mas.versions = payload
    },
    setMaVersion( state, payload ) {
        state.ma.version = state.mas.versions.find( version => version.id == payload )
    },
    setMasRoots( state, payload ) {
        state.mas.roots = payload
    },
    setMaRoot( state, payload ) {
        state.ma.root = state.mas.roots.find( root => root.id == payload )
    },
    setMasPas( state, payload ) {
        state.mas.pas = payload
    },
    setMaPa( state, payload ) {
        state.ma.pa = state.mas.pas.find( pa => pa.id == payload )
    },
    setMasGtypes( state, payload ) {
        state.mas.gtypes = payload
    },
    setMaGtype( state, payload ) {
        state.ma.gtype = state.mas.gtypes.find( gtype => gtype.id == payload )
    },
    setMasAuthorities( state, payload ) {
        state.mas.authorities = payload
    },
    setMaAuthority( state, payload ) {
        state.ma.authority = state.mas.authorities.find( authority => authority.id == payload )
    },
    setMasStakeholdergroups( state, payload ) {
        state.mas.stakeholdergroups = payload
    },
    setMaStakeholdergroups( state, payload ) {
        state.ma.stakeholdergroups = state.mas.stakeholdergroups.filter( stakeholdergroup => state.ma.version.stakeholder_groups.includes( Number( stakeholdergroup.id ) ) )
    },
    setMasSs( state, payload ) {
        state.mas.ss = payload
    },
    setMaSs( state, payload ) {
        state.ma.ss = state.mas.ss.filter( s => state.ma.version.support_sources.includes( Number( s.id ) ) )
    },
    updateRoot( state, payload ) {
        payload == null ? state.ma.root.parent = null : state.ma.root.parent = payload.id
    },
    updateVersionDateEstablishment( state, payload ) {
        payload == null ? state.ma.version.date_established = null : state.ma.version.date_established = payload
    },
    updateVersionReportedSize( state, payload ) {
        payload == null ? state.ma.version.reported_size = null : state.ma.version.reported_size = payload
    },
    updateVersionAuthority( state, payload ) {
        payload == null ? state.ma.version.management_authority = null : state.ma.authority.name = payload
    },
    updateVersionGtype( state, payload ) {
        if ( payload == null ) {
            state.ma.version.governance_type = null
            state.ma.gtype = null
        } else {
            state.ma.version.governance_type = payload.id
            state.ma.gtype = payload
        }
    },
    updateVersionRecognition( state, payload ) {
        if ( payload == null ) {
            state.ma.version.recognition_level = ''
        } else {
            state.ma.version.recognition_level = payload
        }
    },
    updateVersionStakeholdergroups( state, payload ) {
        if ( payload == null ) {
            state.ma.stakeholdergroups = null
            state.ma.version.stakeholder_groups = null
        } else {
            state.ma.stakeholdergroups = payload
            state.ma.version.stakeholder_groups = payload.map( ( { id } ) => parseInt(id) )
        }
    },
    updateVersionSs( state, payload ) {
        if ( payload == null ) {
            state.ma.ss = null
            state.ma.version.support_sources = null
        } else {
            state.ma.ss = payload
            state.ma.version.support_sources = payload.map( ( { id } ) => parseInt(id) )
        }
    },
    updateVersionMapCenter( state, payload ) {
        if ( payload == null ) {
            state.ma.version.point = null
        } else {
            state.ma.version.point = {
                type: 'Point',
                cordinates: payload
            }
        }

    },
    updateVersionMapPolygon( state, payload ) {
        if ( payload == null ) {
            state.ma.version.polygon = null
        } else {
            state.ma.version.polygon = {
                type: payload.features[0].geometry.type,
                coordinates: payload.features[0].geometry.coordinates
            }
        }
    }
}

export const actions = {
    /*
        1. FETCH
    */
    async fetchMasVersions( state ) {
        let versions = await this.$axios.$get( `v1/managementareaversions/` )
        state.commit( 'setMasVersions', versions.results )
    },
    async setMaVersion( state, id ) {
        state.commit( 'setMaVersion', id )
    },
    async fetchMasRoots( state ) {
        let roots = await this.$axios.$get( `v1/managementareas/` )
        state.commit( 'setMasRoots', roots.results )
    },
    async setMaRoot( state, id ) {
        state.commit( 'setMaRoot', id )
    },
    async fetchMasPas( state ) {
        let pas = await this.$axios.$get( `v1/protectedareas/` )
        state.commit( 'setMasPas', pas.results )
    },
    async setMaPa( state, id ) {
        state.commit( 'setMaPa', id )
    },
    async fetchMasGtypes( state ) {
        let gtypes = await this.$axios.$get( `v1/governancetypes/` )
        state.commit( 'setMasGtypes', gtypes.results )
    },
    async setMaGtype( state, id ) {
        state.commit( 'setMaGtype', id )
    },
    async fetchMasAuthorities( state ) {
        let authorities = await this.$axios.$get( `v1/managementareaauthorities/` )
        state.commit( 'setMasAuthorities', authorities.results )
    },
    async setMaAuthority( state, id ) {
        state.commit( 'setMaAuthority', id )
    },
    async fetchMasStakeholdergroups( state ) {
        let stakeholdergroups = await this.$axios.$get( `v1/stakeholdergroups/` )
        state.commit( 'setMasStakeholdergroups', stakeholdergroups.results )
    },
    async setMaStakeholdergroups( state, id ) {
        state.commit( 'setMaStakeholdergroups', id )
    },
    async fetchMasSs( state ) {
        let ss = await this.$axios.$get( `supportsources` )
        state.commit( 'setMasSs', ss )
    },
    async setMaSs( state, id ) {
        state.commit( 'setMaSs', id )
    },

    /*
        2. UPDATES
    */
    async updateMaVersion( state, payload ) {
        state.commit( 'updateMaVersion', payload )
    },
    async updateRoot( state, id) {
        state.commit( 'updateRoot', id )
    },
    async updateVersionDateEstablishment( state, payload ) {
        state.commit( 'updateVersionDateEstablishment', payload )
    },
    async updateVersionReportedSize( state, payload ) {
        state.commit( 'updateVersionReportedSize', payload )
    },
    async updateVersionAuthority( state, payload ) {
        state.commit( 'updateVersionAuthority', payload )
    },
    async updateVersionGtype( state, payload ) {
        state.commit( 'updateVersionGtype', payload )
    },
    async updateVersionRecognition( state, payload ) {
        state.commit( 'updateVersionRecognition', payload )
    },
    async updateVersionStakeholdergroups( state, payload ) {
        state.commit( 'updateVersionStakeholdergroups', payload )
    },
    async updateVersionSs( state, payload ) {
        state.commit( 'updateVersionSs', payload )
    },
    async updateVersionMapCenter( state, payload ) {
        state.commit( 'updateVersionMapCenter', payload )
    },
    async updateVersionMapPolygon( state, payload ) {
        state.commit( 'updateVersionMapPolygon', payload )
    },
    async updateMa( { state } ) {
        try {
            let root = await this.$axios({
                method: 'put',
                url: `v1/managementareas/${state.ma.root.id}/`,
                data: {
                    parent: state.ma.root.parent
                }
            })
            let version = await this.$axios({
                method: 'put',
                url: `v1/managementareaversions/${state.ma.version.id}/`,
                data: {
                    date_established: state.ma.version.date_established,
                    reported_size: state.ma.version.reported_size,
                    governance_type: parseInt( state.ma.version.governance_type ),
                    recognition_level: state.ma.version.recognition_level,
                    stakeholder_groups: state.ma.version.stakeholder_groups,
                    support_sources: state.ma.version.support_sources,
                    point: state.ma.version.point,
                    polygon: state.ma.version.polygon
                }
            })
            let authority = await this.$axios({
                method: 'put',
                url: `v1/managementareaauthorities/${state.ma.authority.id}/`,
                data: {
                    name: state.ma.authority.name,
                    updated_on: moment().toISOString(),
                    //  !!!!!!!!
                    //  Add user
                    //  !!!!!!!!
                    updated_by: null
                }
            })

            /*
            let version = await this.$axios.$get( `managementareaversions/${state.ma.version.id}` )
            let pa = await this.$axios.$get( `protectedareas/${state.ma.pa.id}` )
            */

            let response = {
                root: root,
                version: version,
                authority: authority
            }
            console.log( response )

        } catch( error ) {
            console.log( error )
        }
    }
}
