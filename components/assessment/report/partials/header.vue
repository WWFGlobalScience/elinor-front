<template>
  <div class="header">
    <img class="map" alt="mapox image" :src="getMapImageUrl()" />
    <img src="~/assets/img/report-brand.png" class="brand" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export default {
  name: 'assessment-report-partials-header',
  computed: {
    ...mapState({
      report: (state) => state.assessments.report,
      managementArea: (state) => state.managementareas.instance,
    }),
    hectareas() {
      if (this.managementArea.polygon) {
        const polygon = turf.polygon(
          this.managementArea.polygon.coordinates.flat(1),
        );
        const area = (turf.area(polygon) * 0.0001).toFixed(0);
        return this.managementArea.polygon.coordinates ? Number(area) : 0;
      } else {
        return null;
      }
    },
  },
  methods: {
    getMapImageUrl() {
      const token = mapboxgl.accessToken;
      const baseUrl =
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/';
      const size = '593x220@2x';
      // console.log('this.managementArea', this.managementArea.point.coordinates);
      if (
        this.managementArea.polygon &&
        this.managementArea.polygon.coordinates.length > 0
      ) {
        console.log('this is polygon');
        return `${baseUrl}geojson(${this.getGeoJson()})/auto/${size}?padding=40,20,80&access_token=${token}`;
      } else if (
        this.managementArea.point &&
        this.managementArea.point.coordinates.length > 0
      ) {
        const [lon, lat] = this.managementArea.point.coordinates;
        const zoom = 5;
        const marker = `pin-l+43a0bd(${lon},${lat})`;
        return `${baseUrl}${marker}/${lon},${lat},${zoom}/${size}?access_token=${token}`;
      } else {
        return `${baseUrl}auto/${size}?padding=40,20,80&access_token=${token}`;
      }
    },
    getGeoJson() {
      var colorMapping = {
        poor: '#EE8383',
        average: '#F5C243',
        good: '#CCCC25',
        excellent: '#4FAD5B',
      };
      var color = this.getAssessmentColor(this.report.score);
      var coordinates = turf.simplify(
        turf.cleanCoords(this.managementArea.polygon),
        { tolerance: 0.008, highQuality: false },
      ).coordinates;

      var geojson = `{
                "type": "FeatureCollection",
                "features": [
                    {
                    "type": "Feature",
                    "properties": {
                        "stroke": "${colorMapping[color]}",
                        "stroke-width": 3,
                        "stroke-opacity": 0.5,
                        "fill": "${colorMapping[color]}",
                        "fill-opacity": 0.1
                    },
                    "geometry": {
                        "coordinates": ${JSON.stringify(coordinates.flat(1))},
                        "type": "Polygon"
                    },
                    "id": 0
                    }
                ]
            }`;
      var url = geojson.replace(/\s/g, '');
      url = encodeURI(url);
      url = url.replace(/#/g, '%23');
      return url;
    },
  },
  mounted() {
    // Set Mapbox access token from environment
    mapboxgl.accessToken = this.$config.mapboxAccessToken;
  },
};
</script>
