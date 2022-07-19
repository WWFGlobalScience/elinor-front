<template>
    <article class="page page--flushed">
        <section class="section section--main" v-html="content"></section>
    </article>
</template>
<script>
import content from '../../content/terms-of-use';

export default {
    name: "terms-of-use",
    auth: false,
    data() {
        return {
            content
        }
    }
};
</script>
