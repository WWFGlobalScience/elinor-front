import qs from 'qs'

let survey = ['stakeholder_harvest_rights','stakeholder_develop_rules','stakeholder_exclude_others','legislation_exists','exercise_rights','stakeholder_agency','vulnerable_defined_rights','benefits_shared','supportive_networks','climatechange_incorporated','governance_accountable','timely_information','conflict_resolution_access','penalties_frequency','penalties_fair','ecological_monitoring_used','social_monitoring_used','climatechange_monitored','multiple_knowledge_social','multiple_knowledge_integrated','climatechange_managed','rights_governance','management_levels_cohesive','regulations_exist','management_plan','boundary_known','boundary_defined','outcomes_achieved_ecological','outcomes_achieved_social','management_capacity','sufficient_staff','staff_capacity','sufficient_budget','budget_secure','sufficient_equipment'];

let required_fields = {
    data: [
        'name',
        'year',
        'person_responsible_role',
        'count_community',
        'count_academic',
        'count_government',
        'count_private',
        'count_indigenous',
        'consent_given',
        'organization',
        //'management_plan_file',
    ],
    managed_area: [
        'countries',
        'date_established',
        'governance_type',
        'management_authority',
        'name',
        //'polygon',
        'protected_area',
        'recognition_level',
        'regions',
        'reported_size',
        'stakeholder_groups',
        'support_sources'
    ],
    survey: survey
};

let progress = {
    data: {
        complete: false,
        percentage: 0,
        filled: 0,
        required: required_fields.data.length
    },
    managed_area: {
        complete: false,
        percentage: 0,
        filled: 0,
        required: required_fields.managed_area.length
    },
    survey: {
        complete: false,
        percentage: 0,
        filled: 0,
        required: required_fields.survey.length
    },
    collaborators: {
        complete: false,
        percentage: 0,
        filled: 0,
        required: 1
    },
    published: false,
    overall_percentage: 0
};

export const state = () => ({
    list: [],
    search: null,
    listType: 'own',
    filters: {management_area_countries: null, status: null, year: null},
    pagination: {
        count: 0,
        next: null,
        prev: null
    },
    assessment: {last_edit: null},
    edit: {
        data: true,
        ma: false,
        survey: false,
        collaborators: false,
        publish: false,
        percent: 0
    },
    survey: survey,
    required_fields: required_fields,
    progress: progress
})

export const getters = {
    getPercentage: (state) => {
        const percentage = {
            data: 0,
            survey: 0
        };

        const sections = [
            {
                name: 'data',
                fields: [
                    'name',
                    'status',
                    'data_policy',
                    'person_responsible_role',
                    'year',
                    'count_community',
                    'count_academic',
                    'count_government',
                    'count_private',
                    'count_indigenous',
                    'consent_given',
                    'management_plan_file',
                    'organization_id'
                ]
            },
            {
                name: 'survey',
                fields: [
                    'stakeholder_harvest_rights',
                    'stakeholder_harvest_rights_text',
                    'stakeholder_develop_rules',
                    'stakeholder_develop_rules_text',
                    'stakeholder_exclude_others',
                    'stakeholder_exclude_others_text',
                    'legislation_exists',
                    'legislation_exists_text',
                    'exercise_rights',
                    'exercise_rights_text',
                    'stakeholder_agency',
                    'stakeholder_agency_text',
                    'vulnerable_defined_rights',
                    'vulnerable_defined_rights_text',
                    'benefits_shared',
                    'benefits_shared_text',
                    'supportive_networks',
                    'supportive_networks_text',
                    'climatechange_incorporated',
                    'climatechange_incorporated_text',
                    'governance_accountable',
                    'governance_accountable_text',
                    'timely_information',
                    'timely_information_text',
                    'conflict_resolution_access',
                    'conflict_resolution_access_text',
                    'penalties_frequency',
                    'penalties_frequency_text',
                    'penalties_fair',
                    'penalties_fair_text',
                    'ecological_monitoring_used',
                    'ecological_monitoring_used_text',
                    'social_monitoring_used',
                    'social_monitoring_used_text',
                    'climatechange_monitored',
                    'climatechange_monitored_text',
                    'multiple_knowledge_social',
                    'multiple_knowledge_social_text',
                    'multiple_knowledge_integrated',
                    'multiple_knowledge_integrated_text',
                    'climatechange_managed',
                    'climatechange_managed_text',
                    'rights_governance',
                    'rights_governance_text',
                    'management_levels_cohesive',
                    'management_levels_cohesive_text',
                    'regulations_exist',
                    'regulations_exist_text',
                    'management_plan',
                    'management_plan_text',
                    'boundary_known',
                    'boundary_known_text',
                    'boundary_defined',
                    'boundary_defined_text',
                    'outcomes_achieved_ecological',
                    'outcomes_achieved_ecological_text',
                    'outcomes_achieved_social',
                    'outcomes_achieved_social_text',
                    'management_capacity',
                    'management_capacity_text',
                    'sufficient_staff',
                    'sufficient_staff_text',
                    'staff_capacity',
                    'staff_capacity_text',
                    'sufficient_budget',
                    'sufficient_budget_text',
                    'budget_secure',
                    'budget_secure_text',
                    'sufficient_equipment',
                    'sufficient_equipment_text'

                ]
            }
        ];

        const assessment = state.assessment;

        for(const section of sections) {
            let completed = 0;
            for(const field of section.fields) {
                if(assessment[field] !== null && assessment[field] !== undefined) {
                    completed++;
                }
            }
            percentage[section.name] = completed / section.fields.length;
        }

        return percentage;
    }
}

