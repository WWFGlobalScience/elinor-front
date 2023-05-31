<template>
    <aside v-if="report" class="aside-report">
        <div id="mapContainer" class="relative">
            <img class="w-full h-full"
                alt="mapox image"
                :src="getMapImageUrl()" />
            <div class="map-content">
                <div class="brand w-[144px] h-[144px]">
                    <img src="~/assets/img/report-brand.png" alt="logo" />
                </div>
                <div v-if="report.management_area" class="card-map">
                    <div class="card-map-col">
                        <p>
                            Total hectareas<strong class="accent">{{ report.management_area.reported_size.toLocaleString() }} h </strong>
                        </p>
                        <!--<p>
                            Previous Assessment date<strong>12-12-2003</strong>
                        </p>-->
                        <p>
                            Current Assessment date
                            <strong>{{ new Date(report.management_area.version_date).toLocaleDateString('es-ES') }}</strong>
                        </p>
                    </div>
                    <div class="card-map-col self-start">
                        <p>
                            Type of Assessment date<strong> ???? </strong>
                        </p>
                        <p v-if="report.management_area.governance_type">
                            MA Governance type<strong>{{ report.management_area.governance_type }}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import { mapState } from "vuex";

import * as turf from '@turf/turf'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ";

export default {
    name: "report-aside",
    computed: {
        ...mapState({
            report: state => state.assessments.report,
            managementArea: state => state.managementareas.instance
        })
    },
    methods: {
        getMapImageUrl() {
            let center;
            if(this.managementArea.polygon) {
                const polygon = turf.multiPolygon(this.managementArea.polygon.coordinates);
                center = turf.centroid(polygon);
                var bbox = turf.bbox(polygon)
                
                //console.log(new mapboxgl.Map({container: 'map',}).fitBounds(bbox))
                console.log(bbox);

            } else if(this.managementArea.point){
                center = turf.point(this.managementArea.point.coordinates);
                this.marker = new mapboxgl.Marker()
                    .setLngLat(this.managementArea.point.coordinates);
            } else {
                center = turf.point(["0","0"]);
            }


            const token = mapboxgl.accessToken;
            const baseUrl =
                "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/";
            const zoom = 'auto';
            const coordinates = center.geometry.coordinates;
            const size = "570x1024@2x";
            const overlay = `geojson(${this.getGeoJson()})/`;
            //const url = `${baseUrl}${overlay}${coordinates},${zoom}/${size}?access_token=${token}`;
            const url = `${baseUrl}${overlay}auto/${size}?padding=50,50&access_token=${token}`;
            return url;
        },
        getGeoJson(){
            var colorMapping = {
                'poor': '#EE8383',
                'average': '#F5C243',
                'good': '#CCCC25',
                'excellent': '#4FAD5B'
            }
            var color = this.getAssessmentColor(this.report.score);
            var geojson = `{
                "type": "FeatureCollection",
                "features": [  
                    {
                    "type": "Feature",
                    "properties": {
                        "stroke": "${colorMapping[color]}",
                        "stroke-width": 3,
                        "stroke-opacity": 1,
                        "fill": "${colorMapping[color]}",
                        "fill-opacity": 0.5
                    },
                    "geometry": {
                        "coordinates": ${JSON.stringify(this.managementArea.polygon.coordinates.flat(1))},
                        "type": "Polygon"
                    },
                    "id": 0
                    }
                ]
            }`;
            var url = geojson.replace(/\s/g, '')
            url = encodeURI(url)
            url = url.replace(/#/g, '%23');
            return url;
        }
    }
};
</script>

