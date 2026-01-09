import qs from 'qs';

export const state = () => ({
  error: null,
});

export const mutations = {
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  },
};

export const actions = {
  async createCollaborator(state, form) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Creating collaborator...',
    });

    const data = this.$formDataStringify(form);

    this.$axios({
      method: 'post',
      url: 'v2/collaborators/',
      data: qs.stringify(data), //role, assessment, user
    })
      .then((response) => {
        console.log(response);
        state.commit('assessments/addCollaborator', response.data, {
          root: true,
        });
        this.dispatch('popup/popupState', { active: false });
      })
      .catch((error) => {
        console.log(error);
        state.commit('setError', error.response.data);
      })
      .finally(() => {
        this.dispatch('loader/loaderState', { active: false });
      });
  },

  async updateCollaborator(state, { role, collaborator, assessmentId }) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Updating collaborator...',
    });

    this.$axios({
      method: 'put',
      url: `v2/collaborators/${collaborator.id}/`,
      data: {
        role: role,
        assessment: assessmentId,
        user: collaborator.user.id,
      },
    })
      .then((response) => {
        state.commit(
          'assessments/updateCollaborator',
          { id: collaborator.id, role },
          { root: true },
        );
      })
      .catch((error) => () => {
        state.commit('setError', error.response.data);
      })
      .finally(() => {
        this.dispatch('loader/loaderState', { active: false });
      });
  },

  async deleteCollaborator(state, id) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Deleting collaborator...',
    });

    this.$axios({
      method: 'delete',
      url: 'v2/collaborators/' + id + '/',
    })
      .then((response) => {
        state.commit('assessments/removeCollaborator', id, {
          root: true,
        });
        this.dispatch('popup/popupState', { active: false });
      })
      .catch((error) => {
        state.commit('setError', error.response.data);
      })
      .finally(() => {
        this.dispatch('loader/loaderState', { active: false });
      });
  },
};
