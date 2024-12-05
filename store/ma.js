export const state = () => ({
    mas: [],
    ma: {},
    edit: {
        maOrigin: null,
        maSelector: {
            value: null,
            options: [
                'Management Area 1',
                'Management Area 2',
                'Management Area 3',
            ],
        },
    },
});

export const mutations = {
    setMas(state, payload) {
        state.mas = payload;
    },
    setMa(state, payload) {
        state.ma = payload;
    },
    setFirstMa(state, payload) {
        state.ma = payload;
    },
    maSelectorChange(state, payload) {
        state.edit.maSelector.value = payload;
        state.edit.maSelector.value == null
            ? (state.edit.maOrigin = 'new')
            : (state.edit.maOrigin = 'old');
    },
    maSelectorNew(state) {
        state.edit.maOrigin = 'new';
    },
};

export const actions = {
    async getMas(state) {
        const response = await fetch(
            'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas',
        );
        //const response = await fetch( 'api/ma.json' )
        const mas = await response.json();
        state.commit('setMas', mas);
    },
    async getMa(state, id) {
        const response = await fetch(
            `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas/${id}`,
        );
        //const response = await fetch( 'api/ma.json' )
        const ma = await response.json();

        console.log(ma);

        state.commit('setMa', ma);
    },
    async getFirstMa(state) {
        const response = await fetch(
            'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas',
        );
        //const response = await fetch( 'api/ma.json' )
        const mas = await response.json();
        console.log(mas[0]);
        state.commit('setFirstMa', mas[0]);
    },
    maSelectorChange(state, value) {
        state.commit('maSelectorChange', value);
    },
    maSelectorNew(state) {
        state.commit('maSelectorNew');
        this.dispatch('ma/maSelectorChange', null);
    },
};
