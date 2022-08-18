<template>
    <div class="assessment__btns">
        <span v-if="assessment.data_policy === 90 && assessment.status === 10" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxNSAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2IiBzdHJva2U9IiMzNTlFOTgiLz4KPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2IiBzdHJva2U9IiM0M0EwQkQiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03LjE3MjMyIDcuODk5OTFMMTMuOTY2MSAxTDE1IDIuMDUwMDRMNy4xNzIzMiAxMEwzIDUuNzYyNTFMNC4wMzM4OSA0LjcxMjQ3TDcuMTcyMzIgNy44OTk5MVoiIGZpbGw9IiMzNTlFOTgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03LjE3MjMyIDcuODk5OTFMMTMuOTY2MSAxTDE1IDIuMDUwMDRMNy4xNzIzMiAxMEwzIDUuNzYyNTFMNC4wMzM4OSA0LjcxMjQ3TDcuMTcyMzIgNy44OTk5MVoiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/> <span>Published</span></span>
        <a v-if="assessment.data_policy === 10 && assessment.status === 10" href="/" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Finalized</span></a>
        <a v-if="assessment.status === 10" @click="download" role="button" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Dowload Data</span></a>
        <template v-if="$auth.loggedIn">
            <a v-if="!isCreator()" @click="contact" role="button" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Contact admin</span></a>
            <a v-if="!isCreator()" @click="flag" role="button" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Flag</span></a>
            <a v-if="isCreator() && assessment.status !== 10" @click="destroy" role="button" class="btn btn--border-turqy btn--sm"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NzUgOC41SDE0Ljg3NUMxNS4wMTU5IDguNSAxNS4xNTEgOC41NTU5NyAxNS4yNTA3IDguNjU1NkMxNS4zNTAzIDguNzU1MjMgMTUuNDA2MiA4Ljg5MDM1IDE1LjQwNjIgOS4wMzEyNVYxMy4yODEyQzE1LjQwNjIgMTMuNDIyMSAxNS4zNTAzIDEzLjU1NzMgMTUuMjUwNyAxMy42NTY5QzE1LjE1MSAxMy43NTY1IDE1LjAxNTkgMTMuODEyNSAxNC44NzUgMTMuODEyNUgyLjEyNUMxLjk4NDEgMTMuODEyNSAxLjg0ODk4IDEzLjc1NjUgMS43NDkzNSAxMy42NTY5QzEuNjQ5NzIgMTMuNTU3MyAxLjU5Mzc1IDEzLjQyMjEgMS41OTM3NSAxMy4yODEyVjkuMDMxMjVDMS41OTM3NSA4Ljg5MDM1IDEuNjQ5NzIgOC43NTUyMyAxLjc0OTM1IDguNjU1NkMxLjg0ODk4IDguNTU1OTcgMS45ODQxIDguNSAyLjEyNSA4LjVINS4zMTI1IiBzdHJva2U9IiM0M0EwQkQiIHN0cm9rZS13aWR0aD0iMS40MTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjUgMS41OTM3NVY4LjUiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLXdpZHRoPSIxLjQxNjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuMzEyNSA1LjMxMjVMOC41IDguNUwxMS42ODc1IDUuMzEyNSIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjEuNDE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTIuNDg0NCAxMS45NTMxQzEyLjkyNDUgMTEuOTUzMSAxMy4yODEyIDExLjU5NjQgMTMuMjgxMiAxMS4xNTYyQzEzLjI4MTIgMTAuNzE2MSAxMi45MjQ1IDEwLjM1OTQgMTIuNDg0NCAxMC4zNTk0QzEyLjA0NDMgMTAuMzU5NCAxMS42ODc1IDEwLjcxNjEgMTEuNjg3NSAxMS4xNTYyQzExLjY4NzUgMTEuNTk2NCAxMi4wNDQzIDExLjk1MzEgMTIuNDg0NCAxMS45NTMxWiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/> <span>Delete</span></a>
        </template>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'assessment-actions',
    props: ['type'],
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        }),
        isCreator() {
            return this.assessment.created_by === this.$auth.user.id;
        },
        contact() {
            this.popupState(
                {
                    active: true,
                    type:'onboarding',
                    component: 'popup-assessment-contact',
                    title: 'pages.assessments.actions.contact.title'
                }
            );
        },
        flag() {
            this.popupState(
                {
                    active: true,
                    type:'onboarding',
                    component: 'popup-assessment-flag',
                    title: 'pages.assessments.actions.flag.title'
                }
            );
        },
        destroy() {
            this.popupState(
                {
                    active: true,
                    type:'onboarding',
                    component: 'popup-assessment-delete',
                    title: 'pages.assessments.actions.delete.title'
                }
            );
        },
        download() {
            console.log('download');
        }
    }
}
</script>
