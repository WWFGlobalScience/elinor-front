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


const mapToForeignKeys = (form) => {
    const data = {...form};
    const fields = ['protected_area', 'governance_type', 'management_authority', 'regions',
        'stakeholder_groups', 'support_sources', 'containedby'];

    fields.forEach((field) => {
        if(Array.isArray(data[field])) {
            data[field] = data[field].map(value => value.id);
        } else {
            data[field] = data[field] && data[field].id;
        }
    });

    return data;
}

const mapToForm = (state, data) => {
    return {
        ...data,
        countries: data.countries && data.countries.map(country => {
            return {
                code: country,
                name: state.rootState.countries.list.filter(c => c.code === country)[0].name
            }
        }),
        recognition_level: data.recognition_level || []
    };
}

const mapCollectionToForm = (state, collection) => {
    return collection.map((item) => mapToForm(state, item));
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
    setPolygon(state, polygon) {
        state.instance.polygon = polygon
    },
    removePolygon(state) {
        state.instance.polygon = null
    },
    setZoneField(state, {field, index, value}) {
        if(state.zones[index] === undefined) {
            state.zones[index] = {};
        }
        state.zones[index][field] = value
    }
}

export const actions = {
    async fetchManagementAreas(state, search) {
        const response = await this.$axios.$get(`v1/managementareas/?search=${search}`)
        const managementAreas = mapCollectionToForm(state, response.results);
        state.commit('setList', managementAreas)
    },
    async fetchManagementArea(state, id) {
        console.log(id);
        const response = await this.$axios.$get(`v1/managementareas/${id}/`)
        const managementArea = mapToForm(state, response)
        state.commit('setInstance', managementArea)
        await state.dispatch('fetchZones', id);
    },
    async createManagementArea(state, {form, assessmentId}) {
        let response = await this.$axios.$post(`v1/managementareas/`, mapToForeignKeys(form))
        state.dispatch('assessments/editAssessmentField', {
            field: 'management_area',
            value: response.id,
            id: assessmentId
        }, {root: true})
        state.commit('setInstance', response)
    },
    async editManagementAreaField(state, {field, value, id, assessmentId}) {
        const data = mapToForeignKeys({[field]: value});
        let response = await this.$axios({
            method: 'patch',
            url: `/v1/managementareas/${id}/`,
            data: {
                [field]: data[field]
            }
        });
        if(field === 'countries') {
            value = value.map(country => {
                return {
                    code: country,
                    name: state.rootState.countries.list.filter(c => c.code === country)[0].name
                }
            })
        }
        state.commit('setInstanceField', {field, value})
        state.commit('assessments/setLastEdit', {}, {root: true});
        state.dispatch('assessments/updateAssessmentProgress', assessmentId, {root: true});
    },
    async editManagementAreaFileField(state, {field, file, id}) {
        let formData = new FormData()
        formData.append(field, file,file.name)
        this.$axios({
            method: 'patch',
            url: `/v1/managementareas/${id}/`,
            data:  formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                state.commit('setManagementAreaField', {field, value: response.filename})
                state.commit('assessments/setLastEdit', {}, {root: true});
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async fetchZones(state, id) {
        let response = await this.$axios.$get(`v1/managementareazones/?management_area=` + id);
        state.commit('setZones', response.results)
    },
    async createZone(state, {form, managementAreaId}) {
        form.management_area = managementAreaId;
        let response = await this.$axios.$post(`v1/managementareazones/`, form)
        state.commit('addZone', response.data);
    },
    async updateZone(state, {form, id}) {
        let response = await this.$axios.$patch(`v1/managementareazones/${id}`, form)
        state.commit('updateZone', response.data);
    },
    async fetchAuthorities(state) {
        let response = await this.$axios.$get(`v1/managementauthorities/`)
        state.commit('setAuthorities', response.results)
    },
    async onManagementAreaNew(state, assessment) {
        const form = {name: assessment.name + ' managed area', countries: []};
        state.dispatch('createManagementArea', {form, assessmentId: assessment.id})
    },
    async onManagementAreaSelected(state, {managementArea, assessmentId}) {
        const form = {...managementArea, import_file: null, parent: managementArea.id};
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
    },
    async editZoneField(state, {field, index, value}) {
        const zone = state.state.zones[index];
        if(zone && zone.id) {
            const response = await this.$axios({
                method: 'patch',
                url: `/v1/managementareazones/${zone.id}/`,
                data: {[field]: value}
            });

            state.commit('setZoneField', {field: 'id', index, value: response.data.id})

        } else {
            if(zone && zone.name && zone.access_level) {
                const data = {...zone, management_area: state.state.instance.id}
                await this.$axios({
                    method: 'post',
                    url: `/v1/managementareazones/`,
                    data
                });
            }
        }
        state.commit('setZoneField', {field, index, value})
    }
}
