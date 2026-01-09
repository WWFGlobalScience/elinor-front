<template>
  <div class="popup__content">
    <div class="popup__grid">
      <div class="left">
        <form class="form form--mt-0">
          <div class="form__group">
            <div class="form__row">
              <div class="input input--file">
                <div class="file">
                  <dropzone
                    v-if="!fileAdded"
                    id="import_file"
                    ref="importFile"
                    :options="dropzone"
                    :useStyling="false"
                    :destroyDropzone="true"
                    :useCustomSlot="true"
                    @vdropzone-file-added="onImportFileAdded"
                    @vdropzone-upload-progress="onImportFileProgress"
                  >
                    <div class="file__drag">
                      <img src="~/assets/img/ico-file-drag-turqy.svg" />
                      <span>{{
                        $t('default.upload-import-file.placeholder')
                      }}</span>
                    </div>
                  </dropzone>

                  <!--// STEP 1 - DROPZONE-->

                  <!--STEP 2 - FILE UPLOAD-->
                  <template v-if="fileAdded && progress < 100">
                    <label class="label label--bold">
                      {{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.validatingFileFormat',
                        )
                      }}</label
                    >
                    <div class="elinor__progress-bar">
                      <span
                        class="elinor__progress-bar-status"
                        :style="{
                          width: progress + '%',
                        }"
                      ></span>
                    </div>
                  </template>

                  <!--//STEP 2 - FILE UPLOAD-->

                  <!--STEP 3 - SUCCESS-->
                  <div
                    v-if="progress === 100 && !importFileError"
                    class="description"
                  >
                    <img
                      src="~/assets/img/ico-file-gray.svg"
                      alt="file uploaded successfully"
                    />
                    <h4>
                      {{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.fileCorrectlyFormated',
                        )
                      }}
                    </h4>
                    <p>
                      {{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.fileCorrectlyFormatedText',
                        )
                      }}
                    </p>
                  </div>
                  <!--//STEP 3 - SUCCESS-->

                  <!--STEP 3 - ERROR-->
                  <div
                    v-if="fileAdded && progress === 100 && importFileError"
                    class="description"
                  >
                    <img
                      src="~/assets/img/ico-file-error.svg"
                      alt="file error"
                    />
                    <h4>
                      {{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.importFileError',
                        )
                      }}
                    </h4>
                    <p>
                      {{ importFileError.message.import_file[0] }}
                    </p>
                    <p>
                      {{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.tryAgain',
                        )
                      }}
                      <a @click="clearImportFile" role="button">{{
                        $t(
                          'pages.assessments.edit.tabs.managementArea.popups.spatialFile.tryAgain',
                        )
                      }}</a>
                    </p>
                  </div>
                  <!--//STEP 3 - ERROR-->
                </div>
                <div class="file__buttons">
                  <!--STEP 1 - DROPZONE-->
                  <button
                    v-if="!fileAdded"
                    @click="importFileTrigger"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t('default.upload-file.buttons.select')
                    }}</span>
                    <img src="~/assets/img/ico-file-turqy.svg" />
                  </button>
                  <!--<p class="msg msg--error">This format is not supported</p>-->
                  <!--//STEP 1 - DROPZONE-->
                  <p v-if="dropzoneAccepted === false" class="msg msg--error">
                    {{
                      $t(
                        'pages.assessments.edit.tabs.managementArea.popups.spatialFile.formatNotSupported',
                      )
                    }}
                  </p>

                  <!--STEP 2 - FILE UPLOAD-->
                  <button
                    v-if="fileAdded && progress < 100"
                    @click="cancelImportFile"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t('default.cancel')
                    }}</span>
                    <img src="~/assets/img/ico-close-turqy.svg" />
                  </button>
                  <!--// STEP 2 - FILE UPLOAD-->

                  <!--STEP 3 - SUCCESS -->
                  <button
                    @click="accept"
                    v-if="fileAdded && progress === 100 && !importFileError"
                    type="button"
                    class="btn btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t('default.accept')
                    }}</span>
                    <img src="~/assets/img/ico-ok-white.svg" />
                  </button>
                  <!--// STEP 3 - SUCCESS -->

                  <!--STEP 3 - ERROR -->
                  <button
                    @click="cancel"
                    v-if="fileAdded && progress === 100 && importFileError"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t('default.cancel')
                    }}</span>
                    <img src="~/assets/img/ico-close-turqy.svg" />
                  </button>
                  <!--//STEP3 - ERROR-->
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="right">
        <template v-if="!fileAdded || progress < 100 || importFileError">
          <div class="description">
            <div
              v-html="
                $t(
                  'pages.assessments.edit.tabs.managementArea.popups.spatialFile.help',
                )
              "
            />
            <ul
              class="list-disc list-inside mt-10"
              v-if="!fileAdded || progress < 100 || importFileError"
            >
              <li>
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.popups.spatialFile.condition1',
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.popups.spatialFile.condition2',
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.popups.spatialFile.condition3',
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.popups.spatialFile.condition4',
                  )
                }}
              </li>
              <li>
                {{
                  $t(
                    'pages.assessments.edit.tabs.managementArea.popups.spatialFile.condition5',
                  )
                }}
              </li>
            </ul>
          </div>
        </template>
      </div>
      <!--STEP 3 - SUCCESS -->
      <div
        id="popup-map"
        v-show="fileAdded && progress === 100 && !importFileError"
        class="popup__map-img"
        style="top: 10rem !important"
      ></div>
      <!--//STEP 3 - SUCCESS-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Dropzone from 'nuxt-dropzone';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';

