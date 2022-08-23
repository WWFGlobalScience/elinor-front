<template>
    <div class="popup__content">
        <h4 class="title">
            {{ $t('pages.assessments.actions.delete.subtitle') }}
        </h4>
        <p>
            {{ $t('pages.assessments.actions.delete.text') }}
        </p>
        <div class="btn-row">
            <button v-if="!sent" @click="onSubmit" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target"> {{ $t('default.yes') }}</span>
            </button>
            <button type="button" @click="close" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target"> {{ $t('default.no') }}</span>
            </button>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-delete',
    computed: {
        ...mapState({
            popup: state => state.popup.popup
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        }),
        close() {
            this.popupState({active: false});
        }
    }
}
</script>
