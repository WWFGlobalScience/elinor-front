<template>
    <div class="popup__content">
        <p class="c-text--base mb-6">
            {{ $t('pages.assessments.edit.tabs.survey.offlinePopupDescription') }}
        </p>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-offline',
    computed: {
        ...mapState({
            popup: state => state.popup.popup,
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        })
    }
}
</script>
