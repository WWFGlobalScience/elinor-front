import qs from 'qs';
import {
    calculateProgress,
    initProgress,
    required_fields,
} from '~/config/assessment-progress';
import moment from 'moment';

export const state = () => ({
    list: [],
    search: null,
    listType: 'all',
    filters: { management_area_countries: null, status: null, year: null },
    pagination: {
        count: 0,
        next: null,
        prev: null,
    },
    assessment: {
        last_edit: moment(),
        attributes: [],
        surveyAnswers: [],
        collaborators: [],
        checkout: null,
    },
    report: [],
    edit: {
        data: true,
        ma: false,
        survey: false,
        collaborators: false,
        publish: false,
        percent: 0,
    },
    required_fields,
    progress: initProgress(),
    flag: {
        errors: [],
        sent: false,
    },
    contact: {
        errors: [],
        sent: false,
    },
    aggregateReport: {
        filters: {
            managementAreas: [],
            countries: [],
            year: null,
            type: null,
        },
        assessments: [],
        selectedAssessments: [],
    },
    surveyFile: {
        error: null,
    },
});

export const mutations = {
    setAssessments(state, payload) {
        state.list = payload.results;
        state.pagination.count = payload.count;
        state.pagination.next = payload.next;
        state.pagination.prev = payload.prev;
    },
    setAssessment(state, payload) {
        state.assessment = payload;
    },
    setAssessmentField(state, payload) {
        const { field, value } = payload;
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
        state.assessment = { ...state.assessment, collaborators };
        state.progress = calculateProgress(state.assessment);
    },
    removeCollaborator(state, payload) {
        const collaborators = [
            ...state.assessment.collaborators.filter(
                (collaborator) => collaborator.id !== payload,
            ),
        ];
        state.assessment = { ...state.assessment, collaborators };
        state.progress = calculateProgress(state.assessment);
    },
    updateCollaborator(state, payload) {
        const { id, role } = payload;
        const collaborators = [
            ...state.assessment.collaborators.map((collaborator) => {
                if (collaborator.id === id) {
                    collaborator.role = role;
                }
                return collaborator;
            }),
        ];
        state.assessment = { ...state.assessment, collaborators };
        state.progress = calculateProgress(state.assessment);
    },
    setSearch(state, payload) {
        state.search = payload;
    },
    addFilter(state, { name, value }) {
        state.filters[name] = value;
    },
    removeFilter(state, payload) {
        state.filters[payload] = undefined;
    },
    resetFilters(state) {
        state.filters = {
            management_area_countries: null,
            status: null,
            year: null,
        };
    },
    setListType(state, value) {
        state.listType = value;
    },
    setSurveyAnswers(state, answers) {
        state.assessment.surveyAnswers = answers || [];
    },
    setReportData(state, data) {
        state.report = data;
    },
    setAttributes(state, attributes) {
        state.assessment.attributes = attributes;
    },
    addSurveyAnswer(state, { answer, percent_complete }) {
        const surveyAnswers = [answer, ...state.assessment.surveyAnswers];
        state.assessment = {
            ...state.assessment,
            surveyAnswers,
            percent_complete,
        };
        state.progress = calculateProgress(state.assessment);
    },
    updateSurveyAnswer(state, answer) {
        state.assessment.surveyAnswers = state.assessment.surveyAnswers.map(
            (surveyAnswer) => {
                if (
                    (answer.id && surveyAnswer.id === answer.id) ||
                    surveyAnswer.question.id === answer.questionId
                ) {
                    return { ...surveyAnswer, ...answer };
                }

                return surveyAnswer;
            },
        );
        state.progress = calculateProgress(state.assessment);
    },
    removeSurveyAnswer(state, id) {
        state.assessment.surveyAnswers = [
            ...state.assessment.surveyAnswers.filter(
                (surveyAnswer) => surveyAnswer.id !== id,
            ),
        ];
        state.progress = calculateProgress(state.assessment);
    },
    setManagementArea(state, managementArea) {
        state.assessment = {
            ...state.assessment,
            management_area_countries: managementArea,
        };
    },
    setContactErrors(state, errors) {
        state.contact.errors = errors;
    },
    setContactSent(state, sent) {
        state.contact.sent = sent;
    },
    setFlagErrors(state, errors) {
        state.flag.errors = errors;
    },
    setFlagSent(state, sent) {
        state.flag.sent = sent;
    },
    filterAggregateReport(state, { field, value }) {
        state.aggregateReport.filters[field] = value;
    },
    removeFilterAggregateReport(state, { field, index }) {
        if (Array.isArray(state.aggregateReport.filters[field])) {
            state.aggregateReport.filters[field].splice(index, 1);
        } else {
            state.aggregateReport.filters[field] = null;
        }
    },
    assessmentAggregateReport(state, assessments) {
        const assessmentIds = assessments.map((assessment) => assessment.id);
        state.aggregateReport.selectedAssessments =
            state.aggregateReport.selectedAssessments.filter(
                (assessmentId) => assessmentIds.indexOf(assessmentId) !== -1,
            );
        state.aggregateReport.assessments = assessments;
    },
    setSurveyFileError(state, error) {
        state.surveyFile.error = error;
    },
    resetSurveyFileError(state) {
        state.surveyFile.error = null;
    },
    toggleAssessmentAggregateReport(state, { assessmentId }) {
        let found = false;
        state.aggregateReport.selectedAssessments =
            state.aggregateReport.selectedAssessments.filter((id) => {
                if (id === assessmentId) {
                    found = true;
                }
                return id !== assessmentId;
            });
        if (!found) {
            state.aggregateReport.selectedAssessments.push(assessmentId);
        }
    },
};

