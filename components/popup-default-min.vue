<template>
    <transition name="elinor-fade">
        <div class="elinor__popup" v-show="popup.active">
            <div class="popup__overlay" @click="popupState( false, '', '' )"></div>
            <div class="popup__box popup__box--min">
                <header class="popup__header">
                    <span>{{ $t( popup.title ) }}</span>
                    <button type="button" class="btn--opacity" @click="popupState( false, '', '' )">
                        <img src="~/assets/img/ico-close-popup.svg">
                    </button>
                </header>
                <popup-assessment-publish v-if="popup.component == 'popup-assessment-publish'"></popup-assessment-publish>
                <popup-assessment-delete v-if="popup.component == 'popup-assessment-delete'"></popup-assessment-delete>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'popup-default-min',
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