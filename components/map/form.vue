<template>
    <form
        action=""
        class="absolute z-50 top-4 right-[60px] flex flex-row gap-4"
    >
        <div class="w-[230px]">
            <map-select />
        </div>
        <div class="w-[230px]">
            <map-select />
        </div>
    </form>
</template>

<script>
export default {
    name: "map-form"
};
</script>
