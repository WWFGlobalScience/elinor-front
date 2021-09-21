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
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'

export default {
    name: 'managementarea-map',
    data() {
        return {
            map: null,
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
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                center: this.managementArea.point,
                zoom: this.zoom
            })
            this.mapAddControls()
            this.mapDisableScroll()
        },
        /*mapFitBounds() {
            let data = this.draw.getAll()
            if ( data.features.length > 0 ) {
                let polygon = data.features[0].geometry
                let bbox = turf.bbox( polygon )
                this.map.fitBounds( bbox, {padding: 100} )
            }
        },*/
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        mapGetPointCoordinates( data ) {
            return turf.center( data ).geometry.coordinates
        },
    },
    created() {

    },
    mounted() {
        this.mapCreate()
    }
}

</script>