export default {
  name: 'popup-map-spatialfile',
  components: {
    Dropzone,
  },
  data() {
    return {
      map: null,
      fileAdded: false,
      progress: 0,
      dropzoneAccepted: null,
      dropzone: {
        url: 'none',
        previewTemplate: this.template(),
        uploadMultiple: false,
        acceptedFiles: '.zip',
        autoQueue: false,
      },
    };
  },
  computed: {
    ...mapState({
      managementArea: (state) => state.managementareas.instance,
      importFileError: (state) => state.managementareas.importFileError,
    }),
  },
  methods: {
    ...mapActions({
      editManagementAreaField: 'managementareas/editManagementAreaField',
      editManagementAreaFileField:
        'managementareas/editManagementAreaFileField',
      resetImportFileError: 'managementareas/resetImportFileError',
      popupState: 'popup/popupState',
    }),
    importFileTrigger() {
      this.$refs.importFile.$el.click();
    },
    clearImportFile() {
      this.fileAdded = false;
      this.resetImportFileError();
      this.progress = 0;
      this.$refs.importFile.removeAllFiles();
    },
    async onImportFileAdded(file) {
      await this.$nextTick(async () => {
        if (file.status === 'error') {
          this.dropzoneAccepted = false;
        } else {
          this.dropzoneAccepted = true;
          await this.editManagementAreaFileField({
            field: 'import_file',
            file,
            id: this.managementArea.id,
            onUploadProgress: this.onImportFileProgress,
          });
          this.fileAdded = true;
          this.mapCreate();
        }
      });
    },
    onImportFileProgress(progressEvent) {
      this.progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
    },
    cancelImportFile() {
      this.fileAdded = false;
      this.progress = 0;
      this.resetImportFileError();
    },
    accept() {
      this.cancelImportFile();
      this.popupState({ active: false });
    },
    cancel() {
      this.cancelImportFile();
      this.popupState({ active: false });
    },
    template() {
      return '<div></div>';
    },
    mapCreate() {
      if (this.managementArea.polygon) {
        const polygon = turf.multiPolygon(
          this.managementArea.polygon.coordinates,
        );
        const center = turf.centroid(polygon);
        this.map = new mapboxgl.Map({
          container: 'popup-map',
          style: 'mapbox://styles/mapbox/satellite-streets-v11',
          center: center.geometry.coordinates,
        });

        this.mapFitBounds();
        this.mapAddControls();
        this.mapDisableScroll();
        this.addPolygon();
      }
    },
    mapFitBounds() {
      if (this.managementArea.polygon) {
        const polygon = turf.multiPolygon(
          this.managementArea.polygon.coordinates,
        );
        const bbox = turf.bbox(polygon);
        this.map.fitBounds(bbox);
      }
    },
    mapAddControls() {
      this.map.addControl(new mapboxgl.NavigationControl());
    },
    mapDisableScroll() {
      this.map.scrollZoom.disable();
    },
    addPolygon() {
      this.map.on('load', () => {
        this.map.addSource('polygon', {
          type: 'geojson',
          data: this.managementArea.polygon,
        });

        this.map.addLayer({
          id: 'polygon',
          type: 'fill',
          source: 'polygon',
          layout: {},
          paint: {
            'fill-color': '#43A0BD',
            'fill-opacity': 0.5,
          },
        });

        this.map.addLayer({
          id: 'outline',
          type: 'line',
          source: 'polygon',
          layout: {},
          paint: {
            'line-color': '#43A0BD',
            'line-width': 3,
          },
        });
      });
    },
  },
};
</script>
