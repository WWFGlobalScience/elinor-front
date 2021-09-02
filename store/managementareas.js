import moment from 'moment'

export const state = () => ({
    list: [],
    instance: {},
    authorities: [],
    zones: [],
})

export const getters = {
    getPercentage: (state) => {
        const managementArea = state.instance;
        let completed = 0;

        const fields = [
            'name',
            'date_established',
            'recognition_level',
            'countries',
            'polygon',
            'reported_size',
            'point',
            'import_file',
            'map_image',
            'geospatial_sources',
            'governance_type_id',
            'management_authority_id',
            'protected_area_id'
        ];

        for (const field of fields) {
            if (managementArea[field] !== null && managementArea[field] !== undefined) {
                completed++;
            }
        }

        const relations = ['supportsources', 'stakeholdergroups', 'regions']

        for (const relation of relations) {
            if (managementArea[relation] && managementArea[relation].length > 1) {
                completed++;
            }
        }

        return completed / (fields.length + relations.length);
        ;
    }
}

export const mutations = {
    setList(state, payload) {
        state.list = payload
    },
    setInstance(state, payload) {
        state.instance = payload
    },
    setAuthorities(state, payload) {
        state.authorities = payload
    },
    setZones(state, payload) {
        state.zones = payload
    },
    setDateEstablishment(state, payload) {
        state.instance.date_establishment = payload
    },
    setInstanceField(state, payload) {
        const {field, value} = payload;
        state.instance[field] = value;
    },
    setInstanceLastEdit(state) {
        state.instance.last_edit = this.$moment();
    },
    setPolygon(state, polygon) {
        state.instance.polygon = polygon
    },
    removePolygon(state) {
        state.instance.polygon = null
    }
}

export const actions = {
    async fetchManagementAreas(state, search) {
        const response = await this.$axios.$get(`v1/managementareas/?search=${search}`)
        state.commit('setList', response.results)
    },
    async fetchManagementArea(state, id) {
        const response = await this.$axios.$get(`v1/managementareas/${id}/`)
        state.commit('setInstance', response)
    },
    async createManagementArea(state, {form, assessmentId}) {
        let response = await this.$axios.$post(`v1/managementareas/`, form)
        state.dispatch('assessments/editAssessmentField', {
            field: 'management_area',
            value: response.id,
            id: assessmentId
        }, {root: true})
        state.commit('setInstance', response)
    },
    async editManagementAreaField(state, {field, value, id}) {
        let response = await this.$axios({
            method: 'patch',
            url: `/v1/managementareas/${id}/`,
            data: {
                [field]: value
            }
        });

        state.commit('setInstanceField', {field, value})
        state.commit('setInstanceLastEdit');
    },
    async fetchZones(state) {
        let response = await this.$axios.$get(`v1/managementareazones/`)
        state.commit('setAuthorities', response.results)
    },
    async fetchAuthorities(state) {
        let response = await this.$axios.$get(`v1/managementareaauthorities/`)
        state.commit('setAuthorities', response.results)
    },
    async onManagementAreaNew(state, assessment) {
        const form = {name: assessment.name + ' managed area', countries: []};
        state.dispatch('createManagementArea', {form, assessmentId: assessment.id})
    },
    async onManagementAreaSelected(state, {managementArea, assessmentId}) {
        const form = {...managementArea, parent: managementArea.id};
        delete form.id;
        state.dispatch('createManagementArea', {form, assessmentId})
    },
    async onDateEstablishmentSelected(state, date) {
        state.commit('setDateEstablishment', date)
    },
    async setPolygon(state, polygon) {
        const response = await this.$axios({
            method: 'patch',
            url: `/v1/managementareas/${state.state.instance.id}/`,
            data: {polygon}
        });
        state.commit('setPolygon', polygon)
    },
    async removePolygon(state) {
        const response = await this.$axios({
            method: 'patch',
            url: `/v1/managementareas/${state.state.instance.id}/`,
            data: {polygon: null}
        });
        state.commit('removePolygon')
    }
}
