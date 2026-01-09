<template>
  <div>
    <button
      type="button"
      class="btn btn--border-turqy btn--new-sm"
      @click="
        popupState({
          active: true,
          type: 'onboarding',
          component: 'popup-assessment-onboarding',
          title: 'pages.assessments.list.create.popup.title',
        })
      "
    >
      <span class="btn--opacity__target">Tutorial</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'assessments-tutorial',
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
  },
};
</script>
