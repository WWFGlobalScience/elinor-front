<template>
    <MglMap
    class="min-h-[93vh] relative"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :center="coordinates"
    :min-zoom="1"
    :max-zoom="16"
    :doubleClickZoom=false
    :dragRotate="false"
    :keyboard=false
    :scrollZoom=false
    @load="onMapLoaded"
    >
    <MglNavigationControl position="top-right" />

    <MglMarker @click="refs.mapMarker.togglePopup()" ref="mapMarker" :coordinates="popup.coordinates">
        <template slot="marker"><div></div></template>
        <MglPopup ref="mapPopup" :coordinates="coordinates" anchor="top-left" :closeButton="true" :closeOnClick="true">
            <map-popup :assessment="popup.assessment" :click="showDetail" />
        </MglPopup>
    </MglMarker>

    <MglGeojsonLayer
        :sourceId="pointsSource.data.id"
        :source="pointsSource"
        layerId="clusterLayer"
        :layer="geoJsonLayer" />

    <MglGeojsonLayer
        :sourceId="pointsSource.data.id"
        :source="pointsSource"
        layerId="scoreLayer"
        :layer="scoreLayer" />

    <MglGeojsonLayer
        :sourceId="pointsSource.data.id"
        :source="pointsSource"
        layerId="markersLayer"
        :layer="markersLayer" />

    <MglGeojsonLayer
        :sourceId="polygonsSource.data.id"
        :source="polygonsSource"
        layerId="polygonLayer"
        :layer="polygonLayer" />
    <MglGeojsonLayer
        :sourceId="polygonsSource.data.id"
        :source="polygonsSource"
        layerId="polygonLineLayer"
        :layer="polygonLineLayer" />

    <MglGeojsonLayer
        :sourceId="countrySource.data.id"
        :source="countrySource"
        layerId="countryLayer"
        :layer="countryLayer" />

    <map-title />
    <map-legend />
    <map-form :map-countries="countries" :attributes="attributes" />


    <map-box-list v-if="country && activeCountryList" :close="closeCountryList" :detail="setDetail" :list="filteredData" />
    <map-box-assessment v-if="popup.assessment && activeDetail" :close="closeDetail" :assessment="popup.assessment" />

