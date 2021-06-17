<template>
    <section class="section section--ma-data">
        <div class="container">
            <header class="header--ma-data">
                <h3>Selected Managed Area</h3>
            </header>
            <div class="elinor__data-wrap">
                <div class="elinor__data-list">
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
                    <div class="elinor__data-separator"></div>
                    <ul class="elinor__data-grid elinor__data-grid--3-5">
                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.countries' ) }}</span>
                            <span class="data">
                                <span v-for="(country, index) in ma['countries']">{{ country }}<span v-if="index != (ma['countries'].length - 1)">, </span></span>
                            </span>
                        </li>
                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.provinces' ) }}</span>
                            <span class="data">
                                <span v-for="(province, index) in ma['provinces']">{{ province }}<span v-if="index != (ma['provinces'].length - 1)">, </span></span>
                            </span>
                        </li>
                    </ul>
                </div>
                <assessment-people v-if="mode == 'assessment' "></assessment-people>
            </div>
        </div>
    </section>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ma-edit-exists-data',
    props: [ 'ma', 'mode' ],
    filters: {
        formatDate: function( value ) {
            if (value) {
                return moment(value *1000 ).format('MM/DD/YYYY')
            }
        }
    }
}
</script>