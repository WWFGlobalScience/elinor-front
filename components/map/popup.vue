<template>
    <div>
        <map-assessment-header feedback="poor" />
        <div
            class="flex flex-col gap-4 border-t border-b p-4 border-grayy-border"
        >
            <div class="flex flex-col font-montserrat">
                <p class="text-xs leading-4">Version</p>
                <p class="text-s leading-4"><strong>2.1</strong></p>
            </div>
            <div class="flex flex-col font-montserrat">
                <p class="text-xs leading-4">Version</p>
                <p class="text-s leading-4 text-turqy font-semibold">
                    Assessment name
                </p>
            </div>
        </div>
        <div class="flex justify-start p-4">
            <buttons-btn-view name="View" />
        </div>
    </div>
</template>

<script>
export default {
    name: "map-popup"
};
</script>
