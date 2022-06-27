<template>
    <section class="section section--assesment-edit-survey section--mt-0">
        <assessment-edit-survey-navigator></assessment-edit-survey-navigator>
        <assessment-edit-survey-list></assessment-edit-survey-list>
    </section>
</template>

<script>
export default {
    name: 'assessment-survey',
    layout: 'assessment-edit',
   mounted() {
       console.log("test")
        this.$store.dispatch('surveyquestions/fetchSurveyQuestions');
    }
}

</script>
