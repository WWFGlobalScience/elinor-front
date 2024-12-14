<template>
    <section
        class="section section--assessment-collaborators"
        v-if="!loader.active"
    >
        <div class="container">
            <h1 class="c-title--lg">
                {{ $t('pages.assessments.view.tabs.collaborators.title') }}
            </h1>
            <p class="c-text--base">
                {{
                    $t('pages.assessments.view.tabs.collaborators.description')
                }}
            </p>
        </div>
        <div class="mt-12">
            <assessment-collaborators-list
                v-if="!isAssessmentCollaborator($auth, assessment)"
            ></assessment-collaborators-list>
            <assessment-edit-collaborators-list
                v-if="isAssessmentCollaborator($auth, assessment)"
            ></assessment-edit-collaborators-list>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { isAssessmentCollaborator } from '~/config/assessment-roles';

export default {
    name: 'assessment-collaborators',
    auth: false,
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment,
            loader: (state) => state.loader.loader,
        }),
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
        isAssessmentCollaborator,
    },
};
</script>
