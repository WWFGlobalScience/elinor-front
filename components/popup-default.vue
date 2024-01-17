<template>
    <transition name="elinor-fade">
        <div class="elinor__popup" v-show="popup.active" :class="{'popup__onboarding': popup.type ==='onboarding', 'popup__xs': popup.type ==='xs'}">
            <div class="popup__overlay" @click="close"></div>
            <div class="popup__box" :class="{'popup__box--min': popup.type ==='confirmation'}">
                <header class="popup__header">
                    <span>{{ $t( popup.title ) }}</span>
                    <button  type="button" class="btn--opacity" @click="close">
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
        }),
        close: function () {
            this.popup.onClose && this.popup.onClose();
            this.popupState( false, '', '' )
        }
    }
}
</script>