export const mutations = {
    setAssessments(state, payload) {
        state.list = payload.results
        state.pagination.count = payload.count
        state.pagination.next = payload.next
        state.pagination.prev = payload.prev
    },
    setAssessment(state, payload) {
        state.assessment = payload
    },
    setAssessmentField(state, payload) {
        const {field, value} = payload;
        state.assessment[field] = value;
    },
    setLastEdit(state) {
        state.assessment.last_edit = this.$moment();
    },
    setProgress(state, payload) {
        state.progress = payload;
    },
    addCollaborator(state, payload) {
        state.assessment.collaborators.push(payload)
    },
    removeCollaborator(state, payload) {
        state.assessment.collaborators = state.assessment.collaborators.filter(collaborator => collaborator.id !== payload);
    },
    updateCollaborator(state, payload) {
        const {id, role} = payload;
        state.assessment.collaborators = state.assessment.collaborators.map((collaborator) => {
            if(collaborator.id === id) {
                collaborator.role = role;
            }
            return collaborator;
        });
    },
    setSearch(state, payload) {
        state.search = payload;
    },
    addFilter(state, {name, value}) {
        state.filters[name] = value;
    },
    removeFilter(state, payload) {
        state.filters[payload] = undefined;
    },
    resetFilters(state) {
        state.filters = {management_area_countries: null, status: null, year: null};
    },
    setListType(state, value) {
        state.listType = value;
    },
}

