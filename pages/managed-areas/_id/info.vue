<template>
    <section class="section section--ma-info">
        <section class="section section--ma-data">
            <div class="container">
                <header class="header--ma-data">
                    <h3>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.header.title' ) }}</h3>
                </header>
                <ul class="elinor__data-grid elinor__data-grid--3-5">
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.name' ) }}</span>
                        <span class="data">{{ ma["name"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name' ) }}</span>
                        <span class="data">{{ ma["pa-ca-name"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.establishment' ) }}</span>
                        <span class="data">{{ ma["establishment"] | formatDate }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.size' ) }}</span>
                        <span class="data">{{ ma["size"] }} h</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name-focal' ) }}</span>
                        <span class="data">{{ ma["pa-ca-name-focal"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit' ) }}</span>
                        <span class="data">{{ ma["manage-unit"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit-definition' ) }}</span>
                        <span class="data">{{ ma["manage-unit-definition"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.governance-type' ) }}</span>
                        <span class="data">{{ ma["governance-type"] }}</span>
                    </li>
                    <li class="elinor__data">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.authority-name' ) }}</span>
                        <span class="data">{{ ma["management-authority"] }}</span>
                    </li>
                </ul>
                <div class="elinor__data-separator"></div>
                <ul class="elinor__data-grid elinor__data-grid--3-5">
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.rights' ) }}</span>
                        <span class="data">{{ ma["rights"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.stakeholder-groups' ) }}</span>
                        <span class="data">{{ ma["stakeholder-groups"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.support' ) }}</span>
                        <span class="data">{{ ma["support"] }}</span>
                    </li>
                    <li class="elinor__data elinor__data--full">
                        <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.wdpa-id' ) }}</span>
                        <span class="data">{{ ma["wdpa-id"] }}</span>
                    </li>
                </ul>
            </div>
        </section>
        <ma-map :ma="ma"></ma-map>
        <ma-assessments :assessments="assessments"></ma-assessments>
    </section>
</template>

<script>

import moment from 'moment'
import { mapActions } from "vuex"

export default {
    name: 'ma-info',
    layout: 'ma',
    computed: {
        assessments() {
            return this.$store.state.assessments.list
        },
        ma() {
            return this.$store.state.ma.ma
        }
    },
    filters: {
        formatDate: function( value ) {
            if (value) {
                return moment(value *1000 ).format('MM/DD/YYYY')
            }
        }
    }
}

</script>