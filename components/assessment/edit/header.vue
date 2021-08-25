<template>
    <header class="header--page">
        <div class="container flex justify-between items-end">
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg">
                    <span>{{ $t( 'pages.assessments.content.header.title' ) }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">{{ $t( 'pages.assessments.content.assessment.header.year' ) }} {{ assessment.year }}</p>
            </div>
            <div class="header__save">
                <button type="submit" form="form--assessment-edit" class="btn btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'default.save.button' ) }}</span>
                    <img src="~/assets/img/ico-save-white.svg">
                </button>
                <p v-if="assessment.last_edit"> {{ $t( 'default.save.autosave' ) + ' ' + assessment.last_edit.fromNow() }}</p>
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
