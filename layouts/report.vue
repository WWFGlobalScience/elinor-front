<template>
    <div class="page-report">
        <report-aside />
        <div class="content-report">
            <report-btn-download />
            <report-header />
            <Nuxt keep-alive />
        </div>
    </div>
</template>

<script>
export default {
    name: "layout-report"
};
</script>
