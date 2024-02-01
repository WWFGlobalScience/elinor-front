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
                @click="onDownloadSurveyFile"
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
    computed: {
        ...mapState({
            assessment: (state) => state.assessments.assessment
        }),
    },
    methods: {
        ...mapActions({
            downloadSurveyFile: "assessments/downloadSurveyFile",
            popupState: "popup/popupState",
        }),

        async onDownloadSurveyFile() {
            await this.downloadSurveyFile(this.assessment.id);
        },
    },
};
</script>
