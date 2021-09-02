<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/assessment-data/`" :class="[ 'btn--tab btn--ok', { 'btn--error': assessmentPercentage.data < 100 } ]">
                        <span class="bullet bullet--status">
                            <img v-if="assessmentPercentage.data >= 100" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/managed-area`" :class="[ 'btn--tab btn--ok', { 'btn--error': managementAreaPercentage.total < 100 } ]">
                        <span class="bullet bullet--status">
                            <img v-if="managementAreaPercentage.total >= 100" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.ma.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/the-survey/`" :class="[ 'btn--tab btn--ok', { 'btn--error': assessmentPercentage.survey < 100 } ]">
                        <span class="bullet bullet--status">
                            <img v-if="assessmentPercentage.survey >= 100" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.survey.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/collaborators`" :class="[ 'btn--tab']">
                        <span class="bullet">3</span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.collaborators.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li class="elinor__tab--end">
                    <nuxt-link :to="`/assessments/edit/${id}/publish-settings`" :class="[ 'btn--tab btn--tab-percent', { 'btn--error': assessmentPercentage.total < 100 } ]">
                        <span class="bullet">{{ percentage }}%</span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.publish.tab' ) }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'assessment-edit-tab',
    props: [ 'id' ],
    computed: {
        percentage() {
            return '100' // this.assessmentPercentage.total + this.managementAreaPercentage.total / 2;
        },
        ...mapGetters({
            assessmentPercentage: 'assessments/getPercentage',
            managementAreaPercentage: 'managementareas/getPercentage'
        }),
    }
}
</script>
