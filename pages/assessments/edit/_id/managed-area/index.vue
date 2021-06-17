<template>
    <section class="section section--assessment-edit-managed-area">
        <ma-edit-selector :maOrigin="maOrigin" :maSelector="maSelector"></ma-edit-selector>
        <transition name="fade">
            <ma-edit-exists v-if="maOrigin == 'old'"></ma-edit-exists>
        </transition>
        <transition name="fade">
            <ma-edit-new v-show="maOrigin == 'new'"></ma-edit-new>
        </transition>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'assessment-ma',
    layout: 'assessment-edit',
    data() {
        return {
            id: this.$route.params.id,
            qid: this.$route.params.qid
        }
    },
    computed: {
        maSelector() {
            return this.$store.state.ma.edit.maSelector
        },
        maOrigin() {
            return this.$store.state.ma.edit.maOrigin
        },
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}

</script>