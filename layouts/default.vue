<template>
    <div id="app">
        <div :class="[ 'app__content' ]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <Nuxt keep-alive/>
            </main>
        </div>
        <default-loader></default-loader>
        <default-notification v-if="$nuxt.nuxt.err"></default-notification>
        <popup-default></popup-default>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'layout-default'

}
</script>
