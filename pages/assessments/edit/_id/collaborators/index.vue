<template>
  <section class="section section--assessment-collaborators">
    <div class="container">
      <h1 class="c-title--lg">Collaborators</h1>
      <p class="c-text--base">
        Explanation about collaborators Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna.
      </p>
      <button
        class="btn--border-turqy btn--opacity--child mt-12"
        @click="
          popupState({
            active: true,
            component: 'popup-collaborator-add',
            title: 'Add collaborator',
          })
        "
      >
        <span class="btn--opacity__target">Add collaborator</span>
        <img src="~/assets/img/addcollaborator.svg" alt="add collaborator">
      </button>
    </div>

    <div class="mt-12">
        <assessment-edit-collaborators-list></assessment-edit-collaborators-list>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "assessment-collaborators",
  layout: "assessment-edit",
  methods: {
    ...mapActions({
      popupState: "popup/popupState",
    }),
  },
};
</script>
