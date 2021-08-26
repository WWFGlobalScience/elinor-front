<template>
  <div class="popup__content popup--collaborator-add">
    <p class="c-text--base mb-8">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna.
    </p>

    <h4 class="c-title--modal mb-6">Select Collaborator</h4>
    <form
      id="form--assessment-create"
      class="form form--assessment-create form--mt-0"
      @submit="submit"
    >
      <input
        v-if="assessment"
        type="hidden"
        name="assessment"
        :value="assessment.id"
      />
      <div class="form__group">
        <div class="form__row">
          <div class="input input--multiselect input--1-4">
            <label class="label"> Collaborator </label>
            <div class="multiselect__wrap">
              <multiselect
                placeholder="Select..."
                select-label="Enter doesn’t work here!"
                :value="users.id"
                track-by="id"
                label="username"
                :options="users"
                :multiple="false"
                :searchable="true"
                :showLabels="false"
                :allow-empty="false"
                :hide-selected="true"
                v-model="selectedUser"
                @search-change="findUsers"
              >
                <span slot="noResult">{{ $t("default.noresults") }}</span>
              </multiselect>
              <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
              </div>
            </div>
            <input type="hidden" name="user" :value="selectedUser.id" />
          </div>
        </div>
        <h4 class="c-title--modal mb-6">Select role & permissions</h4>
        <div class="form__group g-grid--3-1-md">
          <div class="form__row">
            <div class="input input--radios input--radios-question">
              <div class="radios__wrap">
                <div class="radio__wrap">
                  <div class="radio">
                    <input
                      type="radio"
                      v-model="role"
                      name="role"
                      value="70"
                      id="answer-1"
                    />
                    <img src="~/assets/img/ico-ok.svg" />
                  </div>
                </div>
              </div>
              <label for="answer-1" class="c-title--base">
                <span>Admin</span>
                <ul class="list-inside list-disc list--light">
                  <li>Edit the Assessment data</li>
                  <li>Edit Survey data</li>
                  <li>Edit MA location</li>
                  <li>Add/Edit Admin, Contributors & Observers</li>
                  <li>Delet the Assessment</li>
                  <li>Publish & Unpublish Assessment</li>
                </ul>
              </label>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--radios input--radios-question">
              <div class="radios__wrap">
                <div class="radio__wrap">
                  <div class="radio">
                    <input
                      type="radio"
                      v-model="role"
                      name="role"
                      value="40"
                      id="answer-2"
                    />
                    <img src="~/assets/img/ico-ok.svg" />
                  </div>
                </div>
              </div>
              <label for="answer-2" class="c-title--base">
                <span>Contributor</span>
                <ul class="list-inside list-disc list--light">
                  <li>Edit the Survey data</li>
                  <li>Edit the MA location data</li>
                  <li>Add/Edit contributors & Observers</li>
                  <li>View the Assessment data</li>
                </ul>
              </label>
            </div>
          </div>
          <div class="form__row">
            <div class="input input--radios input--radios-question">
              <div class="radios__wrap">
                <div class="radio__wrap">
                  <div class="radio">
                    <input
                      type="radio"
                      v-model="role"
                      name="role"
                      value="10"
                      id="answer-3"
                    />
                    <img src="~/assets/img/ico-ok.svg" />
                  </div>
                </div>
              </div>
              <label for="answer-3" class="c-title--base">
                <span>Observer</span>
                <ul class="list-inside list-disc list--light">
                  <li>View the Assessment data</li>
                  <li>View the Survey data</li>
                  <li>View the MA location</li>
                </ul>
              </label>
            </div>
          </div>
        </div>
        <div class="elinor__data-separator"></div>
        <div class="g-grid--4-1-sm items-center">
          <div class="form__row g-colspan--2">
            <div class="input">
              <button
                type="submit"
                class="btn--border-turqy btn--opacity--child"
              >
                <span class="btn--opacity__target">Add collaborator</span>
                <img
                  src="~/assets/img/addcollaborator.svg"
                  alt="add collaborator"
                />
              </button>
            </div>
          </div>
          <div class="g-colspan--2 border-l border-grayy-border pl-6">
            <p>
              Didn’t  you find your Collaborator?
            </p>
            <p class="text-sm btn--opacity--child">
                If you don’t find your collaborator you can 
                <NuxtLink to="" class="text-turqy btn--opacity__target">
                    send an invitation
                </NuxtLink>
                 to the app, you will be notified once joins
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapActions, mapState } from "vuex";

export default {
  name: "popup-collaborator-add",
  props: {
    props: null,
  },
  data() {
    return {
      selectedUser: {},
      role: null,
    };
  },
  methods: {
    ...mapActions({
      findUsers: "users/findUsers",
      createCollaborator: "collaborators/createCollaborator",
    }),
    submit(e) {
      e.preventDefault();
      console.log();
      this.createCollaborator(e.target);
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      assessment: (state) => state.assessments.assessment,
    }),
  },
};
</script>
