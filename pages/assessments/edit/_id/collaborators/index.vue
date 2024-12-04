<template>
    <section class="section section--assessment-collaborators">
        <div class="container">
            <h1 class="c-title--lg">
                {{ $t('pages.assessments.edit.tabs.collaborators.title') }}
            </h1>
            <p class="c-text--base">
                {{
                    $t('pages.assessments.edit.tabs.collaborators.description')
                }}
            </p>
            <button
                v-if="isAdminOrContributor"
                class="btn--border-turqy btn--opacity--child mt-12"
                @click="
                    popupState({
                        active: true,
                        component: 'popup-collaborator-add',
                        title: 'pages.assessments.edit.tabs.collaborators.popups.add.title',
                    })
                "
            >
                <span class="btn--opacity__target">{{
                    $t(
                        'pages.assessments.edit.tabs.collaborators.addCollaboratorButton',
                    )
                }}</span>
                <img
                    src="~/assets/img/addcollaborator.svg"
                    alt="add collaborator"
                />
            </button>
        </div>

        <div class="mt-12">
            <assessment-edit-collaborators-list></assessment-edit-collaborators-list>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
    isAssessmentAdmin,
    isAssessmentContributor,
} from '~/config/assessment-roles';

export default {
    name: 'assessment-collaborators',
    layout: 'assessment-edit',
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment,
        }),
        isAdminOrContributor() {
            return (
                isAssessmentAdmin(this.$auth, this.assessment) ||
                isAssessmentContributor(this.$auth, this.assessment)
            );
        },
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
    },
};
</script>
