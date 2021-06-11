<template>
    <header class="header--page">
        <div class="container">
            <h1 class="mb-0">
                <img src="~/assets/img/ico-managed-areas-turqy.svg">
                <span>{{ $t( 'pages.managed-areas.content.header.title' ) }}</span>
            </h1>
            <h2 class="ma__name">{{ ma["name"] }}</h2>
        </div>
    </header>
</template>

<script>
export default {
    name: 'ma-header',
    props: [ 'ma' ]
}
</script>