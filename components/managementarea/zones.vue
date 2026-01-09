<template>
  <section v-if="zones.length" class="zone-list">
    <div class="container">
      <h4>
        {{ $t('pages.assessments.view.tabs.info.labels.zones.title') }}
      </h4>
      <div class="zone-list__content">
        <div
          class="zone-list__content__item"
          v-for="zone in zones"
          :key="zone.id"
        >
          <div class="zone-list__content__item__subitem">
            <div class="zone-list__content__item__subitem__label">
              {{ $t('pages.assessments.view.tabs.info.labels.zones.zoneName') }}
            </div>
            <div class="zone-list__content__item__subitem__value">
              {{ zone.name }}
            </div>
          </div>
          <div class="zone-list__content__item__subitem">
            <div class="zone-list__content__item__subitem__label">
              {{
                $t('pages.assessments.view.tabs.info.labels.zones.zoneLevel')
              }}
            </div>
            <div class="zone-list__content__item__subitem__value">
              {{ accessLevels[zone.access_level] }}
            </div>
          </div>
          <div class="zone-list__content__item__subitem">
            <div class="zone-list__content__item__subitem__label">
              {{
                $t(
                  'pages.assessments.view.tabs.info.labels.zones.zoneDescription',
                )
              }}
            </div>
            <div class="zone-list__content__item__subitem__value">
              {{ zone.description }}
            </div>
          </div>
        </div>
      </div>
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
