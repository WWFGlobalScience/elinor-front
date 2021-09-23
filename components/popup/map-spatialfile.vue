<template>
  <div class="popup__content">
    <div class="popup__grid">
      <div class="left">
        <form class="form form--mt-0">
          <div class="form__group">
            <div class="form__row">
              <div class="input input--file">
                <div class="file">
                  <!--STEP 1 - DROPZONE-->
                  <dropzone
                    id="import_file"
                    ref="importFile"
                    :options="dropzone"
                    :useStyling="false"
                    :destroyDropzone="true"
                    :useCustomSlot="true"
                    @vdropzone-file-added="onImportFileAdded"
                  >
                    <div class="file__drag">
                      <img src="~/assets/img/ico-file-drag-turqy.svg" />
                      <span v-if="!managementArea.import_file">{{
                        $t("default.upload-file.placeholder")
                      }}</span>
                      <span v-else
                        ><a
                          @click.stop
                          :href="managementArea.import_file"
                          target="_blank"
                          >{{ managementArea.import_file }}</a
                        ></span
                      >
                    </div>
                  </dropzone>
                  <!--// STEP 1 - DROPZONE-->

                  <!--STEP 2 - FILE UPLOAD-->
                  <!-- <label class="label label--bold">Validating file format...</label>
                  <div class="elinor__progress-bar">
                    <span
                      class="elinor__progress-bar-status"
                      style="width: 30%"
                    ></span>
                  </div> -->
                  <!--//STEP 2 - FILE UPLOAD-->

                  <!--STEP 3 - SUCCESS-->
                  <!-- <div class="description">
                    <img
                      src="~/assets/img/ico-file-gray.svg"
                      alt="file uploaded successfully"
                    />
                    <h4>The file is correctly formated</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      <a href="">GeoJson</a> sed do eiusmod tempor incididunt ut
                      labore et dolore magna.
                    </p>
                  </div> -->
                  <!--//STEP 3 - SUCCESS-->

                  <!--STEP 3 - ERROR-->
                  <!-- <div class="description">
                    <img
                      src="~/assets/img/ico-file-error.svg"
                      alt="file error"
                    />
                    <h4>Sorry something is Wrong</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      <a href="">GeoJson</a> sed do eiusmod tempor incididunt ut
                      labore et dolore magna.
                    </p>
                    <p>You can <a href="">try again</a></p>
                  </div> -->
                  <!--//STEP 3 - ERROR-->
                </div>
                <div class="file__buttons">
                  <!--STEP 1 - DROPZONE-->
                  <button
                    @click="importFileTrigger"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t("default.upload-file.buttons.select")
                    }}</span>
                    <img src="~/assets/img/ico-file-turqy.svg" />
                  </button>
                  <button
                    v-if="managementArea.import_file"
                    @click="clearImportFile"
                    type="button"
                    class="btn--border-turqy btn--opacity--child"
                  >
                    <span class="btn--opacity__target">{{
                      $t("default.upload-file.buttons.clear")
                    }}</span>
                    <img src="~/assets/img/ico-clear-turqy.svg" />
                  </button>
                  <!--//STEP 1 - DROPZONE-->
                  <!--STEP 2 - FILE UPLOAD-->
                  <!-- <button
                      type="button"
                      class="btn--border-turqy btn--opacity--child"
                    >
                      <span class="btn--opacity__target">Cancel</span>
                      <img src="~/assets/img/ico-close-turqy.svg" />
                    </button> -->
                  <!--// STEP 2 - FILE UPLOAD-->

                  <!--STEP 3 - SUCCESS -->
                    <!-- <button     
                      type="button"
                      class="btn btn--opacity--child"
                    >
                      <span class="btn--opacity__target">Accept</span>
                      <img src="~/assets/img/ico-ok-white.svg" />
                    </button> -->
                  <!--// STEP 3 - SUCCESS -->

                  <!--STEP 3 - ERROR -->
                  <!-- <button     
                      type="button"
                      class="btn--border-turqy btn--opacity--child"
                    >
                      <span class="btn--opacity__target">Cancel</span>
                      <img src="~/assets/img/ico-close-turqy.svg" />
                    </button> -->
                  <!--//STEP3 - ERROR-->

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="right">
        <div
          class="description"
          v-html="$t('popups.spatialfile.descriptions.file')"
        ></div>
        <!--STEP 3 - SUCCESS -->
            <!-- <img class="popup__map-img" src="~/assets/img/map-zone.jpg"/> -->
        <!--//STEP 3 - SUCCESS-->
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapActions, mapState } from "vuex";
import Dropzone from "nuxt-dropzone";

var shapefile = require("shapefile");

export default {
  name: "popup-map-spatialfile",
  components: {
    Dropzone,
  },
  data() {
    return {
      dropzone: {
        url: "none",
        previewTemplate: this.template(),
        uploadMultiple: false,
        acceptedFiles: ".pdf",
        autoQueue: false,
      },
    };
  },
  computed: {
    ...mapState({
      managementArea: (state) => state.managementareas.instance,
    }),
  },
  methods: {
    ...mapActions({
      editManagementAreaField: "managementareas/editManagementAreaField",
      editManagementAreaFileField:
        "managementareas/editManagementAreaFileField",
    }),
    importFileTrigger() {
      this.$refs.importFile.$el.click();
    },
    clearImportFile() {
      this.$refs.importFile.removeAllFiles();
      this.editManagementAreaField({
        field: "import_file",
        value: null,
        id: this.managementArea.id,
      });
    },
    onImportFileAdded(file) {
      this.editManagementAreaFileField({
        field: "import_file",
        file,
        id: this.managementArea.id,
      });
    },
    template() {
      return "<div></div>";
    },
  },
};
</script>
