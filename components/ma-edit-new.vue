<template>
  <form class="section--ma-edit-selector">
    <section class="section">
      <div class="container flex justify-between">
        <div class="form form--ma-selector">
          <div class="form__group">
            <div class="form__row">
              <div class="input">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.name',
                    )
                  }}*</label
                >
                <input
                  type="text"
                  name="name"
                  placeholder="Name here"
                  :value="managementArea.name"
                  @change="save('name', $event.target.value)"
                />
              </div>
            </div>
            <div class="form__row">
              <div class="input">
                <label class="label">{{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.labels.protectedArea',
                  )
                }}</label>
                <div class="note">
                  {{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.protectedAreaWdpaIdHelp',
                    )
                  }}
                  <a
                    class="border-b border-dashed"
                    target="_blank"
                    href="https://www.protectedplanet.net/en/thematic-areas/wdpa?tab=WDPA"
                    >{{
                      $t(
                        'pages.assessments.edit.tabs.managementArea.labels.protectedAreaWdpaIdHelpLink',
                      )
                    }}</a
                  >
                </div>
                <div
                  v-if="editWdpaId || !managementArea.protected_area"
                  class="input input--2-3"
                >
                  <input
                    type="text"
                    :value="
                      managementArea.protected_area &&
                      managementArea.protected_area.wdpa_id
                    "
                    placeholder="00000 Id"
                    @change="
                      protectedAreaByWdpaId({
                        wdpaId: $event.target.value,
                        managementAreaId: managementArea.id,
                        assessmentId: assessment.id,
                      })
                    "
                  />
                </div>
                <div
                  v-if="!editWdpaId && managementArea.protected_area"
                  class="input input--2-3"
                >
                  <input
                    :disabled="true"
                    type="text"
                    :value="managementArea.protected_area.name"
                  />
                  <div
                    @click="clearProtectedArea()"
                    role="button"
                    class="btn--protected-area__clear"
                  >
                    <img src="~/assets/img/ico-close-turqy.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label">{{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.labels.containedBy',
                  )
                }}</label>
                <div class="notes">
                  {{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.containedByNotes',
                    )
                  }}
                </div>
                <div class="multiselect__wrap">
                  <multiselect
                    :value="managementArea.containedby"
                    track-by="id"
                    label="name"
                    :options="managementAreas"
                    :multiple="false"
                    :searchable="true"
                    :showLabels="false"
                    :allow-empty="false"
                    open-direction="bottom"
                    @input="onSelectChanged('containedby', $event)"
                    @search-change="
                      onSelectSearch(
                        'managementareas/fetchManagementAreas',
                        $event,
                      )
                    "
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
            <div class="form__row">
              <div class="input input--date">
                <label class="label">{{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.labels.dateEstablished',
                  )
                }}</label>
                <div class="date__wrap">
                  <date-picker
                    placeholder="MM/DD/YYYY"
                    format="MM/dd/yyyy"
                    :value="dateEstablished"
                    @selected="onDateEstablishmentSelected"
                  />
                  <div class="date__caret">
                    <img src="~/assets/img/ico-date-turqy.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="input">
                <label class="label">{{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.labels.reportedSize',
                  )
                }}</label>
                <input
                  type="number"
                  name="ha"
                  placeholder="0000 Ha"
                  :value="managementArea.reported_size"
                  @change="save('reported_size', $event.target.value)"
                />
              </div>
            </div>
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.managementAuthority',
                    )
                  }}*</label
                >
                <div class="notes">
                  {{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.managementAuthorityNotes',
                    )
                  }}
                </div>
                <div class="multiselect__wrap">
                  <multiselect
                    track-by="id"
                    label="name"
                    :value="managementArea.management_authority"
                    :options="authorities"
                    :multiple="false"
                    :searchable="true"
                    :showLabels="false"
                    :allow-empty="false"
                    open-direction="bottom"
                    :hide-selected="false"
                    @input="onSelectChanged('management_authority', $event)"
                    @search-change="
                      onSelectSearch('managementareas/fetchAuthorities', $event)
                    "
                  >
                    <span
                      slot="noResult"
                      slot-scope="props"
                      class="text-xxs text-grayy-lighter"
                      >{{ $t('default.noresults') }} ({{ props.search }})
                      <hr class="my-4" />
                      <button
                        @click="
                          $event.preventDefault();
                          $event.stopPropagation();
                          onCreateAuthority(props.search);
                        "
                        role="button"
                        class="btn btn--sm btn--border-turqy mt-2"
                      >
                        {{ $t('default.create') }}
                      </button></span
                    >
                  </multiselect>
                  <div class="multiselect__caret">
                    <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.governanceType',
                    )
                  }}*</label
                >
                <div class="multiselect__wrap">
                  <multiselect
                    :value="managementArea.governance_type"
                    track-by="id"
                    label="name"
                    :options="governanceTypes"
                    :multiple="false"
                    :searchable="true"
                    :showLabels="false"
                    :allow-empty="false"
                    open-direction="bottom"
                    @input="onSelectChanged('governance_type', $event)"
                    @search-change="
                      onSelectSearch(
                        'governancetypes/fetchGovernanceTypes',
                        $event,
                      )
                    "
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
            <div class="form__row">
              <div class="input input--pr">
                <div class="label">
                  {{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.objectives',
                    )
                  }}*
                </div>
                <textarea
                  name="objectives"
                  placeholder=""
                  maxlength="500"
                  :value="objectivesValue || managementArea.objectives"
                  @input="
                    objectivesValue = $event.target.value;
                    save('objectives', $event.target.value);
                  "
                  @change="save('objectives', $event.target.value)"
                ></textarea>
                <div class="note text-right">{{ objectivesCharCount }}/500</div>
              </div>
            </div>
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.recognitionLevel',
                    )
                  }}*</label
                >
                <div class="multiselect__wrap">
                  <multiselect
                    :value="
                      managementArea.recognition_level &&
                      managementArea.recognition_level.map(
                        (recognitionLevel) => {
                          return {
                            id: recognitionLevel,
                            name: $t(
                              'pages.assessments.edit.tabs.managementArea.recognitionLevels.' +
                                recognitionLevel,
                            ),
                          };
                        },
                      )
                    "
                    track-by="id"
                    label="name"
                    :options="recognitionLevels"
                    :multiple="true"
                    :searchable="false"
                    :showLabels="false"
                    :allow-empty="true"
                    open-direction="bottom"
                    @input="
                      onSelectChanged(
                        'recognition_level',
                        $event.map((recognitionLevel) => recognitionLevel.id),
                      )
                    "
                  >
                    <span slot="noResult" slot-scope="props"
                      >{{ $t('default.noresults') }}
                    </span>
                    <template slot="option" slot-scope="{ option }">
                      <span
                        :content="option.guide"
                        v-tippy="{ placement: 'right' }"
                      >
                        {{ option.name }}
                      </span>
                    </template>
                  </multiselect>
                  <div class="multiselect__caret">
                    <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.supportSources',
                    )
                  }}*</label
                >
                <div class="multiselect__wrap">
                  <multiselect
                    :value="managementArea.support_sources"
                    track-by="id"
                    label="name"
                    :options="supportSources"
                    :multiple="true"
                    :searchable="true"
                    :showLabels="false"
                    :allow-empty="true"
                    open-direction="bottom"
                    :hide-selected="true"
                    @input="onSelectChanged('support_sources', $event)"
                    @search-change="
                      onSelectSearch(
                        'supportsources/fetchSupportSources',
                        $event,
                      )
                    "
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
            <div class="form__row">
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.countries',
                    )
                  }}*</label
                >
                <div class="multiselect__wrap">
                  <multiselect
                    :value="managementArea.countries"
                    track-by="code"
                    label="name"
                    :options="countries"
                    :multiple="true"
                    :searchable="true"
                    :showLabels="false"
                    :allow-empty="true"
                    :hide-selected="true"
                    @input="
                      onCountryChanged($event.map((country) => country.code))
                    "
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
            <div
              v-show="
                managementArea.countries && managementArea.countries.length
              "
              class="form__row"
            >
              <div class="input input--multiselect">
                <label class="label"
                  >{{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.regions',
                    )
                  }}*</label
                >
                <div id="geocoder"></div>
                <div class="section section--tags section--tags-filter">
                  <ul>
                    <li v-for="region in managementArea.regions">
                      <div class="tag__item">
                        {{ region.name }}
                      </div>
                      <a
                        @click="removeRegion(region.id)"
                        role="button"
                        class="tag__close"
                      >
                        <img src="~/assets/img/ico-close-popup.svg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- <div class="btn btn--md btn--tertiary">
                        <span class="btn--opacity__target">Clear Data</span>
                    </div> -->
        </div>
      </div>
    </section>

    <ma-map-edit></ma-map-edit>
    <section class="section">
      <div class="container">
        <div class="form">
          <div class="form__group">
            <div class="form__row form__row--mt-24">
              <div class="input input--radios">
                <label class="label">{{
                  $t('pages.assessments.edit.tabs.managementArea.labels.zones')
                }}</label>
                <div class="radios__wrap">
                  <label class="custom-radio">
                    <input
                      type="radio"
                      name="consent_given"
                      id="zone-yes"
                      @change="onShowZones($event.target.value)"
                      :checked="showZones === true"
                      :value="1"
                    />
                    <span class="custom-radio__label">{{
                      $t(
                        'pages.assessments.edit.tabs.managementArea.labels.yes',
                      )
                    }}</span>
                  </label>
                  <label class="custom-radio">
                    <input
                      type="radio"
                      name="consent_given"
                      id="zone-no"
                      @change="onShowZones($event.target.value)"
                      :checked="showZones === false"
                      :value="0"
                    />
                    <span class="custom-radio__label">{{
                      $t('pages.assessments.edit.tabs.managementArea.labels.no')
                    }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form__row form__row--mt-16 zones-wrap" v-if="showZones">
              <div class="input input--multiselect">
                <div class="label label--tit" v-if="zones.length">
                  {{
                    $t(
                      'pages.assessments.edit.tabs.managementArea.labels.title',
                    )
                  }}
                </div>
                <div class="multiselect__extra">
                  <div
                    v-for="(zone, index) in zones"
                    :key="index"
                    class="multiselect__form"
                  >
                    <div class="form__row form__row--mt-7 tit-row">
                      <div class="label label--tit">
                        {{ 'Zone ' + (index + 1) }}
                      </div>
                      <a
                        @click="onDeleteZone(zone.id, index)"
                        role="button"
                        class="btn-delete"
                      >
                        <img src="~/assets/img/delete.svg" />
                        <span>{{ $t('default.delete') }}</span>
                      </a>
                    </div>
                    <div class="form__row form__row--mt-8">
                      <div class="input">
                        <label class="label">{{
                          $t(
                            'pages.assessments.edit.tabs.managementArea.labels.zoneName',
                          )
                        }}</label>
                        <input
                          type="text"
                          name="name"
                          :placeholder="`${$t(
                            'pages.assessments.edit.tabs.managementArea.labels.zoneName',
                          )} ${index + 1}`"
                          :value="zone.name"
                          @change="
                            onZoneFieldChanged(
                              'name',
                              index,
                              $event.target.value,
                            )
                          "
                        />
                      </div>
                    </div>
                    <div class="form__row form__row--mt-8">
                      <div class="input input--multiselect">
                        <label class="label">{{
                          $t(
                            'pages.assessments.edit.tabs.managementArea.labels.zoneLevel',
                          )
                        }}</label>
                        <div class="multiselect__wrap">
                          <multiselect
                            :value="
                              accessLevels.filter(
                                (accessLevel) =>
                                  accessLevel.id === zone.access_level,
                              )[0]
                            "
                            :options="accessLevels"
                            track-by="id"
                            label="name"
                            :multiple="false"
                            :searchable="false"
                            :showLabels="false"
                            :allow-empty="false"
                            open-direction="bottom"
                            @input="
                              onZoneFieldChanged(
                                'access_level',
                                index,
                                $event.id,
                              )
                            "
                          >
                          </multiselect>
                          <div class="multiselect__caret">
                            <img
                              src="~/assets/img/ico-select-turqy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="input input--pr">
                      <div class="label">
                        Rationale for assessment (e.g. annual monitoring,
                        project baseline)*
                      </div>
                      <textarea
                        name="collection_method_text"
                        placeholder=""
                        :value="zone.description"
                        @change="
                          onZoneFieldChanged(
                            'description',
                            index,
                            $event.target.value,
                          )
                        "
                      ></textarea>
                    </div>
                  </div>
                  <div class="btn-row">
                    <a
                      @click="onAddZone"
                      role="button"
                      class="btn btn--md btn--no-border"
                    >
                      <img src="~/assets/img/add_circle-tur.svg" />
                      <span>{{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.buttons.addZone',
                        )
                      }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="section__bottom">
              <NuxtLink
                @click.prevent
                :to="`/assessments/edit/${id}/assessment-data`"
                class="btn btn--md"
              >
                <img
                  src="~/assets/img/arrow_left_alt-white.svg"
                  :alt="$t('pages.assessments.edit.tabs.nextStep')"
                />
                <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.survey.questions.prev') }}: Assessment Data</span>
              </NuxtLink>
              <NuxtLink
                @click.prevent
                :to="`/assessments/edit/${id}/the-survey`"
                class="btn btn--md"
              >
                <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.survey.questions.next') }}:  The Survey</span>
                <img
                  src="~/assets/img/arrow_right_alt.svg"
                  alt=""
                  :alt="$t('pages.assessments.edit.tabs.nextStep')"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default {
  name: 'ma-edit-new',
  data() {
    return {
      id: this.$route.params.id,
      geocoder: null,
      showZones: null,
      objectivesValue: '',
      accessLevels: [
        {
          id: 90,
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.zones.accessLevels.OPEN_ACCESS',
          ),
        },
        {
          id: 50,
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.zones.accessLevels.PARTIALLY_RESTRICTED',
          ),
        },
        {
          id: 10,
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.zones.accessLevels.FULLY_RESTRICTED',
          ),
        },
      ],
      recognitionLevels: [
        {
          id: 'local',
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.local',
          ),
          guide: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.local_guide',
          ),
        },
        {
          id: 'national',
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.national',
          ),
          guide: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.national_guide',
          ),
        },
        {
          id: 'international',
          name: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.international',
          ),
          guide: this.$t(
            'pages.assessments.edit.tabs.managementArea.recognitionLevels.international_guide',
          ),
        },
      ],
    };
  },
  mounted() {
    // Set Mapbox access token from environment
    if (this.managementArea) {
      // console.log('managementArea', this.managementArea);
    }
    // console.log('assessment', this.assessment);
    // console.log('managementArea', this.managementArea);
    const mapboxToken = this.$config.mapboxAccessToken;

    if (!mapboxToken) {
      console.warn(
        'Mapbox access token is not configured. Please set MAPBOX_ACCESS_TOKEN environment variable.',
      );
      this.showZones = this.zones.length > 0;
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    // Initialize geocoder with the token
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      types: 'region',
      language: 'en-US',
    });

    this.showZones = this.zones.length > 0;
    this.initGeocoder();
  },
  watch: {
    zones() {
      this.showZones = this.zones.length > 0;
    },
    assessment() {
      const countries = this.assessment.management_area_countries?.countries;
      if (countries && countries.length) {
        this.geocoder.setCountries(countries.join(','));
      }
    },
    managementArea: {
      handler(newVal) {
        if (newVal && newVal.objectives) {
          this.objectivesValue = newVal.objectives;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
      managementAreas: (state) => state.managementareas.list,
      governanceTypes: (state) => state.governancetypes.list,
      authorities: (state) => state.managementareas.authorities,
      stakeholderGroups: (state) => state.stakeholdergroups.list,
      supportSources: (state) => state.supportsources.list,
      regions: (state) => state.regions.list,
      protectedAreas: (state) => state.protectedareas.list,
      zones: (state) => state.managementareas.zones,
      editWdpaId: (state) => state.managementareas.editWdpaId,
      editWdpaIdError: (state) => state.managementareas.editWdpaIdError,
    }),
    countries() {
      const state = this.$store.state;
      return state.countries.list[this.$i18n.locale];
    },
    dateEstablished() {
      if (!this.managementArea || !this.managementArea.date_established) {
        return null;
      }
      const date = this.$moment(this.managementArea.date_established);
      if (date.isValid()) {
        return date.toDate();
      }
      return null;
    },
    objectivesCharCount() {
      const value =
        this.objectivesValue ||
        (this.managementArea && this.managementArea.objectives) ||
        '';
      return value.length;
    },
  },
  methods: {
    save(field, value) {
      this.editManagementAreaField({
        field,
        value,
        id: this.managementArea.id,
        assessmentId: this.assessment.id,
      });
    },
    onSelectSearch(action, search) {
      this.$store.dispatch(action, search);
    },
    onCountryChanged(countries) {
      this.geocoder.setCountries(countries.join(','));
      if (countries.length === 0) {
        this.onSelectChanged('regions', []);
      }
      this.onSelectChanged('countries', countries);
    },
    async onSelectChanged(field, value) {
      await this.editManagementAreaField({
        field,
        value,
        id: this.managementArea.id,
        assessmentId: this.assessment.id,
      });
    },
    onDateEstablishmentSelected(value) {
      if (!value) {
        return;
      }
      const date = this.$moment(value);
      if (date.isValid()) {
        this.editManagementAreaField({
          field: 'date_established',
          value: date.format('YYYY-MM-DD'),
          id: this.managementArea.id,
          assessmentId: this.assessment.id,
        });
      }
    },
    onShowZones(value) {
      this.showZones = parseInt(value);
      if (!this.showZones && this.zones.length > 0) {
        this.deleteAllZones();
      }
    },
    onZoneFieldChanged(field, index, value) {
      this.editZoneField({ field, index, value });
    },
    async onCreateAuthority(name) {
      const authority = await this.createAuthority(name);
      this.onSelectChanged('management_authority', authority);
    },
    initGeocoder() {
      // Check if geocoder is initialized and element exists
      if (!this.geocoder) {
        console.warn(
          'Mapbox geocoder is not initialized. Please configure MAPBOX_ACCESS_TOKEN.',
        );
        return;
      }

      const geocoderElement = document.getElementById('geocoder');
      if (geocoderElement && !geocoderElement.hasChildNodes()) {
        try {
          this.geocoder.addTo('#geocoder');
          this.geocoder.on('result', (e) => {
            // console.log(e.result);
            this.$store.dispatch('managementareas/setRegion', e.result);
            this.geocoder.clear();
          });
        } catch (error) {
          console.error('Failed to initialize Mapbox geocoder:', error);
          console.warn(
            'Mapbox geocoder is not available. Please configure MAPBOX_ACCESS_TOKEN.',
          );
        }
      }
    },
    onAddZone() {
      this.$store.commit('managementareas/addEmptyZone');
    },
    onDeleteZone(zoneId, index) {
      this.deleteZone({ zoneId, index });
    },
    ...mapActions({
      editManagementAreaField: 'managementareas/editManagementAreaField',
      createAuthority: 'managementareas/createAuthority',
      editZoneField: 'managementareas/editZoneField',
      removeRegion: 'managementareas/removeRegion',
      protectedAreaByWdpaId: 'managementareas/protectedAreaByWdpaId',
      clearProtectedArea: 'managementareas/clearProtectedArea',
      deleteZone: 'managementareas/deleteZone',
      deleteAllZones: 'managementareas/deleteAllZones',
    }),
  },
};
</script>
