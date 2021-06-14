<template>
    <section class="section section--assessment-info">

        <ma-data :ma="ma" :mode="mode"></ma-data>
        <ma-map :ma="ma"></ma-map>
        <ma-zones :ma="ma"></ma-zones>
    </section>
</template>

<script>

import moment from 'moment'
import { mapActions } from 'vuex'

export default {
    name: 'Assessment',
    layout: 'assessment',
    data() {
        return {
            mode: 'assessment'
        }  
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        },
        ma() {
            return this.$store.state.ma.mas
        }
    }
}

</script>