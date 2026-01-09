<template>
  <section class="section section--map-edit flex flex-col gap-8">
    <div class="container">
      <div class="form">
        <div class="form__group">
          <div class="form__row">
            <div class="input input--multiselect">
              <label class="label">{{
                $t(
                  'pages.assessments.edit.tabs.managementArea.map.polygonParagraph1',
                )
              }}</label>
              <div class="note">
                Please select an MA boundaries or marker input method.
              </div>
              <div class="multiselect__wrap">
                <multiselect
                  v-model="selectedOption"
                  track-by="value"
                  value-prop="value"
                  label="label"
                  :options="options"
                  :multiple="false"
                  :searchable="false"
                  :showLabels="false"
                  :allow-empty="true"
                  open-direction="bottom"
                  @input="onSelectChanged($event)"
                >
                  <span slot="noResult" slot-scope="props"
                    >{{ $t('default.noresults') }}
                  </span>
                </multiselect>
                <div class="multiselect__caret">
                  <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="form__row" v-if="selectedOptionValue === 'point'">
            <div class="input input--pr">
              <div class="label">Latitude</div>
              <input
                type="text"
                v-model="latitude"
                @change="latLngChanged($event.target.value, null)"
              />
            </div>
            <div class="input input--pr">
              <div class="label">Longitude</div>
              <input
                type="text"
                v-model="longitude"
                @change="latLngChanged(null, $event.target.value)"
              />
            </div>
          </div>
          <div class="form__row" v-if="selectedOptionValue === 'polygon'">
            <div class="input">
              <label class="label">
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.map.polygonParagraph2',
                  )
                }}
              </label>
              <ul class="map__tools">
                <li>
                  <div class="pic__wrap">
                    <img src="~/assets/img/map-1.png" />
                  </div>
                  <span>{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.map.drawPolygonStartText',
                    )
                  }}</span>
                </li>
                <li>
                  <div class="pic__wrap">
                    <img src="~/assets/img/map-2.png" />
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
                    <img src="~/assets/img/map-4.png" alt="" />
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
        </div>
      </div>
    </div>
    <div
      class="container"
      v-show="latitude && longitude && selectedOptionValue === 'point'"
    >
      <div id="map-point" class="elinor__map"></div>
    </div>
    <upload-spatialfile v-show="selectedOptionValue === 'shapefile'" />
    <div v-show="selectedOptionValue === 'polygon'">
      <div class="container">
        <div id="map-edit" class="elinor__map relative">
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
                  left: '10px',
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
            <div class="map__instructions">
              {{ $t('pages.assessments.edit.tabs.managementArea.map.help') }}
            </div>
            <div class="map__area" v-if="area != null">
              {{ $t('pages.assessments.edit.tabs.managementArea.map.area') }}:
              &nbsp;{{ area != null ? area : 0 }}&nbsp;km²
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
      </div>
    </div>
    <div class="container" v-show="selectedOptionValue">
      <div class="form">
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
                @change="save('geospatial_sources', $event.target.value)"
                >{{ managementArea.geospatial_sources }}</textarea
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { mapActions, mapState } from 'vuex';
import * as turf from '@turf/turf';

