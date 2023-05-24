<template>
    <div id="temp-target" class="page-report page-report--map relative">
        <report-aside-map />
        <div class="content-report">
            <report-header />
            <Nuxt keep-alive />
        </div>
    </div>
</template>

<script>
export default {
    name: "layout-report-assessment"
};
</script>
