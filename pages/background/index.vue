<template>
    <article class="page page--flushed ">
        <section class="section section--main">
            <img src="~/assets/img/methodology-section.jpg" alt=""/>
        </section>
        <section class="section" v-html="content" />
    </article>
</template>

<script>
import locales from '../../locales';

export default {
    name: "background",
    auth: false,
    computed: {
        content() {
            const currentLanguage = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale);
            console.log(locales);
            return locales[currentLanguage.code].background;
        },
    }
};
</script>
