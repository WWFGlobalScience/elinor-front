<template>
  <section class="section section--assessment-collaborators">
    <div class="container">
      <div class="collaborators-header">
        <p>
          {{ $t('pages.assessments.edit.tabs.collaborators.description') }}
        </p>
        <button
          v-if="isAdminOrContributor"
          class="btn btn--md"
          @click="
            popupState({
              active: true,
              component: 'popup-collaborator-add',
              title:
                'pages.assessments.edit.tabs.collaborators.popups.add.title',
            })
          "
        >
          <span>{{
            $t(
              'pages.assessments.edit.tabs.collaborators.addCollaboratorButton',
            )
          }}</span>
          <img src="~/assets/img/add_circle.svg" alt="add collaborator" />
        </button>
      </div>
      <assessment-edit-collaborators-list></assessment-edit-collaborators-list>
      <div class="section__bottom">
        <NuxtLink
          @click.prevent
          :to="`/assessments/edit/${id}/report-text`"
          class="btn btn--md"
        >
          <img
            src="~/assets/img/arrow_left_alt-white.svg"
            :alt="$t('pages.assessments.edit.tabs.nextStep')"
          />
          <span class="btn--opacity__target">Prev: Report Text</span>
        </NuxtLink>
        <!-- <NuxtLink
                @click.prevent
                :to="`/assessments/edit/${id}/report-text`"
                class="btn btn--md"
            >
            <span class="btn--opacity__target">Next: Report Text</span>
            <img
                src="~/assets/img/arrow_right_alt.svg"
                :alt="
                    $t('pages.assessments.edit.tabs.nextStep')
                "
            />
            </NuxtLink> -->
      </div>
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
  data() {
    return {
      id: this.$route.params.id,
    };
  },
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
