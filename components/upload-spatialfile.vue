<template>
  <section class="flex flex-col gap-8">
    <div class="container">
      <form class="form form--mt-0">
        <div class="form__group">
          <div class="form__row">
            <div class="input input--file">
              <label class="label">
                Upload a spatial file in Shape file format
              </label>
              <div class="notes" v-if="importedFile === null">
                <div
                  v-html="
                    $t(
                      'pages.assessments.edit.tabs.managementArea.popups.spatialFile.help',
                    )
                  "
                />
                <ul v-if="!fileAdded || progress < 100 || importFileError">
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
              <div class="file">
                <dropzone
                  id="import_file"
                  ref="importFile"
                  v-if="importedFile === null"
                  :options="dropzone"
                  :useStyling="false"
                  :destroyDropzone="true"
                  :useCustomSlot="true"
                  @vdropzone-file-added="onImportFileAdded"
                  @vdropzone-upload-progress="onImportFileProgress"
                >
                  <div class="file__drag">
                    <img src="~/assets/img/upload.svg" />
                    <span>{{
                      $t(
                        'pages.assessments.edit.tabs.data.dropzone.placeholder',
                      )
                    }}</span>
                  </div>
                </dropzone>

                <!--// STEP 1 - DROPZONE-->

                <!--STEP 2 - FILE UPLOAD-->
                <template v-if="importedFile !== null && progress < 100">
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
                  v-if="
                    progress === 100 &&
                    !importFileError &&
                    importedFile !== null
                  "
                  class="success-upload"
                >
                  <span>{{ importedFile.name }}</span>
                  <button @click="clearImportFile">
                    <img src="~/assets/img/delete.svg" />
                  </button>
                </div>
                <!--//STEP 3 - SUCCESS-->

                <!--STEP 3 - ERROR-->
                <div
                  v-if="fileAdded && progress === 100 && importFileError"
                  class="description"
                >
                  <img src="~/assets/img/ico-file-error.svg" alt="file error" />
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
            </div>
          </div>
        </div>
      </form>
      <div
        id="spatial-map"
        v-show="fileAdded && progress === 100 && !importFileError"
        class="elinor__map mt-10"
      ></div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Dropzone from 'nuxt-dropzone';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';

export default {
  name: 'upload-spatialfile',
  components: {
    Dropzone,
  },
  data() {
    return {
      map: null,
      fileAdded: false,
      progress: 0,
      dropzoneAccepted: null,
      importedFile: null,
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
    hasExistingImportFile() {
      return (
        this.managementArea &&
        this.managementArea.import_file &&
        this.managementArea.polygon
      );
    },
  },
  mounted() {
    this.initFromExistingData();
  },
  methods: {
    initFromExistingData() {
      if (this.hasExistingImportFile) {
        // Set initial state to show the success UI
        this.fileAdded = true;
        this.progress = 100;
        // Create a placeholder file object with the existing file name
        const fileName = this.extractFileName(this.managementArea.import_file);
        this.importedFile = {
          name: fileName,
          isExisting: true,
        };
        // Initialize the map with existing polygon data
        this.$nextTick(() => {
          this.mapCreate();
        });
      }
    },
    extractFileName(fileUrl) {
      if (!fileUrl) return 'Spatial file';
      // Extract filename from URL path
      const parts = fileUrl.split('/');
      return parts[parts.length - 1] || 'Spatial file';
    },
    ...mapActions({
      editManagementAreaField: 'managementareas/editManagementAreaField',
      editManagementAreaFileField:
        'managementareas/editManagementAreaFileField',
      resetImportFileError: 'managementareas/resetImportFileError',
      popupState: 'popup/popupState',
      removePoint: 'managementareas/removePoint',
    }),
    importFileTrigger() {
      this.$refs.importFile.$el.click();
    },
    clearImportFile() {
      this.fileAdded = false;
      this.importedFile = null;
      this.resetImportFileError();
      this.progress = 0;
      const dropzoneInstance = this.$refs.importFile;

      if (dropzoneInstance) {
        dropzoneInstance.removeFile(this.importedFile);
      }
      // this.$refs.importFile.removeAllFiles();
    },
    async onImportFileAdded(file) {
      await this.$nextTick(async () => {
        if (file.status === 'error') {
          this.dropzoneAccepted = false;
        } else {
          this.importedFile = file;
          // console.log('importedFile', this.importedFile);
          this.dropzoneAccepted = true;
          await this.editManagementAreaFileField({
            field: 'import_file',
            file,
            id: this.managementArea.id,
            onUploadProgress: this.onImportFileProgress,
          });
          this.fileAdded = true;
          this.removePoint();
          this.$nextTick(() => {
            this.mapCreate();
          });
          // this.mapCreate();
        }
      });
    },
    onImportFileProgress(progressEvent) {
      this.progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      // console.log('progress', this.progress);
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
      if (this.managementArea.polygon && this.managementArea.import_file) {
        const polygon = turf.multiPolygon(
          this.managementArea.polygon.coordinates,
        );
        const center = turf.centroid(polygon);
        this.map = new mapboxgl.Map({
          container: 'spatial-map',
          style: 'mapbox://styles/mapbox/satellite-streets-v11',
          center: center.geometry.coordinates,
        });

        this.mapFitBounds();
        this.mapAddControls();
        // this.mapDisableScroll();
        this.addPolygon();
      }
    },
    mapFitBounds() {
      if (this.managementArea.polygon && this.managementArea.import_file) {
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
