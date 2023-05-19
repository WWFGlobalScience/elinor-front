<template>
    <header class="header--page">
        <div class="container flex justify-start gap-8 items-center">
            <div class="flex gap-2 flex-col items-center">
                <div
                    class="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-poor"
                >
                    <span class="text-white text-[40px] font-semibold">9</span>
                </div>
                <span class="uppercase text-grayy-lighter font-bold text-[12px]"
                    >out of 100</span
                >
            </div>
            <div class="text">
                <h1 class="text-[66px]">Lorem ipsum</h1>
                <p
                    class="text-[30px] font-semibold uppercase text-grayy-lighter"
                >
                    Year 2023
                </p>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: "report-header"
};
</script>
