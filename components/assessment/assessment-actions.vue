<template>
    <div class="assessment__btns">
        <a
            v-if="false && assessment.status === 10"
            @click="download"
            role="button"
            class="btn btn--border-turqy btn--sm"
            title="Download Data"
            ><img src="~/assets/img/ico-download.svg" alt="Download Data" />
            <span>{{ $t("default.downloadData") }}</span></a>
        <template v-if="$auth.loggedIn">
            <a
                v-if="isAssessmentCollaborator($auth, assessment) && !isOffline"
                @click="
                    popupState({
                        active: true,
                        component: 'popup-assessment-generate-report',
                        title: 'default.generateReport'
                    })
                "
                role="button"
                class="btn btn--border-turqy btn--sm"
                title="Report"
            >
                <svg>
                    <path
                        d="M8.75 8.75h5M8.75 11.25h5M16.25 3.125H3.75a.625.625 0 0 0-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 0 0-.625-.625ZM6.25 3.125v13.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span>{{$t("default.generateReport") }}</span>
            </a>
            <a
                v-if="!isOffline && isAssessmentCollaborator($auth, assessment) && !isAssessmentObserver($auth, assessment)"
                @click="downloadSurveyFile"
                role="button"
                class="btn btn--border-turqy btn--sm"
                title="Download survey"
            ><img src="~/assets/img/ico-arrow-down.svg" alt="Download survey" />
                <span>{{
                        $t("default.downloadSurveyFile")
                    }}</span></a
            >
            <a
                v-if="!isOffline && isAssessmentCollaborator($auth, assessment) && !isAssessmentObserver($auth, assessment)"
                @click="uploadSurveyFile"
                role="button"
                class="btn btn--border-turqy btn--sm"
                title="Upload survey"
            ><img src="~/assets/img/ico-arrow-up.svg" alt="Upload survey" />
                <span>{{
                        $t("default.uploadSurveyFile")
                    }}</span></a
            >
            <a
                v-if="isSurveyTab"
                @click="isOffline? setOnline() : setOffline()"
                role="button"
                class="btn btn--border-turqy btn--sm"
                title="Offline"
                ><svg>
                    <path
                        d="M8.75 8.75h5M8.75 11.25h5M16.25 3.125H3.75a.625.625 0 0 0-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 0 0-.625-.625ZM6.25 3.125v13.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span>
                    Turn {{ isOffline ? 'online': 'offline' }}
                </span>
            </a>
            <a
                v-if="!isCreator() && !isOffline"
                @click="contact"
                role="button"
                class="btn btn--border-turqy btn--sm"
                title="Contact"
                ><img src="~/assets/img/ico-mail.svg" alt="Contact" />
                <span>{{ $t("default.contactAdministrator") }}</span></a
            >
            <a
                v-if="!isCreator() && !isOffline"
                @click="flag"
                role="button"
                class="btn btn--rounded"
                title="Flag"
                ><img src="~/assets/img/ico-flag.svg" alt="Flag" />
                <span class="visually-hidden">{{
                        $t("default.flag")
                    }}
                </span></a
            >
            <a
                v-if="isCreator() && assessment.status !== 10 && !isOffline"
                @click="destroy"
                role="button"
                class="btn btn--rounded"
                title="Delete"
                ><img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                <span class="visually-hidden">{{
                    $t("default.delete")
                }}</span></a
            >
            <a
                v-if="isCreator() && assessment.status === 10 && !isOffline"
                @click="infoToDestroy"
                role="button"
                class="btn btn--rounded"
                title="Delete"
                ><img src="~/assets/img/ico-trash2.svg" alt="Delete" />
                <span class="visually-hidden">{{
                    $t("default.delete")
                }}</span></a
            >
        </template>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {isAssessmentCollaborator, isAssessmentObserver} from "~/config/assessment-roles";

export default {
    name: "assessment-actions",
    props: ["type"],
    data() {
        return {
            isSurveyTab: this.isSurveyRoute(),
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            isOffline: state => state.layout.offline,
        }),
    },
    watch: {
        $route (){
            this.isSurveyTab = this.isSurveyRoute()
        },
    },
    methods: {
        isAssessmentObserver,
        ...mapActions({
            popupState: "popup/popupState",
            downloadAssessment: "assessments/downloadAssessment",
            setOffline: "assessments/setOffline",
            setOnline: "assessments/setOnline",
        }),
        isCreator() {
            return this.assessment.created_by === this.$auth.user.id;
        },
        isSurveyRoute() {
            return [
                'assessments-edit-id-the-survey-qid',
                'assessments-edit-id-the-survey'
            ].includes(this.$router.currentRoute.name);
        },
        contact() {
            this.popupState({
                active: true,
                type: "onboarding",
                component: "popup-assessment-contact",
                title: "pages.assessments.actions.contact.title"
            });
        },
        flag() {
            this.popupState({
                active: true,
                type: "onboarding",
                component: "popup-assessment-flag",
                title: "pages.assessments.actions.flag.title"
            });
        },
        destroy() {
            this.popupState({
                active: true,
                type: "xs",
                component: "popup-assessment-delete",
                title: "pages.assessments.actions.delete.title"
            });
        },
        infoToDestroy() {
            this.popupState({
                active: true,
                type: "xs",
                component: "popup-assessment-delete-info",
                title: "pages.assessments.actions.delete-info.title"
            });
        },
        download() {
            this.downloadAssessment(this.assessment.id);
        },
        isAssessmentCollaborator,
        downloadSurveyFile() {
            this.popupState( {
                active: true,
                component: 'popup-assessment-download-survey-file',
                title: 'pages.assessments.downloadSurveyFile.title'
            })
        },
        uploadSurveyFile() {
            this.popupState( {
                active: true,
                component: 'popup-assessment-upload-survey-file',
                title: 'pages.assessments.uploadSurveyFile.title'
            })
        }
    }
};
</script>
