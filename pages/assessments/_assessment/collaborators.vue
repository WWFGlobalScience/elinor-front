<template>
  <section
    class="section section--assessment-collaborators tab-content"
    v-if="!loader.active"
  >
    <div class="container">
      <p class="text-subtitle max-w-[700px]">
        {{ $t('pages.assessments.view.tabs.collaborators.description') }}
      </p>
      <div>
        <assessment-collaborators-list
          v-if="!isAssessmentCollaborator($auth, assessment)"
        ></assessment-collaborators-list>
        <assessment-edit-collaborators-list
          v-if="isAssessmentCollaborator($auth, assessment)"
        ></assessment-edit-collaborators-list>
      </div>
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
