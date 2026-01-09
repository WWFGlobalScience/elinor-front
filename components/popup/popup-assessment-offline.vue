<template>
  <div class="popup__content">
    <p class="c-text--base mb-6">
      {{
        $t('pages.assessments.edit.tabs.survey.offlinePopupDescription', {
          username,
        })
      }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-offline',
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
      assessment: (state) => state.assessments.assessment,
    }),
    username() {
      return this.assessment.collaborators.find(
        ({ user }) => user.id === this.assessment.checkout,
      )?.user.username;
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
  },
  mounted() {
    this.popupState({ active: false });
  },
};
</script>
