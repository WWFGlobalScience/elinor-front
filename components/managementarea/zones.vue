<template>
    <section v-if="zones.length" class="section section--ma-data">
        <div class="container">
            <header class="header--ma-data header--ma-data--stripped">
                <h3>{{ $t('pages.managed-areas.content.ma.tabs.info.data.zones.header.title') }}</h3>
            </header>
            <ul class="elinor__data-grid">
                <li v-for="zone in zones" class="elinor__data-sublock">
                    <ul class="elinor__data-sublist ui-rounded-border">
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{
                                    $t('pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-name')
                                }}</span>
                            <span class="data">{{ zone.name }}</span>
                        </li>
                        <li class="elinor__data elinor__data--full">
                            <span class="title">{{
                                    $t('pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-restrictions')
                                }}</span>
                            <span class="data">{{ accessLevels[zone.access_level] }}</span>
                        </li>
                        <li v-if="zone.description" class="elinor__data elinor__data--full">
                            <span class="title">{{
                                    $t('pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-description')
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
import {mapState} from "vuex";

export default {
    name: 'managementarea-zones',
    data() {
        return {
            accessLevels: {
                90: this.$t('managementarea.zones.access_levels.OPEN_ACCESS'),
                50: this.$t('managementarea.zones.access_levels.PARTIALLY_RESTRICTED'),
                10: this.$t('managementarea.zones.access_levels.FULLY_RESTRICTED')
            }
        }
    },
    computed: {
        ...mapState({
            managementArea: state => state.managementareas.instance,
            zones: state => state.managementareas.zones,
        })
    },
}
</script>
