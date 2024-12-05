<template>
    <a
        @click="loadMore()"
        role="button"
        class="btn--border-turqy btn--border-turqy--small btn--opacity--child"
    >
        <span class="btn--opacity__target pt-2 pb-2">{{ name }}</span>
        <img src="~/assets/img/ico-button-arrow-turqy.svg" alt="" />
    </a>
</template>

<script>
export default {
    name: 'buttons-btn-view',
    props: ['loadMore', 'name'],
};
</script>
