<template>
    <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="coordinates"
        class="min-h-[93vh] relative"
    >
        <MglAttributionControl />
        <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="top-right" />
        <MglScaleControl />
        <MglMarker :coordinates="coordinates" color="blue" button="none">
            <template slot="marker">
                <img
                    src="~/assets/img/marks/mark-poor.svg"
                    width="24"
                    alt="mark"
                />
            </template>
            <MglPopup anchor="left">
                <map-popup />
            </MglPopup>
        </MglMarker>
        <div
            class="absolute z-50 bottom-8 left-8 bg-white flex flex-row justify-center items-center p-4 border-radius--card gap-5"
        >
            <div class="flex flex-row justify-start items-center gap-2">
                <span
                    class="flex justify-center items-center border-poor border w-5 h-5 rounded-full"
                >
                    <span class="block bg-poor w-3 h-3 rounded-full"></span>
                </span>
                <div class="text-xs font-montserrat font-semibold">Plan</div>
            </div>
            <div class="flex flex-row justify-start items-center gap-2">
                <span
                    class="flex justify-center items-center border-average border w-5 h-5 rounded-full"
                >
                    <span class="block bg-average w-3 h-3 rounded-full"></span>
                </span>
                <div class="text-xs font-montserrat font-semibold">Build</div>
            </div>
            <div class="flex flex-row justify-start items-center gap-2">
                <span
                    class="flex justify-center items-center border-good border w-5 h-5 rounded-full"
                >
                    <span class="block bg-good w-3 h-3 rounded-full"></span>
                </span>
                <div class="text-xs font-montserrat font-semibold">
                    Strengthen
                </div>
            </div>
            <div class="flex flex-row justify-start items-center gap-2">
                <span
                    class="flex justify-center items-center border-excellent border w-5 h-5 rounded-full"
                >
                    <span
                        class="block bg-excellent w-3 h-3 rounded-full"
                    ></span>
                </span>
                <div class="text-xs font-montserrat font-semibold">Mantain</div>
            </div>
        </div>
    </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import {
    MglMap,
    MglMarker,
    MglPopup,
    MglAttributionControl,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl
} from "vue-mapbox";

export default {
    name: "map",
    auth: false,
    layout: "map",
    components: {
        MglMap,
        MglMarker,
        MglPopup,
        MglNavigationControl,
        MglGeolocateControl,
        MglAttributionControl,
        MglScaleControl,
        MglFullscreenControl
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
        this.mapbox = Mapbox;
    },

    head() {}
};
</script>
