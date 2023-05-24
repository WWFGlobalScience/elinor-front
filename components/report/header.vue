<template>
    <header
        class="mt-5 ml-16 flex justify-start gap-8 items-center border-grayy-border border-b pb-4"
    >
        <div class="flex gap-2 flex-col items-center">
            <div
                class="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-poor"
            >
                <span class="text-white text-[40px] font-montserratSemiBoldPdf"
                    >9</span
                >
            </div>
            <span
                class="uppercase text-grayy-lighter font-bold text-[12px] font-montserratSemiBoldPdf"
                >out of 100</span
            >
        </div>
        <div class="text">
            <p
                class="text-[14px] font-semibold uppercase text-grayy-lighter font-montserratNormalPdf"
            >
                Country
            </p>
            <h1 class="text-[56px] leading-none font-montserratSemiBoldPdf">
                Lorem ipsum
            </h1>
            <p
                class=" mt-2 text-[24px] font-montserratSemiBoldPdf uppercase text-grayy-lighter"
            >
                Year 2023
            </p>
        </div>
    </header>
</template>
<script>
export default {
    name: "report-header"
};
</script>
