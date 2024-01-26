<template>
    <article class="page page--flushed">
        <section class="section section--main" v-html="content"></section>
    </article>
</template>
<script>
import content from '../../locales/en/content/privacy-policy';

export default {
    name: "privacy-policy",
    auth: false,
    data() {
        return {
            content
        }
    }
};
</script>
