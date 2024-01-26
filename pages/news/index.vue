<template>
    <article class="page page--flushed" >
        <news-header/>
        <section class="section section--mt-medium section--news">
            <div class="container">
                <news-title/>
                <news-card v-for="(newsInstance, index) in visibleNews" :instance="newsInstance" :key="index" />
                <div v-if="(perPage * page) < news.length + perPage" class="row-btn row-btn--center">
                    <news-btn-more :on-click="load"/>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import locales from '../../locales';
const perPage = 2;
export default {
    name: 'news',
    auth: false,
    data() {
        return {
            page: 1,
            perPage
        }
    },
    computed: {
        news() {
            const currentLanguage = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale);
            return locales[currentLanguage.code].news;
        },
        visibleNews() {
            const position = perPage * (this.page - 1);
            return [...this.news.slice(0, position + perPage)];
        }
    },
    methods: {
        load() {
            this.page++;
        }
    }
}
</script>
