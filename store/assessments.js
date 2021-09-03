import qs from 'qs'

let survey = ['stakeholder_harvest_rights', 'stakeholder_develop_rules', 'stakeholder_exclude_others', 'vulnerable_defined_rights', 'legislation_exists', 'rights_governance', 'exercise_rights', 'benefits_shared', 'stakeholder_agency', 'governance_accountable', 'timely_information', 'penalties_fair', 'penalties_frequency', 'multiple_knowledge_ecological', 'multiple_knowledge_social', 'conflict_resolution_access', 'management_levels_cohesive', 'supportive_networks', 'regulations_exist', 'management_capacity', 'boundary_known', 'boundary_defined', 'management_plan', 'outcomes_achieved_ecological', 'outcomes_achieved_social', 'multiple_knowledge_integrated', 'monitoring_used', 'sufficient_staff', 'staff_capacity', 'sufficient_budget', 'budget_secure', 'sufficient_equipment', 'climatechange_assessed', 'climatechange_incorporated', 'climatechange_managed', 'climatechange_monitored'];

let required_fields = {
    data: [
        'name',
        'year',
        'person_responsible_role',
        'count_manager',
        'count_personnel',
        'count_government',
        'count_committee',
        'count_community',
        'consent_given',
        'management_plan_file',
    ],
    managed_area: [
        'management_area_version_id'
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
    survey: survey,
    required_fields: required_fields,
    progress: progress
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
    },
    setProgress(state, payload) {
        state.progress = payload;
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
        console.log(id);
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

    async updateAssessmentProgress(state, id) {

        let progress = JSON.parse(JSON.stringify(state.state.progress));
        progress.overall_percentage = 0;

        //DATA
        const assessment = (await this.$axios.get('v1/assessments/' + id)).data;

        progress.data.filled = 0;
        for (let field of required_fields.data) {
            if (assessment[field]) progress.data.filled++;
        }

        progress.data.percentage = progress.data.filled / progress.data.required * 100;
        progress.data.percentage = progress.data.percentage < 100 ? progress.data.percentage : 100;
        progress.data.complete = progress.data.percentage === 100;
        progress.overall_percentage += 25 * progress.data.percentage / 100;


        //MANAGED AREA
        progress.managed_area.filled = 0;
        for (let field of required_fields.managed_area) {
            if (assessment[field]) progress.managed_area.filled++;
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

        console.log(state.state.progress);
    }
}
