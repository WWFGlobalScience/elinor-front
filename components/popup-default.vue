<template>
  <transition name="elinor-fade">
    <div
      class="elinor__popup"
      v-show="popup.active"
      :class="{
        popup__onboarding: popup.type === 'onboarding',
        popup__xs: popup.type === 'xs',
      }"
    >
      <div class="popup__overlay" @click="close"></div>
      <div
        class="popup__box"
        :class="{ 'popup__box--min': popup.type === 'confirmation' }"
      >
        <header class="popup__header">
          <h3 class="text-turqy">{{ $t(popup.title) }}</h3>
          <button type="button" class="btn--opacity" @click="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <mask
                id="mask0_7699_10747"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="32"
                height="32"
              >
                <rect width="32" height="32" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_7699_10747)">
                <path
                  d="M8.53268 25.3333L6.66602 23.4666L14.1327 16L6.66602 8.53329L8.53268 6.66663L15.9993 14.1333L23.466 6.66663L25.3327 8.53329L17.866 16L25.3327 23.4666L23.466 25.3333L15.9993 17.8666L8.53268 25.3333Z"
                  fill="#43A0BD"
                />
              </g>
            </svg>
          </button>
        </header>
        <component :is="popup.component" :props="popup.props"></component>
        <!--                <popup-assessments-filter v-if="popup.component == 'popup-assessments-filter'"></popup-assessments-filter>-->
        <!--                <popup-assessment-create v-if="popup.component == 'popup-assessment-create'"></popup-assessment-create>-->
        <!--                <popup-map-spatialfile v-if="popup.component == 'popup-map-spatialfile'"></popup-map-spatialfile>-->
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'popup-default',
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
