import qs from "qs";

export const state = () => ({
    collaborators: []
})

export const mutations = {
    setCollaborators(state, payload) {
        state.collaborators = payload
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
            this.$router.push(`/assessments/edit/${data.assessment.id}/collaborators/`)
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

            this.dispatch('loader/loaderState', {active: true})
        } catch (e) {
            console.error(e);
        }
    },

    async updateCollaborator(state, {role, collaborator}) {
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
                assessment: collaborator.assessment.id,
                user: collaborator.user.id
            }
        }).then(response => {
            this.dispatch('loader/loaderState', {active: true})
            state.commit('updateCollaborator', {id: collaborator.id, role})
        }).catch(error => console.log(error))
    },
}
