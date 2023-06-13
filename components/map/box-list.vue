<template>
    <div class="box-map font-montserrat">
        <button type="button" class="btn--opacity absolute right-4 top-4 z-50">
            <img src="~/assets/img/ico-close-popup.svg" />
        </button>
        <div class="p-4 flex gap-2 items-center">
            <span class="bg-poor w-3 h-3 block rounded-full"></span>
            <p class="text-[14px]">
                Country Name
            </p>
        </div>
        <div class="p-4 flex items-center justify-start gap-2 bg-turqy-lighter border-t border-grayy-border">
            <p class="text-m font-light">
                <strong class="font-bold text-turqy">8</strong>
                Assessments covering 20.365 ha
            </p>
        </div>
        <ul>
            <li>
                <map-assessment-header feedback="poor" />
            </li>
            <li>
                <map-assessment-header feedback="excellent" />
            </li>
            <li>
                <map-assessment-header feedback="poor" />
            </li>
            <li>
                <map-assessment-header feedback="average" />
            </li>
            <li>
                <map-assessment-header feedback="poor" />
            </li>
            <li>
                <map-assessment-header feedback="excellent" />
            </li>
            <li>
                <map-assessment-header feedback="poor" />
            </li>
            <li>
                <map-assessment-header feedback="average" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "map-box-list"
};
</script>
