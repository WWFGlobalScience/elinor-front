<template>
    <div class="popup__content popup--assessment-delete">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
            {{ $t('pages.assessments.edit.tabs.collaborators.popups.delete.confirmationTitle') }}
        </h4>
        <p class="c-text--base mb-6">
            {{ $t('pages.assessments.edit.tabs.collaborators.popups.delete.confirmationDescription') }}
        </p>
        <div class="g-grid--2">
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child"
                        @click="popup.onConfirm()">
                    {{ $t('default.yes') }}
                </button>
            </div>
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child"
                        @click="popupState(false, '', '')">
                    {{ $t('default.no') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-collaborator-delete',
    computed: {
        ...mapState({
            popup: state => state.popup.popup,
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
    }
}
</script>
