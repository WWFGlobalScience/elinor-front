<template>
    <header class="header--page">
        <div class="container flex justify-between items-start">
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg">
                    <span>{{ $t( 'pages.assessments.edit.title' ) }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">{{ $t('pages.assessments.edit.year') }} {{ assessment.year }}</p>
                <assessment-actions type="edit" />
            </div>
            <div class="header__save" style="justify-items: flex-start">
                <assessment-status class="mb-7"></assessment-status>
                <template v-if="assessment.status !== 10">
                    <button type="submit" form="form--assessment-edit" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t('pages.assessments.edit.saveButton') }}</span>
                        <img src="~/assets/img/ico-save-white.svg">
                    </button>
                    <p v-if="assessment.last_edit !== null && assessment.last_edit !== undefined"> {{ $t( 'default.save.autosave' ) + ' ' + assessment.last_edit.fromNow() }}</p>
                </template>
            </div>
        </div>
    </header>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: 'assessment-edit-header',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    },
}
</script>
