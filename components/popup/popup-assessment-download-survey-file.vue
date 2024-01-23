<template>
    <div class="popup__content">
        <div class="description">
            <div v-html="$t('pages.assessment.downloadSurveyFile.help')" />
            <ul class="list-disc list-inside mt-10">
                <li>{{ $t('pages.assessment.downloadSurveyFile.condition1') }}</li>
                <li>{{ $t('pages.assessment.downloadSurveyFile.condition2') }}</li>
                <li>{{ $t('pages.assessment.downloadSurveyFile.condition3') }}</li>
                <li>{{ $t('pages.assessment.downloadSurveyFile.condition4') }}</li>
                <li>{{ $t('pages.assessment.downloadSurveyFile.condition5') }}</li>
            </ul>
        </div>
        <br /><br />
        <br /><br />
        <div class="file__buttons">
            <button
                @click="downloadSurveyFile"
                type="button"
                class="btn--border-turqy btn--opacity--child"
            >
                <span class="btn--opacity__target">{{ $t("pages.assessment.downloadSurveyFile.buttons.select") }}</span>
                <img src="~/assets/img/ico-file-turqy.svg"/>
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "popup-assessment-download-survey-file",
    data() {
        return {
        };
    },
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.instance
        }),
    },
    methods: {
        ...mapActions({
            downloadSurveyFile: "assessments/downloadSurveyFile",
            resetDownloadSurveyFileError: "assessments/resetDownloadSurveyFileError",
            popupState: "popup/popupState",
        }),

        async onDownloadSurveyFile() {
            await this.downloadSurveyFile({
                id: this.assessment.id,
            });
        },
    },
};
</script>
