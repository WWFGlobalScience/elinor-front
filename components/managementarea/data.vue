<template>
    <section class="section section--ma-data">
        <div class="container">
            <header class="header--ma-data">
                <h3>{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.header.title' ) }}</h3>
            </header>

            <div class="elinor__data-wrap">
                <div class="elinor__data-list">
                    <ul class="elinor__data-grid elinor__data-grid--3-5">

                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.name' ) }}</span>
                            <span class="data">{{ managementArea.name }}</span>
                        </li>

                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name' ) }}</span>
                            <span class="data">{{ managementArea.protected_area && managementArea.protected_area.name }}</span>
                        </li>


                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.establishment' ) }}</span>
                            <span class="data">{{ managementArea.date_established }}</span>
                        </li>

                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.size' ) }}</span>
                            <span class="data">{{ managementArea.reported_size }} h</span>
                        </li>

                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.pa-ca-name-focal' ) }}</span>
                            <span class="data">{{  }}</span>
                        </li>
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit' ) }}</span>
                            <span class="data">{{  }}</span>
                        </li>
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.management-unit-definition' ) }}</span>
                            <span class="data">{{  }}</span>
                        </li>

                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.governance-type' ) }}</span>
                            <span class="data">{{  managementArea.governance_type && managementArea.governance_type.name }}</span>
                        </li>

                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.authority-name' ) }}</span>
                            <span class="data">{{  managementArea.authority && managementArea.authority.name }}</span>
                        </li>
                    </ul>
                    <div class="elinor__data-separator"></div>
                    <ul class="elinor__data-grid elinor__data-grid--3-5">
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.rights' ) }}</span>
                            <span class="data">{{ managementArea.recognition_level }}</span>
                        </li>

                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.stakeholder-groups' ) }}</span>
                            <span class="data">
                                <span v-for="(stakeholder, index) in managementArea.stakeholder_groups">
                                    {{ stakeholder.name}}<span v-if="index !== (managementArea.stakeholder_groups.length - 1)">, </span>
                                </span>
                            </span>
                        </li>

                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.support' ) }}</span>
                            <span class="data">
                                <span v-html="managementArea.support_sources.map((supportSource) => supportSource.name).join('<span>, </span>')"></span>
                            </span>
                        </li>
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.wdpa-id' ) }}</span>
                            <span class="data" v-if="managementArea.protected_area">{{managementArea.protected_area.wdpa_id }}</span>
                            <span class="data" v-else>-</span>
                        </li>
                    </ul>
                    <div class="elinor__data-separator"></div>
                    <ul class="elinor__data-grid elinor__data-grid--3-5">

                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.countries' ) }}</span>
                            <span class="data">
                                <span v-for="(country, index) in managementArea.countries">
                                    {{ country }}<span v-if="index != (managementArea.countries.length - 1)">, </span>
                                </span>
                            </span>
                        </li>

                        <li class="elinor__data">
                            <span class="title">{{ $t( 'pages.managed-areas.content.ma.tabs.info.data.labels.provinces' ) }}</span>
                            <span class="data">

                            </span>
                        </li>

                    </ul>
                </div>
                <assessment-people></assessment-people>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'managementarea-data',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            managementArea: state => state.managementareas.instance
        })
    }
}
</script>
