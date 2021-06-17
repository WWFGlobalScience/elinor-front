<template>
    <section class="section section--ma-info">
        <ma-edit-exists-data :ma="ma" :mode="mode"></ma-edit-exists-data>
        <ma-map :ma="ma"></ma-map>
        <ma-zones :ma="ma"></ma-zones>
    </section>
</template>

<script>

import { mapActions } from "vuex"

export default {
    name: 'ma-info',
    layout: 'ma',
    data() {
        return {
            mode: 'ma'
        }  
    },
    methods: {
        ...mapActions({
            getMa: 'ma/getMa'
        })
    },
    computed: {
        ma() {
            return this.$store.state.ma.ma
        }
    },
    filters: {
        formatDate: function( value ) {
            if (value) {
                return moment(value *1000 ).format('MM/DD/YYYY')
            }
        }
    },
    created() {
        this.getMa( 1 )
    }
}
</script>