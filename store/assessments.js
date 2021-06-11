export const state = () => ({
    list: [],
    assessment: {}
})

export const mutations = {
    setAssessments( state, payload ) {
        state.list = payload
    },
    setAssessment( state, payload ) {
        state.assessment = payload
    }
}

export const actions = {
    async getAssessments( state ) {
        const response = await fetch("https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments")
        const assessments = await response.json()
        console.log( assessments )
        state.commit( 'setAssessments', assessments )
    },
    async getAssessment( state, id ) {
        const response = await fetch(`https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments/${id}`)
        const assessment = await response.json()
        console.log( assessment )
        state.commit( 'setAssessment', assessment )
    }
}