<template>
    <div
        class="absolute z-50 bottom-8 left-8 bg-white flex flex-row justify-center items-center p-4 border-radius--card gap-5"
    >
        <div class="flex flex-row justify-start items-center gap-2">
            <span
                class="flex justify-center items-center border-poor border w-5 h-5 rounded-full"
            >
                <span class="block bg-poor w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold">Plan</div>
        </div>
        <div class="flex flex-row justify-start items-center gap-2">
            <span
                class="flex justify-center items-center border-average border w-5 h-5 rounded-full"
            >
                <span class="block bg-average w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold">Build</div>
        </div>
        <div class="flex flex-row justify-start items-center gap-2">
            <span
                class="flex justify-center items-center border-good border w-5 h-5 rounded-full"
            >
                <span class="block bg-good w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold">
                Strengthen
            </div>
        </div>
        <div class="flex flex-row justify-start items-center gap-2">
            <span
                class="flex justify-center items-center border-excellent border w-5 h-5 rounded-full"
            >
                <span class="block bg-excellent w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold">Mantain</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-legend"
};
</script>
