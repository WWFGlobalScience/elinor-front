<template>
    <aside class="aside-report">
        <div id="mapContainer" class="relative">
            <img
                class="w-full h-full"
                alt="mapox image"
                :src="getMapImageUrl()"
            />
            <div class="map-content">
                <div class="brand w-[144px] h-[144px]">
                    <img src="~/assets/img/report-brand.png" alt="logo" />
                </div>
                <div class="card-map">
                    <div class="card-map-col">
                        <p>
                            Total hectareas<strong class="accent"
                                >10.555 h</strong
                            >
                        </p>
                        <p>
                            Previous Assessment date<strong>12-12-2003</strong>
                        </p>
                        <p>
                            Current Assessment date<strong>12-12-2003</strong>
                        </p>
                    </div>
                    <div class="card-map-col">
                        <p>Total hectareas<strong>10.555 h</strong></p>
                        <p>
                            Previous Assessment date<strong>12-12-2003</strong>
                        </p>
                        <p>
                            Current Assessment date<strong>12-12-2003</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ";

export default {
    name: "report-aside",
    methods: {
        getMapImageUrl() {
            const token = mapboxgl.accessToken;
            const baseUrl =
                "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/";
            const zoom = 2;
            const coordinates = "41.146,1.129";
            const size = "570x1024@2x";
            const url = `${baseUrl}${coordinates},${zoom},0.00,0.00/${size}?access_token=${token}`;
            return url;
        }
    }
};
</script>
