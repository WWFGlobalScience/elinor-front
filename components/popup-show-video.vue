<template>
    <div class="popup__content popup--show-video">
        <iframe
            :id="`video-${item.id}`"
            :title="`show video ${item.title}`"
            :src="`https://www.youtube.com/embed/${item.id}?rel=0`"
            frameborder="0"
            class="popup-video"
        ></iframe>
    </div>
</template>

<script>
export default {
    name: "popup-show-video",
    data() {}
};
</script>
