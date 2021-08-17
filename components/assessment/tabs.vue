<template>
    <section class="section section--tab section--mt-10">
        <div class="container">
            <ul class="elinor__tabs">
                <li>
                    <nuxt-link :to="`/assessments/${assessment.id}/info/`" class="btn--tab">
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.info.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/${assessment.id}/the-survey`" class="btn--tab">
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.survey.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/${assessment.id}/management-area`" class="btn--tab">
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.ma.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="`/assessments/${assessment.id}/collaborators`" class="btn--tab">
                        <span class="bullet">3</span>
                        <span class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.collaborators.tab' ) }}</span>
                    </nuxt-link>
                </li>
                <li class="elinor__tab--end">
                    <nuxt-link :to="`/assessments/${assessment.id}/edit-publish-settings`" class="btn--tab">
                       <span class="txt">{{ $t( 'pages.assessments.content.assessment.tabs.publish.tab' ) }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div> 
    </section>
</template>

<script>
export default {
    name: 'assessment-tabs',
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}
</script>