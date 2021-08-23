import qs from "qs";

export const state = () => ({
    collaborators: []
})

export const mutations = {
    setCollaborators(state, payload) {
        state.collaborators = payload
    },
}

export const actions = {
    async createCollaborator(state, form) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Creating collaborator...'
        })

        const data = this.$formDataStringify(form)

        this.$axios({
            method: 'post',
            url: 'v1/collaborators/',
            data: qs.stringify(data) //role, assessment, user
        }).then(response => {
            console.log(response)
            window.location.replace(`/assessments/${data.assessment}/collaborators/`)
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

            const collaborators = []
            for (let collaborator of response.data.results) {
                collaborator.user_obj = await this.$axios.$get('v1/users/' + collaborator.user);
                collaborators.push(collaborator);
            }

            state.commit('setCollaborators', collaborators)

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
                assessment: collaborator.assessment,
                user: collaborator.user
            }
        }).then(response => {
            console.log(response)
            this.dispatch('loader/loaderState', {active: true})
            return response.data;
        }).catch(error => console.log(error))
    },
}
