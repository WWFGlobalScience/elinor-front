<template>
    <div class="absolute top-4 left-8 flex flex-col">
        <div class="flex flex-row items-center gap-2">
            <img src="~/assets/img/nav-icons/ico-map-white.svg" width="24" alt="" />
            <h1 class="text-m font-montserrat font-bold text-white text-shadow">MAP</h1>
        </div>
        <h2 v-if="attribute" class="text-m font-montserrat font-semibold text-white ml-8 text-shadow">
            {{ getAttributeById(attribute).name }}
        </h2>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "map-title",
    computed: {
        ...mapState({
            attributes: state => state.attributes.list,
            attribute: state => state.reports.filters.attributes
        })
    },
    methods: {
        getAttributeById(id) {
            if(id) {
                return this.attributes.filter(attribute => attribute.id === id)[0];
            }
        },
    }
};
</script>
