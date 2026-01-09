<template>
  <div class="popup__content popup--show-video">
    <div>
      <iframe
        class="popup-video"
        :src="'https://www.youtube.com/embed/' + videoId"
        title="Video title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'popup-show-video',
  methods: {
    cancel() {
      this.$store.dispatch('popup/popupState', { active: false });
    },
  },
  computed: {
    ...mapState({
      popup: (state) => state.popup.popup,
      videoId: (state) => state.popup.popup.videoId,
    }),
  },
};
</script>
