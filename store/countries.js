import {locales} from "~/locales";

export const state = () => ({
    list: {},
    management_area_countries: []
})

export const mutations = {
    setList(state, payload) {
        state.list = payload
    },
    setManagementAreaCountries(state, payload) {
        state.management_area_countries = payload
    }
}

export const actions = {
    async load(state) {
        try {
            const translatedCountries = {};
            for(const locale of locales) {
                translatedCountries[locale] = [];
                const module = await import('../locales/' + locale + '/countries.json');
                translatedCountries[locale] = [...module.default.countries];
            }
            state.commit('setList', translatedCountries)
        } catch (e) {
            console.error(e);
        }
    },
    async fetchCountries(state) {
        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v2/countries?used_in_mas=true'
            });

            state.commit('setManagementAreaCountries', response.data)
        } catch (e) {
            console.error(e);
        }
    }
}

