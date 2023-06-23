<template>
    <MglMap
        class="min-h-[93vh] relative"
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="coordinates"
        :min-zoom="1"
        :max-zoom="18"
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

        <MglGeojsonLayer
            :sourceId="countrySource.data.id"
            :source="countrySource"
            layerId="countryLayer"
            :layer="countryLayer"
        />

        <map-title />
        <map-legend />
        <map-form />
        <map-box-list v-if="country" :list="filteredData" />
        <map-box-assessment :close="toggleDetail" v-if="popup.assessment && showDetail" :assessment="popup.assessment" />
        <div class="flex align-items-center justify-center py-2 px-4 text-sm text-gray-800 border border-gray-400 rounded bg-white content-center" style="height: 30px;width: 150px;position: absolute;bottom: 20px;right: 20px;">
            Zoom level: {{ zoomLevel.toFixed(1) }}
        </div>
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
            map: null,
            mapbox: null,
            accessToken: "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ",
            mapStyle: "mapbox://styles/mapbox/satellite-v9",
            coordinates: [0, 39.014],
            zoomLevel: 0,
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
                        type: "MultiPolygon",
                        coordinates: []
                    }
                }
            },
            countrySource: {
                type: 'geojson',
                data: {
                    id: "countrySource",
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: "MultiPolygon",
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
                        29, '#CCCC25',
                        59, '#F5C243',
                        89, '#4FAD5B',
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        13,
                        3, 16,
                        8, 18 
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
                        '#EE8383',
                        29, '#CCCC25',
                        59, '#F5C243',
                        89, '#4FAD5B'
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
                        29, 'mark-average',
                        59, 'mark-good',
                        89, 'mark-excellent',
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

            countryLayer: {
                'type': 'line',
                'source': 'countrySource',
                'layout': {},
                'paint': {
                    'line-color': 'white',
                    'line-width': 3,
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
            attributes: state => state.attributes.list,
        }),
        mappedData(){
            if(!this.reports) return null
    
            var filtered = this.reports.filter((report) => 
                report.geometry && 
                report.geometry.coordinates.length > 0 
            )
            
            if(filtered){
                return filtered.map((x) => {
                    if(x.geometry.type == "MultiPolygon"){
                        const polygon = turf.multiPolygon(x.geometry.coordinates)
                        let center = turf.centroid(polygon)
                        center.id = x.id
                        center.properties = x.properties
                        center.properties.hectares = (turf.area(polygon) * 0.0001).toFixed(0)
                        return center
                    }else if(x.geometry.type == "Point"){
                        let center = turf.point(x.geometry.coordinates)
                        center.id = x.id
                        center.properties = x.properties
                        return center
                    }
                })
            }else{
                return []
            }
        },
        filteredData(){
            return this.mappedData.filter((report) => 
                (this.country ? report.properties.management_area.countries && report.properties.management_area.countries.includes(this.countryFilter) : true) &&
                (this.attributeFilter ? JSON.stringify(report.properties.attributes).includes(this.attributeFilter) : true)
            )
        },
        countryFilter(){
            return this.getCountryNameByCode(this.country)
        },
        attributeFilter(){
            return this.getAttributeNameById(this.attribute)
        },
    },
    watch: {
        async reports () {
            this.geoJsonSource.data.features = this.filteredData
        },
        country () {
            this.getCountryGeoJson(this.country)
            this.map.setLayoutProperty('countryLayer', 'visibility', 'visible');
        }
    },
    methods: {
        async onMapLoaded(e) {
            var map = this.map = e.map;
            map.loadImage('/img/marks/mark-poor.png', (error, image) => { if (error) {throw error;}
                map.addImage('mark-poor', image);
            });
            map.loadImage('/img/marks/mark-average.png', (error, image) => { if (error) {throw error;}
                map.addImage('mark-average', image);
            });
            map.loadImage('/img/marks/mark-good.png', (error, image) => { if (error) {throw error;}
                map.addImage('mark-good', image);
            });
            map.loadImage('/img/marks/mark-excellent.png', (error, image) => { if (error) {throw error;}
                map.addImage('mark-excellent', image);
            });

            map.on('mouseenter', 'clusterLayer',() => { map.getCanvas().style.cursor = 'pointer' });
            map.on('mouseleave', 'clusterLayer', () => { map.getCanvas().style.cursor = 'default' });
            map.on('mouseenter', 'markersLayer', () => { map.getCanvas().style.cursor = 'pointer' });
            map.on('mouseleave', 'markersLayer', () => { map.getCanvas().style.cursor = 'default' });

            map.on('click', 'clusterLayer', (f) => {
                const features = e.map.queryRenderedFeatures(f.point, {
                    layers: ['clusterLayer']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('assessmentsReport').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
    
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            map.on('click', 'markersLayer', (f) => {
                const coordinates = f.features[0].geometry.coordinates.slice();
                this.popup.coordinates = coordinates
                this.popup.showed = true
                this.popup.assessment = f.features[0]
                this.$refs.mapMarker.togglePopup()
            });

            map.on('click', 'polygonLayer', function(e) {
                e.preventDefault();
            });

            map.on('click', (e) => {
                if (e.defaultPrevented === false) {
                    map.setLayoutProperty('polygonLayer', 'visibility', 'none');
                    map.setLayoutProperty('polygonLineLayer', 'visibility', 'none');
                    map.setLayoutProperty('countryLayer', 'visibility', 'none');
                }
            });

            map.on('zoom', () => {
                this.zoomLevel = map.getZoom()
            })
        },
        getCountryGeoJson(code){
            if(code){
                fetch(`/geojson/${code}.json`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }
                        return response.json();
                    })
                    .then(json => {
                        this.countrySource.data.geometry = json.geometry
                        var bbox = turf.bbox(json.geometry)
                
                        this.map.fitBounds(bbox, {
                            padding: {top: 10, bottom:25, left: 15, right: 5}
                        });
                    })
            } else {
                this.countrySource.data.geometry.coordinates = []
                this.map.flyTo({ center: this.coordinates, zoom: 1 });
            }
            
            
        },
        toggleDetail(){
            this.showDetail = !this.showDetail
            if(this.showDetail){
                this.$refs.mapMarker.togglePopup()
                var selected = this.reports.find(e => e.id == this.popup.assessment.id)

                this.polygonSource.data.geometry = selected.geometry
                this.polygonSource.data.properties.score = selected.properties.score

                this.map.setLayoutProperty('polygonLayer', 'visibility', 'visible');
                this.map.setLayoutProperty('polygonLineLayer', 'visibility', 'visible');
                
                var bbox = turf.bbox(this.reports.find(e => e.id == this.popup.assessment.id).geometry)
                
                this.map.fitBounds(bbox, {
                    padding: 40
                });
            }
        },
        getCountryNameByCode(code) {
            if(code) {
                return this.management_area_countries.filter(country => country.code === code)[0].name;
            }
        },
        getAttributeNameById(id) {
            if(id) {
                return this.attributes.filter(attribute => attribute.id === id)[0].name;
            }
        },
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
