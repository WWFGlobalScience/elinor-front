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
                                        id="survey_file"
                                        ref="surveyFile"
                                        :options="dropzone"
                                        :useStyling="false"
                                        :destroyDropzone="true"
                                        :useCustomSlot="true"
                                        @vdropzone-file-added="onSurveyFileAdded"
                                        @vdropzone-upload-progress="onUploadSurveyFileProgress"
                                    >
                                        <div class="file__drag">
                                            <img src="~/assets/img/ico-file-drag-turqy.svg"/>
                                            <span>{{ $t("pages.assessments.uploadSurveyFile.filePlaceholder") }}</span>
                                        </div>
                                    </dropzone>

                                    <!--// STEP 1 - DROPZONE-->

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <template v-if="fileAdded && progress < 100">
                                        <label class="label label--bold">
                                            {{ $t('pages.assessments.uploadSurveyFile.validatingFileFormat') }}</label>
                                        <div class="elinor__progress-bar">
                                            <span class="elinor__progress-bar-status" :style="{width: progress + '%'}"></span>
                                        </div>
                                    </template>

                                    <!--//STEP 2 - FILE UPLOAD-->

                                    <!--STEP 3 - SUCCESS-->
                                    <div v-if="progress === 100 && !surveyFileError" class="description">
                                        <img
                                            src="~/assets/img/ico-file-gray.svg"
                                            alt="file uploaded successfully"
                                        />
                                        <h4>{{ $t('pages.assessments.uploadSurveyFile.fileCorrectlyFormated') }}</h4>
                                        <p>{{ $t('pages.assessments.uploadSurveyFile.fileCorrectlyFormatedText') }}</p>
                                        <br />
                                        <br />
                                        <img
                                            src="~/assets/img/ico-file-error.svg"
                                        />
                                        <p style="color: red">{{ $t('pages.assessments.uploadSurveyFile.uploadWarning') }}</p>
                                        <br />
                                        <br />
                                    </div>
                                    <!--//STEP 3 - SUCCESS-->

                                    <!--STEP 3 - ERROR-->
                                    <div v-if="fileAdded && progress === 100 && surveyFileError" class="description">
                                        <img
                                            src="~/assets/img/ico-file-error.svg"
                                            alt="file error"
                                        />
                                        <h4>{{ $t('pages.assessments.uploadSurveyFile.surveyFileErrorTitle') }}</h4>
                                        <p>{{ $t('pages.assessments.uploadSurveyFile.surveyFileErrorDescription') }}</p>
                                        <p style="color: red" v-for="(error) in getErrors(surveyFileError)">
                                            {{ error }}
                                        </p>
                                        <p>{{ $t('pages.assessments.uploadSurveyFile.tryAgainText') }} <a @click="clearSurveyFile" role="button">{{ $t('pages.assessments.uploadSurveyFile.tryAgainButton') }}</a></p>
                                    </div>
                                    <!--//STEP 3 - ERROR-->
                                </div>
                                <div class="file__buttons">
                                    <!--STEP 1 - DROPZONE-->
                                    <button
                                        v-if="!fileAdded"
                                        @click="surveyFileTrigger"
                                        type="button"
                                        class="btn--border-turqy btn--opacity--child"
                                    >
                                        <span class="btn--opacity__target">{{ $t("pages.assessments.uploadSurveyFile.triggerButton") }}</span>
                                        <img src="~/assets/img/ico-file-turqy.svg"/>
                                    </button>
                                    <!--<p class="msg msg--error">This format is not supported</p>-->
                                    <!--//STEP 1 - DROPZONE-->
                                    <p v-if="dropzoneAccepted === false" class="msg msg--error">{{ $t('pages.assessments.uploadSurveyFile.formatNotSupported') }}</p>

                                    <!--STEP 2 - FILE UPLOAD-->
                                    <button
                                        v-if="fileAdded && progress < 100"
                                        @click="cancelSurveyFile"
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
                                        v-if="fileAdded && progress === 100 && !surveyFileError"
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
                                        v-if="fileAdded && progress === 100 && surveyFileError"
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
                <template v-if="!fileAdded || progress < 100 || surveyFileError">
                    <div class="description"><strong>{{ $t('pages.assessments.uploadSurveyFile.helpTitle') }}</strong></div>
                    <br />
                    <div class="description">
                        <p v-html="$t('pages.assessments.uploadSurveyFile.help')" v-if="!fileAdded || progress < 100 || surveyFileError" />
                    </div>
                </template>
            </div>
            <!--STEP 3 - SUCCESS -->
            <div v-show="fileAdded && progress === 100 && !surveyFileError" class="popup__map-img" style="top: 10rem !important;">
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
            file: null,
            progress: 0,
            dropzoneAccepted: null,
            dropzone: {
                url: "none",
                previewTemplate: this.template(),
                uploadMultiple: false,
                acceptedFiles: ".xlsx",
                autoQueue: false,
            },
        };
    },
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment,
            surveyFileError: (state) => state.assessments.surveyFile.error,
        }),
    },
    methods: {
        ...mapActions({
            uploadSurveyFile: "assessments/uploadSurveyFile",
            resetSurveyFileError: "assessments/resetSurveyFileError",
            popupState: "popup/popupState",
        }),
        surveyFileTrigger() {
            this.$refs.surveyFile.$el.click();
        },
        clearSurveyFile() {
            this.fileAdded = false;
            this.resetSurveyFileError();
            this.progress = 0;
            this.$refs.surveyFile && this.$refs.surveyFile.removeAllFiles();
        },
        async onSurveyFileAdded(file) {
            await this.$nextTick(async () => {
                if(file.status === "error") {
                    this.dropzoneAccepted = false;
                } else {
                    this.dropzoneAccepted = true;
                    this.file = file;
                    await this.uploadSurveyFile({
                        assessmentId: this.assessment.id,
                        file,
                        dryRun: true,
                        onUploadProgress: this.onUploadSurveyFileProgress
                    });
                    this.fileAdded = true;
                }
            });
        },
        onUploadSurveyFileProgress(progressEvent) {
            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
        cancelSurveyFile() {
            this.fileAdded = false;
            this.progress = 0;
            this.resetSurveyFileError();
        },
        async accept() {
            this.cancelSurveyFile();
            await this.uploadSurveyFile({
                assessmentId: this.assessment.id,
                file: this.file,
                dryRun: false
            });
            await this.popupState({active: false});
        },
        cancel() {
            this.cancelSurveyFile();
            this.popupState({active: false});
        },
        template() {
            return "<div></div>";
        },
        getErrors(errors) {
            return Object.keys(errors).map(key => {
                return this.$t('pages.assessments.uploadSurveyFile.errors.' + key, errors[key].data);
            });
        }
    },
};
</script>
