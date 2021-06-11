<template>
    <div id="app">
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
        }
    },
    methods: {
        ...mapActions({
            getAssessments: 'assessments/getAssessments',
            getMa: 'ma/getMa'
        })
    },
    mounted() {
        this.getAssessments()
        this.getMa( this.id )
    }
}
</script>