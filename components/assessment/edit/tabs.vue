<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/assessment-data/`"
                               :class="[ 'btn--tab btn--ok', { 'btn--error': !progress.data.complete } ]">
                        <span class="bullet bullet--status">
                            <img v-if="progress.data.complete" src="~/assets/img/ico-ok.svg">
                            <img v-else src="~/assets/img/ico-error.svg">
                        </span>
                        <span class="txt">{{ $t('pages.assessments.edit.tabs.data.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/managed-area`"
                               :class="[ 'btn--tab btn--ok', { 'btn--error': !progress.managed_area.complete } ]">
                        <span class="bullet bullet--status">
                            <img v-if="progress.managed_area.complete" src="~/assets/img/ico-ok.svg">
                            <img v-else src="~/assets/img/ico-error.svg">
                        </span>
                        <span class="txt">{{ $t('pages.assessments.edit.tabs.managementArea.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/the-survey/`"
                               :class="[ 'btn--tab btn--ok', { 'btn--error': !progress.survey.complete } ]">
                        <span class="bullet bullet--status">
                            <img v-if="progress.survey.complete" src="~/assets/img/ico-ok.svg">
                            <img v-else src="~/assets/img/ico-error.svg">
                        </span>
                        <span class="txt">{{ $t('pages.assessments.edit.tabs.survey.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/collaborators`"
                               :class="[ 'btn--tab', { 'btn--error': !progress.collaborators.complete } ]">
                        <span class="bullet">{{ progress.collaborators.filled }}</span>
                        <span class="txt">
                            {{ $t('pages.assessments.edit.tabs.collaborators.tabButton') }}
                        </span>
                    </nuxt-link>
                </li>
                <li class="elinor__tab--end" v-if="!progress.published">
                    <nuxt-link :to="`/assessments/edit/${id}/publish-settings`"
                               :class="[ 'btn--tab btn--tab-percent', { 'btn--error': progress.overall_percentage < 100, 'btn--tab-disabled': progress.overall_percentage < 100 } ]">
                        <span class="bullet">{{ Math.floor(progress.overall_percentage) }}%</span>
                        <span class="txt">{{ getPublishTabText() }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'assessment-edit-tab',
    props: ['id'],
    methods: {
        getPublishTabText() {
            const status = this.assessment.status;
            const percentage = this.progress.overall_percentage;
            let key;
            if(percentage < 100) {
                key = 'preparing';
            }
            if(percentage === 100 && status === 90) {
                key = 'ready';
            }

            if(percentage === 100 && status === 10) {
                key = 'edit';
            }

            return this.$t('pages.assessments.edit.tabs.publish-settings.tabButton.' + key);
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            progress: state => state.assessments.progress
        })
    }
}
</script>
