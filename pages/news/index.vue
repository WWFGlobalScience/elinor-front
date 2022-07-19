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
import news from '../../content/news.js'
const perPage = 5;

export default {
    name: 'news',
    data() {
        return {
            visibleNews: [],
            news,
            page: 1,
            perPage
        }
    },
    methods: {
        load() {
            const position = perPage * (this.page - 1);
            this.visibleNews = [...this.visibleNews, ...this.news.slice(position, position + perPage)];
            this.page++;
        }
    },
    mounted() {
        this.load();
    }
}
</script>
