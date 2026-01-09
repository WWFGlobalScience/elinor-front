<template>
  <section class="elinor__collaborators">
      <div class="container">
          <form action="" class="form form--mt-0">
              <table class="c-data-table">
                  <thead>
                      <tr>
                          <th>No.</th>
                          <th class="c-data-table__main-cell">
                              {{
                                  $t(
                                      'pages.assessments.view.tabs.collaborators.table.name',
                                  )
                              }}
                          </th>
                          <th>
                              {{
                                  $t(
                                      'pages.assessments.view.tabs.collaborators.table.admin',
                                  )
                              }}
                          </th>
                          <th>
                              {{
                                  $t(
                                      'pages.assessments.view.tabs.collaborators.table.contributor',
                                  )
                              }}
                          </th>
                          <th>
                              {{
                                  $t(
                                      'pages.assessments.view.tabs.collaborators.table.observer',
                                  )
                              }}
                          </th>
                          <th v-if="isEdit"></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(collaborator, index) in assessment.collaborators">
                          <td>{{ index + 1 }}</td>
                          <td class="c-data-table__main-cell">
                              <!-- <span
                                  :class="{
                                      'c-data-table__initial': true,
                                      admin: collaborator.role === 70,
                                      contributor: collaborator.role === 40,
                                      observer: collaborator.role === 10,
                                  }"
                                  >{{
                                      collaborator.user.username.charAt(0)
                                  }}</span
                              > -->
                              {{ collaborator.user.username }}
                          </td>
                          <td>
                              <div class="form__group">
                                  <div class="form__row">
                                      <div
                                          v-if="collaborator.role === 70"
                                          class="input input--radios input--radios-question"
                                      >
                                          <div class="radios__wrap">
                                              <div class="radio__wrap">
                                                  <div class="radio">
                                                      <input
                                                          type="radio"
                                                          :disabled="true"
                                                          :name="
                                                              'role-' +
                                                              collaborator.id
                                                          "
                                                          value="70"
                                                          :checked="
                                                              collaborator.role ===
                                                              70
                                                          "
                                                      />
                                                      <img
                                                          src="~/assets/img/check_circle.svg"
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td>
                              <div class="form__group">
                                  <div class="form__row">
                                      <div
                                          v-if="collaborator.role === 40"
                                          class="input input--radios input--radios-question"
                                      >
                                          <div class="radios__wrap">
                                              <div class="radio__wrap">
                                                  <div class="radio">
                                                      <input
                                                          type="radio"
                                                          :disabled="true"
                                                          :name="
                                                              'role-' +
                                                              collaborator.id
                                                          "
                                                          value="40"
                                                          :checked="
                                                              collaborator.role ===
                                                              40
                                                          "
                                                      />
                                                      <img
                                                          src="~/assets/img/check_circle.svg"
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </td>
                          <td>
                              <div class="form__group">
                                  <div class="form__row">
                                      <div
                                          v-if="collaborator.role === 10"
                                          class="input input--radios input--radios-question"
                                      >
                                          <div class="radios__wrap">
                                              <div class="radio__wrap">
                                                  <div class="radio">
                                                      <input
                                                          type="radio"
                                                          :disabled="true"
                                                          :name="
                                                              'role-' +
                                                              collaborator.id
                                                          "
                                                          value="10"
                                                          :checked="
                                                              collaborator.role ===
                                                              10
                                                          "
                                                      />
                                                      <img
                                                          src="~/assets/img/check_circle.svg"
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </form>
      </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'assessment-collaborators-list',
  props: {
      isEdit: {
          type: Boolean,
          default: false,
          required: false,
      }
  },
  methods: {
      ...mapActions({
          updateCollaborator: 'collaborators/updateCollaborator',
          popupState: 'popup/popupState',
      }),
  },
  computed: {
      ...mapState({
          assessment: (state) => state.assessments.assessment,
      }),
  },
};
</script>