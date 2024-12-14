<template>
    <section class="section section--map-edit">
        <header class="header--map header--map--flexy">
            <div class="container--lg">
                <div class="left">
                    <p>{{ $t('managementarea.map.boundaries') }}</p>
                    <p>{{ $t('managementarea.map.tools') }}</p>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-pointer.svg" />
                            </div>
                            <span>{{
                                $t('managementarea.map.polygon_create')
                            }}</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-closer.svg" />
                            </div>
                            <span>{{
                                $t('managementarea.map.polygon_close')
                            }}</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img
                                    src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="m15 12.3v-4.6c.6-.3 1-1 1-1.7 0-1.1-.9-2-2-2-.7 0-1.4.4-1.7 1h-4.6c-.3-.6-1-1-1.7-1-1.1 0-2 .9-2 2 0 .7.4 1.4 1 1.7v4.6c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2 .7 0 1.4-.4 1.7-1h4.6c.3.6 1 1 1.7 1 1.1 0 2-.9 2-2 0-.7-.4-1.4-1-1.7zm-8-.3v-4l1-1h4l1 1v4l-1 1h-4z"/>%3C/svg>'
                                    alt=""
                                />
                            </div>
                            <span>{{
                                $t('managementarea.map.polygon_new')
                            }}</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img
                                    src='data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20">%3Cpath d="M10,3.4 c-0.8,0-1.5,0.5-1.8,1.2H5l-1,1v1h12v-1l-1-1h-3.2C11.5,3.9,10.8,3.4,10,3.4z M5,8v7c0,1,1,2,2,2h6c1,0,2-1,2-2V8h-2v5.5h-1.5V8h-3 v5.5H7V8H5z"/>%3C/svg>'
                                    alt=""
                                />
                            </div>
                            <span>{{
                                $t('managementarea.map.polygon_delete')
                            }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="map-edit" class="elinor__map"></div>
        <div class="map__files">
            <div class="conainer"></div>
        </div>
        <transition name="fade">
            <default-loader
                :loaderText="loader.loaderText"
                v-if="loader.active > 0"
            ></default-loader>
        </transition>
        <transition name="fade">
            <default-notification v-if="error"></default-notification>
        </transition>
    </section>
</template>

<script>
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
mapboxgl.accessToken =
    'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ';

export default {
    name: 'managementarea-map-edit',
    props: ['ma'],
    data() {
        return {
            map: null,
            draw: null,
            feature: null,
            polygon: null,
            loader: {
                active: false,
                loaderText: 'Updating map...',
            },
            error: false,
            center: this.ma.version.point.coordinates || [
                -68.137343, 45.137451,
            ],
        };
    },
    computed: {
        maOrigin() {
            return this.$store.state.ma.edit.maOrigin;
        },
    },
    watch: {
        maOrigin() {
            this.mapCreate();
        },
    },
    methods: {
        mapGetPointCoordinates(data) {
            this.center = turf.center(data).geometry.coordinates;
        },
        mapGetFeatureFromApi() {
            this.feature = {
                id: 'draw_from_api',
                type: 'Polygon',
                coordinates:
                    this.ma.version.polygon.type == 'Multipolygon'
                        ? this.ma.version.polygon.coordinates[0]
                        : this.ma.version.polygon.coordinates,
            };
        },
        mapAddFeature() {
            if (this.ma.version.polygon != null) {
                this.draw.add(this.feature);
                this.polygon.style.display = 'none';
            }
        },
        mapCreate() {
            this.map = new mapboxgl.Map({
                container: 'map-edit',
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                center: this.center,
                zoom: 13,
            });
            this.mapGetFeatureFromApi();
            this.mapDraw();
            this.mapAddControls();
            this.mapDisableScroll();
            this.mapAddFeature();
            this.mapDrawCreate();
            this.mapDrawUpdate();
            this.mapDrawDelete();
        },
        mapDraw() {
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true,
                },
                defaultMode: 'simple_select',
            });
            this.map.addControl(this.draw);
            this.polygon = document.querySelector(
                'button[title="Polygon tool (p)"]',
            );
        },
        mapDrawUpdate() {
            this.map.on('draw.update', () => {
                this.mapDrawModify();
            });
        },
        mapDrawCreate() {
            this.map.on('draw.create', () => {
                this.mapDrawModify();
            });
        },
        mapDrawDelete() {
            this.map.on('draw.delete', () => {
                this.feature = false;
                this.polygon.style.display = 'block';
            });
        },
        mapDrawModify() {
            let data = this.draw.getAll();
            console.log(data);
            this.mapGetPointCoordinates(data);
            this.updateApiFromMap(data);
        },
        mapAddControls() {
            this.map.addControl(new mapboxgl.NavigationControl());
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        updateApiFromMap(data) {
            this.loader.active = true;

            this.$axios({
                method: 'put',
                url: `https://60c19fea4f7e880017dbfed8.mockapi.io/api/v1/managementareaversions/${this.ma.version.id}`,
                data: {
                    polygon: {
                        type: 'polygon',
                        coordinates: data.features[0].geometry.coordinates,
                    },
                    point: {
                        coordinates: this.center,
                        type: 'Point',
                    },
                },
            })
                .then((response) => {
                    this.loader.active = false;
                    console.log(response);
                })
                .catch((error) => {
                    this.error = true;
                    console.log(error);
                });
        },
    },
    mounted() {
        this.mapCreate();
    },
};
</script>
