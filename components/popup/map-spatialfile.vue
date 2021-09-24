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
                                            <img src="~/assets/img/ico-file-drag-turqy.svg"/>
                                            <span>{{ $t("default.upload-import-file.placeholder") }}</span>
                                        </div>
                                    </dropzone>

                                    <!--// STEP 1 - DROPZONE-->

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <template v-if="fileAdded && progress < 100">
                                        <label class="label label--bold">Validating file format...</label>
                                        <div class="elinor__progress-bar">
                                            <span class="elinor__progress-bar-status" :style="{width: progress + '%'}"></span>
                                        </div>
                                    </template>

                                    <!--//STEP 2 - FILE UPLOAD-->

                                    <!--STEP 3 - SUCCESS-->
                                    <div v-if="progress === 100 && !importFileError" class="description">
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
                                    </div>
                                    <!--//STEP 3 - SUCCESS-->

                                    <!--STEP 3 - ERROR-->
                                    <div v-if="fileAdded && progress === 100 && importFileError" class="description">
                                      <img
                                        src="~/assets/img/ico-file-error.svg"
                                        alt="file error"
                                      />
                                      <h4>Sorry something is Wrong</h4>
                                      <p>
                                        {{ importFileError.message.import_file[0] }}
                                      </p>
                                      <p>You can <a @click="clearImportFile" role="button">try again</a></p>
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
                                        <span class="btn--opacity__target">{{ $t("default.upload-file.buttons.select") }}</span>
                                        <img src="~/assets/img/ico-file-turqy.svg"/>
                                    </button>
                                    <!--<p class="msg msg--error">This format is not supported</p>-->
                                    <!--//STEP 1 - DROPZONE-->
                                    <p v-if="dropzoneAccepted === false" class="msg msg--error">This format is not supported</p>

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <button
                                        v-if="fileAdded && progress < 100"
                                        @click="cancelImportFile"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                      >
                                        <span class="btn--opacity__target">Cancel</span>
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
                                      <span class="btn--opacity__target">Accept</span>
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
                                        <span class="btn--opacity__target">Cancel</span>
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
                <div
                    v-if="!fileAdded || progress < 100 || importFileError"
                    class="description"
                    v-html="$t('popups.spatialfile.descriptions.file')"
                ></div>
                <!--STEP 3 - SUCCESS -->
                <img v-if="fileAdded && progress === 100 && !importFileError" class="popup__map-img" src="~/assets/img/map-zone.jpg"/>
                <!--//STEP 3 - SUCCESS-->
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Dropzone from "nuxt-dropzone";

var shapefile = require("shapefile");

export default {
    name: "popup-map-spatialfile",
    components: {
        Dropzone,
    },
    data() {
        return {
            fileAdded: false,
            progress: 0,
            dropzoneAccepted: null,
            dropzone: {
                url: "none",
                previewTemplate: this.template(),
                uploadMultiple: false,
                acceptedFiles: ".zip",
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
            editManagementAreaField: "managementareas/editManagementAreaField",
            editManagementAreaFileField: "managementareas/editManagementAreaFileField",
            resetImportFileError: "managementareas/resetImportFileError",
            popupState: "popup/popupState",
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
        onImportFileAdded(file) {
            this.$nextTick(() => {
                if(file.status === "error") {
                    this.dropzoneAccepted = false;
                } else {
                    this.dropzoneAccepted = true;
                    this.editManagementAreaFileField({
                        field: "import_file",
                        file,
                        id: this.managementArea.id,
                        onUploadProgress: this.onImportFileProgress
                    });
                    this.fileAdded = true;
                }
            });
        },
        onImportFileProgress(progressEvent) {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
        cancelImportFile() {
            this.fileAdded = false;
            this.progress = 0;
            this.resetImportFileError();
        },
        accept() {
            this.cancelImportFile();
            this.popupState({active: false});
        },
        cancel() {
            this.cancelImportFile();
            this.popupState({active: false});
        },
        template() {
            return "<div></div>";
        },
    },
};
</script>
