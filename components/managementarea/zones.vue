<template>
    <section v-if="zones.length" class="section section--ma-data">
        <div class="container">
            <header class="header--ma-data header--ma-data--stripped">
                <h3>
                    {{
                        $t(
                            'pages.assessments.view.tabs.info.labels.zones.title',
                        )
                    }}
                </h3>
            </header>
            <ul class="elinor__data-grid">
                <li v-for="zone in zones" class="elinor__data-sublock">
                    <ul class="elinor__data-sublist ui-rounded-border">
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{
                                $t(
                                    'pages.assessments.view.tabs.info.labels.zones.zoneName',
                                )
                            }}</span>
                            <span class="data">{{ zone.name }}</span>
                        </li>
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{
                                $t(
                                    'pages.assessments.view.tabs.info.labels.zones.zoneLevel',
                                )
                            }}</span>
                            <span class="data">{{
                                accessLevels[zone.access_level]
                            }}</span>
                        </li>
                        <li
                            v-if="zone.description"
                            class="elinor__data elinor__data--full"
                        >
                            <span class="title">{{
                                $t(
                                    'pages.assessments.view.tabs.info.labels.zones.zoneDescription',
                                )
                            }}</span>
                            <span class="data">{{ zone.description }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'managementarea-zones',
    data() {
        return {
            accessLevels: {
                90: this.$t(
                    'pages.assessments.edit.tabs.managementArea.zones.accessLevels.OPEN_ACCESS',
                ),
                50: this.$t(
                    'pages.assessments.edit.tabs.managementArea.zones.accessLevels.PARTIALLY_RESTRICTED',
                ),
                10: this.$t(
                    'pages.assessments.edit.tabs.managementArea.zones.accessLevels.FULLY_RESTRICTED',
                ),
            },
        };
    },
    computed: {
        ...mapState({
            managementArea: (state) => state.managementareas.instance,
            zones: (state) => state.managementareas.zones,
        }),
    },
};
</script>
