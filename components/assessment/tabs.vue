<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/assessments/${id}/info/`" class="btn--tab">
                        <span class="txt">{{ $t('pages.assessments.view.tabs.info.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/${id}/the-survey`" class="btn--tab">
                        <span class="txt">{{ $t('pages.assessments.view.tabs.survey.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/${id}/collaborators`" class="btn--tab">
                        <span class="bullet">3</span>
                        <span class="txt">{{ $t('pages.assessments.view.tabs.collaborators.tabButton') }}</span>
                    </nuxt-link>
                </li>
                <li class="elinor__tab--end" v-if="isAssessmentCollaborator($auth, assessment)">
                    <nuxt-link :to="`/assessments/${id}/publish-settings`"
                               :class="['btn--tab btn--tab-percent']">
                        <span class="bullet">100%</span>
                        <span class="txt">{{ $t('pages.assessments.edit.tabs.publish-settings.tabButton.edit') }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

import {isAssessmentCollaborator} from "~/config/assessment-roles";

export default {
    name: 'assessment-tabs',
    props: {
        id:null
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    },
    methods: {
        isAssessmentCollaborator
    }
}
</script>
