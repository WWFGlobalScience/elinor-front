<template>
    <article class="page page--managed-area">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-managed-areas-turqy.svg">
                    <span>{{ $t( 'pages.managed-areas.content.header.title' ) }}</span>
                </h1>
                <h2 class="ma__name">{{ ma["name"] }}</h2>
            </div>
        </header>
        <section class="section section--tab section--mt-10">
            <div class="container">
                <ul class="elinor__tabs">
                    <li>
                        <button type="button" class="btn--tab is--active" data-tab="info">
                            <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.info.tab' ) }}</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" class="btn--tab" data-tab="edit">
                            <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.edit' ) }}</span>
                        </button>
                    </li>
                     <li>
                        <button type="button" class="btn--tab" data-tab="contributors">
                            <span class="num">3</span>
                            <span class="txt">{{ $t( 'pages.managed-areas.content.ma.tabs.contributors' ) }}</span>
                        </button>
                    </li>
                </ul>
            </div> 
        </section>
        <section class="section section--ma-data">
            <div class="container">
                <header class="header--ma-data">
                    <h3>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.header.title' ) }}</h3>
                </header>
                <ul class="elinor__data-grid elinor__data-grid--3-5">
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.name' ) }}</span>
                        <span class="data">{{ ma["name"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name' ) }}</span>
                        <span class="data">{{ ma["pa-ca-name"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.establishment' ) }}</span>
                        <span class="data">{{ ma["establishment"] | formatDate }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.size' ) }}</span>
                        <span class="data">{{ ma["size"] }} h</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name-focal' ) }}</span>
                        <span class="data">{{ ma["pa-ca-name-focal"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit' ) }}</span>
                        <span class="data">{{ ma["manage-unit"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit-definition' ) }}</span>
                        <span class="data">{{ ma["manage-unit-definition"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.governance-type' ) }}</span>
                        <span class="data">{{ ma["governance-type"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.authority-name' ) }}</span>
                        <span class="data">{{ ma["management-authority"] }}</span>
                    </li>
                </ul>
                <div class="elinor__data-separator"></div>
                <ul class="elinor__data-grid elinor__data-grid--3-5">
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.rights' ) }}</span>
                        <span class="data">{{ ma["rights"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.stakeholder-groups' ) }}</span>
                        <span class="data">{{ ma["stakeholder-groups"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.support' ) }}</span>
                        <span class="data">{{ ma["support"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.wdpa-id' ) }}</span>
                        <span class="data">{{ ma["wdpa-id"] }}</span>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section section--ma-map">
            <header class="header--map">
                <div class="container">
                    <p>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.map.header.title' ) }}</p>
                    <p>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.map.header.subtitle' ) }}</p>
                </div>
            </header>
            <div id="map" class="elinor__map"></div>
        </section>
        <section class="section section--ma-data">
            <div class="container">
                <header class="header--ma-data header--ma-data--stripped">
                    <h3>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.assessments.header.title' ) }}</h3>
                </header>
                <ul class="ma__results">
                    <li v-for="(assessment, index) in assessments" class="elinor__badge ui-rounded-border">
                        <header class="header">
                            <div class="left">
                                <span class="subtitle">{{ assessment.name }}</span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="year">
                                <span class="label">{{ $t( 'pages.assessments.content.assessment.labels.year' ) }}</span>
                                <span class="data">{{ assessment.year }}</span>
                            </li>
                            <li class="countries">
                                <span class="label">{{ $t( 'pages.assessments.content.assessment.labels.countries' ) }}</span>
                                <span class="data">
                                    <span v-for="(country, index) in assessment.countries">
                                        <span v-if="index != assessment.countries.length - 1">{{ country }}, </span>
                                        <span v-else>{{ country }}</span>
                                    </span>
                                </span>
                            </li>
                            <li class="view">
                                <nuxt-link :to="`/assessments/${assessment.id}`" class="btn--border-turqy btn--opacity--child">
                                    <span class="btn--opacity__target">{{ $t( 'default.view' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>

    </article>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'
export default {
    name: 'ManagedArea',
    data() {
        return {
            id: this.$route.params.id,
            map: null,
            coords: null
        }
    },
    filters: {
        formatDate: function( value ) {
            if (value) {
                return moment(value *1000 ).format('MM/DD/YYYY')
            }
        }
    },
    computed: {
        ma() {
            return this.$store.state.ma.ma
        },
        assessments() {
            return this.$store.state.assessments.list
        }
    },
    methods: {
        ...mapActions({
            getMa: 'ma/getMa',
            getAssessments: 'assessments/getAssessments'
        }),
        mapCreate() {
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-68.137343, 45.137451],
                zoom: 5
            })
            this.mapAddControls()
            this.mapDisableScroll()
            this.mapAddLayers()
        },
        mapAddLayers() {
            this.map.on( 'load', () => {
                this.mapAddSource()
            })
        },
        mapAddSource() {
            this.map.addSource('maine', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                    // These coordinates outline Maine.
                        'coordinates': [
                           this.ma.area
                        ]
                    }
                }
            })
            this.mapAddShapeFill()
            this.mapAddShapeStroke()
        },
        mapAddShapeFill() {
            this.map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine',
                'layout': {},
                'paint': {
                    'fill-color': '#EAAF5C',
                    'fill-opacity': 0.4
                }
            });
        },
        mapAddShapeStroke() {
            this.map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'maine',
                'layout': {},
                'paint': {
                    'line-color': '#EAAF5C',
                    'line-width': 2
                }
            });
        },
        mapAddControls() {
            this.map.addControl( new mapboxgl.NavigationControl() )
            this.map.addControl( new mapboxgl.FullscreenControl({
                container: document.documentElement
                }) 
            )
        },
        mapDisableScroll() {
            this.map.scrollZoom.disable();
        },
        loadMa() {
            const MaPromise = new Promise(( resolve, reject ) => {
                setTimeout(() => {
                    resolve( this.getMa( this.id ) )
                }, 300)
            })

            MaPromise.then( this.mapCreate() )
        }
    },
    mounted() {
        this.getAssessments()
        this.loadMa()
    }
}
</script>