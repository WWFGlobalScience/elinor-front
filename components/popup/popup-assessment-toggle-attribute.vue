<template>
    <div class="popup__content">
        <p class="c-text--base mb-6">
            {{ $t('pages.assessments.edit.tabs.survey.uncheckAttributeText') }}
        </p>
        <div class="g-grid--2">
            <div>
                <button
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                    @click="popup.onConfirm()"
                >
                    {{ $t('default.yes') }}
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                    @click="popupState(false, '', '')"
                >
                    {{ $t('default.no') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'popup-assessment-toggle-atribute',
    computed: {
        ...mapState({
            popup: (state) => state.popup.popup,
        }),
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
    },
};
</script>
