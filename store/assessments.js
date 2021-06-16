import qs from 'qs'

export const state = () => ({
    list: [],
    assessment: {},
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
    setAssessments( state, payload ) {
        state.list = payload
    },
    setAssessment( state, payload ) {
        state.assessment = payload
    }
}

export const actions = {
    async getAssessments( state ) {
        this.dispatch( 'loader/loaderState', {
            active: true,
            text: 'Getting assessments...'
        })
        const response = await fetch("https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments")
        const assessments = await response.json()
        console.log( assessments )
        state.commit( 'setAssessments', assessments )
        this.dispatch( 'loader/loaderState', {
            active: false,
            text: ''
        })
        this.dispatch( 'loader/loaderState', {
            active: false,
            text: 'Getting assessments...'
        })
    },
    async getAssessment( state, id ) {
        this.dispatch( 'loader/loaderState', {
            active: true,
            text: 'Getting assessment data...'
        })
        const response = await fetch(`https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments/${id}`)
        const assessment = await response.json()
        console.log( assessment )
        state.commit( 'setAssessment', assessment )
        this.dispatch( 'loader/loaderState', {
            active: false,
            text: 'Getting assessment data...'
        })
    },
    async createAssessment( state, form ) {
        this.dispatch( 'loader/loaderState', {
            active: true,
            text: 'Creating assessment...'
        })
        this.$axios({
            method: 'post',
            url: 'https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments/',
            data: qs.stringify( this.$formDataStringify( form ) )
        })
        .then( ( response ) => {
            console.log( response )
            window.location.replace(`/assessments/edit/${response.data.id}/assessment-data/`)
        })
        .catch( ( error ) => {
            console.log( error )
        })
    },
    async editAssessment( state, { form, id } ) {
        this.dispatch( 'loader/loaderState', {
            active: true,
            text: 'Saving assessment data...'
        })
        this.$axios({
            method: 'put',
            url: `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/assessments/${id}`,
            data: qs.stringify( this.$formDataStringify( form ) )
        })
        .then( ( response ) => {
            console.log( response )
            this.dispatch( 'loader/loaderState', {
                active: true,
                text: 'Getting assessment data...'
            })
            this.dispatch( 'assessments/getAssessment', id )
            this.dispatch( 'loader/loaderState', {
                active: false,
                text: 'Getting assessment data...'
            })
            
        })
        .catch( ( error ) => {
            console.log( error )
        })
    }
}