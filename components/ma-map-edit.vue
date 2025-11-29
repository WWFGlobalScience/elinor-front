<template>
    <section class="section section--map-edit">
        <header class="header--map header--map--flexy">
            <div class="container--lg">
                <div class="left">
                    <p>
                        {{
                            $t(
                                'pages.assessments.edit.tabs.managementArea.map.polygonParagraph1',
                            )
                        }}
                    </p>
                    <p>
                        {{
                            $t(
                                'pages.assessments.edit.tabs.managementArea.map.polygonParagraph2',
                            )
                        }}
                    </p>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-pointer.svg" />
                            </div>
                            <span>{{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.drawPolygonStartText',
                                )
                            }}</span>
                        </li>
                        <li>
                            <div class="pic__wrap">
                                <img src="~/assets/img/ico-map-closer.svg" />
                            </div>
                            <span>{{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.drawPolygonCloseText',
                                )
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
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.newPolygon',
                                )
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
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.deletePolygon',
                                )
                            }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="map-edit" class="elinor__map" style="position: relative;">
            <!-- Polygon Counter Badge -->
            <div
                v-if="polygonCount > 0"
                class="polygon-counter-badge"
                :class="{ 'multi-part': polygonCount > 1 }"
                style="position: absolute; top: 10px; right: 10px; background: white; padding: 8px 12px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-size: 14px; display: flex; align-items: center; gap: 6px; z-index: 1;"
            >
                <span style="font-size: 18px;">🏝️</span>
                <span style="font-weight: 500;">Polygon Parts:</span>
                <span
                    style="font-weight: bold;"
                    :style="{ color: polygonCount > 1 ? '#2196F3' : '#4CAF50' }"
                >
                    {{ polygonCount }}
                </span>
            </div>

            <div class="map__legend">
                <div class="map__instructions">
                    {{ currentInstruction }}
                </div>
                <div class="map__area" v-if="area != null">
                    {{
                        $t(
                            'pages.assessments.edit.tabs.managementArea.map.area',
                        )
                    }}: <br />
                    {{ area }} km²
                </div>
                <div
                    class="map__error"
                    v-if="validationError"
                    style="color: #e53e3e; background: #fff5f5; padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem; font-weight: bold;"
                >
                    ⚠️ {{ validationError }}
                </div>
            </div>
        </div>
        <footer class="footer--map">
            <div class="container--lg">
                <p>
                    {{
                        $t(
                            'pages.assessments.edit.tabs.managementArea.map.indicateBoundaries',
                        )
                    }}
                </p>
                <div class="options__wrap mt-10">
                    <div class="option__btn">
                        <a
                            role="button"
                            @click="
                                popupState({
                                    active: true,
                                    component: 'popup-map-spatialfile',
                                    title: 'pages.assessments.edit.tabs.managementArea.popups.spatialFile.title',
                                })
                            "
                            class="btn btn--border-turqy btn--opacity--child btn--between"
                        >
                            <span class="btn--opacity__target">{{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.spatialFile',
                                )
                            }}</span>
                            <img
                                src="~/assets/img/ico-button-arrow-turqy.svg"
                            />
                        </a>
                    </div>
                    <div class="option__info">
                        <p>
                            {{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.preferredMethod',
                                )
                            }}
                        </p>
                        <p>
                            {{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.preferredMethodText',
                                )
                            }}
                        </p>
                    </div>
                </div>
                <!-- <div class="divider">
                    <span>{{
                        $t(
                            'pages.assessments.edit.tabs.managementArea.map.spatialFileAndMapImageSeparator',
                        )
                    }}</span>
                </div>
                <div class="options__wrap">
                    <div class="option__btn">
                        <a
                            role="button"
                            @click="
                                popupState({
                                    active: true,
                                    component: 'popup-map-imagefile',
                                    title: 'pages.assessments.edit.tabs.managementArea.popups.imageFile.title',
                                })
                            "
                            class="btn btn--border-turqy btn--opacity--child btn--between"
                        >
                            <span class="btn--opacity__target">{{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.imageFile',
                                )
                            }}</span>
                            <img
                                src="~/assets/img/ico-button-arrow-turqy.svg"
                            />
                        </a>
                    </div>
                </div> -->
                <div class="w-2/3 sm:w-full">
                    <div class="form__group">
                        <div class="form__row form__row--mt-8">
                            <div class="input input--pr">
                                <div class="label">
                                    {{
                                        $t(
                                            'pages.assessments.edit.tabs.managementArea.labels.geospatialSources',
                                        )
                                    }}
                                </div>
                                <textarea
                                    name="explanation"
                                    @change="
                                        save(
                                            'geospatial_sources',
                                            $event.target.value,
                                        )
                                    "
                                    >{{
                                        managementArea.geospatial_sources
                                    }}</textarea
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { mapActions, mapState } from 'vuex';
mapboxgl.accessToken =
    'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ';
