<template>
    <transition name="elinor-fade">
        <div class="elinor__popup" v-show="popup.active">
            <div class="popup__overlay" @click="popupState( false, '', '' )"></div>
            <div class="popup__box">
                <header class="popup__header">
                    <span>{{ $t( popup.title ) }}</span>
                    <button type="button" class="btn--opacity" @click="popupState( false, '', '' )">
                        <img src="~/assets/img/ico-close-popup.svg">
                    </button>
                </header>
                <component :is="popup.component" :props="popup.props"></component>
<!--                <popup-assessments-filter v-if="popup.component == 'popup-assessments-filter'"></popup-assessments-filter>-->
<!--                <popup-assessment-create v-if="popup.component == 'popup-assessment-create'"></popup-assessment-create>-->
<!--                <popup-map-spatialfile v-if="popup.component == 'popup-map-spatialfile'"></popup-map-spatialfile>-->
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'popup-default',
    computed: {
        popup() {
            return this.$store.state.popup.popup
        }
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        })
    }
}
</script>
