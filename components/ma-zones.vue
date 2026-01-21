<template>
  <section class="section section--ma-data">
    <div class="container">
      <header class="header--ma-data header--ma-data--stripped">
        <h3>
          {{
            $t(
              'pages.managed-areas.content.ma.tabs.info.data.zones.header.title',
            )
          }}
        </h3>
      </header>
      <ul class="elinor__data-grid">
        <li class="elinor__data-sublock">
          <ul class="elinor__data-sublist ui-rounded-border">
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-name',
                )
              }}</span>
              <span class="data">{{ ma['zone-name'] }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-restrictions',
                )
              }}</span>
              <span class="data">{{ ma['zone-restrictions'] }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-description',
                )
              }}</span>
              <span class="data">{{ ma['zone-description'] }}</span>
            </li>
          </ul>
        </li>
        <li class="elinor__data-sublock">
          <ul class="elinor__data-sublist ui-rounded-border">
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-name',
                )
              }}</span>
              <span class="data">{{ ma['zone-name'] }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-restrictions',
                )
              }}</span>
              <span class="data">{{ ma['zone-restrictions'] }}</span>
            </li>
            <li class="elinor__data elinor__data--full">
              <span class="title">{{
                $t(
                  'pages.managed-areas.content.ma.tabs.info.data.zones.labels.zone-description',
                )
              }}</span>
              <span class="data">{{ ma['zone-description'] }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ma-zones',
  props: ['ma'],
};
</script>
