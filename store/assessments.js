import qs from 'qs'
import {required_fields, initProgress, calculateProgress} from "~/config/assessment-progress";

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
    assessment: {last_edit: null, surveyAnswers: [], collaborators: []},
    edit: {
        data: true,
        ma: false,
        survey: false,
        collaborators: false,
        publish: false,
        percent: 0
    },
    required_fields,
    progress: initProgress()
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
    },
    addCollaborator(state, payload) {
        const collaborators = [...state.assessment.collaborators, payload];
        state.assessment = {...state.assessment, collaborators};
        state.progress = calculateProgress(state.assessment);
    },
    removeCollaborator(state, payload) {
        const collaborators = [...state.assessment.collaborators.filter(collaborator => collaborator.id !== payload)]
        state.assessment = {...state.assessment, collaborators}
        state.progress = calculateProgress(state.assessment);
    },
    updateCollaborator(state, payload) {
        const {id, role} = payload;
        const collaborators = [...state.assessment.collaborators.map((collaborator) => {
            if(collaborator.id === id) {
                collaborator.role = role;
            }
            return collaborator;
        })]
        state.assessment = {...state.assessment, collaborators};
        state.progress = calculateProgress(state.assessment);
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
    setSurveyAnswers(state, answers) {
        state.assessment.surveyAnswers = answers;
    },
    setAttributes(state, attributes) {
        state.assessment.attributes = attributes;
    },
    addSurveyAnswer(state, {answer, percent_complete}) {
        const surveyAnswers = [answer, ...state.assessment.surveyAnswers];
        state.assessment = {...state.assessment, surveyAnswers, percent_complete};
        state.progress = calculateProgress(state.assessment);
    },
    updateSurveyAnswer(state, answer) {
        const filtered = state.assessment.surveyAnswers.filter(surveyAnswer => surveyAnswer.id !== answer.id);
        const surveyAnswers = [answer, ...filtered];
        state.assessment = {...state.assessment, surveyAnswers} ;
        state.progress = calculateProgress(state.assessment);
    },
    setManagementArea(state, managementArea) {
        console.log(managementArea);
        state.assessment = {...state.assessment, management_area_countries: managementArea};
    }
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

        this.$axios.get('v2/assessments/', {params})
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

        try {
            const assessmentResponse = await this.$axios({
                method: 'get',
                url: `v2/assessments/${id}/`,
            });

            const assessment = assessmentResponse.data;
            if(assessment.management_area) {
                state.dispatch('managementareas/fetchManagementArea', assessment.management_area, { root: true })
            }
            state.commit('setAssessment', assessment);
            state.commit('setProgress', calculateProgress(assessment));

            const surveyAnswersResponse = await this.$axios({
                method: 'get',
                url: `v2/surveyanswerlikerts/?assessment=${id}`,
            });
            state.commit('setSurveyAnswers', surveyAnswersResponse.data.results);
        } finally {
            this.dispatch('loader/loaderState', {
                active: false,
                text: ''
            })
        }
    },

    async createAssessment(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating assessment...'
        })
        this.$axios({
            method: 'post',
            url: 'v2/assessments/',
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
            url: `/v2/assessments/${id}/`,
            data: qs.stringify(this.$formDataStringify(form))
        })
        .then((response) => {
            state.commit('setAssessment', response.data);
            state.commit('setLastEdit');
            state.commit('setProgress', calculateProgress(response.data));
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
        const response = await this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: {
                [field]: value && value.id || value
            }
        });
        await state.commit('setAssessmentField', {field, value})
        state.commit('setLastEdit');
        state.commit('setProgress', calculateProgress(response.data));
    },

    async updateAssessmentProgress(state) {
        const assessment = state.state.assessment;
        const progress = calculateProgress(assessment);
        state.commit('setProgress', progress)
    },

    async editAssessmentFileField(state, {field, file, id}) {
        let formData = new FormData()
        formData.append(field, file,file.name)
        try {
            const response = await this.$axios({
                method: 'patch',
                url: `/v2/assessments/${id}/`,
                data:  formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
            await state.commit('setAssessmentField', {field, value: response.data[field]})
            state.commit('setProgress', calculateProgress(response.data));
            state.commit('setLastEdit');
        } catch (e) {
            console.log(e);
        }
    },

    async publish(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Publishing assessment...'
        })
        const versionResponse = await this.$axios.get('v2/assessmentversion');
        const published_version = versionResponse.data;
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: {data_policy: 90, published_version}
        })
            .then((response) => {
                state.commit('setAssessmentField', {field: 'data_policy', value: 90})
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

    async unpublish(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Unpublishing assessment...'
        })

        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: {data_policy: 10}
        })
            .then((response) => {
                state.commit('setAssessmentField', {field: 'data_policy', value: 10})
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

    async finalize(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Finalizing assessment...'
        })
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: {status: 10}
        })
            .then((response) => {
                state.commit('setAssessmentField', {field: 'status', value: 10})
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

    async toggleAttribute(state, {assessmentId, attributeId}) {
        const attributes = [...state.state.assessment.attributes];
        const position = attributes.indexOf(attributeId);
        if(position === -1) {
            attributes.push(attributeId);
        } else {
            attributes.splice(position, 1);
        }
        await state.dispatch('editAssessmentField', {field: 'attributes', value: attributes, id: assessmentId });
    },

    async storeSurveyAnswer(state, {assessmentId, questionId, choice, explanation}) {
        const response = await this.$axios({
            method: 'post',
            url: `/v2/surveyanswerlikerts/`,
            data: {
                question: questionId,
                assessment: assessmentId,
                choice,
                explanation
            }
        });

        const assessmentResponse = await this.$axios.get(`v2/assessments/${assessmentId}/`);

        state.commit('addSurveyAnswer', {answer: response.data, percent_complete: assessmentResponse.data.percent_complete});
    },

    async updateSurveyAnswer(state, {id, assessmentId, questionId, choice, explanation}) {
        const response = await this.$axios({
            method: 'patch',
            url: `/v2/surveyanswerlikerts/${id}/`,
            data: {
                question: questionId,
                assessment: assessmentId,
                choice,
                explanation
            }
        });

        state.commit('updateSurveyAnswer', response.data)
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
