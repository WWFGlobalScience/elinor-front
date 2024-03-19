<template>
    <div class="popup__content">
        <p class="c-text--base mb-6">
            {{ $t('pages.assessments.edit.tabs.survey.withoutConnectionPopupDescription') }}
        </p>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-without-connection',
    computed: {
        ...mapState({
            popup: state => state.popup.popup,
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        })
    },
    mounted() {
        this.popupState({ active: false })
    }
}
</script>
