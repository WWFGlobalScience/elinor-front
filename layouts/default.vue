<template>
    <div id="app">
        <div :class="[ 'app__content', { 'is--overlay': loader.active || popup.active } ]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <Nuxt />
            </main>
        </div>
        <default-loader></default-loader>
        <popup-default></popup-default>
    </div>
</template>

<script>
export default {
    name: 'layout-default',
    computed: {
        loader() {
            return this.$store.state.loader.loader
        },
        popup() {
            return this.$store.state.popup.popup
        }
    } 
}
</script>