export default {
  name: 'ma-map',
  data() {
    return {
      map: null,
      mapPoint: null,
      polygonDrawer: null,
      marker: null,
      markerPoint: null,
      area: null,
      validationError: null,
      isEditingExistingPolygon: false,
      savedPolygonState: null,
      polygonLoaded: false,
      updatingPolygon: false,
      selectedOption: null,
      selectedOptionValue: null,
      latitude: null,
      longitude: null,
      options: [
        {
          value: 'point',
          label: 'Input point',
        },
        {
          value: 'shapefile',
          label: 'Upload shapefile',
        },
        {
          value: 'polygon',
          label: 'Draw polygon',
        },
      ],
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
    // Set Mapbox access token from environment
    mapboxgl.accessToken = this.$config.mapboxAccessToken;


    if (this.managementArea) {
      if (this.managementArea.polygon) {
        if (this.managementArea.import_file) {
          this.selectedOptionValue = 'shapefile';
        } else {
          this.selectedOptionValue = 'polygon';
        }
      } else if (this.managementArea.point) {
        this.selectedOptionValue = 'point';
      }
      
      // Set selectedOption to the matching option object
      if (this.selectedOptionValue) {
        this.selectedOption = this.options.find(
          (opt) => opt.value === this.selectedOptionValue
        );
      }
    }

    // console.log(this.managementArea);
    if (this.managementArea) {
      this.mapCreate();
    }
    
    if (this.managementArea.point) {
      this.latitude = this.managementArea.point.coordinates[1];
      this.longitude = this.managementArea.point.coordinates[0];
      this.$nextTick(() => {
        this.mapCreatePoint();
      });
    }
  },
  activated() {
    // Called when component is activated (e.g., when navigating back via route)
    // Resize maps to fix small size rendering issue
    this.$nextTick(() => {
      this.resizeMaps();
    });
  },
  watch: {
    managementArea() {
      this.mapCreate();
    },
    ['managementArea.polygon']() {
      this.mapCreate();
    },
    ['managementArea.point']() {
      if (this.managementArea.point) {
        this.latitude = this.managementArea.point.coordinates[1];
        this.longitude = this.managementArea.point.coordinates[0];
      } else {
        this.latitude = null;
        this.longitude = null;
      }
    },
  },
  methods: {
    ...mapActions({
      editManagementAreaField: 'managementareas/editManagementAreaField',
      removePolygon: 'managementareas/removePolygon',
      setPoint: 'managementareas/setPoint',
      setPolygon: 'managementareas/setPolygon',
      removePolygon: 'managementareas/removePolygon',
      popupState: 'popup/popupState',
    }),
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
    onSelectChanged(e) {
      this.selectedOption = e;
      this.selectedOptionValue = e.value;
      if (e.value === 'point') {
        this.$nextTick(() => {
          this.mapCreatePoint();
        });
      } else {
        if (this.mapPoint) {
          this.mapPoint.remove();
          this.mapPoint = null;
        }
      }

      if (e.value === 'polygon') {
        this.$nextTick(() => {
          this.mapCreate();
        });
      } else {
        if (this.map) {
          this.map.remove();
          this.map = null;
        }
      }
    },
    latLngChanged(lat, lng) {
      if (lat != null && lat !== '') {
        const latNum = parseFloat(lat);
        if (!isNaN(latNum)) {
          this.latitude = latNum.toFixed(6);
        }
      }
      if (lng != null && lng !== '') {
        const lngNum = parseFloat(lng);
        if (!isNaN(lngNum)) {
          this.longitude = lngNum.toFixed(6);
        }
      }

      if (this.latitude && this.longitude) {
        this.$nextTick(() => {
          this.mapCreatePoint();
        });
        const point = {
          type: 'Point',
          coordinates: [parseFloat(this.longitude), parseFloat(this.latitude)],
        };

        // this.removePolygon();
        this.setPoint(point);
        // this.save('point', point);
        // this.save('polygon', null);
      } else {
        if (this.mapPoint) {
          this.mapPoint.remove();
          this.mapPoint = null;
        }
      }
    },
    save(field, value) {
      this.editManagementAreaField({
        field,
        value,
        id: this.managementArea.id,
        assessmentId: this.assessment.id,
      });
    },
    mapCreate() {
      const container = document.getElementById('map-edit');
      if (!container) {
        return;
      }
      if (this.managementArea) {
        this.map != null ? this.map.remove() : null;
        // Reset polygon loaded flag
        this.polygonLoaded = false;
        // Determine if we're editing an existing saved polygon
        this.isEditingExistingPolygon = !!(
            this.managementArea.polygon &&
            this.managementArea.polygon.coordinates.length
            && !this.managementArea.import_file
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
          this.managementArea.polygon.coordinates.length &&
          !this.managementArea.import_file
        ) {
          const polygon = turf.multiPolygon(
            this.managementArea.polygon.coordinates,
          );
          center = turf.centroid(polygon);
        }
        // else if (this.managementArea.point) {
        //     center = turf.point(this.managementArea.point.coordinates);
        //     this.marker = new mapboxgl.Marker().setLngLat(
        //         this.managementArea.point.coordinates,
        //     );
        // }

        // console.log(center);

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
            // polygon: true,
            trash: false,
          },
        };

        if (this.isEditingExistingPolygon) {
            options.defaultMode = 'simple_select'; // For editing existing polygons
            options.controls.polygon = false;
        } else {
            options.defaultMode = 'draw_polygon'; // For drawing new polygons
            options.controls.polygon = true;
        }

        this.polygonDrawer = new MapboxDraw(options);

        this.map.addControl(this.polygonDrawer);
        this.mapAddControls();
        // this.mapDisableScroll();
        this.mapFitBounds();

        this.map.on('draw.create', this.onDrawCreate);
        this.map.on('draw.delete', this.onDrawDelete);
        this.map.on('draw.update', this.onDrawUpdate);
        this.map.on('draw.modechange', this.onModeChange);
        this.map.on('load', () => {
          // Resize map to ensure proper dimensions after load
          this.$nextTick(() => {
            if (this.map) {
              this.map.resize();
            }
          });
          
          if (
            this.managementArea.polygon &&
            this.managementArea.polygon.coordinates.length &&
            !this.managementArea.import_file
          ) {
            const polygon = turf.multiPolygon(
              this.managementArea.polygon.coordinates,
            );
            this.polygonDrawer.add(polygon);
            this.area = this.calculateArea(polygon);
            this.polygonLoaded = true;
            // Fit bounds after polygon is added and map is resized
            this.$nextTick(() => {
              this.mapFitBounds();
            });
          }
        });
      }
    },
    mapCreatePoint() {
      const container = document.getElementById('map-point');
      if (!container) {
        return;
      }
      if (this.mapPoint) {
        this.mapPoint.remove();
        this.mapPoint = null;
      }
      const lat = parseFloat(this.latitude);
      const lng = parseFloat(this.longitude);
      if (isNaN(lat) || isNaN(lng)) {
        return;
      }
      this.markerPoint = new mapboxgl.Marker().setLngLat([lng, lat]);
      this.mapPoint = new mapboxgl.Map({
        container: 'map-point',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 5,
      });
      if (this.markerPoint) {
        this.markerPoint.addTo(this.mapPoint);
      }

      this.mapPoint.addControl(new mapboxgl.NavigationControl());
      this.mapPoint.addControl(
        new mapboxgl.FullscreenControl({
          container: document.documentElement,
        }),
      );
      // this.mapPoint.scrollZoom.disable();
      
      // Resize map after load to ensure proper dimensions
      this.mapPoint.on('load', () => {
        this.$nextTick(() => {
          if (this.mapPoint) {
            this.mapPoint.resize();
          }
        });
      });
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
      // this.map.scrollZoom.disable();
    },
    mapFitBounds() {
      if (
        this.managementArea.polygon &&
        this.managementArea.polygon.coordinates.length
        && this.managementArea.import_file === null
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
    resizeMaps() {
      // Resize polygon edit map
      if (this.map) {
        this.map.resize();
        this.mapFitBounds();
      }
      // Resize point map
      if (this.mapPoint) {
        this.mapPoint.resize();
        if (this.latitude && this.longitude) {
          this.mapPoint.setCenter([parseFloat(this.longitude), parseFloat(this.latitude)]);
        }
      }
    },
    },
};
</script>
