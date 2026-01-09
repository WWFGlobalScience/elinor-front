const API_BASE_URL = 'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/';
const API_ASSESSMENTCHANGES_URL = `${API_BASE_URL}assessments_changes_pro/`;
const API_USERS_URL = `${API_BASE_URL}users/`;
const API_COLLABORATORS_URL = `${API_BASE_URL}collaborators/`;
const API_MANAGEMENTAREAS_URL = `${API_BASE_URL}managementareas/`;
const API_MANAGEMENTAREAVERSIONS_URL = `${API_BASE_URL}managementareaversions/`;
const API_MANAGEMENTAREAZONES_URL = `${API_BASE_URL}managementareazones/`;
const API_MANAGEMENTAUTHORITIES_URL = `${API_BASE_URL}managementareaauthorities/`;
const API_ORGANIZATIONS_URL = `${API_BASE_URL}organizations/`;
const API_PROTECTEDAREAS_URL = `${API_BASE_URL}protectedareas/`;
const API_REGIONS_URL = `${API_BASE_URL}regions/`;
const API_STAKEHOLDERGROUPS_URL = `${API_BASE_URL}stakeholdergroups/`;
const API_SUPPORTSOURCES_URL = `${API_BASE_URL}supportsources/`;

export const state = () => ({
  fetched: false,
  busy: false,
  text: '',
});

export const mutations = {
  apiRequestInit(state, payload) {
    state.busy = true;
    state.text = payload;
  },
  apiRequestEnd(state) {
    state.busy = false;
    state.text = state.text;
  },
};

export const actions = {
  async apiGetAssessments() {
    this.$axios({
      method: 'get',
      url: `${API_BASE_URL}assessments_pro/`,
    })
      .then((response) => {
        this.dispatch('assessments/setAssessments', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async apiGetUsers() {
    this.$axios({
      method: 'get',
      url: API_USERS_URL,
    })
      .then((response) => {
        this.dispatch('users/setUsers', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  apiRequestInit(state, text) {
    state.commit('apiRequestInit', text);
  },
  apiRequestEnd(state) {
    state.commit('apiRequestEnd');
  },
};
