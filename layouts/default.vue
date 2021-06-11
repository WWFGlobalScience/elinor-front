<template>
    <div id="app">
        <default-header></default-header>
        <main role="main">
            <default-sidebar></default-sidebar>
            <Nuxt />
        </main>
    </div>
</template>

<script>
export default {
    name: 'layout-default'
}
</script>