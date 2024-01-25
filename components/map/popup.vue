<template>
    <div v-if="assessment">
        <map-assessment-header :assessment="assessment.properties" />
        <div class="flex flex-col gap-4 border-t border-b p-4 border-grayy-border">
            <div v-if="assessment.properties.published_version" class="flex flex-col font-montserrat">
                <p class="text-xs leading-4">{{ $t("default.version") }}</p>
                <p class="text-s leading-4"><strong>
                    {{ assessment.properties.published_version }}
                </strong></p>
            </div>
            <div v-if="assessment.properties.management_area" class="flex flex-col font-montserrat">
                <p class="text-xs leading-4">Managed Area</p>
                <p class="text-s leading-4 text-turqy font-semibold break-words">
                    {{ assessment.properties.management_area.name}}
                </p>
            </div>
        </div>
        <div class="flex justify-start p-4">
            <a
                @click="viewFunction"
                role="button"
                class="btn--border-turqy btn--border-turqy--small btn--opacity--child">
                    <span class="btn--opacity__target pt-2 pb-2">View</span>
                    <img src="~/assets/img/ico-button-arrow-turqy.svg" alt="" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-popup",
    props: ["assessment", "click"],
    methods: {
        viewFunction: function () {
           this.click();
        }
   }
};
</script>
