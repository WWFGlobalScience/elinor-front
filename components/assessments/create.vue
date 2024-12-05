<template>
    <section class="section section--mt-0 section--button">
        <div class="container">
            <button
                type="button"
                class="btn btn--opacity--child"
                @click="
                    popupState({
                        active: true,
                        component: 'popup-assessment-create',
                        title: 'pages.assessments.list.create.popup.title',
                    })
                "
            >
                <span class="btn--opacity__target">{{
                    $t('pages.assessments.list.createButton')
                }}</span>
                <img src="~/assets/img/ico-button-arrow.svg" />
            </button>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'assessments-create',
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
    },
};
</script>
