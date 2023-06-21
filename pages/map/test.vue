<template>
    <MglMap
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="coordinates"
        class="min-h-[93vh] relative"
        @load="onMapLoaded"
    >
        <MglNavigationControl position="top-right" />
        
        <MglMarker @click="refs.mapMarker.togglePopup()" ref="mapMarker" :coordinates="popup.coordinates">
            <template slot="marker"><div></div></template>
            <MglPopup ref="mapPopup" :coordinates="coordinates" anchor="top-left" :closeButton="true" :closeOnClick="true">
                <map-popup :assessment="popup.assessment" :click="toggleDetail" />
            </MglPopup>
        </MglMarker>

        <MglGeojsonLayer
            :sourceId="geoJsonSource.data.id"
            :source="geoJsonSource"
            layerId="clusterLayer"
            :layer="geoJsonLayer"
        />

        <MglGeojsonLayer
            :sourceId="geoJsonSource.data.id"
            :source="geoJsonSource"
            layerId="scoreLayer"
            :layer="scoreLayer"
        />

        <MglGeojsonLayer
            :sourceId="geoJsonSource.data.id"
            :source="geoJsonSource"
            layerId="markersLayer"
            :layer="markersLayer"
        />

        <MglGeojsonLayer
            :sourceId="polygonSource.data.id"
            :source="polygonSource"
            layerId="polygonLayer"
            :layer="polygonLayer"
        />
        <MglGeojsonLayer
            :sourceId="polygonSource.data.id"
            :source="polygonSource"
            layerId="polygonLineLayer"
            :layer="polygonLineLayer"
        />

        <map-title />
        <map-legend />
        <map-form />
        <map-box-list v-if="country" :list="filteredData" />
        <map-box-assessment :close="toggleDetail" v-show="showDetail" v-if="popup.assessment" :assessment="popup.assessment" />
    </MglMap>
</template>

<script>
import { mapState } from 'vuex'
import * as turf from '@turf/turf'
import Mapbox from "mapbox-gl";

import {
    MglMap,
    MglMarker,
    MglPopup,
    MglAttributionControl,
    MglNavigationControl,
    MglFullscreenControl,
    MglScaleControl,
    MglGeojsonLayer
} from "vue-mapbox";

