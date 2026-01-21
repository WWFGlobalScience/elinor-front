<template>
  <div
    class="map-legend absolute z-40 bottom-2 md:bottom-5 left-8 md:left-2 bg-white px-4 py-2 border-radius--card"
  >
    <!-- Desktop: single row -->
    <div class="map-legend__desktop">
      <div
        @click="changeFilter('plan')"
        class="flex flex-row justify-start items-center gap-2 cursor-pointer"
      >
        <span
          class="flex justify-center items-center border-poor border w-5 h-5 rounded-full"
        >
          <span class="block bg-poor w-3 h-3 rounded-full"></span>
        </span>
        <div
          class="text-xs leading-[22px] hover:text-black uppercase"
          :class="{ 'text-black': range == 'plan' }"
        >
          {{ $t('pages.map.legend.plan') }}
        </div>
      </div>
      <div
        @click="changeFilter('build')"
        class="flex flex-row justify-start items-center gap-2 cursor-pointer"
      >
        <span
          class="flex justify-center items-center border-average border w-5 h-5 rounded-full"
        >
          <span class="block bg-average w-3 h-3 rounded-full"></span>
        </span>
        <div
          class="text-xs leading-[22px] hover:text-black uppercase"
          :class="{ 'text-black': range == 'build' }"
        >
          {{ $t('pages.map.legend.build') }}
        </div>
      </div>
      <div
        @click="changeFilter('strengthen')"
        class="flex flex-row justify-start items-center gap-2 cursor-pointer"
      >
        <span
          class="flex justify-center items-center border-good border w-5 h-5 rounded-full"
        >
          <span class="block bg-good w-3 h-3 rounded-full"></span>
        </span>
        <div
          class="text-xs leading-[22px] hover:text-black uppercase"
          :class="{ 'text-black': range == 'strengthen' }"
        >
          {{ $t('pages.map.legend.strengthen') }}
        </div>
      </div>
      <div
        @click="changeFilter('mantain')"
        class="flex flex-row justify-start items-center gap-2 cursor-pointer"
      >
        <span
          class="flex justify-center items-center border-excellent border w-5 h-5 rounded-full"
        >
          <span class="block bg-excellent w-3 h-3 rounded-full"></span>
        </span>
        <div
          class="text-xs leading-[22px] hover:text-black uppercase"
          :class="{ 'text-black': range == 'mantain' }"
        >
          {{ $t('pages.map.legend.mantain') }}
        </div>
      </div>
    </div>

    <!-- Mobile/Tablet: two rows -->
    <div class="map-legend__mobile">
      <!-- First row: Plan and Build -->
      <div class="flex flex-row items-center gap-4">
        <div
          @click="changeFilter('plan')"
          class="flex flex-row justify-start items-center gap-2 cursor-pointer"
        >
          <span
            class="flex justify-center items-center border-poor border w-5 h-5 rounded-full"
          >
            <span class="block bg-poor w-3 h-3 rounded-full"></span>
          </span>
          <div
            class="text-xs leading-[22px] hover:text-black uppercase"
            :class="{ 'text-black': range == 'plan' }"
          >
            {{ $t('pages.map.legend.plan') }}
          </div>
        </div>
        <div
          @click="changeFilter('build')"
          class="flex flex-row justify-start items-center gap-2 cursor-pointer"
        >
          <span
            class="flex justify-center items-center border-average border w-5 h-5 rounded-full"
          >
            <span class="block bg-average w-3 h-3 rounded-full"></span>
          </span>
          <div
            class="text-xs leading-[22px] hover:text-black uppercase"
            :class="{ 'text-black': range == 'build' }"
          >
            {{ $t('pages.map.legend.build') }}
          </div>
        </div>
      </div>
      <!-- Second row: Strengthen and Maintain -->
      <div class="flex flex-row items-center gap-4 mt-2">
        <div
          @click="changeFilter('strengthen')"
          class="flex flex-row justify-start items-center gap-2 cursor-pointer"
        >
          <span
            class="flex justify-center items-center border-good border w-5 h-5 rounded-full"
          >
            <span class="block bg-good w-3 h-3 rounded-full"></span>
          </span>
          <div
            class="text-xs leading-[22px] hover:text-black uppercase"
            :class="{ 'text-black': range == 'strengthen' }"
          >
            {{ $t('pages.map.legend.strengthen') }}
          </div>
        </div>
        <div
          @click="changeFilter('mantain')"
          class="flex flex-row justify-start items-center gap-2 cursor-pointer"
        >
          <span
            class="flex justify-center items-center border-excellent border w-5 h-5 rounded-full"
          >
            <span class="block bg-excellent w-3 h-3 rounded-full"></span>
          </span>
          <div
            class="text-xs leading-[22px] hover:text-black uppercase"
            :class="{ 'text-black': range == 'mantain' }"
          >
            {{ $t('pages.map.legend.mantain') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'map-legend',
  computed: {
    ...mapState({
      range: (state) => state.map.filters.range,
    }),
  },
  methods: {
    ...mapActions({
      filter: 'map/filter',
      removeFilter: 'map/removeFilter',
    }),
    changeFilter(value) {
      if (value && value != this.range) {
        this.filter({ name: 'range', value: value });
      } else {
        this.removeFilter('range');
      }
    },
  },
};
</script>
