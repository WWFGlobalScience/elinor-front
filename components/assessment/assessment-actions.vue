<template>
    <div class="assessment__btns">
        <a v-if="assessment.status === 10" @click="download" role="button" class="btn btn--border-turqy btn--sm" title="Download Data"><img src='~/assets/img/ico-download.svg' alt="Download Data"/> <span>{{ $t('default.downloadData') }}</span></a>
        <template v-if="$auth.loggedIn">
            <a v-if="!isCreator()" @click="contact" role="button" class="btn btn--border-turqy btn--sm" title="Contact"><img src='~/assets/img/ico-mail.svg' alt="Contact"/> <span>{{ $t('default.contactAdministrator') }}</span></a>
            <a v-if="!isCreator()" @click="flag" role="button" class="btn btn--rounded" title="Flag"><img src="~/assets/img/ico-flag.svg" alt="Flag"> <span class="visually-hidden">Flag</span></a>
            <a v-if="isCreator() && assessment.status !== 10" @click="destroy" role="button" class="btn btn--rounded" title="Delete"><img src="~/assets/img/ico-trash2.svg" alt="Delete"> <span class="visually-hidden">{{ $t('default.delete') }}</span></a>
        </template>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'assessment-actions',
    props: ['type'],
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        }),
        isCreator() {
            return this.assessment.created_by === this.$auth.user.id;
        },
        contact() {
            this.popupState(
                {
                    active: true,
                    type:'onboarding',
                    component: 'popup-assessment-contact',
                    title: 'pages.assessments.actions.contact.title'
                }
            );
        },
        flag() {
            this.popupState(
                {
                    active: true,
                    type:'onboarding',
                    component: 'popup-assessment-flag',
                    title: 'pages.assessments.actions.flag.title'
                }
            );
        },
        destroy() {
            this.popupState(
                {
                    active: true,
                    type:'xs',
                    component: 'popup-assessment-delete',
                    title: 'pages.assessments.actions.delete.title'
                }
            );
        },
        download() {
            console.log('download');
        }
    }
}
</script>