export default {
    name: "map-report",
    auth: false,
    layout: "map",
    components: {
        MglMap,
        MglMarker,
        MglPopup,
        MglNavigationControl,
        MglAttributionControl,
        MglScaleControl,
        MglFullscreenControl,
        MglGeojsonLayer
    },
    fetchOnServer: false,
    data() {
        return {
            loaded: false,
            mapbox: null,
            accessToken: "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ",
            mapStyle: "mapbox://styles/mapbox/satellite-v9",
            coordinates: [0, 39.014],
            popup: {
                coordinates: [-122.9, 50.1], // this can't be blank!  it won't be shown but pick something
                showed: false,
                assessment: null,
            },
            showDetail: false,
            geoJsonSource: {
                type: 'geojson',
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 20,
                data: {
                    id: "assessmentsReport",
                    type: "FeatureCollection",
                    features: [],
                },
                clusterProperties: {
                    "sum": ["+", ["get", "score"]]
                },
            },
            polygonSource: {
                type: 'geojson',
                data: {
                    id: "polygonSource",
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'MultiPolygon',
                        coordinates: []
                    }
                }
            },
            geoJsonLayer: {
                type: "circle",
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': [
                        'step',
                        ["/", ["number", ["get", "sum"]], ["number", ["get", "point_count"]]],
                        '#EE8383',
                        29,
                        '#CCCC25',
                        59,
                        '#F5C243',
                        89,
                        '#4FAD5B',
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        13,
                        3,
                        16,
                        8,
                        18 
                    ]
                }
            },

            scoreLayer: {
                type: 'symbol',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': [
                        'number-format',
                        //["round",["/", ["number", ["get", "sum"]], ["number", ["get", "point_count"]]]],
                        ["round",["number", ["get", "point_count"]]],
                        { 'min-fraction-digits': 0, 'max-fraction-digits': 0 }
                    ],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                paint: {
                    "text-color": [
                        'step',
                        ["/", ["number", ["get", "sum"]], ["number", ["get", "point_count"]]],
                        '#EE8383', //default
                        29,
                        '#CCCC25', // greater than 29
                        59,
                        '#F5C243',
                        89,
                        '#4FAD5B'
                    ]
                }
            },
            markersLayer: {
                type: 'symbol',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': [
                        'step',
                        ['get', 'score'],
                        'mark-poor',
                        29,
                        'mark-average',
                        59,
                        'mark-good',
                        89,
                        'mark-excellent',
                    ]
                }
            },

            polygonLayer: {
                'type': 'fill',
                'source': 'polygonSource',
                'layout': {},
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'score'],
                        '#EE8383',
                        29, '#F5C243',
                        59, '#CCCC25',
                        89, '#4FAD5B',
                    ],
                    'fill-opacity': 0.5,

                }
            },

            polygonLineLayer: {
                'type': 'line',
                'source': 'polygonSource',
                'layout': {},
                'paint': {
                    'line-color': [
                        'step',
                        ['get', 'score'],
                        '#EE8383',
                        29, '#F5C243',
                        59, '#CCCC25',
                        89, '#4FAD5B',
                    ],
                    'line-width': 3
                }
            },
        };
    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            reports: state => state.reports.list,
            country: state => state.reports.filters.management_area_countries,
            attribute: state => state.reports.filters.attributes,
            management_area_countries: state => state.countries.management_area_countries,
        }),
        filteredData(){
            if(!this.reports) return null
            
            var filtered = this.reports.filter((report) => 
                report.geometry && 
                report.geometry.coordinates.length > 0)
            
            let mapped = filtered.map((x) => {
                const polygon = turf.multiPolygon(x.geometry.coordinates);
                let center = turf.centroid(polygon);
                center.id = x.id
                center.properties = x.properties
                return center
            });
            return mapped
        }
    },
    watch: {
        async reports () {
            this.geoJsonSource.data.features = this.filteredData
            //this.map.getSource('assessmentsReport').setData(this.geoJsonSource)
        }
    },
    methods: {
        async onMapLoaded(e) {
            this.map = e.map;
            e.map.loadImage('/img/marks/mark-poor.png', (error, image) => { if (error) {throw error;}
                e.map.addImage('mark-poor', image);
            });
            e.map.loadImage('/img/marks/mark-average.png', (error, image) => { if (error) {throw error;}
                e.map.addImage('mark-average', image);
            });
            e.map.loadImage('/img/marks/mark-good.png', (error, image) => { if (error) {throw error;}
                e.map.addImage('mark-good', image);
            });
            e.map.loadImage('/img/marks/mark-excellent.png', (error, image) => { if (error) {throw error;}
                e.map.addImage('mark-excellent', image);
            });

            e.map.on('mouseenter', 'clusterLayer', () => {
                e.map.getCanvas().style.cursor = 'pointer';
            });
            e.map.on('mouseleave', 'clusterLayer', () => {
                e.map.getCanvas().style.cursor = '';
            });
            e.map.on('mouseenter', 'markersLayer', () => {
                e.map.getCanvas().style.cursor = 'pointer';
            });
            e.map.on('mouseleave', 'markersLayer', () => {
                e.map.getCanvas().style.cursor = '';
            });
            e.map.on('click', 'clusterLayer', (f) => {
                const features = e.map.queryRenderedFeatures(f.point, {
                    layers: ['clusterLayer']
                });
                const clusterId = features[0].properties.cluster_id;
                e.map.getSource('assessmentsReport').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
    
                        e.map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
            e.map.on('click', 'markersLayer', (f) => {
                const coordinates = f.features[0].geometry.coordinates.slice();
                this.popup.coordinates = coordinates
                this.popup.showed = true
                this.popup.assessment = f.features[0]

                this.$refs.mapMarker.togglePopup()
            });
        },
        getCountryNameByCode(code) {
            if(code) {
                return this.management_area_countries.filter(country => country.code === code)[0].name;
            }
        },
        toggleDetail(){
            this.showDetail = !this.showDetail
            if(this.showDetail){
                this.$refs.mapMarker.togglePopup()
                var selected = this.reports.find(e => e.id == this.popup.assessment.id)

                this.polygonSource.data.geometry = selected.geometry
                this.polygonSource.data.properties.score = selected.properties.score
                
                var bbox = turf.bbox(this.reports.find(e => e.id == this.popup.assessment.id).geometry)
                
                this.map.fitBounds(bbox, {
                    padding: 40
                });
            }
        }
    },
    created() {
        this.mapbox = Mapbox;
    },
    async mounted() {
        await this.$store.dispatch( 'reports/fetchReportsGeoJson')
        this.geoJsonSource.data.features = this.filteredData
        this.loaded = true;
    }
};

</script>