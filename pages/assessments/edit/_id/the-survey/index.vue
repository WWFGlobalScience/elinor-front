<template>
    <section v-if="!loader.active || isOffline" class="section section--assesment-edit-survey section--mt-0">
        <assessment-edit-survey-navigator></assessment-edit-survey-navigator>
        <assessment-edit-survey-attributes></assessment-edit-survey-attributes>
        <assessment-edit-survey-list></assessment-edit-survey-list>
    </section>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessnent-survey',
    layout: 'assessment-edit',
    computed: {
        ...mapState({
            loader: state => state.loader.loader,
            isOffline: state => state.layout.offline
        })
    }
}

</script>
