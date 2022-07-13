<template>
    <a @click="onClick()" role="button" class="btn btn--opacity--child">
        <span class="btn--opacity__target">{{ $t('pages.news.body.cards.button') }}</span>
        <img src="~/assets/img/ico-select-white.svg" alt="">
    </a>
</template>
<script>
export default {
    name: 'news-btn-more',
    props: ['onClick']
}
</script>
