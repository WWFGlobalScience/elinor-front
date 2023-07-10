export const state = () => ({
    list: [],
    filters: {country: undefined, attribute: undefined, range: undefined},
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
        state.filters = {country: undefined, attribute: undefined, range: undefined};
    },
}

export const actions = {
    async fetchMap(state) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Getting map data...'
        })

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v2/reports/assessments/geojson/',
            });
            state.commit('resetFilters')
            state.commit('setList', response.data.features);
        } finally {
            this.dispatch('loader/loaderState', {
                active: false,
                text: ''
            })
        }
    },

    filter(state, {name, value}) {
        state.commit('resetFilters')
        state.commit('addFilter', {name, value})
    },
    removeFilter(state, filterName) {
        state.commit('removeFilter', filterName)
    },
    resetFilters(state) {
        state.commit('resetFilters')
    }
}