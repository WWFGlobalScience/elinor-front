<template>
  <MglMap
    class="min-h-[100vh] relative w-full"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :center="coordinates"
    :min-zoom="1"
    :max-zoom="16"
    :doubleClickZoom="false"
    :dragRotate="false"
    :keyboard="false"
    :scrollZoom="true"
    @load="onMapLoaded"
  >
    <MglNavigationControl position="top-right" />

    <MglMarker
      @click="refs.mapMarker.togglePopup()"
      ref="mapMarker"
      :coordinates="popup.coordinates"
    >
      <template slot="marker"><div></div></template>
      <MglPopup
        ref="mapPopup"
        :coordinates="coordinates"
        anchor="top-left"
        :closeButton="true"
        :closeOnClick="true"
      >
        <map-popup :assessment="popup.assessment" :click="showDetail" />
      </MglPopup>
    </MglMarker>

    <MglGeojsonLayer
      :sourceId="pointsSource.data.id"
      :source="pointsSource"
      layerId="clusterLayer"
      :layer="geoJsonLayer"
    />

    <MglGeojsonLayer
      :sourceId="pointsSource.data.id"
      :source="pointsSource"
      layerId="scoreLayer"
      :layer="scoreLayer"
    />

    <MglGeojsonLayer
      :sourceId="pointsSource.data.id"
      :source="pointsSource"
      layerId="markersLayer"
      :layer="markersLayer"
    />

    <MglGeojsonLayer
      :sourceId="polygonsSource.data.id"
      :source="polygonsSource"
      layerId="polygonLayer"
      :layer="polygonLayer"
    />
    <MglGeojsonLayer
      :sourceId="polygonsSource.data.id"
      :source="polygonsSource"
      layerId="polygonLineLayer"
      :layer="polygonLineLayer"
    />

    <MglGeojsonLayer
      v-if="countrySource"
      :sourceId="countrySource.data.id"
      :source="countrySource"
      layerId="countryLayer"
      :layer="countryLayer"
    />

    <map-title />
    <map-legend />
    <map-form :map-countries="countries" :attributes="attributes" />
    <!-- Show filters button for mobile/tablet -->
    <button
      type="button"
      class="btn--show-filters-mobile map-filters-mobile-btn absolute z-10 top-4"
      @click="showFiltersModal"
    >
      <span>{{ $t('pages.assessments.list.filters.showFilters') }}</span>
      <img src="~/assets/img/ico-filters-turqy.svg" alt="Filters" />
    </button>

    <map-box-list
      v-if="country && activeCountryList"
      :close="closeCountryList"
      :detail="setDetail"
      :list="filteredData"
    />
    <map-box-assessment
      v-if="popup.assessment && activeDetail"
      :close="closeDetail"
      :assessment="popup.assessment"
    />
  </MglMap>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as turf from '@turf/turf';
import Mapbox from 'mapbox-gl';

import {
  MglMap,
  MglMarker,
  MglPopup,
  MglAttributionControl,
  MglNavigationControl,
  MglFullscreenControl,
  MglScaleControl,
  MglGeojsonLayer,
} from 'vue-mapbox';

