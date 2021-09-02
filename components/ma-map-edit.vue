<template>
    <section class="section section--map-edit">
        <header class="header--map header--map--flexy">
            <div class="container--lg">
                <div class="left">
                    <p>Indicate the boundaries of the Managed Area</p>
                    <p>Use the tools over the map to create a Polygon over the Managed Area</p>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-pointer.svg">
                            </div>
                            <span>Click over the Map to create a Polygon</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-closer.svg">
                             </div>
                            <span>To Close a Polygon click over a created Point</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="m15 12.3v-4.6c.6-.3 1-1 1-1.7 0-1.1-.9-2-2-2-.7 0-1.4.4-1.7 1h-4.6c-.3-.6-1-1-1.7-1-1.1 0-2 .9-2 2 0 .7.4 1.4 1 1.7v4.6c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2 .7 0 1.4-.4 1.7-1h4.6c.3.6 1 1 1.7 1 1.1 0 2-.9 2-2 0-.7-.4-1.4-1-1.7zm-8-.3v-4l1-1h4l1 1v4l-1 1h-4z"/>%3C/svg>' alt="">
                             </div>
                            <span>Create a new Polygon</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="M10,3.4 c-0.8,0-1.5,0.5-1.8,1.2H5l-1,1v1h12v-1l-1-1h-3.2C11.5,3.9,10.8,3.4,10,3.4z M5,8v7c0,1,1,2,2,2h6c1,0,2-1,2-2V8h-2v5.5h-1.5V8h-3 v5.5H7V8H5z"/>%3C/svg>' alt="">
                             </div>
                            <span>Delete selected Polygon</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="map-edit" class="elinor__map">
            <div class="map__legend">
                <div class="map__instructions">
                    Click over the map to draw a polygon
                </div>
                <div class="map__area" v-if="area != null ">
                    Area: <br>
                    {{ area }}
                </div>
            </div>
        </div>
        <footer class="footer--map">
            <div class="container--lg">
                <p>Indicate the boundaries of the Managed Area</p>
            </div>
        </footer>
    </section>
</template>

<script>

import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import {mapActions, mapState} from "vuex";
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'
import * as turf from '@turf/turf'

export default {
    name: 'ma-map',
    data() {
        return {
            map: null,
            polygonDrawer: null,
            area: null
        }
    },
    computed: {
        ...mapState({
            managementArea: state => state.managementareas.instance
        })
    },
    mounted() {
        if(this.managementArea) {
            this.mapCreate()
        }
    },
    watch: {
        managementArea() {
            this.mapCreate()
        }
    },
    methods: {
        ...mapActions({
            removePolygon: 'managementareas/removePolygon',
            setPolygon: 'managementareas/setPolygon'
        }),
        mapCreate() {
            this.map != null ? this.map.remove() : null
            this.map = new mapboxgl.Map({
                container: 'map-edit',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-68.137343, 45.137451],
                zoom: 5
            })
            const options = {
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true
                }
            };

            if(!this.managementArea.polygon) {
                options.defaultMode = 'draw_polygon'
            }

            this.polygonDrawer = new MapboxDraw(options);

            this.map.addControl(this.polygonDrawer);
            this.mapAddControls()
            this.mapDisableScroll()

            this.map.on('draw.create', this.onDrawCreate);
            this.map.on('draw.delete', this.onDrawDelete);
            this.map.on('draw.update', this.onDrawUpdate);
            this.map.on( 'load', () => {
                this.managementArea.polygon.coordinates.forEach((coords) => {
                    this.polygonDrawer.add({type: 'MultiPolygon', coordinates: [coords]});
                });
                console.log(this.polygonDrawer.getAll());
            })
        },
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
            this.map.addControl( new mapboxgl.FullscreenControl({container: document.documentElement}))

        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        onDrawCreate(event) {
            const data = this.polygonDrawer.getAll();
            console.log(data);
            let type = 'MultiPolygon';
            const coordinates = data.features.map((feature) => feature.geometry.coordinates);
            this.setPolygon({type, coordinates});

            const area = turf.area(data);
            this.area = Math.round(area * 100) / 100;
        },
        onDrawDelete(event) {
            this.area = null;
            this.removePolygon();
        },
        onDrawUpdate(event) {
            const data = this.polygonDrawer.getAll();
            console.log(data);
            let type = 'MultiPolygon';
            const coordinates = data.features.map((feature) => feature.geometry.coordinates);
            this.setPolygon({type, coordinates});
            console.log(coordinates);
            const area = turf.area(data);
            this.area = Math.round(area * 100) / 100;

        }
    }
}

</script>
