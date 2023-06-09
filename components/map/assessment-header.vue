<template>
    <div
        class="flex flex-row flex-wrap items-center justify-start gap-2 p-4 border-b-1 border-grayy font-montserrat"
    >
        <div
            :class="
                'flex justify-center items-center w-[40px] h-[40px] rounded-full bg-' +
                    feedback
            "
        >
            <p class="text-white text-s font-bold leading-4 ">70</p>
        </div>
        <div class="flex flex-1 flex-col gap-0">
            <p
                class="font-montserrat font-semibold text-turqy text-[14px] leading-4"
            >
                Assessment name
            </p>
            <p class="text-dark text-xs font-semibold leading-4">
                Year 2023
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-assessment-header",
    props: ["assessment", "feedback"]
};
</script>
