<template>
  <section class="section section--assessment-map">
    <header class="header--map">
      <div class="container">
        <p>
          {{
            $t('pages.managed-areas.content.ma.tabs.info.data.map.header.title')
          }}
        </p>
        <p>
          {{
            $t(
              'pages.managed-areas.content.ma.tabs.info.data.map.header.subtitle',
            )
          }}
        </p>
      </div>
    </header>
    <div ref="mapContainer" class="elinor__map"></div>
  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'ma-map-2',
  props: ['ma'],
  data() {
    return {
      map: null,
    };
  },
  watch: {
    ma() {
      Object.keys(this.ma).length != 0 ? this.mapCreate() : null;
    },
  },
  methods: {
    mapCreate() {
      this.map != null ? this.map.remove() : null;
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-68.137343, 45.137451],
        zoom: 5,
      });
      this.mapAddControls();
      this.mapDisableScroll();
      this.mapAddLayers();
    },
    mapAddLayers() {
      this.map.on('load', () => {
        this.mapAddSource();
      });
    },
    mapAddSource() {
      this.map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            // These coordinates outline Maine.
            coordinates: [this.ma.area],
          },
        },
      });
      this.mapAddShapeFill();
      this.mapAddShapeStroke();
    },
    mapAddShapeFill() {
      this.map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: {
          'fill-color': '#EAAF5C',
          'fill-opacity': 0.4,
        },
      });
    },
    mapAddShapeStroke() {
      this.map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'maine',
        layout: {},
        paint: {
          'line-color': '#EAAF5C',
          'line-width': 2,
        },
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
      this.map.scrollZoom.disable();
    },
  },
  mounted() {
    // Set Mapbox access token from environment
    mapboxgl.accessToken = this.$config.mapboxAccessToken;

    Object.keys(this.ma).length != 0 ? this.mapCreate() : null;
  },
};
</script>
