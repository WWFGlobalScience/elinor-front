<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>Edit Managed Area</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.name-new' ) }}</label>
                            <input type="text" name="name" placeholder="Name here" :value="managementArea.name" @change="save('name', $event.target.value)">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name-ma' ) }}</label>
                            <div v-if="editWdpaId || !managementArea.protected_area" class="input input--1-3">
                                <input type="text" :value="managementArea.protected_area && managementArea.protected_area.wdpa_id" placeholder="00000 Id" @change="protectedAreaByWdpaId({wdpaId: $event.target.value, managementAreaId: managementArea.id, assessmentId: assessment.id})">
                                <p v-if="editWdpaIdError" class="msg msg--error">WDPA ID not found at protected planet api. <a target="_blank" href="https://www.protectedplanet.net/en/thematic-areas/wdpa?tab=WDPA">Click here to search</a></p>
                            </div>
                            <div v-if="!editWdpaId && managementArea.protected_area" class="input input--2-3">
                                <input :disabled="true" type="text" :value="managementArea.protected_area.name">
                                <div @click="clearProtectedArea()" role="button" class="btn--protected-area__clear">
                                    <img src="~/assets/img/ico-close-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-related' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.containedby"
                                    track-by="id"
                                    label="name"
                                    :options="managementAreas"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom"
                                    @input="onSelectChanged('containedby', $event)"
                                    @search-change="onSelectSearch('managementareas/fetchManagementAreas', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input-1-2 input--date">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.date' ) }}</label>
                            <div class="date__wrap">
                                <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :value="managementArea.date_established" @selected="onDateEstablishmentSelected" />
                                <div class="date__caret">
                                    <img src="~/assets/img/ico-date-turqy.svg">
                                </div>
                            </div>
                        </div>
                        <div class="input input-1-2">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.size' ) }}</label>
                            <input type="number" name="ha" placeholder="0000 Ha" :value="managementArea.reported_size" @change="save('reported_size', $event.target.value)">
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.name-authority' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.management_authority"
                                    track-by="id"
                                    label="name"
                                    :options="authorities"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom"
                                    @input="onSelectChanged('management_authority', $event)"
                                    @search-change="onSelectSearch('managementareas/fetchAuthorities', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.governance-type' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.governance_type"
                                    track-by="id"
                                    label="name"
                                    :options="governanceTypes"
                                    :multiple="false" :searchable="true" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom"
                                    @input="onSelectChanged('governance_type', $event)"
                                    @search-change="onSelectSearch('governancetypes/fetchGovernanceTypes', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--pr">
                            <div class="label">What are the objectives of this MA?</div>
                            <textarea name="objectives" placeholder="" @change="save('objectives', $event.target.value)">{{ managementArea.objectives }}</textarea>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.rights-ma' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.recognition_level && managementArea.recognition_level.map(recognitionLevel => {return {id: recognitionLevel, name: $t('managementarea.recognition_levels.' + recognitionLevel) }})"
                                    track-by="id"
                                    label="name"
                                    :options="recognitionLevels"
                                    :multiple="true" :searchable="false" :showLabels="false"
                                    :allow-empty="true" open-direction="bottom"
                                    @input="onSelectChanged('recognition_level', $event.map(recognitionLevel => recognitionLevel.id))">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                    <template slot="option" slot-scope="{ option }">
                                        <span :content="option.guide" v-tippy='{ placement : "right" }'>
                                            {{ option.name }}
                                        </span>
                                    </template>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.stakeholder-groups' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.stakeholder_groups"
                                    track-by="id"
                                    label="name"
                                    :options="stakeholderGroups"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="true" open-direction="bottom" :hide-selected="true"
                                    @input="onSelectChanged('stakeholder_groups', $event)"
                                    @search-change="onSelectSearch('stakeholdergroups/fetchStakeholderGroups', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.support-question' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.support_sources"
                                    track-by="id"
                                    label="name"
                                    :options="supportSources"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="true" open-direction="bottom" :hide-selected="true"
                                    @input="onSelectChanged('support_sources', $event)"
                                    @search-change="onSelectSearch('supportsources/fetchSupportSources', $event)">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="form__row">
                        <div class="input input--1-2">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.wdpa-id-question' ) }}</label>
                            <input type="text" :value="managementArea.wdpa_protected_area" name="id" placeholder="00000 Id"  @change="save('wdpa_protected_area', $event.target.value)">
                        </div>
                    </div>-->
                </div>
                <div class="container">
                    <div class="form__row form__row--separator form__row--separator--16"></div>
                </div>
                <div class="container--sm">
                    <div class="form__row form__row--mt-16">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.countries-ma' ) }}</label>
                            <div class="multiselect__wrap">
                                <multiselect
                                    :value="managementArea.countries"
                                    track-by="code"
                                    label="name"
                                    :options="countries"
                                    :multiple="true" :searchable="true" :showLabels="false"
                                    :allow-empty="true" :hide-selected="true"
                                    @input="onCountryChanged($event.map(country => country.code))">
                                    <span slot="noResult" slot-scope="props">{{ $t('default.noresults') }} </span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="managementArea.countries && managementArea.countries.length" class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.provinces-ma' ) }}</label>
                            <div id="geocoder"></div>
                            <div class="section section--tags section--tags-filter">
                                <ul>
                                    <li v-for="region in managementArea.regions">
                                        <div class="tag__item">{{ region.name }}</div>
                                        <a @click="removeRegion(region.id)" role="button" class="tag__close">
                                            <img src="~/assets/img/ico-close-popup.svg">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ma-map-edit></ma-map-edit>

            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row form__row--mt-24">
                        <div class="input input--radios">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.zones' ) }}</label>
                            <div class="radios__wrap">
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="zone-yes" @change="onShowZones" :checked="showZones === true" :value="true">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="zone-yes" class="label">Yes</label>
                                </div>
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" name="consent_given" id="zone-no" @change="onShowZones" :checked="showZones === false" :value="false">
                                        <img src="~/assets/img/ico-ok.svg">
                                    </div>
                                    <label for="zone-no" class="label">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form__row form__row--mt-16" v-if="showZones">
                        <div class="input input--multiselect">
                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.zones-quantity' ) }}</label>
                            <div class="multiselect__wrap multiselect__wrap--1-3">
                                <multiselect
                                    :value="numZones"
                                    :options="[1,2,3,4,5,6,7,8,9,10]"
                                    :multiple="false" :searchable="false" :showLabels="false"
                                    :allow-empty="false" open-direction="bottom"
                                    @input="onNumZonesChanged($event)">
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>

                            <div v-if="numZones > 0" class="multiselect__extra">
                                <div v-for="(num, index) in numZones" :key="index" class="multiselect__form"><!-- Aquest div es repeteix en cas de seleccionar mes d'una zona -->
                                    <div class="form__row form__row--mt-8">
                                        <div class="input">
                                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.zone-name' ) }}</label>
                                            <input type="text" name="name" placeholder="Zone name 1" :value="zones[index] && zones[index].name" @change="onZoneFieldChanged('name', index, $event.target.value)">
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--multiselect">
                                            <label class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.zone-level' ) }}</label>
                                            <div class="multiselect__wrap">
                                                <multiselect
                                                    :value="zones[index] && zones[index].access_level"
                                                    :options="accessLevels"
                                                    track-by="id"
                                                    label="name"
                                                    :multiple="false" :searchable="false" :showLabels="false"
                                                    :allow-empty="false" open-direction="bottom"
                                                    @input="onZoneFieldChanged('access_level', index, $event.id)">
                                                </multiselect>
                                                <div class="multiselect__caret">
                                                    <img src="~/assets/img/ico-select-turqy.svg">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__row form__row--mt-8">
                                        <div class="input input--pr">
                                            <div class="label">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.zone-description' ) }}</div>
                                            <textarea name="explanation" placeholder="Text here" @change="onZoneFieldChanged('description', index, $event.target.value)">{{ zones[index] && zones[index].description }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                    <div class="section__bottom">
                        <NuxtLink @click.prevent :to="`/assessments/edit/${id}/the-survey`"
                            class="btn btn--opacity--child"
                        >
                            <span class="btn--opacity__target">Next step</span>
                            <img
                                src="~/assets/img/ico-button-arrow.svg"
                                alt="Next step"
                            />
                        </NuxtLink>
                    </div>
                </div>

        </form>

    </section>
</template>

<script>
import {mapActions, mapState} from "vuex";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFhbG9zIiwiYSI6ImNrNXoybGpqdTBweGszbG5qNmEwNzJ1dzAifQ.6mtLHsiBciOXdPVRMY3fuQ'

export default {
    name: 'ma-edit-new',
    data() {
        return {
            id: this.$route.params.id,
            geocoder: new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'region',
                language: 'en-US'
            }),
            showZones: null,
            numZones: null,
            accessLevels: [
                { id: 90, name: this.$t('managementarea.zones.acccess_Level.OPEN_ACCESS') },
                { id: 50, name: this.$t('managementarea.zones.acccessLevel.PARTIALLY_RESTRICTED') },
                { id: 10, name: this.$t('managementarea.zones.acccessLevel.FULLY_RESTRICTED') }
            ],
            recognitionLevels: [
                {id: 'local', name: this.$t('managementarea.recognition_levels.local'), guide: this.$t('managementarea.recognition_levels.local_guide')},
                {id: 'national', name: this.$t('managementarea.recognition_levels.national'), guide: this.$t('managementarea.recognition_levels.national_guide')},
                {id: 'international', name: this.$t('managementarea.recognition_levels.international'), guide: this.$t('managementarea.recognition_levels.international_guide')}
            ]
        }
    },
    mounted() {
        this.numZones = this.zones.length;
        this.showZones = this.zones.length > 0;

        this.initGeocoder();
    },
    watch: {
        zones() {
            this.numZones = this.zones.length;
            this.showZones = this.zones.length > 0;
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            managementArea: state => state.managementareas.instance,
            managementAreas: state => state.managementareas.list,
            governanceTypes: state => state.governancetypes.list,
            authorities: state => state.managementareas.authorities,
            stakeholderGroups: state => state.stakeholdergroups.list,
            supportSources: state => state.supportsources.list,
            countries: state => state.countries.list,
            regions: state => state.regions.list,
            protectedAreas: state => state.protectedareas.list,
            zones: state => state.managementareas.zones,
            editWdpaId: state => state.managementareas.editWdpaId,
            editWdpaIdError: state => state.managementareas.editWdpaIdError,
        })
    },
    methods: {
        save(field, value) {
            this.editManagementAreaField( {field, value, id: this.managementArea.id, assessmentId: this.assessment.id});
        },
        onSelectSearch(action, search) {
            this.$store.dispatch(action, search)
        },
        onCountryChanged(countries) {
            this.geocoder.setCountries(countries.join(','));
            if(countries.length === 0) {
                this.onSelectChanged('regions', [])
            }
            this.onSelectChanged('countries', countries)
        },
        async onSelectChanged(field, value) {
            await this.editManagementAreaField({field, value, id: this.managementArea.id, assessmentId: this.assessment.id});

        },
        onDateEstablishmentSelected(value) {
            const date = this.$moment(value);
            this.editManagementAreaField({field: 'date_established', value: date.format('YYYY-MM-DD'), id: this.managementArea.id, assessmentId: this.assessment.id});
        },
        onShowZones(value) {
            this.showZones = value;
        },
        onNumZonesChanged(value) {
            this.showZones = value > 0;
            this.numZones = value;
        },
        onZoneFieldChanged(field, index, value) {
            this.editZoneField({field, index, value})
        },
        initGeocoder() {
            const countries = this.managementArea.countries;
            if(countries && countries.length) {
                this.geocoder.setCountries(countries.join(','));
            }
            this.geocoder.addTo('#geocoder');
            this.geocoder.on('result', (e) => {
                this.$store.dispatch('managementareas/setRegion', e.result);
                this.geocoder.clear();
            });
        },
        ...mapActions({
            editManagementAreaField: 'managementareas/editManagementAreaField',
            editZoneField: 'managementareas/editZoneField',
            removeRegion: 'managementareas/removeRegion',
            protectedAreaByWdpaId: 'managementareas/protectedAreaByWdpaId',
            clearProtectedArea: 'managementareas/clearProtectedArea',
        })
    }
}
</script>
