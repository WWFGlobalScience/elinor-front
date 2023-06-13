<template>
    <div class="box-map font-montserrat">
        <button type="button" class="btn--opacity absolute right-4 top-4 z-50">
            <img src="~/assets/img/ico-close-popup.svg" />
        </button>
        <div
            class="flex flex-row flex-wrap items-center justify-start gap-2 p-4 border-b-1 border-grayy font-montserrat"
        >
            <div
                class="flex justify-center items-center w-[52px] h-[52px] rounded-full bg-poor"
            >
                <p class="text-white text-[24px] font-bold leading-4 ">70</p>
            </div>
            <div class="flex flex-1 flex-col gap-0">
                <p
                    class="font-montserrat font-semibold text-turqy text-[14px] leading-4"
                >
                    Assessment name
                </p>
            </div>
        </div>

        <div
            class="p-4 flex flex-col justify-start gap-4 bg-turqy-lighter border-t border-grayy-border"
        >
            <div class="flex flex-col">
                <p class="text-xs font-semibold text-grayy-lighter leading-4">
                    Name of Management Area
                </p>
                <p class="text-s font-semibold leading-6">
                    Lorem ipsum dolor sit amet, et vero consectetur adipiscing
                    elit
                </p>
            </div>
            <div class="flex flex-row justify-start gap-8">
                <div class="flex flex-col ">
                    <p
                        class="text-xs font-semibold text-grayy-lighter leading-4"
                    >
                        Year
                    </p>
                    <p class="text-s font-semibold leading-6">
                        2022
                    </p>
                </div>
                <div class="flex flex-col ">
                    <p
                        class="text-xs font-semibold text-grayy-lighter leading-4"
                    >
                        Version
                    </p>
                    <p class="text-s font-semibold leading-6">
                        2.1
                    </p>
                </div>
                <div class="flex flex-col ">
                    <p
                        class="text-xs font-semibold text-grayy-lighter leading-4"
                    >
                        Area Size
                    </p>
                    <p class="text-s font-semibold leading-6">
                        10.555 h
                    </p>
                </div>
            </div>
        </div>
        <div
            class="flex flex-col chart-content p-4 border-grayy-borde border-t border-b"
        >
            ---- Aquí el chart ----
            <p class="text-s font-semibold leading-4 mt-4">
                By Attributes
            </p>
        </div>
        <div class="flex justify-center p-4">
            <buttons-btn-cta name="hola que ase" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import btnMore from "../documentation/btn-more.vue";
import BtnMore1 from "../news/btn-more.vue";
export default {
    components: { btnMore, BtnMore1 },
    name: "map-box-list"
};
</script>
