import qs from 'qs'

export const state = () => ({
    list: [],
    pagination: {
        count: 0,
        next: null,
        prev: null
    },
    assessment: {},
    edit: {
        data: true,
        ma: false,
        survey: false,
        collaborators: false,
        publish: false,
        percent: 0
    },
    survey: ['stakeholder_harvest_rights', 'stakeholder_develop_rules', 'stakeholder_exclude_others', 'vulnerable_defined_rights', 'legislation_exists', 'rights_governance', 'exercise_rights', 'benefits_shared', 'stakeholder_agency', 'governance_accountable', 'timely_information', 'penalties_fair', 'penalties_frequency', 'multiple_knowledge_ecological', 'multiple_knowledge_social', 'conflict_resolution_access', 'management_levels_cohesive', 'supportive_networks', 'regulations_exist', 'management_capacity', 'boundary_known', 'boundary_defined', 'management_plan', 'outcomes_achieved_ecological', 'outcomes_achieved_social', 'multiple_knowledge_integrated', 'monitoring_used', 'sufficient_staff', 'staff_capacity', 'sufficient_budget', 'budget_secure', 'sufficient_equipment', 'climatechange_assessed', 'climatechange_incorporated', 'climatechange_managed', 'climatechange_monitored']
})

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
    }
}
