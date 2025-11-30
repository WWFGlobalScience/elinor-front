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
                                <img src="~/assets/img/ico-map-pointer.svg" />
                            </div>
                            <span>{{
                                $t(
                                    'pages.assessments.edit.tabs.managementArea.map.existingPolygon',
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
        <div id="map-edit" class="elinor__map" style="position: relative">
            <!-- Custom Delete Button - only shows when polygon exists -->
            <button
                v-if="showDeleteButton"
                @click="handleDeletePolygon"
                title="Delete polygon"
                class="mapboxgl-ctrl mapboxgl-ctrl-group"
                type="button"
                :style="{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    border: '0',
                    width: '29px',
                    height: '29px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
                    zIndex: '1',
                }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
                    <path fill="#404040" d="M10,3.4 c-0.8,0-1.5,0.5-1.8,1.2H5l-1,1v1h12v-1l-1-1h-3.2C11.5,3.9,10.8,3.4,10,3.4z M5,8v7c0,1,1,2,2,2h6c1,0,2-1,2-2V8h-2v5.5h-1.5V8h-3 v5.5H7V8H5z"/>
                </svg>
            </button>

            <div class="map__legend">
                <div class="map__area">
                    {{
                        $t(
                            'pages.assessments.edit.tabs.managementArea.map.area',
                        )
                    }}:&nbsp;{{ area != null ? area : 0 }}&nbsp;km²
                </div>
                <div
                    class="map__error"
                    v-if="validationError"
                    style="
                        color: #e53e3e;
                        background: #fff5f5;
                        padding: 0.5rem;
                        border-radius: 4px;
                        margin-top: 0.5rem;
                        font-weight: bold;
                    "
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
            isEditingExistingPolygon: false,
            savedPolygonState: null,
            polygonLoaded: false,
            updatingPolygon: false, // Flag to prevent watcher loops
        };
    },
    computed: {
        ...mapState({
            managementArea: (state) => state.managementareas.instance,
            assessment: (state) => state.assessments.assessment,
        }),
        showDeleteButton() {
            // Show if we have a loaded existing polygon
            if (this.isEditingExistingPolygon && this.polygonLoaded) {
                return true;
            }
            // Or if we have drawn a new polygon in the current session
            // Use area as a reactive indicator that a polygon was drawn
            if (!this.isEditingExistingPolygon && this.area != null) {
                return true;
            }
            return false;
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
            // Only recreate map if polygon changed externally (e.g., from API load)
            // Don't recreate when we're the ones updating it during drawing/editing
            if (!this.updatingPolygon) {
                this.mapCreate();
            }
        },
        ['managementArea.point']() {
            if (!this.updatingPolygon) {
                this.mapCreate();
            }
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
        async handleDeletePolygon() {
            const confirmed = confirm(
                'Are you sure you want to delete this polygon? This will remove the boundary from this management area.',
            );

            if (!confirmed) {
                return;
            }

            this.updatingPolygon = true;

            // Save state in case we need to revert
            const previousState = {
                polygon: this.savedPolygonState,
                area: this.area,
            };

            this.clearPolygonState();
            this.polygonDrawer.deleteAll();

            try {
                await this.removePolygon();
            } catch (error) {
                console.error('Failed to delete polygon:', error);
                // Revert on API failure
                if (previousState.polygon) {
                    this.savedPolygonState = previousState.polygon;
                    this.area = previousState.area;
                    const revertedPolygon = turf.multiPolygon(
                        previousState.polygon.coordinates,
                    );
                    this.polygonDrawer.add(revertedPolygon);
                }
                this.updatingPolygon = false;
                return;
            }

            this.$nextTick(() => {
                if (this.polygonDrawer) {
                    this.polygonDrawer.changeMode('draw_polygon');
                }
                this.updatingPolygon = false;
            });
        },
        mapCreate() {
            if (this.managementArea) {
                this.map != null ? this.map.remove() : null;

                // Reset polygon loaded flag
                this.polygonLoaded = false;

                // Determine if we're editing an existing saved polygon
                this.isEditingExistingPolygon = !!(
                    this.managementArea.polygon &&
                    this.managementArea.polygon.coordinates.length
                );

                // Save the initial polygon state for potential reversion
                if (this.isEditingExistingPolygon) {
                    this.savedPolygonState = JSON.parse(
                        JSON.stringify(this.managementArea.polygon),
                    );
                }

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
                        // No polygon control - users draw by default when no polygon exists
                        trash: false, // Always start with trash disabled; we'll enable it when needed
                    },
                };

                // Auto-enable drawing mode when no polygon exists, otherwise use simple_select
                if (this.isEditingExistingPolygon) {
                    options.defaultMode = 'simple_select'; // For editing existing polygons
                } else {
                    options.defaultMode = 'draw_polygon'; // For drawing new polygons
                }

                this.polygonDrawer = new MapboxDraw(options);

                this.map.addControl(this.polygonDrawer);
                this.mapAddControls();
                this.mapDisableScroll();
                this.mapFitBounds();

                this.map.on('draw.create', this.onDrawCreate);
                this.map.on('draw.delete', this.onDrawDelete);
                this.map.on('draw.update', this.onDrawUpdate);
                this.map.on('draw.modechange', this.onModeChange);
                this.map.on('load', () => {
                    if (
                        this.managementArea.polygon &&
                        this.managementArea.polygon.coordinates.length
                    ) {
                        const polygon = turf.multiPolygon(
                            this.managementArea.polygon.coordinates,
                        );
                        this.polygonDrawer.add(polygon);

                        // Calculate and display area
                        this.area = this.calculateArea(polygon);

                        // Don't select the polygon - let it display in blue (non-selected) state
                        // User can click it to select/edit if needed
                        // Custom delete button works regardless of selection state

                        // Set flag to trigger reactivity
                        this.polygonLoaded = true;
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
        /**
         * Convert Mapbox Draw feature to MultiPolygon coordinates
         */
        featureToMultiPolygonCoordinates(feature) {
            if (feature.geometry.type === 'MultiPolygon') {
                // Already a MultiPolygon (from loaded data or shapefile)
                return feature.geometry.coordinates;
            } else {
                // Convert Polygon to MultiPolygon format: [[[[coords]]]]
                return [feature.geometry.coordinates];
            }
        },
        /**
         * Create MultiPolygon GeoJSON object from coordinates
         */
        createMultiPolygon(coordinates) {
            return {
                type: 'MultiPolygon',
                coordinates: coordinates,
            };
        },
        /**
         * Calculate area in km² from turf data
         */
        calculateArea(data) {
            const areaInSquareMeters = turf.area(data);
            // Convert to km² and round to 2 decimal places
            return Math.round((areaInSquareMeters / 1000000) * 100) / 100;
        },
        /**
         * Revert polygon to saved state and re-select it
         */
        revertToSavedPolygon() {
            if (!this.savedPolygonState) {
                return;
            }

            this.polygonDrawer.deleteAll();
            const revertedPolygon = turf.multiPolygon(
                this.savedPolygonState.coordinates,
            );
            const featureIds = this.polygonDrawer.add(revertedPolygon);

            // Re-select after revert
            if (featureIds && featureIds.length > 0) {
                this.polygonDrawer.changeMode('simple_select', {
                    featureIds: featureIds,
                });
            }
        },
        /**
         * Build and validate MultiPolygon from current draw state
         */
        buildPolygonFromDrawData() {
            const data = this.polygonDrawer.getAll();
            const coordinates = this.featureToMultiPolygonCoordinates(
                data.features[0],
            );
            const polygon = this.createMultiPolygon(coordinates);

            return {
                polygon,
                data,
                validation: this.validateMultiPolygon(polygon),
            };
        },
        /**
         * Clear all polygon-related state
         */
        clearPolygonState() {
            this.isEditingExistingPolygon = false;
            this.polygonLoaded = false;
            this.area = null;
            this.validationError = null;
            this.savedPolygonState = null;
        },
        validateMultiPolygon(polygon) {
            if (!polygon || polygon.type !== 'MultiPolygon') {
                return { valid: false, error: 'Invalid polygon type' };
            }

            if (
                !Array.isArray(polygon.coordinates) ||
                polygon.coordinates.length === 0
            ) {
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
                            error: `Polygon ${i + 1}, ring ${j + 1} must have at least 4 points`,
                        };
                    }

                    // Check if ring is closed (first point equals last point)
                    const first = ring[0];
                    const last = ring[ring.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1]) {
                        return {
                            valid: false,
                            error: `Polygon ${i + 1}, ring ${j + 1} is not closed`,
                        };
                    }

                    // Validate coordinate values
                    for (let k = 0; k < ring.length; k++) {
                        const coord = ring[k];
                        if (!Array.isArray(coord) || coord.length < 2) {
                            return {
                                valid: false,
                                error: `Invalid coordinate at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`,
                            };
                        }
                        const [lon, lat] = coord;
                        if (
                            typeof lon !== 'number' ||
                            typeof lat !== 'number'
                        ) {
                            return {
                                valid: false,
                                error: `Coordinate values must be numbers at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`,
                            };
                        }
                        if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
                            return {
                                valid: false,
                                error: `Coordinate out of bounds at polygon ${i + 1}, ring ${j + 1}, point ${k + 1}`,
                            };
                        }
                    }
                }
            }

            return { valid: true };
        },
        async onDrawCreate(event) {
            const { polygon, data, validation } =
                this.buildPolygonFromDrawData();

            if (!validation.valid) {
                this.validationError = validation.error;
                this.$toast.error(validation.error, { duration: 6000 });
                this.polygonDrawer.delete(event.features[0].id);
                return;
            }

            this.validationError = null;
            this.savedPolygonState = JSON.parse(JSON.stringify(polygon));
            this.area = this.calculateArea(data);
            this.updatingPolygon = true;

            try {
                await this.setPolygon(polygon);
            } catch (error) {
                console.error('Failed to save polygon:', error);
                this.polygonDrawer.delete(event.features[0].id);
                this.area = null;
                this.savedPolygonState = null;
                this.updatingPolygon = false;
                return;
            }

            this.$nextTick(() => {
                this.polygonDrawer.changeMode('simple_select', {
                    featureIds: [event.features[0].id],
                });
                this.updatingPolygon = false;
            });
        },
        async onDrawDelete(event) {
            // Polygon was deleted via Mapbox trash button (not our custom button)
            // Our custom button handles deletion directly, so this only fires for Mapbox UI
            this.updatingPolygon = true;
            this.clearPolygonState();

            try {
                await this.removePolygon();
            } catch (error) {
                console.error('Failed to delete polygon:', error);
            }

            this.$nextTick(() => {
                if (this.polygonDrawer) {
                    this.polygonDrawer.changeMode('draw_polygon');
                }
                this.updatingPolygon = false;
            });
        },
        async onDrawUpdate(event) {
            const mode = this.polygonDrawer.getMode();
            if (mode === 'draw_polygon') {
                return; // Don't validate while user is still drawing
            }

            const { polygon, data, validation } =
                this.buildPolygonFromDrawData();

            if (!validation.valid) {
                this.validationError = validation.error;
                this.$toast.error(
                    `Invalid edit: ${validation.error}. Reverting changes.`,
                    {
                        duration: 6000,
                    },
                );
                this.revertToSavedPolygon();
                return;
            }

            this.validationError = null;
            this.savedPolygonState = JSON.parse(JSON.stringify(polygon));
            this.area = this.calculateArea(data);
            this.updatingPolygon = true;

            try {
                await this.setPolygon(polygon);
            } catch (error) {
                console.error('Failed to update polygon:', error);
                this.revertToSavedPolygon();
            }

            this.updatingPolygon = false;
        },
        onModeChange(event) {
            // Clear any previous validation errors when starting to draw
            if (event.mode === 'draw_polygon') {
                this.validationError = null;
            }
        },
    },
};
</script>

<style scoped>
/* Move navigation controls (zoom +/-) down to avoid overlap with custom delete button */
#map-edit >>> .mapboxgl-ctrl-top-right {
    top: 50px;
}
</style>
