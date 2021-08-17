<template>
    <article class="page page--assessments">
        <div class="container">
            <button type="button" class="btn--border-turqy btn--opacity--child"
            @click="popupState( { active: true, component: 'popup-map-spatialfile', title: 'popups.spatialfile.title' })"
            >
                <span class="btn--opacity__target">Upload map image</span>
                <img src="~/assets/img/ico-button-arrow-turqy.svg">
            </button>
        </div>
    </article>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Home',
    auth: false,
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        })
    }

}
</script>

