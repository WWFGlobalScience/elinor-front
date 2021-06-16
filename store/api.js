import $store from '~/store'

export const actions = {
    apiRequestProgress( state, { active, text } ) {
        this.dispatch( 'loader/loaderState', text )
    },
    apiRequestOk( state, text ) {
        this.dispatch( 'loader/loaderState', '' )
    },
    apiRequestError( state, text ) {

    }
}