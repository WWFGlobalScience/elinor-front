<template>
  <div class="elinor__collaborators">
    <form action="" class="form">
      <table class="c-data-table">
        <thead>
          <tr>
            <th class="c-data-table__main-cell">
              {{ $t('pages.assessments.edit.tabs.collaborators.table.name') }}
            </th>
            <th>
              {{ $t('pages.assessments.edit.tabs.collaborators.table.admin') }}
            </th>
            <th>
              {{
                $t(
                  'pages.assessments.edit.tabs.collaborators.table.contributor',
                )
              }}
            </th>
            <th>
              {{
                $t('pages.assessments.edit.tabs.collaborators.table.observer')
              }}
            </th>
            <th>
              {{ $t('pages.assessments.edit.tabs.collaborators.table.action') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collaborator in assessment.collaborators">
            <td class="c-data-table__main-cell">
              <span
                :class="{
                  'c-data-table__initial': true,
                  admin: collaborator.role === 70,
                  contributor: collaborator.role === 40,
                  observer: collaborator.role === 10,
                }"
                >{{ collaborator.user.username.charAt(0) }}</span
              >{{ collaborator.user.username }}
            </td>
            <td>
              <img
                v-if="permissionToCollaboratorRoleEdit(collaborator, 70)"
                src="~/assets/img/check_circle.svg"
              />
            </td>
            <td>
              <img
                v-if="permissionToCollaboratorRoleEdit(collaborator, 40)"
                src="~/assets/img/check_circle.svg"
              />
            </td>
            <td>
              <img
                v-if="permissionToCollaboratorRoleEdit(collaborator, 10)"
                src="~/assets/img/check_circle.svg"
              />
            </td>
            <td>
              <button
                v-if="
                  !isLastAdmin(collaborator) &&
                  collaborator.user.id !== assessment.created_by
                "
                type="button"
                class=""
                @click="
                  popupState({
                    active: true,
                    type: 'confirmation',
                    component: 'popup-assessment-collaborator-delete',
                    title:
                      'pages.assessments.edit.tabs.collaborators.popups.delete.title',
                    onConfirm: onConfirmDelete(collaborator.id),
                  })
                "
              >
                <span class="sr-only">{{ $t('default.delete') }}</span>
                <img class="" src="~/assets/img/delete-gray.svg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  getMyRole,
  isAssessmentAdmin,
  isAssessmentContributor,
  roles,
} from '~/config/assessment-roles';

export default {
  name: 'assessment-edit-collaborators-list',
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
    }),
  },
  methods: {
    ...mapActions({
      updateCollaborator: 'collaborators/updateCollaborator',
      deleteCollaborator: 'collaborators/deleteCollaborator',
      popupState: 'popup/popupState',
    }),
    updateColl(role, collaborator) {
      this.updateCollaborator({
        role,
        collaborator,
        assessmentId: this.assessment.id,
      });
    },
    onConfirmDelete(collaboratorId) {
      return () => {
        this.deleteCollaborator(collaboratorId);
      };
    },
    isLastAdmin(collaborator) {
      return (
        collaborator.role === 70 &&
        this.assessment.collaborators.filter(
          (c) => c.role === 70 && collaborator.id !== c.id,
        ).length === 0
      );
    },
    permissionToCollaboratorRoleEdit(collaborator, role) {
      // console.log(collaborator);
      let permission = false;
      const userRole = getMyRole(this.$auth, this.assessment);
      switch (role) {
        case roles.admin:
          permission = userRole === roles.admin;
          break;
        case roles.contributor:
        case roles.observer:
          permission =
            collaborator.user.id !== this.assessment.created_by &&
            (userRole === roles.admin || userRole === roles.contributor);
          break;
      }
      return permission;
    },
    isAdmin() {
      return isAssessmentAdmin(this.$auth, this.assessment);
    },
    isAdminOrContributor() {
      return (
        this.isAdmin() || isAssessmentContributor(this.$auth, this.assessment)
      );
    },
  },
};
</script>