export default {
  name: 'map-report',
  auth: false,
  layout: 'map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl,
    MglAttributionControl,
    MglScaleControl,
    MglFullscreenControl,
    MglGeojsonLayer,
  },
  fetchOnServer: false,
  data() {
    return {
      map: null,
      mapbox: null,
      accessToken: null,
      mapStyle: 'mapbox://styles/mapbox/satellite-v9',
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
                    id: 'countrySource',
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'MultiPolygon',
                        coordinates: [],
                    },
                },
      },
      geoJsonLayer: {
        type: 'circle',
        maxzoom: 9,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': 'white',
          'circle-stroke-width': 1,
          'circle-stroke-color': [
            'step',
            [
              '/',
              ['number', ['get', 'sum']],
              ['number', ['get', 'point_count']],
            ],
            '#EE8383',
            29,
            '#CCCC25',
            59,
            '#F5C243',
            89,
            '#4FAD5B',
          ],
          'circle-radius': ['step', ['get', 'point_count'], 13, 3, 16, 8, 18],
        },
      },
      scoreLayer: {
        type: 'symbol',
        maxzoom: 9,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': [
            'number-format',
            //["round",["/", ["number", ["get", "sum"]], ["number", ["get", "point_count"]]]],
            ['round', ['number', ['get', 'point_count']]],
            { 'min-fraction-digits': 0, 'max-fraction-digits': 0 },
          ],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': [
            'step',
            [
              '/',
              ['number', ['get', 'sum']],
              ['number', ['get', 'point_count']],
            ],
            '#EE8383',
            29,
            '#CCCC25',
            59,
            '#F5C243',
            89,
            '#4FAD5B',
          ],
        },
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
            0,
            'mark-poor',
            29,
            'mark-average',
            59,
            'mark-good',
            89,
            'mark-excellent',
          ],
        },
        filter: ['==', '$type', 'Point'],
      },
      polygonLayer: {
        type: 'fill',
        minzoom: 9,
        paint: {
          'fill-color': [
            'step',
            ['get', 'filterScore'],
            '#9E9E9E',
            0,
            '#EE8383',
            29,
            '#F5C243',
            59,
            '#CCCC25',
            89,
            '#4FAD5B',
          ],
          'fill-opacity': 0.5,
        },
        filter: ['==', '$type', 'Polygon'],
      },
      polygonLineLayer: {
        type: 'line',
        minzoom: 9,
        paint: {
          'line-color': [
            'step',
            ['get', 'filterScore'],
            '#585858',
            0,
            '#EE8383',
            29,
            '#F5C243',
            59,
            '#CCCC25',
            89,
            '#4FAD5B',
          ],
          'line-width': 3,
        },
      },

      countryLayer: {
        type: 'line',
        layout: {},
        paint: {
          'line-color': 'white',
          'line-width': 3,
        },
      },
    };
  },
  fetchOnServer: false,
  computed: {
    ...mapState({
      data: (state) => state.map.list,
      country: (state) => state.map.filters.country,
      attribute: (state) => state.map.filters.attribute,
      range: (state) => state.map.filters.range,
      management_area_countries: (state) =>
        state.countries.management_area_countries,
      countrySourceData: (state) => state.map.countrySourceData,
    }),
    filteredData() {
      if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
        return [];
      }
      
      var filtered = this.formatData().filter((f) => {
        if (!f || !f.properties) return false;

        if (this.country) {
          return (
            f.properties.management_area &&
            f.properties.management_area.countries &&
            Array.isArray(f.properties.management_area.countries) &&
            f.properties.management_area.countries.includes(this.country.name)
          );
        }
        return true;
      });

      if (this.attribute) {
        filtered = filtered.map((x) => {
          if (!x.properties || !x.properties.attributes) {
            return {
              ...x,
              properties: {
                ...x.properties,
                filterScore: -1,
              },
            };
          }

          let coincident = x.properties.attributes.find(
            (e) => e.attribute == this.attribute,
          );
          if (coincident) {
            return {
              ...x,
              properties: {
                ...x.properties,
                filterScore: coincident.score * 10,
              },
            };
          } else {
            return {
              ...x,
              properties: {
                ...x.properties,
                filterScore: -1,
              },
            };
          }
        });
      } else {
        filtered = filtered.map((x) => ({
          ...x,
          properties: {
            ...x.properties,
            filterScore: x.properties.score || 0,
          },
        }));
      }

      if (this.range) {
        var ranges = {
          plan: [0, 29],
          build: [30, 59],
          strengthen: [60, 89],
          mantain: [90, 100],
        };
        filtered = filtered.filter((x) => {
          const score = Number(x.properties.score) || 0;
          return (
            score >= ranges[this.range][0] && score < ranges[this.range][1]
          );
        });
      }

      // console.log('country', this.country);
      return filtered;
    },
    countries() {
      const filteredData = this.formatData().filter((f) => {
        if (!f || !f.properties) return false;
        
        return true;
      });
      console.log('range', this.range);
      console.log('country', this.country);
      console.log('attribute', this.attribute);
      // console.log('filteredData', filteredData);
      if (
        !filteredData ||
        !Array.isArray(filteredData) ||
        filteredData.length === 0
      ) {
        return [];
      }
      return Array.from(
        new Set(
          filteredData.reduce((carry, current) => {
            if (
              current &&
              current.properties &&
              current.properties.management_area &&
              current.properties.management_area.countries &&
              Array.isArray(current.properties.management_area.countries)
            ) {
              return [
                ...carry,
                ...current.properties.management_area.countries,
              ];
            }
            return carry;
          }, []),
        ),
      ).sort();
    },
    attributes() {
      if (
        !this.filteredData ||
        !Array.isArray(this.filteredData) ||
        this.filteredData.length === 0
      ) {
        return [];
      }

      return Array.from(
        new Set(
          this.filteredData.reduce((carry, current) => {
            if (
              current &&
              current.properties &&
              current.properties.attributes &&
              Array.isArray(current.properties.attributes)
            ) {
              return [
                ...carry,
                ...current.properties.attributes
                  .filter((e) => e && e.attribute)
                  .map((e) => e.attribute),
              ];
            }
            return carry;
          }, []),
        ),
      );
    },
    pointsSource() {
      // Always return a valid source to prevent "layer does not exist" errors
      // When there's no data, return an empty feature collection
      const features =
        this.filteredData &&
        Array.isArray(this.filteredData) &&
        this.filteredData.length > 0
          ? this.filteredData
          : [];

      return {
        type: 'geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 20,
        data: {
          id: 'pointsSource',
          type: 'FeatureCollection',
          features: features,
        },
        clusterProperties: {
          sum: ['+', ['get', 'filterScore']],
        },
      };
    },
    polygonsSource() {
      // Always return a valid source to prevent "layer does not exist" errors
      // When there's no data, return an empty feature collection
      const features =
        this.filteredData &&
        Array.isArray(this.filteredData) &&
        this.filteredData.length > 0
          ? this.filteredData
          : [];

      return {
        type: 'geojson',
        data: {
          id: 'polygonsSource',
          type: 'FeatureCollection',
          features: features,
        },
      };
    },
  },
  watch: {
    country() {
      this.getCountryGeoJson(this.country);
    },
  },
  methods: {
    ...mapActions({
      filter: 'map/filter',
      updateCountrySourceData: 'map/updateCountrySourceData',
      popupState: 'popup/popupState',
    }),
    showFiltersModal() {
      this.popupState({
        active: true,
        type: 'default',
        component: 'popup-map-filters-mobile',
        title: 'pages.map.filters.title',
        props: {
          mapCountries: this.countries,
          attributes: this.attributes,
        },
      });
    },
    async onMapLoaded(e) {
      var map = (this.map = e.map);

      map.loadImage('/img/marks/mark-grey.png', (error, image) => {
        if (error) {
          throw error;
        }
        map.addImage('mark-grey', image);
      });
      map.loadImage('/img/marks/mark-poor.png', (error, image) => {
        if (error) {
          throw error;
        }
        map.addImage('mark-poor', image);
      });
      map.loadImage('/img/marks/mark-average.png', (error, image) => {
        if (error) {
          throw error;
        }
        map.addImage('mark-average', image);
      });
      map.loadImage('/img/marks/mark-good.png', (error, image) => {
        if (error) {
          throw error;
        }
        map.addImage('mark-good', image);
      });
      map.loadImage('/img/marks/mark-excellent.png', (error, image) => {
        if (error) {
          throw error;
        }
        map.addImage('mark-excellent', image);
      });

      // Use generic mousemove event to handle cursor changes for all layers
      map.on('mousemove', (e) => {
        // Check for features in clusterLayer and markersLayer
        const clusterFeatures = map.getLayer('clusterLayer') 
          ? map.queryRenderedFeatures(e.point, { layers: ['clusterLayer'] }) 
          : [];
        const markerFeatures = map.getLayer('markersLayer') 
          ? map.queryRenderedFeatures(e.point, { layers: ['markersLayer'] }) 
          : [];
        
        if (clusterFeatures.length > 0 || markerFeatures.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
        } else {
          map.getCanvas().style.cursor = '';
        }
      });

      map.on('click', (f) => {
        // Handle clusterLayer click
        if (map.getLayer('clusterLayer')) {
          const clusterFeatures = map.queryRenderedFeatures(f.point, {
            layers: ['clusterLayer'],
          });

          if (clusterFeatures && clusterFeatures.length > 0) {
            const feature = clusterFeatures[0];
            if (feature.properties && feature.properties.cluster_id) {
              const clusterId = feature.properties.cluster_id;
              const source = map.getSource('pointsSource');
              if (!source) {
                console.warn('pointsSource not found');
                return;
              }
              
              source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                if (feature.geometry && feature.geometry.coordinates) {
                  // Check if we're below tablet view (768px)
                  const isBelowTablet =
                    typeof window !== 'undefined' && window.innerWidth <= 768;

                  if (isBelowTablet) {
                    // Position cluster at the left edge of screen using fitBounds with asymmetric padding
                    const point = turf.point(feature.geometry.coordinates);
                    // Expand bbox slightly to ensure fitBounds works properly
                    const bbox = turf.bbox(
                      turf.buffer(point, 0.01, { units: 'degrees' }),
                    );
                    map.fitBounds(bbox, {
                      padding: {
                        top: 40,
                        bottom: 40,
                        left: 4, // Minimal left padding to position at edge
                        right: Math.max(window.innerWidth * 0.75, 250), // Very large right padding to push to left edge
                      },
                      maxZoom: zoom, // Use the calculated zoom level
                    });
                  } else {
                    // Desktop: center the cluster
                    map.easeTo({
                      center: feature.geometry.coordinates,
                      zoom: zoom,
                    });
                  }
                } else {
                  console.warn('Invalid cluster feature geometry');
                }
              });
              return; // Stop processing after cluster click
            }
          }
        }

        // Handle markersLayer click
        if (map.getLayer('markersLayer')) {
          const markerFeatures = map.queryRenderedFeatures(f.point, {
            layers: ['markersLayer'],
          });

          if (markerFeatures && markerFeatures.length > 0) {
            const feature = markerFeatures[0];
            if (!feature.geometry || !feature.geometry.coordinates) {
              console.warn('Invalid feature geometry in click event');
              return;
            }

            const coordinates = feature.geometry.coordinates.slice();
            this.popup.coordinates = coordinates;
            this.popup.showed = true;
            this.popup.assessment =
              this.filteredData.find(
                (element) =>
                  element.id == feature.id &&
                  element.geometry.type == 'MultiPolygon',
              ) ||
              this.filteredData.find(
                (element) =>
                  element.id == feature.id && element.geometry.type == 'Point',
              );
            this.$refs.mapMarker.togglePopup();
          }
        }
      });
    },
    formatData() {
      var results = [];
      console.log('data', this.data);
      this.data.forEach((feature) => {
        if (
          !feature.geometry ||
          !feature.geometry.coordinates ||
          !Array.isArray(feature.geometry.coordinates) ||
          feature.geometry.coordinates.length <= 0
        ) {
          console.warn('Invalid feature geometry, skipping:', feature);
          return;
        }

        if (feature.geometry.type == 'Point') {
          // Validate Point coordinates
          if (
            !Array.isArray(feature.geometry.coordinates) ||
            feature.geometry.coordinates.length !== 2 ||
            typeof feature.geometry.coordinates[0] !== 'number' ||
            typeof feature.geometry.coordinates[1] !== 'number'
          ) {
            console.warn('Invalid Point coordinates, skipping:', feature);
            return;
          }

          var formatted = turf.point(feature.geometry.coordinates);
          formatted.id = feature.id;
          formatted.properties = { ...feature.properties };
          results.push(formatted);
        } else if (feature.geometry.type == 'MultiPolygon') {
          // Validate MultiPolygon coordinates
          if (
            !Array.isArray(feature.geometry.coordinates) ||
            feature.geometry.coordinates.length === 0
          ) {
            console.warn(
              'Invalid MultiPolygon coordinates, skipping:',
              feature,
            );
            return;
          }

          try {
            var polygon = turf.multiPolygon(feature.geometry.coordinates);
            var center = turf.centroid(polygon);

            // Create new objects instead of mutating
            const hectares = (turf.area(polygon) * 0.0001).toFixed(0);

            const polygonWithProps = {
              ...polygon,
              id: feature.id,
              properties: {
                ...feature.properties,
                hectares: hectares,
                scores: {},
              },
            };

            const centerWithProps = {
              ...center,
              id: feature.id,
              properties: {
                ...feature.properties,
                hectares: hectares,
              },
            };

            results.push(polygonWithProps);
            results.push(centerWithProps);
          } catch (error) {
            console.error(
              'Error processing MultiPolygon feature:',
              error,
              feature,
            );
          }
        }
      });

      // console.log('results', results);
      return results;
    },
    setDetail(assessment) {
      this.popup.assessment = assessment;
      this.showDetail();
    },
    showDetail() {
      this.activeCountryList = false;
      this.updateCountrySourceData([]);

      this.activeDetail = true;
      this.$refs.mapMarker.togglePopup();

      // Safety check: ensure map is available
      if (!this.map) {
        console.warn('Map not yet loaded, skipping map operations');
        return;
      }

      // Safety check: ensure assessment data is available
      if (!this.popup.assessment || !this.popup.assessment.geometry) {
        console.warn('No valid assessment geometry available');
        return;
      }

      // Center the popup card when opening popup
      if (this.popup.assessment.geometry.type == 'MultiPolygon') {
        var bbox = turf.bbox(this.popup.assessment.geometry);
        // Use padding that accounts for popup card width (max 218px) to center the card
        // Popup is anchored top-left, so we need extra right padding to center it
        const popupCardWidth = 218;
        const paddingRight = Math.max(popupCardWidth / 2 + 40, 149); // Half popup width + base padding
        this.map.fitBounds(bbox, {
          padding: {
            top: 40,
            bottom: 40,
            left: 40,
            right: paddingRight,
          },
        });
      } else {
        // Point geometry - center the popup card
        const coordinates = this.popup.assessment.geometry.coordinates;

        // Create a small expanded bbox around the point
        const point = turf.point(coordinates);
        const bbox = turf.bbox(turf.buffer(point, 0.01, { units: 'degrees' }));

        // Use asymmetric padding to center the popup card
        // Popup is anchored top-left, extends to the right
        // We need extra right padding to center the card
        const popupCardWidth = 218; // Max width from CSS
        const paddingRight = Math.max(popupCardWidth / 2 + 40, 149); // Half popup width + base padding

        this.map.fitBounds(bbox, {
          padding: {
            top: 40,
            bottom: 40,
            left: 40,
            right: paddingRight,
          },
          maxZoom: 8, // Limit zoom level
        });
      }
    },
    closeDetail() {
      this.activeDetail = false;
      if (
        this.popup.assessment &&
        this.popup.assessment.properties &&
        this.popup.assessment.properties.management_area &&
        this.popup.assessment.properties.management_area.countries &&
        this.popup.assessment.properties.management_area.countries.length > 0
      ) {
        const country =
          this.popup.assessment.properties.management_area.countries[0];
        this.filter({
          name: 'country',
          value: {
            name: country,
            code: '',
          },
        });
        this.getCountryGeoJson(country);
      } else {
        console.warn(
          'No valid assessment data available for country selection',
        );
        this.getCountryGeoJson(null);
      }
    },
    closeCountryList() {
      this.activeCountryList = false;
      this.filter({ name: 'country', value: undefined });
      this.getCountryGeoJson(null);
    },
    getCountryGeoJson(country) {
      // Safety check: ensure map is available
      if (!this.map) {
        console.warn('Map not yet loaded, skipping country GeoJSON update');
        return;
      }

      if (country) {
        this.activeCountryList = true;
        this.activeDetail = false;
        fetch(`/geojson/${country.code}.json`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('HTTP error ' + response.status);
            }
            return response.json();
          })
          .then((json) => {
            // Validate that we have valid coordinates before updating
            if (
              json.geometry &&
              json.geometry.coordinates &&
              Array.isArray(json.geometry.coordinates) &&
              json.geometry.coordinates.length > 0
            ) {
              this.updateCountrySourceData(json.geometry.coordinates);
              this.countrySource.data.geometry = json.geometry;
              var bbox = turf.bbox(json.geometry);

              this.map.fitBounds(bbox, {
                padding: {
                  top: 10,
                  bottom: 25,
                  left: 15,
                  right: 5,
                },
              });
            } else {
              console.warn(
                'Invalid GeoJSON coordinates received for country:',
                country.code,
                json,
              );
              this.updateCountrySourceData([]);
            }
          })
          .catch((error) => {
            console.error('Error fetching country GeoJSON:', error);
            this.updateCountrySourceData([]);
          });
      } else {
        this.countrySource.data.geometry.coordinates = [];
        this.updateCountrySourceData([]);
        this.map.flyTo({ center: this.coordinates, zoom: 1 });
        
        // Close popup if open
        if (this.popup.showed && this.$refs.mapMarker) {
          this.$refs.mapMarker.togglePopup();
        }
        this.popup.showed = false;
        this.popup.assessment = null;
        const mapBoxPopup = document.querySelector('.mapboxgl-popup');
        if (mapBoxPopup) {
          mapBoxPopup.remove();
        }
        
      }
    },
  },
  created() {
    this.mapbox = Mapbox;
  },
  async mounted() {
    // Set Mapbox access token from environment
    this.accessToken = this.$config.mapboxAccessToken;

    await this.$store.dispatch('map/fetchMap');
    this.$store.dispatch('countries/fetchCountries');

  },
  beforeDestroy() {
    // Clean up map sources and layers before component destruction
    if (this.map) {
      try {
        // Remove layers first, then sources
        const layersToRemove = [
          'clusterLayer',
          'scoreLayer',
          'markersLayer',
          'polygonLayer',
          'polygonLineLayer',
          'countryLayer',
        ];

        layersToRemove.forEach((layerId) => {
          if (this.map.getLayer(layerId)) {
            this.map.removeLayer(layerId);
          }
        });

        // Remove sources
        const sourcesToRemove = [
          'pointsSource',
          'polygonsSource',
          'countrySource',
        ];

        sourcesToRemove.forEach((sourceId) => {
          if (this.map.getSource(sourceId)) {
            this.map.removeSource(sourceId);
          }
        });
      } catch (error) {
        console.warn('Error during map cleanup:', error);
      }
    }
  },
};
</script>
