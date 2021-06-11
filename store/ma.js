export const state = () => ({
    mas: [],
    ma: {},
})

export const mutations = {
    setMas( state, payload ) {
        state.mas = payload
    },
    setMa( state, payload ) {
        state.ma = payload
    },
    setFirstMa( state, payload ) {
        state.ma = payload
    }
}

export const actions = {
    async getMas( state ) {
        const response = await fetch("https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas")
        const mas = await response.json()
        state.commit( 'setMas', mas )
    },
    async getMa( state, id ) {
        const response = await fetch(`https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas/${id}`)
        const ma = await response.json()

        console.log( ma )

        state.commit( 'setMa', ma )
    },
    async getFirstMa( state ) {
        const response = await fetch("https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/mas")
        const mas = await response.json()
        console.log( mas[0])
        state.commit( 'setMas', mas[0] )
    }
}