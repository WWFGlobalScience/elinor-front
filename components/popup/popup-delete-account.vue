<template>
    <div class="popup__content">
        <h4 class="title">
            {{ $t('pages.profile.popup.header.title') }}
        </h4>
        <p>
            {{ $t('pages.profile.popup.body.text') }}
        </p>
        <div class="btn-row">
            <button
                @click="confirm"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">
                    {{ $t('default.yes') }}</span
                >
            </button>
            <button
                type="button"
                @click="close"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">
                    {{ $t('default.no') }}</span
                >
            </button>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'popup-assessment-delete',
    computed: {
        ...mapState({
            popup: (state) => state.popup.popup,
        }),
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            accountDelete: 'authentication/accountDelete',
        }),
        confirm() {
            this.accountDelete();
        },
        close() {
            this.popupState({ active: false });
        },
    },
};
</script>