import * as turf from '@turf/turf';

export default {
    name: 'ma-map',
    data() {
        return {
            map: null,
            polygonDrawer: null,
            marker: null,
            area: null,
            validationError: null,
        };
    },
    computed: {
        ...mapState({
            managementArea: (state) => state.managementareas.instance,
            assessment: (state) => state.assessments.assessment,
        }),
        polygonCount() {
            return this.polygonDrawer
                ? this.polygonDrawer.getAll().features.length
                : 0;
        },
        currentInstruction() {
            if (!this.polygonDrawer) {
                return this.$t(
                    'pages.assessments.edit.tabs.managementArea.map.help',
                );
            }

            const features = this.polygonDrawer.getAll().features;
            const mode = this.polygonDrawer.getMode();

            if (features.length === 0 && mode !== 'draw_polygon') {
                return 'Click the polygon tool (□) above to start drawing your first area';
            } else if (mode === 'draw_polygon') {
                return '✏️ Drawing: Click to add points. Click the first point again to close the polygon.';
            } else if (features.length === 1) {
                return '✓ First area complete! Click polygon tool (□) to add another separate area, or click Edit to modify this one.';
            } else if (features.length > 1) {
                return `🏝️ Multi-part polygon: ${features.length} separate areas drawn. Add more parts or edit existing ones.`;
            }

            return this.$t(
                'pages.assessments.edit.tabs.managementArea.map.help',
            );
        },
    },
    mounted() {
        if (this.managementArea) {
            this.mapCreate();
        }
    },
    watch: {
        managementArea() {
            this.mapCreate();
        },
        ['managementArea.polygon']() {
            this.mapCreate();
        },
        ['managementArea.point']() {
            this.mapCreate();
        },
    },
    methods: {
        ...mapActions({
            editManagementAreaField: 'managementareas/editManagementAreaField',
            removePolygon: 'managementareas/removePolygon',
            setPolygon: 'managementareas/setPolygon',
            popupState: 'popup/popupState',
        }),
        save(field, value) {
            this.editManagementAreaField({
                field,
                value,
                id: this.managementArea.id,
                assessmentId: this.assessment.id,
            });
        },
        mapCreate() {
            if (this.managementArea) {
                this.map != null ? this.map.remove() : null;

                let center;
                if (
                    this.managementArea.polygon &&
                    this.managementArea.polygon.coordinates.length
                ) {
                    const polygon = turf.multiPolygon(
                        this.managementArea.polygon.coordinates,
                    );
                    center = turf.centroid(polygon);
                } else if (this.managementArea.point) {
                    center = turf.point(this.managementArea.point.coordinates);
                    this.marker = new mapboxgl.Marker().setLngLat(
                        this.managementArea.point.coordinates,
                    );
                }

                this.map = new mapboxgl.Map({
                    container: 'map-edit',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: (center && center.geometry.coordinates) || [0, 0],
                    zoom: center ? 5 : 1,
                });

                if (this.marker) {
                    this.marker.addTo(this.map);
                }

                const options = {
                    displayControlsDefault: false,
                    controls: {
                        polygon: true,
                        trash: true,
                    },
                };

                if (!this.managementArea.polygon) {
                    options.defaultMode = 'draw_polygon';
                }

                this.polygonDrawer = new MapboxDraw(options);

                this.map.addControl(this.polygonDrawer);
                this.mapAddControls();
                this.mapDisableScroll();
                this.mapFitBounds();

                this.map.on('draw.create', this.onDrawCreate);
                this.map.on('draw.delete', this.onDrawDelete);
                this.map.on('draw.update', this.onDrawUpdate);
                this.map.on('load', () => {
                    if (
                        this.managementArea.polygon &&
                        this.managementArea.polygon.coordinates.length
                    ) {
                        const polygon = turf.multiPolygon(
                            this.managementArea.polygon.coordinates,
                        );
                        this.polygonDrawer.add(polygon);
                    }
                });
            }
        },
        mapAddControls() {
            this.map.addControl(new mapboxgl.NavigationControl());
            this.map.addControl(
                new mapboxgl.FullscreenControl({
                    container: document.documentElement,
                }),
            );
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        mapFitBounds() {
            if (
                this.managementArea.polygon &&
                this.managementArea.polygon.coordinates.length
            ) {
                const polygon = turf.multiPolygon(
                    this.managementArea.polygon.coordinates,
                );
                const bbox = turf.bbox(polygon);
                this.map.fitBounds(bbox);
            }
        },
        validateMultiPolygon(polygon) {
            if (!polygon || polygon.type !== 'MultiPolygon') {
                return { valid: false, error: 'Invalid polygon type' };
            }

            if (!Array.isArray(polygon.coordinates) || polygon.coordinates.length === 0) {
                return { valid: false, error: 'Polygon has no coordinates' };
            }

            // Each polygon must have at least one ring with at least 4 points (closed)
            for (let i = 0; i < polygon.coordinates.length; i++) {
                const poly = polygon.coordinates[i];
                if (!Array.isArray(poly) || poly.length === 0) {
                    return { valid: false, error: `Polygon ${i + 1} is empty` };
                }

                // Check each ring
                for (let j = 0; j < poly.length; j++) {
                    const ring = poly[j];
                    if (!Array.isArray(ring) || ring.length < 4) {
                        return {
                            valid: false,
                            error: `Polygon ${i + 1}, ring ${j + 1} must have at least 4 points`
                        };
                    }

                    // Check if ring is closed (first point equals last point)
                    const first = ring[0];
                    const last = ring[ring.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1]) {
                        return {
                            valid: false,
                            error: `Polygon ${i + 1}, ring ${j + 1} is not closed`
                        };
                    }

                    // Validate coordinate values
                    for (let k = 0; k < ring.length; k++) {
                        const coord = ring[k];
                        if (!Array.isArray(coord) || coord.length < 2) {
                            return {
                                valid: false,
                                error: `Invalid coordinate at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`
                            };
                        }
                        const [lon, lat] = coord;
                        if (typeof lon !== 'number' || typeof lat !== 'number') {
                            return {
                                valid: false,
                                error: `Coordinate values must be numbers at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`
                            };
                        }
                        if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
                            return {
                                valid: false,
                                error: `Coordinate out of bounds at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`
                            };
                        }
                    }
                }
            }

            return { valid: true };
        },
        onDrawCreate(event) {
            const data = this.polygonDrawer.getAll();

            // Convert all drawn Polygon features to a single MultiPolygon
            const coordinates = data.features.map(
                (feature) => feature.geometry.coordinates
            );

            const polygon = {
                type: 'MultiPolygon',
                coordinates: coordinates
            };

            // Validate before saving
            const validation = this.validateMultiPolygon(polygon);
            if (!validation.valid) {
                this.validationError = validation.error;
                // Show toast notification
                this.$toast.error(validation.error, {
                    duration: 6000,
                });
                // Remove the invalid polygon from the map
                const featureIds = data.features.map((f) => f.id);
                featureIds.forEach((id) => this.polygonDrawer.delete(id));
                return;
            }

            this.validationError = null;
            this.setPolygon(polygon);

            const area = turf.area(data);
            this.area = Math.round(area * 100) / 100;
        },
        onDrawDelete(event) {
            this.area = null;
            this.validationError = null;
            this.removePolygon();
        },
        onDrawUpdate(event) {
            const data = this.polygonDrawer.getAll();

            // Convert all drawn Polygon features to a single MultiPolygon
            const coordinates = data.features.map(
                (feature) => feature.geometry.coordinates
            );

            const polygon = {
                type: 'MultiPolygon',
                coordinates: coordinates
            };

            // Validate before saving
            const validation = this.validateMultiPolygon(polygon);
            if (!validation.valid) {
                this.validationError = validation.error;
                // Show toast notification
                this.$toast.error(validation.error, {
                    duration: 6000,
                });
                return;
            }

            this.validationError = null;
            this.setPolygon(polygon);

            const area = turf.area(data);
            this.area = Math.round(area * 100) / 100;
        },
    },
};
</script>
