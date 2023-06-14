<template>
    <aside class="aside-report">
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
                        <p v-if="report.management_area.date_established">
                            Year established
                            <strong>{{ new Date(report.management_area.date_established).toLocaleDateString($i18n.locale) }}</strong>
                        </p>
                        <p v-if="report.management_area.governance_type">
                            MA governance type
                            <strong>{{ report.management_area.governance_type }}</strong>
                        </p>
                        <p v-if="hectareas">
                            Total hectareas<strong>{{ hectareas.toLocaleString($i18n.locale) }} h </strong>
                        </p>
                    </div>
                    <div class="card-map-col self-start">
                        <p v-if="report.collection_method">
                            Assessment type
                            <strong>{{ report.collection_method }}</strong>
                        </p>
                        <p v-if="report.management_area.version_date">
                            Current assessment date
                            <strong>{{ new Date(report.management_area.version_date).toLocaleDateString($i18n.locale) }}</strong>
                        </p>
                        <!--<p>
                            previous assessment date
                            <strong class="accent"></strong>
                        </p>-->
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
        }),
        hectareas() {
            if(this.managementArea.polygon){
                const polygon = turf.polygon(this.managementArea.polygon.coordinates.flat(1))
                const area = (turf.area(polygon) * 0.0001).toFixed(0)
                return this.managementArea.polygon.coordinates ? Number(area)  : 0
            } else{
                return null
            }
        }
    },
    methods: {
        getMapImageUrl() {
            const token = mapboxgl.accessToken;
            const baseUrl = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/";
            const size = "570x1024@2x";

            if(this.managementArea.polygon && this.managementArea.polygon.coordinates.length > 0){
                return `${baseUrl}geojson(${this.getGeoJson()})/auto/${size}?padding=300,130,400&access_token=${token}`;
            }else if(this.managementArea.point && this.managementArea.point.coordinates.length == 0){
                var center = turf.point(this.managementArea.point.coordinates)
                return `${baseUrl}${center}/${size}?&access_token=${token}`;
            }else{
                return `${baseUrl}auto/${size}?padding=300,130,400&access_token=${token}`;
            }
        },
        getGeoJson(){
            var colorMapping = {
                'poor': '#EE8383',
                'average': '#F5C243',
                'good': '#CCCC25',
                'excellent': '#4FAD5B'
            }
            var color = this.getAssessmentColor(this.report.score);
            var coordinates = turf.simplify(
                turf.cleanCoords(this.managementArea.polygon),
                {tolerance: 0.008, highQuality: false}
            ).coordinates;
            
            var geojson = `{
                "type": "FeatureCollection",
                "features": [  
                    {
                    "type": "Feature",
                    "properties": {
                        "stroke": "${colorMapping[color]}",
                        "stroke-width": 3,
                        "stroke-opacity": 0.5,
                        "fill": "${colorMapping[color]}",
                        "fill-opacity": 0.1
                    },
                    "geometry": {
                        "coordinates": ${JSON.stringify(coordinates)},
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

