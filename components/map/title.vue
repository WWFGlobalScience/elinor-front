<template>
    <div class="absolute top-4 left-8 flex flex-col">
        <div class="flex flex-row items-center gap-2">
            <img src="~/assets/img/nav-icons/ico-map-white.svg" width="24" alt="" />
            <h1 class="text-m font-montserrat font-bold text-white text-shadow">
                {{ $t('pages.map.title') }}
            </h1>
        </div>
        <h2 v-if="attribute" class="text-m font-montserrat font-semibold text-white ml-8 text-shadow">
            {{ attribute || country }}
        </h2>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "map-title",
    computed: {
        ...mapState({
            attribute: state => state.map.filters.attribute,
            country: state => state.map.filters.country
        })
    }
};
</script>
