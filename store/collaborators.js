import qs from "qs";

export const state = () => ({
    collaborators: []
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
        const collaborators = state.collaborators.map((collaborator) => {
            if(collaborator.id === id) {
                collaborator.role = role;
            }
            return collaborator;
        });
        state.collaborators = collaborators;
    },
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
            this.dispatch('popup/popupState', {
                active: false
            })
            this.dispatch('loader/loaderState', {
                active: false,
                text: 'Creating collaborator...'
            })
        }).catch(error => console.log(error))
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

            this.dispatch('loader/loaderState', {active: false})
        } catch (e) {
            console.error(e);
        }
    },

    async updateCollaborator(state, {role, collaborator, assessmentId}) {
        console.log(role,collaborator);
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
            this.dispatch('loader/loaderState', {active: false})
            state.commit('assessments/updateCollaborator', {id: collaborator.id, role}, {root: true});
        }).catch(error => console.log(error))
    },

    async deleteCollaborator(state, id) {
        this.dispatch('loader/loaderState', {active: true, text: 'Deleting collaborator...'});

        this.$axios({
            method: 'delete',
            url: 'v1/collaborators/' + id,
        }).then(response => {
            state.commit('assessments/removeCollaborator', id, {root: true});
            this.dispatch('popup/popupState', {
                active: false
            })
            this.dispatch('loader/loaderState', {active: false});
        }).catch(error => console.log(error));
    },
}
