<template>
    <div class="popup__content popup--assessment-publish">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
            {{
                $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.popup.confirmationTitle',
                )
            }}
        </h4>
        <p class="c-text--base mb-6">
            {{
                $t(
                    'pages.assessments.edit.tabs.publish-settings.publish.popup.confirmationDescription',
                )
            }}
        </p>
        <div class="g-grid--2">
            <div>
                <button
                    @click="popup.onConfirm()"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{
                        $t('default.yes')
                    }}</span>
                </button>
            </div>
            <div>
                <button
                    @click="cancel()"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{
                        $t('default.no')
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'popup-assessment-publish',
    methods: {
        cancel() {
            this.$store.dispatch('popup/popupState', { active: false });
        },
    },
    computed: {
        ...mapState({
            popup: (state) => state.popup.popup,
        }),
    },
};
</script>
