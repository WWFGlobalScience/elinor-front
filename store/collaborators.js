import qs from "qs";

export const state = () => ({
    collaborators: [],
    error: null
})

export const mutations = {
    setCollaborators(state, payload) {
        state.collaborators = payload
    },
    addCollaborator(state, payload) {
        state.collaborators.push(payload)
    },
    removeCollaborator(state, payload) {
        state.collaborators = state.collaborators.filter(collaborator => collaborator.id !== payload);
    },
    updateCollaborator(state, payload) {
        const {id, role} = payload;
        state.collaborators = state.collaborators.map((collaborator) => {
            if(collaborator.id === id) {
                collaborator.role = role;
            }
            return collaborator;
        });
    },
    setError(state, payload) {
        state.error = payload;
    }
}

export const actions = {
    async createCollaborator(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating collaborator...'
        })

        const data = this.$formDataStringify(form);

        this.$axios({
            method: 'post',
            url: 'v1/collaborators/',
            data: qs.stringify(data) //role, assessment, user
        }).then(response => {
                state.commit('assessments/addCollaborator', response.data, {root: true});
                this.dispatch('popup/popupState', {active: false})
            })
            .catch(error => {
                state.commit('setError', error.response.data);
            })
            .finally(() => {

                this.dispatch('loader/loaderState', {active: false})
            })
    },

    async fetchCollaborators(state, assessmentId) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching collaborators...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v1/collaborators/?assessment=' + assessmentId,
            });

            state.commit('setCollaborators', response.data.results)
        } catch (error) {
            state.commit('setError', error.response.data);
        } finally {
            this.dispatch('loader/loaderState', {active: false})
        }
    },

    async updateCollaborator(state, {role, collaborator, assessmentId}) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Updating collaborator...'
        })

        this.$axios({
            method: 'put',
            url: `v1/collaborators/${collaborator.id}/`,
            data: {
                role: role,
                assessment: assessmentId,
                user: collaborator.user.id
            }
        }).then(response => {
                state.commit('assessments/updateCollaborator', {id: collaborator.id, role}, {root: true});
            })
            .catch(error => () => {
                state.commit('setError', error.response.data);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {active: false})
            })
    },

    async deleteCollaborator(state, id) {
        this.dispatch('loader/loaderState', {active: true, text: 'Deleting collaborator...'});

        this.$axios({
            method: 'delete',
            url: 'v1/collaborators/' + id + '/',
        }).then(response => {
                state.commit('assessments/removeCollaborator', id, {root: true});
                this.dispatch('popup/popupState', {active: false})
            })
            .catch(error => {
                state.commit('setError', error.response.data);
            })
            .finally(() => {
                this.dispatch('loader/loaderState', {active: false})
            })
    },
}
