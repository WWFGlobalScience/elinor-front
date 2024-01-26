<template>
    <article class="page page--flushed">
        <section class="section section--main" v-html="content"></section>
    </article>
</template>
<script>
import locales from '../../locales';

export default {
    name: "privacy-policy",
    auth: false,
    computed: {
        content() {
            const currentLanguage = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale);
            return locales[currentLanguage.code].privacyPolicy;
        },
    },
};
</script>
