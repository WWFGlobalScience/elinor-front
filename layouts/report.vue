<template>
    <div id="temp-target" class="page-report">
        <report-aside />
        <div class="content-report">
            <report-header />
            <Nuxt keep-alive />
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout-report',
};
</script>
