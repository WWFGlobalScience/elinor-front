<template>
    <header class="header--page">
        <div class="container">
            <h1 class="mb-0">
                <img src="~/assets/img/ico-assessments-turqy.svg">
                <span>{{ $t('pages.assessments.view.title') }}</span>
            </h1>
            <h2 class="assessment__name">{{ assessment.name }}</h2>
            <p class="assessment__year">{{ $t('pages.assessments.view.year') }} {{ assessment.year }}</p>
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
