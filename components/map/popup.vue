<template>
  <div v-if="assessment">
    <map-assessment-header :assessment="assessment.properties" />
    <!-- <div
            class="flex flex-col gap-4 border-t border-b p-4 border-grayy-border"
        >
            <div
                v-if="assessment.properties.published_version"
                class="flex flex-col font-montserrat"
            >
                <p class="text-xs leading-4">{{ $t('default.version') }}</p>
                <p class="text-s leading-4">
                    <strong>
                        {{ assessment.properties.published_version }}
                    </strong>
                </p>
            </div>
            <div
                v-if="assessment.properties.management_area"
                class="flex flex-col font-montserrat"
            >
                <p class="text-xs leading-4">
                    {{ $t('pages.map.popup.managedArea') }}
                </p>
                <p
                    class="text-s leading-4 text-turqy font-semibold break-words"
                >
                    {{ assessment.properties.management_area.name }}
                </p>
            </div>
        </div> -->
    <div class="flex justify-start pt-2">
      <a
        @click="viewFunction"
        role="button"
        class="btn !py-1.5 w-full !justify-center"
      >
        <span
          class="btn--opacity__target text-[12px] font-semibold leading-[22px] !m-0"
          >See Attribute Score</span
        >
        <!-- <img src="~/assets/img/ico-button-arrow-turqy.svg" alt="" /> -->
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-popup',
  props: ['assessment', 'click'],
  methods: {
    viewFunction: function () {
      this.click();
    },
  },
};
</script>
