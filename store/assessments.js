import qs from 'qs'

export const state = () => ({
  list: [],
  pagination: {
    count: 0,
    next: null,
    prev: null
  },
  assessment: {
    survey: []
  },
  edit: {
    data: true,
    ma: false,
    survey: false,
    collaborators: false,
    publish: false,
    percent: 0
  }
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
        console.log(response)
        window.location.replace(`/assessments/edit/${response.data.id}/assessment-data/`)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async editAssessment(state, {form, id}) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Saving assessment data...'
    })
    this.$axios({
      method: 'put',
      url: `/v1/assessments/${id}/`,
      data: qs.stringify(this.$formDataStringify(form))
    })
      .then((response) => {
        console.log(response)
        this.dispatch('loader/loaderState', {
          active: true,
          text: 'Getting assessment data...'
        })
        this.dispatch('assessments/getAssessment', id)
        this.dispatch('loader/loaderState', {
          active: false,
          text: 'Getting assessment data...'
        })

      })
      .catch((error) => {
        console.log(error)
      })
  }
}
