<template>
    <section class="section section--assessment-collaborators">
        <div class="container">
            <h1 class="c-title--lg">Collaborators</h1>
            <p class="c-text--base">
                Explanation about collaborators Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna.
            </p>
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
