<template>
    <div
        class="absolute z-50 bottom-8 left-8 bg-white flex flex-row justify-center items-center p-4 border-radius--card gap-5"
    >
        <div @click="changeFilter('plan')" class="flex flex-row justify-start items-center gap-2 cursor-pointer">
            <span
                class="flex justify-center items-center border-poor border w-5 h-5 rounded-full"
            >
                <span class="block bg-poor w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold hover:text-black" :class="{'text-black': range == 'plan'}">Plan</div>
        </div>
        <div @click="changeFilter('build')" class="flex flex-row justify-start items-center gap-2 cursor-pointer">
            <span
                class="flex justify-center items-center border-average border w-5 h-5 rounded-full"
            >
                <span class="block bg-average w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold hover:text-black" :class="{'text-black': range == 'build'}">Build</div>
        </div>
        <div @click="changeFilter('strengthen')" class="flex flex-row justify-start items-center gap-2 cursor-pointer">
            <span
                class="flex justify-center items-center border-good border w-5 h-5 rounded-full"
            >
                <span class="block bg-good w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold hover:text-black" :class="{'text-black': range == 'strengthen'}">
                Strengthen
            </div>
        </div>
        <div @click="changeFilter('mantain')" class="flex flex-row justify-start items-center gap-2 cursor-pointer">
            <span
                class="flex justify-center items-center border-excellent border w-5 h-5 rounded-full"
            >
                <span class="block bg-excellent w-3 h-3 rounded-full"></span>
            </span>
            <div class="text-xs font-montserrat font-semibold hover:text-black" :class="{'text-black': range == 'mantain'}">Mantain</div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "map-legend",
    computed: {
        ...mapState({
            range: state => state.map.filters.range
        })
    },
    methods: {
        ...mapActions({
            filter: 'map/filter',
            removeFilter: 'map/removeFilter'
        }),
        changeFilter(value) {
            if(value && value != this.range) {
                this.filter({"name": "range", "value": value});
            } else {
                this.removeFilter("range");
            }
        }
    }
};
</script>
