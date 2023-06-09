<template>
    <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="coordinates"
        class="min-h-screen"
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
