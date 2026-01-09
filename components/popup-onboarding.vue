<template>
  <transition name="elinor-fade">
    <div class="elinor__popup popup__onboarding" v-show="popup.active">
      <div class="popup__overlay" @click="close"></div>
      <div
        class="popup__box"
        :class="{ 'popup__box--min': popup.type === 'confirmation' }"
      >
        <component :is="popup.component" :props="popup.props"></component>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'popup-news',
  computed: {
    popup() {
      return this.$store.state.popup.popup;
    },
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    close: function () {
      this.popup.onClose && this.popup.onClose();
      this.popupState({ active: false });
    },
  },
};
</script>
