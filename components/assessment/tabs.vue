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
            </ul>
        </div>
    </section>
</template>

<script>

export default {
    name: 'assessment-tabs',
    props: {
        id:null
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}
</script>