export const actions = {
    async fetchAssessments(state) {
        let params = {};

        if(state.state.search) {
            params.search = state.state.search;
        }

        params = {...params, ...state.state.filters};
        if(this.$auth.loggedIn && state.state.listType === 'own') {
            params.collaborators = this.$auth.user.id;
        }
        const notHasParams = Object.keys(params).length === 0

        if(notHasParams) {
            this.dispatch('loader/loaderState', {
                active: true,
                text: 'Getting assessments...'
            })
        }

        this.$axios.get('v1/assessments/', {params})
        .then((response) => {
            state.commit('setAssessments', response.data)
        })
        .finally(() => {
            if(notHasParams) {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: ''
                })
            }
        })
    },
    async fetchAssessment(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting assessment data...'
        })

        this.$axios({
            method: 'get',
            url: `v1/assessments/${id}/`,
        })
            .then((response) => {
                const assessment = response.data;
                if(assessment.management_area) {
                    state.dispatch('managementareas/fetchManagementArea', assessment.management_area, { root: true })
                }
                state.commit('setAssessment', assessment)
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: ''
                })
            })
    },
    async createAssessment(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating assessment...'
        })
        this.$axios({
            method: 'post',
            url: 'v1/assessments/',
            data: qs.stringify(this.$formDataStringify(form))
        })
        .then((response) => {
            this.dispatch('popup/popupState', {active: false, component: '', title: ''})
            this.$router.push(`/assessments/edit/${response.data.id}/assessment-data/`)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            this.dispatch('loader/loaderState', {
                active: false,
                text: ''
            })
        })
    },
    async editAssessment(state, {form, id}) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Saving assessment data...'
        })
        this.$axios({
            method: 'patch',
            url: `/v1/assessments/${id}/`,
            data: qs.stringify(this.$formDataStringify(form))
        })
        .then((response) => {
            state.commit('setAssessment', response.data);
            state.commit('setLastEdit');
            state.dispatch('updateAssessmentProgress', id);
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            this.dispatch('loader/loaderState', {
                active: false,
                text: ''
            })
        })
    },

    async editAssessmentField(state, {field, value, id}) {
        this.$axios({
            method: 'patch',
            url: `/v1/assessments/${id}/`,
            data: {
                [field]: value && value.id || value
            }
        })
        .then((response) => {
            state.commit('setAssessmentField', {field, value})
            state.commit('setLastEdit');
            state.dispatch('updateAssessmentProgress', id);
        })
        .catch((error) => {
            console.log(error)
        })
    },

    async updateAssessmentProgress(state, id) {

        let progress = JSON.parse(JSON.stringify(state.state.progress));
        progress.overall_percentage = 0;

        //DATA
        const assessment = (await this.$axios.get('v1/assessments/' + id + '/')).data;
        const managementArea = assessment.management_area ? (await this.$axios.get('v1/managementareas/' + assessment.management_area)).data : {};

        progress.data.filled = 0;
        for (let field of required_fields.data) {
            if (assessment[field] !== null) progress.data.filled++;
        }

        progress.data.percentage = progress.data.filled / progress.data.required * 100;
        progress.data.percentage = progress.data.percentage < 100 ? progress.data.percentage : 100;
        progress.data.complete = progress.data.percentage === 100;
        progress.overall_percentage += 25 * progress.data.percentage / 100;


        //MANAGED AREA
        progress.managed_area.filled = 0;
        for (let field of required_fields.managed_area) {
            if (managementArea[field]) progress.managed_area.filled++;
            else console.log(field);
        }

        progress.managed_area.percentage = progress.managed_area.filled / progress.managed_area.required * 100;
        progress.managed_area.percentage = progress.managed_area.percentage < 100 ? progress.managed_area.percentage : 100;
        progress.managed_area.complete = progress.managed_area.percentage === 100;
        progress.overall_percentage += 25 * progress.managed_area.percentage / 100;


        //SURVEY
        progress.survey.filled = 0;
        for (let field of required_fields.survey) {
            if (assessment[field]) progress.survey.filled++;
        }

        progress.survey.percentage = progress.survey.filled / progress.survey.required * 100;
        progress.survey.percentage = progress.survey.percentage < 100 ? progress.survey.percentage : 100;
        progress.survey.complete = progress.survey.percentage === 100;
        progress.overall_percentage += 25 * progress.survey.percentage / 100;


        //COLLABORATORS
        const collaborators = await this.$axios.get('v1/collaborators/?assessment=' + id);
        progress.collaborators.filled = collaborators.data.count;
        progress.collaborators.percentage = progress.collaborators.filled / progress.collaborators.required * 100;
        progress.collaborators.percentage = progress.collaborators.percentage < 100 ? progress.collaborators.percentage : 100;
        progress.collaborators.complete = progress.collaborators.percentage === 100;
        progress.overall_percentage += 25 * progress.collaborators.percentage / 100;

        state.commit('setProgress', progress)
    },
    async editAssessmentFileField(state, {field, file, id}) {
        let formData = new FormData()
        formData.append(field, file,file.name)
        try {
            const response = await this.$axios({
                method: 'patch',
                url: `/v1/assessments/${id}/`,
                data:  formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
            await state.commit('setAssessmentField', {field, value: response.data[field]})
            state.commit('setLastEdit');
        } catch (e) {
            console.log(e);
        }
    },

    async publish(state, {id, status}) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Publishing assessment...'
        })
        this.$axios({
            method: 'patch',
            url: `/v1/assessments/${id}/`,
            data: {status}
        })
            .then((response) => {
                state.commit('setAssessmentField', {field: 'status', value: status})
                state.commit('setLastEdit');
                this.dispatch('popup/popupState', {active: false})
                this.$router.push('/assessments')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: ''
                })
            })
    },
    reset(state) {
        state.dispatch('fetchAssessments');
    },
    filter(state, {name, value}) {
        state.commit('addFilter', {name, value})
        state.dispatch('fetchAssessments');
    },
    removeFilter(state, filterName) {
        state.commit('addFilter', filterName)
        state.dispatch('fetchAssessments');
    },
    search(state, search) {
        state.commit('setSearch', search)
        state.dispatch('fetchAssessments');
    },
    resetFilters(state) {
        state.commit('resetFilters')
        state.dispatch('popup/popupState', {active: false}, {root: true})
        state.dispatch('fetchAssessments');
    },
    filterAssessmentsBy(state, type) {
        state.commit('setListType', type);
        state.dispatch('fetchAssessments');
    }
}
