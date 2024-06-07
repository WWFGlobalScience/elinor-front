<template>
    <aside class="aside-report">
        <figure class="background">
            <img src="~/assets/img/bg-report-sidebar-min.png" />
        </figure>
        <figure class="brand" v-if="!!logo">
            <img src="~/assets/img/report-brand.png" />
        </figure>
    </aside>
</template>
<script>
export default {
    name: "report-aside",
    props: {
        logo: {
            default: true
        }
    },
};
</script>
