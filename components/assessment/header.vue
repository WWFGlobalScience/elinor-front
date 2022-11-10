<template>
    <header class="header--page">
        <div class="container flex justify-between items-start">
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg">
                    <span>{{ $t('pages.assessments.view.title') }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">{{ $t('pages.assessments.view.year') }} {{ assessment.year }} - Version {{ assessment.published_version }}</p>
                <assessment-actions type="show"/>
            </div>
            <div class="header__save" style="justify-content: flex-start">
                <assessment-status></assessment-status>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'assessment-header',
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment
        }
    }
}
</script>
