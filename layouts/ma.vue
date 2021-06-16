<template>
    <div id="app">
        <div :class="[ 'app__content', { 'is--overlay': popup.active } ]">
            <default-header></default-header>
            <main role="main">
                <default-sidebar></default-sidebar>
                <article class="page  page--managed-area">
                    <ma-header :ma="ma"></ma-header>
                    <ma-tabs :id="id"></ma-tabs>
                    <Nuxt />
                </article>
            </main>
        </div>
        <default-loader></default-loader>
        <popup-default></popup-default>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'layout-ma',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        ma() {
            return this.$store.state.ma.ma
        },
        assessments() {
            return this.$store.state.assessments.list
        },
        loader() {
            return this.$store.state.loader.loader
        },
        popup() {
            return this.$store.state.popup.popup
        }
    },
    methods: {
        ...mapActions({
            getAssessments: 'assessments/getAssessments',
            getMa: 'ma/getMa'
        })
    },
    created() {
        this.getAssessments()
        this.getMa( this.id )
    }
}
</script>