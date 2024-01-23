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
                                        @vdropzone-upload-progress="onUploadSurveyFileProgress"
                                    >
                                        <div class="file__drag">
                                            <img src="~/assets/img/ico-file-drag-turqy.svg"/>
                                            <span>{{ $t("pages.assessment.uploadSurveyFile.filePlaceholder") }}</span>
                                        </div>
                                    </dropzone>

                                    <!--// STEP 1 - DROPZONE-->

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <template v-if="fileAdded && progress < 100">
                                        <label class="label label--bold">
                                            {{ $t('pages.assessment.uploadSurveyFile.validatingFileFormat') }}</label>
                                        <div class="elinor__progress-bar">
                                            <span class="elinor__progress-bar-status" :style="{width: progress + '%'}"></span>
                                        </div>
                                    </template>

                                    <!--//STEP 2 - FILE UPLOAD-->

                                    <!--STEP 3 - SUCCESS-->
                                    <div v-if="progress === 100 && !uploadSurveyFileError" class="description">
                                        <img
                                            src="~/assets/img/ico-file-gray.svg"
                                            alt="file uploaded successfully"
                                        />
                                        <h4>{{ $t('pages.assessment.uploadSurveyFile.fileCorrectlyFormated') }}</h4>
                                        <p>{{ $t('pages.assessment.uploadSurveyFile.fileCorrectlyFormatedText') }}</p>
                                    </div>
                                    <!--//STEP 3 - SUCCESS-->

                                    <!--STEP 3 - ERROR-->
                                    <div v-if="fileAdded && progress === 100 && uploadSurveyFileError" class="description">
                                        <img
                                            src="~/assets/img/ico-file-error.svg"
                                            alt="file error"
                                        />
                                        <h4>{{ $t('pages.assessment.uploadSurveyFile.importFileError') }}</h4>
                                        <p>
                                            {{ uploadSurveyFileError.message.import_file[0] }}
                                        </p>
                                        <p>{{ $t('pages.assessment.uploadSurveyFile.tryAgain') }} <a @click="clearImportFile" role="button">{{ $t('pages.assessments.edit.tabs.managementArea.popups.spatialFile.tryAgain') }}</a></p>
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
                                        <span class="btn--opacity__target">{{ $t("pages.assessment.uploadSurveyFile.buttons.select") }}</span>
                                        <img src="~/assets/img/ico-file-turqy.svg"/>
                                    </button>
                                    <!--<p class="msg msg--error">This format is not supported</p>-->
                                    <!--//STEP 1 - DROPZONE-->
                                    <p v-if="dropzoneAccepted === false" class="msg msg--error">{{ $t('pages.assessment.uploadSurveyFile.formatNotSupported') }}</p>

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <button
                                        v-if="fileAdded && progress < 100"
                                        @click="cancelImportFile"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                    >
                                        <span class="btn--opacity__target">{{ $t('default.cancel') }}</span>
                                        <img src="~/assets/img/ico-close-turqy.svg" />
                                    </button>
                                    <!--// STEP 2 - FILE UPLOAD-->

                                    <!--STEP 3 - SUCCESS -->
                                    <button
                                        @click="accept"
                                        v-if="fileAdded && progress === 100 && !uploadSurveyFileError"
                                        type="button"
                                        class="btn btn--opacity--child"
                                    >
                                        <span class="btn--opacity__target">{{ $t('default.accept') }}</span>
                                        <img src="~/assets/img/ico-ok-white.svg" />
                                    </button>
                                    <!--// STEP 3 - SUCCESS -->

                                    <!--STEP 3 - ERROR -->
                                    <button
                                        @click="cancel"
                                        v-if="fileAdded && progress === 100 && uploadSurveyFileError"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                    >
                                        <span class="btn--opacity__target">{{ $t('default.cancel') }}</span>
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
                <template v-if="!fileAdded || progress < 100 || uploadSurveyFileError">
                    <div class="description">
                        <div v-html="$t('pages.assessment.uploadSurveyFile.help')" />
                        <ul class="list-disc list-inside mt-10" v-if="!fileAdded || progress < 100 || uploadSurveyFileError">
                            <li>{{ $t('pages.assessment.uploadSurveyFile.condition1') }}</li>
                            <li>{{ $t('pages.assessment.uploadSurveyFile.condition2') }}</li>
                            <li>{{ $t('pages.assessment.uploadSurveyFile.condition3') }}</li>
                            <li>{{ $t('pages.assessment.uploadSurveyFile.condition4') }}</li>
                            <li>{{ $t('pages.assessment.uploadSurveyFile.condition5') }}</li>
                        </ul>
                    </div>
                </template>
            </div>
            <!--STEP 3 - SUCCESS -->
            <div v-show="fileAdded && progress === 100 && !uploadSurveyFileError" class="popup__map-img" style="top: 10rem !important;">
                <h1>Success!!</h1>
            </div>
            <!--//STEP 3 - SUCCESS-->
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Dropzone from "nuxt-dropzone";

export default {
    name: "popup-assessment-upload-survey-file",
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
                acceptedFiles: ".xslx",
                autoQueue: false,
            },
        };
    },
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.instance,
            uploadSurveyFileError: (state) => state.assessments.uploadSurveyFileError,
        }),
    },
    methods: {
        ...mapActions({
            uploadSurveyFile: "assessments/uploadSurveyFile",
            resetUploadSurveyFileError: "assessments/resetUploadSurveyFileError",
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
        async onImportFileAdded(file) {
            await this.$nextTick(async () => {
                if(file.status === "error") {
                    this.dropzoneAccepted = false;
                } else {
                    this.dropzoneAccepted = true;
                    await this.uploadSurveyFile({
                        file,
                        id: this.assessment.id,
                        onUploadProgress: this.onUploadSurveyFileProgress
                    });
                    this.fileAdded = true;
                }
            });
        },
        onUploadSurveyFileProgress(progressEvent) {
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
        }
    },
};
</script>
