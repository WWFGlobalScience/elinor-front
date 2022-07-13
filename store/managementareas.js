import moment from 'moment'

export const state = () => ({
    list: [],
    instance: {},
    authorities: [],
    zones: [],
    importFileError: null,
    editWdpaId: null,
    editWdpaIdError: null,
})
const protectedPlanet = {
    baseUrl: 'https://api.protectedplanet.net',
    token: '76a1742fcede55c1ad277edd9a19c65b'
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
        state.instance = payload;
        if(!state.instance.zones) {
            state.instance.zones = [];
        }
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
    },
    setImportFileError(state, error) {
        state.importFileError = error;
    },
    resetImportFileError(state) {
        state.importFileError = null;
    },
    setEditWdpaId(state, value) {
        state.editWdpaId = value;
    },
    setEditWdpaIdError(state, error) {
        state.editWdpaIdError = error;
    },
    addAuthorityToList(state, authority) {
        state.authorities.push(authority);
    },
    addEmptyZone(state) {
        state.zones.push({name: null, access_level: null, description: null});
    },
    deleteZone(state, zoneId) {
        state.zones = state.zones.filter(zone => zone.id !== zoneId);
    },
    deleteAllZones(state) {
        state.zones = [];
    }
}

export const actions = {
    async fetchManagementAreas(state, search) {
        const response = await this.$axios.$get(`v2/managementareas/?search=${search}`)
        const managementAreas = mapCollectionToForm(state, response.results);
        state.commit('setList', managementAreas)
    },
    async fetchManagementArea(state, id) {
        const response = await this.$axios.$get(`v2/managementareas/${id}/`)
        const managementArea = mapToForm(state, response)
        state.commit('setInstance', managementArea)
        await state.dispatch('fetchZones', id);
    },
    async createManagementArea(state, {form, assessmentId}) {
        let response = await this.$axios.$post(`v2/managementareas/`, mapToForeignKeys(form))
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
            url: `/v2/managementareas/${id}/`,
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
    async editManagementAreaFileField(state, {field, file, onUploadProgress, id}) {
        const responseField = field === 'import_file' ? 'polygon' : 'map_image';
        let formData = new FormData()
        formData.append(field, file,file.name)
        const config = { onUploadProgress, headers: {'Content-Type': 'multipart/form-data'}};
        try {
            const response = await this.$axios.$patch(`/v2/managementareas/${id}/`, formData, config);
            await state.commit('setInstanceField', {field: responseField, value: response[responseField]})
            state.commit('assessments/setLastEdit', {}, {root: true});
        } catch (error) {
            state.commit('setImportFileError', error.response.data);
        }
    },
    async fetchZones(state, id) {
        let response = await this.$axios.$get(`v2/managementareazones/?management_area=` + id);
        state.commit('setZones', response.results)
    },
    async createZone(state, {form, managementAreaId}) {
        form.management_area = managementAreaId;
        let response = await this.$axios.$post(`v2/managementareazones/`, form)
        state.commit('addZone', response.data);
    },
    async updateZone(state, {form, id}) {
        let response = await this.$axios.$patch(`v2/managementareazones/${id}/`, form)
        state.commit('updateZone', response.data);
    },
    async fetchAuthorities(state, search) {
        let response = await this.$axios.$get(`v2/managementauthorities/?search=` + search)
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
            url: `/v2/managementareas/${state.state.instance.id}/`,
            data: {polygon}
        });
        state.commit('setPolygon', polygon)
    },
    async removePolygon(state) {
        const response = await this.$axios({
            method: 'patch',
            url: `/v2/managementareas/${state.state.instance.id}/`,
            data: {polygon: null}
        });
        state.commit('removePolygon')
    },
    async editZoneField(state, {field, index, value}) {
        const zone = {...state.state.zones[index]};
        zone[field] = value;
        if(zone && zone.id) {
            await this.$axios({
                method: 'patch',
                url: `/v2/managementareazones/${zone.id}/`,
                data: {[field]: value}
            });
        } else {
            if(zone && zone.name && zone.access_level && zone.description) {
                const data = {...zone, management_area: state.state.instance.id}
                const response = await this.$axios({
                    method: 'post',
                    url: `/v2/managementareazones/`,
                    data
                });
                state.commit('setZoneField', {field: 'id', index, value: response.data.id})

            }
        }
        state.commit('setZoneField', {field, index, value})
    },
    async resetImportFileError(state) {
        state.commit('resetImportFileError');
    },
    async setRegion(state, result) {
        const name = result.text;
        const regionsResponse = await this.$axios({
            method: 'get',
            url: `/v2/regions/?search=${name}`
        });

        const region = regionsResponse.data.results[0];
        let regionIdToAssociate;
        if(!region) {
            const country = result.context[0].short_code;
            const createdRegionResponse = await this.$axios({
                method: 'post',
                url: `/v2/regions/`,
                data: {name, country: country.toUpperCase()}
            });
            const createdRegion = createdRegionResponse.data;
            regionIdToAssociate = createdRegion.id;
        } else {
            regionIdToAssociate = region.id;
        }

        const regions = state.state.instance.regions.map(region => region.id);
        if(regions.indexOf(regionIdToAssociate) === -1) {
            regions.push(regionIdToAssociate);
            const response = await this.$axios({
                method: 'patch',
                url: `/v2/managementareas/${state.state.instance.id}/`,
                data: {regions}
            });
            state.commit('setInstanceField', {field: 'regions', value: response.data.regions})
        }
    },
    async removeRegion(state, regionId) {
        const regions = state.state.instance.regions.filter(region => region.id !== regionId).map(region => region.id);
        const response = await this.$axios({
            method: 'patch',
            url: `/v2/managementareas/${state.state.instance.id}/`,
            data: {regions}
        });

        state.commit('setInstanceField', {field: 'regions', value: response.data.regions})
    },
    async clearProtectedArea(state) {
        await this.$axios({
            method: 'patch',
            url: `/v2/managementareas/${state.state.instance.id}/`,
            data: {protected_area: null}
        });
        state.commit('setEditWdpaId', true);
    },
    async protectedAreaByWdpaId(state, {wdpaId, managementAreaId, assessmentId}) {
        try {
            const protectedPlanetResponse = await this.$axios({
                method: 'get',
                url: `${protectedPlanet.baseUrl}/v3/protected_areas/${wdpaId}?token=${protectedPlanet.token}`
            });

            const findProtectedAreaResponse = await this.$axios({
                method: 'get',
                url: `/v2/protectedareas?name=${protectedPlanetResponse.data.protected_area.name}`
            });
            let protectedArea;
            if(findProtectedAreaResponse.data.results.length === 0) {
                const createProtectedAreaResponse = await this.$axios({
                    method: 'post',
                    url: `/v2/protectedareas/`,
                    data: {
                        name: protectedPlanetResponse.data.protected_area.name,
                        wdpa_id: wdpaId
                    }
                });

                protectedArea = createProtectedAreaResponse.data;
            } else {
                protectedArea = findProtectedAreaResponse.data.results[0];
            }

            state.commit('setEditWdpaId', false);
            state.commit('setEditWdpaIdError', null);
            state.dispatch('editManagementAreaField', {field: 'protected_area', value: protectedArea, id: managementAreaId, assessmentId })

        } catch(e) {
            state.commit('setEditWdpaIdError', e.response.data);
            state.commit('setEditWdpaId', true);
        }
    },
    async createAuthority(state, name) {
        const response = await this.$axios({
            method: 'post',
            url: 'v2/managementauthorities/',
            data: { name }
        })
        const authority = response.data;
        state.commit('addAuthorityToList', authority);
        return authority;
    },
    async deleteZone(state, zoneId) {
        await this.$axios({
            method: 'delete',
            url: `/v2/managementareazones/${zoneId}/`
        });
        state.commit('deleteZone', zoneId)
    },
    async deleteAllZones(state) {
        state.state.zones.forEach(zone => {
            if(zone.id) {
                this.$axios({
                    method: 'delete',
                    url: `/v2/managementareazones/${zone.id}/`
                });
            }
        });
        state.commit('deleteAllZones')
    },

}
