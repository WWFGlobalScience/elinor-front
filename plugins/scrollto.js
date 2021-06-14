class __ScrollTo {
    constructor( scrollto ) {
        this.SCROLLTO = {}
        this.SCROLLTO.trigger = scrollto,
        this.SCROLLTO.target = this.SCROLLTO.href

        this._listeners()
    }

    _listeners() {
        this.SCROLLTO.trigger.addEventListener( 'click', this._scrollto.bind( this ) )
        console.log( this )
    }
    
    _scrollto() {
        event.preventDefault()
        console.log( 'Clicked' )
    }
}
