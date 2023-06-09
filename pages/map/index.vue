<template>
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
        <MglMarker :coordinates="coordinates" color="blue">
            <template slot="marker">
                <div>
                    <img
                        src="~/assets/img/marks/mark-poor.svg"
                        width="40"
                        height="40"
                    />
                </div>
            </template>
            <MglPopup anchor="left">
                <p class="font-montserrat text-xs font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus aperiam possimus error officiis tempore voluptatem
                    fugit perferendis, molestiae neque. Natus, non voluptatem
                    sit eaque ex quo laboriosam deleniti impedit vel.
                </p>
            </MglPopup>
        </MglMarker>
    </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";

export default {
    name: "map",
    auth: false,
    layout: "map",
    components: {
        MglMap,
        MglMarker,
        MglPopup
    },
    data() {
        return {
            accessToken:
                "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ",
            mapStyle: "mapbox://styles/mapbox/satellite-v9",
            coordinates: [-111.549668, 39.014]
        };
    },

    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;
    },

    head() {}
};
</script>
