<template>
    <section class="section section--assessment-collaborators">

        <button
            @click="popupState({active: true, component: 'popup-collaborator-add', title: 'Add collaborator'})">
            Add collaborator
        </button>

        <div class="container">
            Collaborators

        </div>
        <assessment-collaborators-list></assessment-collaborators-list>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'assessment-collaborators',
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        })
    },
}
</script>
