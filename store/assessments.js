import qs from 'qs'

export const state = () => ({
    list: [],
    pagination: {
        count: 0,
        next: null,
        prev: null
    },
    assessment: {},
    survey: ['stakeholder_harvest_rights', 'stakeholder_develop_rules', 'stakeholder_exclude_others', 'vulnerable_defined_rights', 'legislation_exists', 'rights_governance', 'exercise_rights', 'benefits_shared', 'stakeholder_agency', 'governance_accountable', 'timely_information', 'penalties_fair', 'penalties_frequency', 'multiple_knowledge_ecological', 'multiple_knowledge_social', 'conflict_resolution_access', 'management_levels_cohesive', 'supportive_networks', 'regulations_exist', 'management_capacity', 'boundary_known', 'boundary_defined', 'management_plan', 'outcomes_achieved_ecological', 'outcomes_achieved_social', 'multiple_knowledge_integrated', 'monitoring_used', 'sufficient_staff', 'staff_capacity', 'sufficient_budget', 'budget_secure', 'sufficient_equipment', 'climatechange_assessed', 'climatechange_incorporated', 'climatechange_managed', 'climatechange_monitored']
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
                    'count_manager',
                    'count_personnel',
                    'count_government',
                    'count_committee',
                    'count_community',
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
                    'vulnerable_defined_rights',
                    'vulnerable_defined_rights_text',
                    'legislation_exists',
                    'legislation_exists_text',
                    'rights_governance',
                    'rights_governance_text',
                    'exercise_rights',
                    'exercise_rights_text',
                    'benefits_shared',
                    'benefits_shared_text',
                    'stakeholder_agency',
                    'stakeholder_agency_text',
                    'governance_accountable',
                    'governance_accountable_text',
                    'timely_information',
                    'timely_information_text',
                    'penalties_fair',
                    'penalties_fair_text',
                    'penalties_frequency',
                    'penalties_frequency_text',
                    'multiple_knowledge_ecological',
                    'multiple_knowledge_ecological_text',
                    'multiple_knowledge_social',
                    'multiple_knowledge_social_text',
                    'conflict_resolution_access',
                    'conflict_resolution_access_text',
                    'management_levels_cohesive',
                    'management_levels_cohesive_text',
                    'supportive_networks',
                    'supportive_networks_text',
                    'regulations_exist',
                    'regulations_exist_text',
                    'management_capacity',
                    'management_capacity_text',
                    'boundary_known',
                    'boundary_known_text',
                    'boundary_defined',
                    'boundary_defined_text',
                    'management_plan',
                    'management_plan_text',
                    'outcomes_achieved_ecological',
                    'outcomes_achieved_ecological_text',
                    'outcomes_achieved_social',
                    'outcomes_achieved_social_text',
                    'multiple_knowledge_integrated',
                    'multiple_knowledge_integrated_text',
                    'monitoring_used',
                    'monitoring_used_text',
                    'sufficient_staff',
                    'sufficient_staff_text',
                    'staff_capacity',
                    'staff_capacity_text',
                    'sufficient_budget',
                    'sufficient_budget_text',
                    'budget_secure',
                    'budget_secure_text',
                    'sufficient_equipment',
                    'sufficient_equipment_text',
                    'climatechange_assessed',
                    'climatechange_assessed_text',
                    'climatechange_incorporated',
                    'climatechange_incorporated_text',
                    'climatechange_managed',
                    'climatechange_managed_text',
                    'climatechange_monitored',
                    'climatechange_monitored_text'
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
    }
}

export const actions = {
    async fetchAssessments(state) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting assessments...'
        })

        this.$axios({
            method: 'get',
            url: 'v1/assessments/',
        })
            .then((response) => {
                state.commit('setAssessments', response.data)
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: ''
                })
            })
    },
    async fetchAssessment(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting assessment data...'
        })

        this.$axios({
            method: 'get',
            url: `v1/assessments/${id}`,
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
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Saving assessment data...'
        })
        this.$axios({
            method: 'patch',
            url: `/v1/assessments/${id}/`,
            data: {
                [field]: value
            }
        })
            .then((response) => {
                state.commit('setAssessmentField', {field, value})
                state.commit('setLastEdit');
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
    }
}
