<template>
    <header class="header--page">
        <div class="container flex justify-between items-end">
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg">
                    <span>{{ $t( 'pages.assessments.edit.title' ) }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">{{ $t('pages.assessments.edit.year') }} {{ assessment.year }}</p>
                <a href="/" class="btn btn--border-turqy btn--sm assessment__down"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Dowload Data</span></a>
            </div>
            <div class="header__save">
                <button type="submit" form="form--assessment-edit" class="btn btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t('pages.assessments.edit.saveButton') }}</span>
                    <img src="~/assets/img/ico-save-white.svg">
                </button>
                <p v-if="assessment.last_edit !== null && assessment.last_edit !== undefined"> {{ $t( 'default.save.autosave' ) + ' ' + assessment.last_edit.fromNow() }}</p>
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
