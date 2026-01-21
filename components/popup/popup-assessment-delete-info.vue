<template>
  <div class="popup__content">
    <h4 class="title">
      {{ $t('pages.assessments.actions.delete-info.subtitle') }}
    </h4>
    <p>
      {{ $t('pages.assessments.actions.delete-info.text') }}
    </p>
    <div class="btn-row">
      <button @click="close" class="btn--border-turqy btn--opacity--child">
        <span class="btn--opacity__target"> {{ $t('default.close') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'popup-assessment-delete-info',
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    close() {
      this.popupState({ active: false });
    },
  },
};
</script>
