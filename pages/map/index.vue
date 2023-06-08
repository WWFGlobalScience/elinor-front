<template>
    <div style="height: 100vh; width: 100%">
        <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
        >
            <l-tile-layer :url="url" :attribution="attribution" />

            <l-marker :lat-lng="withTooltip" :icon="icon">
                <l-tooltip>
                    <div @click="innerClick" class="w-[300px] ">
                        <p class="w-[300px]">
                            I am a tooltip Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Quisque sed pretium
                            nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                            Donec finibus semper metus id malesuada. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit. Quisque
                            sed pretium nisl, ut sagittis sapien. Sed vel
                            sollicitudin nisi. Donec finibus semper metus id
                            malesuada. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Quisque sed pretium nisl, ut
                            sagittis sapien. Sed vel sollicitudin nisi. Donec
                            finibus semper metus id malesuada.
                        </p>
                    </div>
                </l-tooltip>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

export default {
    name: "map",
    auth: false,
    layout: "map",
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip
    },
    data() {
        return {
            zoom: 13,
            center: latLng(47.41322, -1.219482),
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(47.41322, -1.219482),
            withTooltip: latLng(47.41422, -1.250482),
            currentZoom: 11.5,
            currentCenter: latLng(47.41322, -1.219482),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            showMap: true,
            icon: icon({
                iconUrl: require("~/assets/img/marks/mark-poor.svg"),
                iconSize: [28, 36],
                iconAnchor: [14, 36]
            })
        };
    },
    methods: {
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert("Click!");
        }
    },
    head() {
        return {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                }
            ]
        };
    }
};
</script>
