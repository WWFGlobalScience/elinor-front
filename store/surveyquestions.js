export const state = () => ({
    list: [],
});

export const mutations = {
    setList(state, payload) {
        state.list = payload;
    },
};

export const actions = {
    async fetchSurveyQuestions(state) {
        this.dispatch('loader/loaderState', {
            active: true,
            text: 'Fetching questions...',
        });

        try {
            const response = await this.$axios({
                method: 'get',
                url: 'v2/surveyquestionlikerts/',
            });

            state.commit('setList', response.data.results);

            this.dispatch('loader/loaderState', { active: false });
        } catch (e) {
            console.error(e);
        }
    },
};
