export const state = () => ({
    list: [],
    filters: {management_area_countries: undefined, attributes: undefined},
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    },
    addFilter(state, {name, value}) {
        state.filters[name] = value;
    },
    removeFilter(state, payload) {
        state.filters[payload] = undefined;
    },
    resetFilters(state) {
        state.filters = {management_area_countries: undefined, attributes: undefined};
    },
}

export const actions = {
    async fetchReports(state) {
        let params = {};

        params = {...params, ...state.state.filters};

        const notHasParams = Object.keys(params).length === 0
        if(notHasParams) {
            this.dispatch('loader/loaderState', {
                active: true,
                text: 'Getting assessments...'
            })
        }

        this.$axios.get('v2/reports/assessments/', {params})
        .then((response) => {
            state.commit('setList', response.data)
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

    async fetchReportsGeoJson(state) {
        let params = {};

        params = {...params, ...state.state.filters};

        const notHasParams = Object.keys(params).length === 0
        if(notHasParams) {
            this.dispatch('loader/loaderState', {
                active: true,
                text: 'Getting assessments...'
            })
        }

        this.$axios.get('v2/reports/assessments/geojson/', {params})
        .then((response) => {
            state.commit('setList', response.data.features)
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

    filter(state, {name, value}) {
        state.commit('addFilter', {name, value})
        state.dispatch('fetchReportsGeoJson');
    },
    removeFilter(state, filterName) {
        state.commit('removeFilter', filterName)
        state.dispatch('fetchReportsGeoJson');
    },
    resetFilters(state) {
        state.commit('resetFilters')
        state.dispatch('popup/popupState', {active: false}, {root: true})
        state.dispatch('fetchReportsGeoJson');
    }
}