</MglMap>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
            map: null,
            mapbox: null,
            accessToken: "pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ",
            mapStyle: "mapbox://styles/mapbox/satellite-v9",
            coordinates: [0, 39.014],
            popup: {
                coordinates: [-122.9, 50.1],
                showed: false,
                assessment: null,
            },
            activeDetail: false,
            activeCountryList: false,
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
                maxzoom: 9,
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
                maxzoom: 9,
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
                maxzoom: 9,
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': [
                    'step',
                    ['get', 'filterScore'],
                    'mark-grey',
                    0,  'mark-poor',
                    29, 'mark-average',
                    59, 'mark-good',
                    89, 'mark-excellent',
                    ]
                },
                filter: ['==', '$type', 'Point']
            },

            polygonLayer: {
                type: 'fill',
                minzoom: 9,
                paint: {
                    'fill-color': [
                        'step',
                        ['get', 'filterScore'],
                        '#9E9E9E',
                        0,  '#EE8383',
                        29, '#F5C243',
                        59, '#CCCC25',
                        89, '#4FAD5B',
                    ],
                    'fill-opacity': 0.5
                },
                filter: ['==', '$type', 'Polygon']
            },
            polygonLineLayer: {
                type: 'line',
                minzoom: 9,
                paint: {
                    'line-color': [
                    'step',
                    ['get', 'filterScore'],
                    '#585858',
                    0,  '#EE8383',
                    29, '#F5C243',
                    59, '#CCCC25',
                    89, '#4FAD5B',
                    ],
                    'line-width': 3
                }
            },

            countryLayer: {
                type: 'line',
                source: 'countrySource',
                layout: {},
                paint: {
                    'line-color': 'white',
                    'line-width': 3,
                }
            },
        };
    },
    fetchOnServer: false,
    computed: {
        ...mapState({
            data: state => state.map.list,
            country: state => state.map.filters.country,
            attribute: state => state.map.filters.attribute,
            range: state => state.map.filters.range,
            management_area_countries: state => state.countries.management_area_countries
        }),
        filteredData(){
            if(this.data){
                var filtered = this.formatData().filter((f) =>
                    (this.country ? f.properties.management_area.countries && f.properties.management_area.countries.includes(this.country) : true)
                    // && (this.attribute ? f.properties.attributes.find(e => e.attribute == this.attribute) : true)
                )

                if(this.attribute){
                    filtered.map(x => {
                        let coincident = x.properties.attributes.find(e => e.attribute == this.attribute)
                        if(coincident){
                            x.properties.filterScore = coincident.score * 10
                        }else{
                            x.properties.filterScore = -1
                        }
                    })
                }else{
                    filtered.map(x => x.properties.filterScore = x.properties.score)
                }

                if(this.range){
                    var ranges = {
                        "plan": [0,29],
                        "build": [30, 59],
                        "strengthen": [60,89],
                        "mantain": [90, 100]
                    }
                    filtered = filtered.filter(x =>
                        Number(x.properties.score) >= ranges[this.range][0] && Number(x.properties.score) < ranges[this.range][1]
                    )
                }

                return filtered
            }
        },
        countries(){
            return Array.from(
                new Set(
                    this.filteredData
                        .reduce( (carry, current) => [...carry, ...current.properties.management_area.countries], [])
                    )
                ).sort()
        },
        attributes(){
            return Array.from(
                new Set(
                    this.filteredData
                        .reduce( (carry, current) => [...carry, ...current.properties.attributes.map(e => e.attribute)], [])
                    )
                )
        },
        pointsSource(){
            return {
                type: 'geojson',
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 20,
                data: {
                    id: "pointsSource",
                    type: "FeatureCollection",
                    features: this.filteredData,
                },
                clusterProperties: {
                    "sum": ["+", ["get", "filterScore"]]
                }
            }
        },
        polygonsSource(){
            return {
                type: 'geojson',
                data: {
                    id: "polygonsSource",
                    type: "FeatureCollection",
                    features: this.filteredData,
                }
            }
        }
    },
    watch: {
        country () {
            this.getCountryGeoJson(this.country)
        },
        /*attribute () {
            this.map.setLayoutProperty('markersLayer', 'icon-image', [
                'step',
                this.attribute ? ["*", ['get', this.attribute, ['get','scores']], 10] : ['get', 'filterScore'],
                'mark-poor',
                29, 'mark-average',
                59, 'mark-good',
                89, 'mark-excellent',
            ]);
        }*/
    },
    methods: {
        ...mapActions({
            filter: 'map/filter'
        }),
        async onMapLoaded(e) {
            var map = this.map = e.map;
            map.loadImage('/img/marks/mark-grey.png', (error, image) => { if (error) {throw error;}
                map.addImage('mark-grey', image);
            });
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
                map.getSource('pointsSource').getClusterExpansionZoom(
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
                this.popup.assessment = this.filteredData.find(element => element.id == f.features[0].id && element.geometry.type == 'MultiPolygon') || this.filteredData.find(element => element.id == f.features[0].id && element.geometry.type == 'Point')
                this.$refs.mapMarker.togglePopup()
            });
        },
        formatData(){
            var results = [];
            this.data.forEach(feature => {
                if(!feature.geometry || feature.geometry.coordinates.length <= 0) return;

                if(feature.geometry.type == "Point"){
                    var formatted = turf.point(feature.geometry.coordinates)
                    formatted.id = feature.id
                    formatted.properties = feature.properties
                    results.push(formatted);
                }
                else if(feature.geometry.type == "MultiPolygon"){
                    var polygon = turf.multiPolygon(feature.geometry.coordinates)
                    var center = turf.centroid(polygon)
                    polygon.id = center.id = feature.id
                    polygon.properties = center.properties = feature.properties
                    polygon.properties.hectares = center.properties.hectares = (turf.area(polygon) * 0.0001).toFixed(0)
                    polygon.properties.scores = {}
                    /*polygon.properties.attributes.forEach(e => {
                        polygon.properties.scores[e.attribute] = e.score;
                    });*/
                    results.push(polygon);
                    results.push(center);
                }
            });

            return results
        },
        setDetail(assessment){
            this.popup.assessment = assessment
            this.showDetail()
        },
        showDetail(){
            this.activeCountryList=false
            this.countrySource.data.geometry.coordinates = []

            this.activeDetail = true
            this.$refs.mapMarker.togglePopup()

            if(this.popup.assessment.geometry.type == 'MultiPolygon'){
                var bbox = turf.bbox(this.popup.assessment.geometry)
                this.map.fitBounds(bbox, { padding: 40});
            }else{
                this. map.easeTo({center: this.popup.assessment.geometry.coordinates, zoom: 8});
            }
        },
        closeDetail(){
            this.activeDetail = false
            this.filter({"name": "country", "value": this.popup.assessment.properties.management_area.countries[0]})
            this.getCountryGeoJson()
        },
        closeCountryList(){
            this.activeCountryList=false
            this.filter({"name": "country", "value": undefined})
            this.getCountryGeoJson()
        },
        getCountryGeoJson(country){
            if(country){
                this.activeCountryList = true
                this.activeDetail = false
                fetch(`/geojson/${country.code}.json`)
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
    },
    created() {
        this.mapbox = Mapbox;
    },
    async mounted() {
        await this.$store.dispatch( 'map/fetchMap')
        this.$store.dispatch( 'countries/fetchCountries')
    }
}
</script>