export const actions = {
    async fetchAssessments(state) {
        let params = {};

        if (state.state.search) {
            params.search = state.state.search;
        }

        params = { ...params, ...state.state.filters };
        if (this.$auth.loggedIn && state.state.listType === 'own') {
            params.collaborators = this.$auth.user.id;
        }
        const notHasParams = Object.keys(params).length === 0;

        const loaderText = notHasParams
            ? 'Getting assessments...'
            : 'Filtering assessments...';

        this.dispatch('loader/loaderState', {
            active: true,
            text: loaderText,
        });

        this.$axios
            .get('v2/assessments/', { params })
            .then((response) => {
                state.commit('setAssessments', response.data);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async fetchAssessment(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting assessment data...',
        });

        const isOffline = state.rootState.layout.offline;

        if (!isOffline) {
            try {
                const assessmentResponse = await this.$axios({
                    method: 'get',
                    url: `v2/assessments/${id}/`,
                });

                const assessment = assessmentResponse.data;
                if (assessment.management_area) {
                    state.dispatch(
                        'managementareas/fetchManagementArea',
                        assessment.management_area,
                        { root: true },
                    );
                }
                if (!assessment.surveyAnswers) {
                    assessment.surveyAnswers = [];
                }
                state.commit('setAssessment', assessment);
                state.commit('setProgress', calculateProgress(assessment));

                const surveyAnswersResponse = await this.$axios({
                    method: 'get',
                    url: `v2/surveyanswerlikerts/?assessment=${id}`,
                });
                state.commit(
                    'setSurveyAnswers',
                    surveyAnswersResponse.data.results,
                );
            } catch (e) {
                this.$router.push('/assessments/');
            } finally {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            }
        }
    },

    async fetchReport(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting report data...',
        });

        try {
            const assessmentReportResponse = await this.$axios({
                method: 'get',
                url: `v2/reports/assessments/${id}/`,
            });
            state.commit('setReportData', assessmentReportResponse.data);
        } finally {
            this.dispatch('loader/loaderState', {
                active: false,
                text: '',
            });
        }
    },

    async createAssessment(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating assessment...',
        });
        this.$axios({
            method: 'post',
            url: 'v2/assessments/',
            data: qs.stringify(this.$formDataStringify(form)),
        })
            .then((response) => {
                this.dispatch('popup/popupState', {
                    active: false,
                    component: '',
                    title: '',
                });
                this.$router.push(
                    `/assessments/edit/${response.data.id}/assessment-data/`,
                );
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async editAssessment(state, { form, id }) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Saving assessment data...',
        });
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: qs.stringify(this.$formDataStringify(form)),
        })
            .then((response) => {
                state.commit('setAssessment', response.data);
                state.commit('setLastEdit');
                state.commit('setProgress', calculateProgress(response.data));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async editAssessmentField(state, { field, value, id }) {
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: {
                [field]: (value && value.id) || value,
            },
        })
            .then((response) => {
                state.commit('setProgress', calculateProgress(response?.data));
            })
            .finally(async () => {
                await state.commit('setAssessmentField', { field, value });
                state.commit('setLastEdit');
            });
    },

    async updateAssessmentProgress(state) {
        const assessment = state.state.assessment;
        const progress = calculateProgress(assessment);
        state.commit('setProgress', progress);
    },

    async editAssessmentFileField(state, { field, file, id }) {
        let formData = new FormData();
        formData.append(field, file, file.name);
        try {
            const response = await this.$axios({
                method: 'patch',
                url: `/v2/assessments/${id}/`,
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } },
            });
            await state.commit('setAssessmentField', {
                field,
                value: response.data[field],
            });
            state.commit('setProgress', calculateProgress(response.data));
            state.commit('setLastEdit');
        } catch (e) {
            console.log(e);
        }
    },

    async publish(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Publishing assessment...',
        });
        this.dispatch('popup/popupState', { active: false });
        const versionResponse = await this.$axios.get('v2/assessmentversion');
        const published_version = versionResponse.data;
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: { data_policy: 90, published_version },
        })
            .then(() => {
                state.commit('setAssessmentField', {
                    field: 'data_policy',
                    value: 90,
                });
                state.commit('setLastEdit');
                this.$router.push('/assessments');
                this.$toast.success(
                    this.$i18n.t(
                        'statusMessaging.assessments.unpublishingAssessmentSuccess',
                    ),
                );
            })
            .catch(() => {
                this.$toast.error(
                    this.$i18n.t(
                        'statusMessaging.assessments.publishingAssessmentError',
                    ),
                );
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async unpublish(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Unpublishing assessment...',
        });
        this.dispatch('popup/popupState', { active: false });
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: { data_policy: 10 },
        })
            .then(() => {
                state.commit('setAssessmentField', {
                    field: 'data_policy',
                    value: 10,
                });
                state.commit('setLastEdit');
                this.$router.push('/assessments');
                this.$toast.success(
                    this.$i18n.t(
                        'statusMessaging.assessments.unpublishingAssessmentSuccess',
                    ),
                );
            })
            .catch(() => {
                this.$toast.error(
                    this.$i18n.t(
                        'statusMessaging.assessments.unpublishingAssessmentError',
                    ),
                );
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async finalize(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Finalizing assessment...',
        });
        this.$axios({
            method: 'patch',
            url: `/v2/assessments/${id}/`,
            data: { status: 10 },
        })
            .then((response) => {
                state.commit('setAssessmentField', {
                    field: 'status',
                    value: 10,
                });
                state.commit('setLastEdit');
                this.dispatch('popup/popupState', { active: false });
                this.$router.push('/assessments');
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async toggleAttribute(state, { assessmentId, attributeId }) {
        const attributes = [...state.state.assessment.attributes];
        const position = attributes.indexOf(attributeId);
        if (position === -1) {
            attributes.push(attributeId);
        } else {
            attributes.splice(position, 1);
        }

        await state.dispatch('editAssessmentField', {
            field: 'attributes',
            value: attributes,
            id: assessmentId,
        });
    },

    async storeSurveyAnswer(
        state,
        { assessmentId, questionId, choice, explanation },
    ) {
        const isOffline = state.rootState.layout.offline;

        if (isOffline) {
            const answer = {
                question: state.rootState.surveyquestions.list.find(
                    ({ id }) => id === questionId,
                ),
                assessment: state.state.assessment,
                choice,
                explanation,
            };

            return state.commit('addSurveyAnswer', {
                answer,
                percent_complete: answer.assessment.percent_complete,
            });
        }

        const response = await this.$axios({
            method: 'post',
            url: `/v2/surveyanswerlikerts/`,
            data: {
                question: questionId,
                assessment: assessmentId,
                choice,
                explanation,
            },
        });

        const assessmentResponse = await this.$axios.get(
            `v2/assessments/${assessmentId}/`,
        );
        state.commit('addSurveyAnswer', {
            answer: response.data,
            percent_complete: assessmentResponse.data.percent_complete,
        });
    },

    async updateSurveyAnswer(
        state,
        { id, assessmentId, questionId, choice, explanation },
    ) {
        const isOffline = state.rootState.layout.offline;

        if (isOffline) {
            return state.commit('updateSurveyAnswer', {
                ...(id && { id }),
                questionId,
                choice,
                explanation,
            });
        }

        const response = await this.$axios({
            method: 'patch',
            url: `/v2/surveyanswerlikerts/${id}/`,
            data: {
                question: questionId,
                assessment: assessmentId,
                choice,
                explanation,
            },
        });

        state.commit('updateSurveyAnswer', response.data);
    },

    async removeSurveyAnswer(state, id) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Deleting survey answer...',
        });

        this.$axios({
            method: 'delete',
            url: `v2/surveyanswerlikerts/${id}/`,
        })
            .then((response) => {
                state.commit('removeSurveyAnswer', id);
                this.dispatch('popup/popupState', { active: false });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {
                    active: false,
                    text: '',
                });
            });
    },

    async contactAssessmentAdmin(
        state,
        { assessmentId, name, email, subject, message, recaptcha },
    ) {
        try {
            const response = await this.$axios({
                method: 'post',
                url: `v2/contactassessmentadmins`,
                data: {
                    assessment: assessmentId,
                    name,
                    email,
                    subject,
                    message,
                    recaptcha,
                },
            });
            state.commit('setContactSent', true);
        } catch (error) {
            state.commit('setContactSent', false);
            state.commit('setContactErrors', error.response.data);
        }
    },

    async flagAssessment(
        state,
        { assessmentId, reporter, flag_type, flag_type_other, explanation },
    ) {
        try {
            const response = await this.$axios({
                method: 'post',
                url: `v2/assessmentflags/`,
                data: {
                    assessment: assessmentId,
                    reporter,
                    flag_type,
                    flag_type_other,
                    explanation,
                },
            });
            state.commit('setFlagSent', true);
        } catch (error) {
            state.commit('setFlagSent', false);
            state.commit('setFlagErrors', error.response.data);
        }
    },

    async deleteAssessment(state, assessmentId) {
        try {
            const response = await this.$axios({
                method: 'delete',
                url: `v2/assessments/${assessmentId}/`,
            });

            this.$router.push('/assessments');
        } catch (error) {
            console.log(error);
        }
    },

    async downloadAssessment(state, assessmentId) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Downloading assessment...',
        });
        try {
            const responseType = 'blob';
            const response = await this.$axios.get(
                `/v2/reports/assessments/${assessmentId}/csv/`,
                { responseType },
            );
            const objectURL = window.URL.createObjectURL(
                new Blob([response.data]),
            );
            const link = window.document.createElement('a');
            link.href = objectURL;
            link.setAttribute('download', 'assessment-' + assessmentId);
            window.document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        } finally {
            this.dispatch('loader/loaderState', { active: false });
        }
    },

    async downloadAssessments(state) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Downloading assessments...',
        });
        try {
            const responseType = 'blob';
            const response = await this.$axios.get(
                `/v2/reports/assessments/csv/`,
                { responseType },
            );
            const objectURL = window.URL.createObjectURL(
                new Blob([response.data]),
            );
            const link = window.document.createElement('a');
            link.href = objectURL;
            link.setAttribute('download', 'assessments.csv');
            window.document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        } finally {
            this.dispatch('loader/loaderState', { active: false });
        }
    },

    async downloadSurveyFile(state, assessmentId) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Downloading survey file...',
        });
        try {
            const responseType = 'blob';
            const response = await this.$axios.get(
                `/v2/assessments/${assessmentId}/xlsx/`,
                { responseType },
            );
            const blob = new Blob([response.data], {
                type: response.headers['content-type'],
            });
            const objectURL = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.href = objectURL;
            link.setAttribute('download', `assessment-${assessmentId}.xlsx`);
            window.document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        } finally {
            this.dispatch('loader/loaderState', { active: false });
            state.dispatch(
                'popup/popupState',
                { active: false },
                { root: true },
            );
        }
    },

    async uploadSurveyFile(
        state,
        { assessmentId, file, dryRun, onUploadProgress },
    ) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Uploading survey file...',
        });

        let formData = new FormData();
        if (dryRun) {
            formData.append('dryrun', '1');
        }

        formData.append('file', file, file.name);

        try {
            const config = {
                onUploadProgress,
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            const response = await this.$axios.$post(
                `/v2/assessments/${assessmentId}/xlsx/`,
                formData,
                config,
            );
        } catch (error) {
            state.commit('setSurveyFileError', error.response.data);
        } finally {
            this.dispatch('loader/loaderState', { active: false });
        }
    },

    async resetSurveyFileError(state) {
        state.commit('resetSurveyFileError');
    },

    async filterAggregateReport(store, { field, value }) {
        store.commit('filterAggregateReport', { field, value });
        const filters = { ...store.state.aggregateReport.filters };
        filters[field] = value;

        let queryParams = [];

        if (filters.year) {
            queryParams.push(`year=${filters.year}`);
        }

        if (filters.type) {
            queryParams.push(`collection_method=${filters.type.id}`);
        }
        const queryParamsString = `&${queryParams.join('&')}`;
        let results = [];
        for (const managementArea of filters.managementAreas) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&management_area=${managementArea.id}${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        for (const country of filters.countries) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&management_area_countries=${country.code}${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        if (
            filters.managementAreas.length === 0 &&
            filters.countries.length === 0 &&
            (filters.year || filters.type)
        ) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        const processed = [];
        const withoutDuplicates = results.filter((result) => {
            if (processed.indexOf(result.id) === -1) {
                processed.push(result.id);
                return true;
            }
        });

        store.commit('assessmentAggregateReport', withoutDuplicates);
    },

    async removeFilterAggregateReport(store, { field, index }) {
        store.commit('removeFilterAggregateReport', { field, index });
        const filters = { ...store.state.aggregateReport.filters };
        if (Array.isArray(filters[field])) {
            filters[field].splice(index, 1);
        } else {
            filters[field] = null;
        }

        let queryParams = [];

        if (filters.year) {
            queryParams.push(`year=${filters.year}`);
        }

        if (filters.type) {
            queryParams.push(`collection_method=${filters.type.id}`);
        }
        const queryParamsString = `&${queryParams.join('&')}`;
        let results = [];
        for (const managementArea of filters.managementAreas) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&management_area=${managementArea.id}${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        for (const country of filters.countries) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&management_area_countries=${country.code}${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        if (
            filters.managementAreas.length === 0 &&
            filters.countries.length === 0 &&
            (filters.year || filters.type)
        ) {
            const response = await this.$axios.get(
                `v2/reports/assessments/?limit=99999&${queryParamsString}`,
            );
            results = results.concat(response.data.results);
        }

        const processed = [];
        const withoutDuplicates = results.filter((result) => {
            if (processed.indexOf(result.id) === -1) {
                processed.push(result.id);
                return true;
            }
        });

        store.commit('assessmentAggregateReport', withoutDuplicates);
    },
    reset(state) {
        state.dispatch('fetchAssessments');
    },
    filter(state, { name, value }) {
        state.commit('addFilter', { name, value });
        state.dispatch('fetchAssessments');
    },
    removeFilter(state, filterName) {
        state.commit('addFilter', filterName);
        state.dispatch('fetchAssessments');
    },
    search(state, search) {
        state.commit('setSearch', search);
        state.dispatch('fetchAssessments');
    },
    resetFilters(state) {
        state.commit('resetFilters');
        state.dispatch('popup/popupState', { active: false }, { root: true });
        state.dispatch('fetchAssessments');
    },
    filterAssessmentsBy(state, type) {
        state.commit('setListType', type);
        state.dispatch('fetchAssessments');
    },
    toggleAssessmentAggregateReport(state, { assessmentId, selected }) {
        state.commit('toggleAssessmentAggregateReport', {
            assessmentId,
            selected,
        });
    },
    async setOffline(state) {
        state.dispatch(
            'layout/setOffline',
            { isOffline: true },
            { root: true },
        );
        state.commit('setAssessmentField', {
            field: 'checkout',
            value: this.$auth.user.id,
        });
        await state.dispatch('editAssessmentField', {
            field: 'checkout',
            value: this.$auth.user.id,
            id: state.state.assessment.id,
        });
    },
    async setOnline(state) {
        state.dispatch(
            'layout/setOffline',
            { isOffline: false },
            { root: true },
        );
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Turning online...',
        });

        const attributes = [...state.state.assessment.attributes];
        const surveyAnswers = [...state.state.assessment.surveyAnswers];

        for (let answer of surveyAnswers) {
            if (!attributes.includes(answer.question.attribute)) {
                await this.$axios({
                    method: 'delete',
                    url: `v2/surveyanswerlikerts/${answer.id}/`,
                })
                    .then((response) => {
                        state.commit('removeSurveyAnswer', answer.id);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        state.state.assessment.surveyAnswers.forEach((answer) => {
            if (attributes.indexOf(answer.question.attribute) === -1) {
                attributes.push(answer.question.attribute);
            }
        });

        await this.$axios({
            method: 'patch',
            url: `/v2/assessments/${state.state.assessment.id}/`,
            data: {
                checkout: null,
                attributes,
            },
        })
            .then((response) => {
                state.commit('setProgress', calculateProgress(response?.data));
            })
            .finally(() => {
                state.commit('setAssessmentField', {
                    field: 'checkout',
                    value: null,
                });
                state.commit('setLastEdit');
            });

        state.state.assessment.surveyAnswers.forEach((answer) => {
            state.dispatch(
                answer.id ? 'updateSurveyAnswer' : 'storeSurveyAnswer',
                {
                    ...(answer.id && { id: answer.id }),
                    assessmentId: answer.assessment.id,
                    questionId: answer.question.id,
                    choice: answer.choice,
                    explanation: answer.explanation,
                },
            );
        });

        this.dispatch('loader/loaderState', { active: false });
    },
};
