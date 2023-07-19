<template>
    <section class="section section--assessment-map">
        <managementarea-map-header></managementarea-map-header>
        <div id="map" class="elinor__map"></div>
    </section>
</template>

<script>

import { mapState } from 'vuex'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'

export default {
    name: 'managementarea-map',
    data() {
        return {
            map: null,
            marker: null,
            error: false,
            zoom: 13
        }
    },
    computed: {
        ...mapState({
            managementArea: state => state.managementareas.instance
        })
    },
    methods: {
        mapCreate() {
            let center;
            if(this.managementArea.polygon) {
                const polygon = turf.multiPolygon(this.managementArea.polygon.coordinates);
                center = turf.centroid(polygon);
            } else {
                center = turf.point(this.managementArea.point.coordinates);
                this.marker = new mapboxgl.Marker().setLngLat(this.managementArea.point.coordinates);
            }

            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                center: center.geometry.coordinates,
                zoom: this.zoom
            })

            if(this.marker) {
                this.marker.addTo(this.map);
            }


            this.mapFitBounds()
            this.mapAddControls()
            this.mapDisableScroll()
            this.addPolygon()
        },
        mapFitBounds() {
            if(this.managementArea.polygon) {
                const polygon = turf.multiPolygon(this.managementArea.polygon.coordinates);
                const bbox = turf.bbox(polygon)
                this.map.fitBounds(bbox)
            }
        },
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        addPolygon() {
            this.map.on('load', () => {
                this.map.addSource('polygon', {
                    'type': 'geojson',
                    'data': this.managementArea.polygon
                });

                this.map.addLayer({
                    'id': 'polygon',
                    'type': 'fill',
                    'source': 'polygon',
                    'layout': {},
                    'paint': {
                        'fill-color': '#43A0BD',
                        'fill-opacity': 0.5
                    }
                });


                this.map.addLayer({
                    'id': 'outline',
                    'type': 'line',
                    'source': 'polygon',
                    'layout': {},
                    'paint': {
                        'line-color': '#43A0BD',
                        'line-width': 3
                    }
                });
            });
        }

    },
    mounted() {
        this.$nextTick(() => {
            if(this.managementArea && this.managementArea.polygon) {
                this.mapCreate()
            }
        })
    },
    watch: {
        managementArea() {
            if(this.managementArea && this.managementArea.polygon) {
                this.mapCreate()
            }
        }
    }
}

</script>
