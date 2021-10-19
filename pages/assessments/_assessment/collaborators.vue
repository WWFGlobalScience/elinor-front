<template>
    <section class="section section--assessment-collaborators">
        <div class="container">
            <h1 class="c-title--lg">{{ $t('pages.assessments.view.tabs.collaborators.title') }}</h1>
            <p class="c-text--base">{{ $t('pages.assessments.view.tabs.collaborators.description') }}</p>
        </div>
        <div class="mt-12">
        <assessment-collaborators-list></assessment-collaborators-list>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'assessment-collaborators',
    auth: false,
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        })
    },
}
</script>
