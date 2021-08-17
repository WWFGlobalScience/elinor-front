<template>
    <section class="section section--assessment-map">
        <managementarea-map-header v-if="!mapedit"></managementarea-map-header>
        <managementarea-map-header-edit v-if="mapedit"></managementarea-map-header-edit>
        <div id="map" class="elinor__map"></div>
        <div class="elinor__map-upload">
            <div class="container--md">
                <div class="block">
                    <header>
                        <p>Alternatively you can upload a spatial file or a image of the area</p>
                    </header>
                    <div class="upload__grid">
                        <div class="left">
                            <button type="button" class="btn--border-turqy btn--opacity--child"
                            @click="popupState( { active: true, component: 'popup-assessment-create', title: 'pages.assessments.content.assessment-edit.create.title' })"
                            >
                                <span class="btn--opacity__target">Upload spatial area file</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </button>
                        </div>
                        <div class="right">
                            <p>
                                PREFERED METHOD<br>
                                Upload a Spatial file in Shapefile format or GeoJSON
                            </p>
                        </div>
                    </div>
                    <div class="separator"><span>OR</span></div>
                    <div class="upload__grid">
                        <div class="left">
                            <button type="button" class="btn--border-turqy btn--opacity--child"
                            @click="popupState( { active: true, component: 'popup-assessment-create', title: 'pages.assessments.content.assessment-edit.create.title' })"
                            >
                                <span class="btn--opacity__target">Upload map image</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </button>
                        </div>
                        <div class="right">
                            <p>
                                If you don't have a spatial shape you can upload a map or delimited image of the area and indicate the coordinates
                            </p>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <header>
                        <p>Please list the source of the geospatial information</p>
                    </header>
                    <form class="form mt-5">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input">
                                    <textarea placeholder="Text"></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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
    props: [ 'mapedit' ],
    data() {
        return {
            map: null,
            draw: null,
            feature: null,
            polygon: null,
            error: false,
            center: null,
            zoom: 13
        }
    },
    computed: {
        ...mapState({
            ma: state => state.managementareas.ma
        })
    },
    methods: {
        mapGetFeatureFromApi() {
            if ( this.ma.version.polygon != null ) {
                this.feature = { 
                    id: 'draw_from_api',
                    type: 'Polygon', 
                    coordinates: this.ma.version.polygon.type == 'Multipolygon' ? this.ma.version.polygon.coordinates[0] : this.ma.version.polygon.coordinates
                }
            }
        },
        mapAddFeature() {
            if( this.ma.version.polygon != null ) {
                this.draw.add(this.feature)
                this.mapedit ? this.polygon.style.display = 'none' : null
            }
        },
        mapCreate() {
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                center: this.center,
                zoom: this.zoom
            })
            this.mapGetFeatureFromApi()
            this.mapDraw()
            this.mapAddControls()
            this.mapDisableScroll()
            this.mapAddFeature()
            this.mapDrawCreate()
            this.mapDrawUpdate()
            this.mapDrawDelete()
            this.mapFitBounds()
        },
        mapFitBounds() {
            let data = this.draw.getAll()
            if ( data.features.length > 0 ) {
                let polygon = data.features[0].geometry
                let bbox = turf.bbox( polygon )
                this.map.fitBounds( bbox, {padding: 100} )
            }
        },
        mapDraw() {
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: this.mapedit ? true : false,
                    trash: this.mapedit ? true : false
                },
                defaultMode: 'simple_select'
            });
            this.map.addControl(this.draw)
            this.polygon = document.querySelector( 'button[title="Polygon tool (p)"]' )
        },
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        mapDrawUpdate() {
            this.map.on('draw.update', () => {
                this.mapedit ? this.mapDrawModify() : null
            })
        },
        mapDrawCreate() {
            this.map.on( 'draw.create', () => {
                this.mapedit ? this.mapDrawModify() :null
            })
        },
        mapDrawDelete() {
            this.map.on( 'draw.delete', () => {
                this.feature = false
                this.polygon.style.display = 'block'
                this.$store.dispatch( 'managementareas/updateVersionMapCenter', null )
                this.$store.dispatch( 'managementareas/updateVersionMapPolygon', null )
                this.$store.dispatch( 'managementareas/updateMa' )
            })
        },
        mapDrawModify() {
            let data = this.draw.getAll()
                this.updateApiFromMap( data )
        },
        mapGetPointCoordinates( data ) {
            return turf.center( data ).geometry.coordinates   
        },
        updateApiFromMap( data ) {
            let center = this.mapGetPointCoordinates( data )
            this.$store.dispatch( 'managementareas/updateVersionMapCenter', center )
            this.$store.dispatch( 'managementareas/updateVersionMapPolygon', data )
            this.$store.dispatch( 'managementareas/updateMa' )
        }
    },
    created() {
        if ( this.ma.version.pint != null ) {
            this.center = this.ma.version.point.cordinates
            this.zoom = 13
        } else {
            this.center = [ -68.137343, 45.137451 ]
            this.zoom = 2
        }
    },
    mounted() {
        this.mapCreate()
    }
}

</script>