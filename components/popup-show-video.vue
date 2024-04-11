<template>
    <div class="popup__content popup--show-video">
        <iframe
            id="`video-${item.id}`"
            title="`show video ${item.title}`"
            src="`https://www.youtube.com/embed/9bxrsgW82L4?si=S4wivtK0bjlTv8Ad?rel=0`"
            frameborder="0"
            class="popup-video"
        ></iframe>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "popup-show-video",
    methods: {
        cancel() {
            this.$store.dispatch("popup/popupState", { active: false });
        }
    },
    computed: {
        ...mapState({
            popup: state => state.popup.popup
        })
    }
};
</script>
