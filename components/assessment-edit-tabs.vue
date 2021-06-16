<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/assessment-data/`" :class="[ 'btn--tab btn--ok', { 'btn--error': !edit.data } ]">
                        <span class="bullet bullet--status">
                            <img v-if="edit.data" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.data.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/managed-area`" :class="[ 'btn--tab btn--ok', { 'btn--error': !edit.ma } ]">
                        <span class="bullet bullet--status">
                            <img v-if="edit.ma" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.ma.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/the-survey/`" :class="[ 'btn--tab btn--ok', { 'btn--error': !edit.survey } ]">
                        <span class="bullet bullet--status">
                            <img v-if="edit.survey" src="~/assets/img/ico-ok.svg" >
                            <img v-else src="~/assets/img/ico-error.svg" >
                        </span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.survey.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/edit/${id}/collaborators`" :class="[ 'btn--tab', { 'btn--error': !edit.collaborators } ]">
                        <span class="bullet">3</span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.collaborators.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li class="elinor__tab--end">
                    <nuxt-link :to="`/assessments/edit/${id}/prepare-for-publish`" :class="[ 'btn--tab btn--tab-percent', { 'btn--error': !edit.publish, 'btn--tab-disabled': edit.percent != 100 } ]">
                        <span class="bullet">{{ edit.percent }}%</span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment-edit.tabs.publish.tab' ) }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div> 
    </section>
</template>

<script>
export default {
    name: 'assessment-edit-tab',
    props: [ 'id' ],
    computed: {
        edit() {
            return this.$store.state.assessments.edit
        }
    }
}
</script>