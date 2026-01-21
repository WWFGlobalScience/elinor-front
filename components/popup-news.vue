<template>
  <transition name="elinor-fade">
    <div
      class="elinor__popup"
      v-show="popup.active"
      :class="{
        popup__onboarding: popup.type === 'onboarding',
        popup__xs: popup.type === 'xs',
        popup__news: popup.type === 'news',
        popup__video: popup.type === 'video',
      }"
    >
      <div class="popup__overlay" @click="close"></div>
      <div
        class="popup__box"
        :class="{ 'popup__box--min': popup.type === 'confirmation' }"
      >
        <button type="button" class="close-btn" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <mask
              id="mask0_9552_3744"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_9552_3744)">
              <path
                d="M9.80556 11.3611L4.36111 16.8056C4.15741 17.0093 3.89815 17.1111 3.58333 17.1111C3.26852 17.1111 3.00926 17.0093 2.80556 16.8056C2.60185 16.6019 2.5 16.3426 2.5 16.0278C2.5 15.713 2.60185 15.4537 2.80556 15.25L8.25 9.80556L2.80556 4.36111C2.60185 4.15741 2.5 3.89815 2.5 3.58333C2.5 3.26852 2.60185 3.00926 2.80556 2.80556C3.00926 2.60185 3.26852 2.5 3.58333 2.5C3.89815 2.5 4.15741 2.60185 4.36111 2.80556L9.80556 8.25L15.25 2.80556C15.4537 2.60185 15.713 2.5 16.0278 2.5C16.3426 2.5 16.6019 2.60185 16.8056 2.80556C17.0093 3.00926 17.1111 3.26852 17.1111 3.58333C17.1111 3.89815 17.0093 4.15741 16.8056 4.36111L11.3611 9.80556L16.8056 15.25C17.0093 15.4537 17.1111 15.713 17.1111 16.0278C17.1111 16.3426 17.0093 16.6019 16.8056 16.8056C16.6019 17.0093 16.3426 17.1111 16.0278 17.1111C15.713 17.1111 15.4537 17.0093 15.25 16.8056L9.80556 11.3611Z"
                fill="#43A0BD"
              />
            </g>
          </svg>
        </button>
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
