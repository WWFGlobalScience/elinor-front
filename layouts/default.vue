<template>
    <div id="app">
        <div :class="['app__content', { 'is--overlay': popup.active }]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <Nuxt keep-alive />
                <default-footer></default-footer>
            </main>
        </div>
        <default-loader></default-loader>
        <default-notification v-if="$nuxt.nuxt.err"></default-notification>
        <popup-default></popup-default>
    </div>
</template>

<script>
export default {
    name: "layout-default",
    computed: {
        loader() {
            return this.$store.state.loader.loader;
        },
        popup() {
            return this.$store.state.popup.popup;
        }
    },
    mounted() {
        const isOffline = this.$auth.loggedIn && this.$store.state.assessments.assessment?.offline?.id === this.$auth.user.id;
        this.$store.dispatch( 'layout/setOffline', { isOffline } )
    }
};
</script>
