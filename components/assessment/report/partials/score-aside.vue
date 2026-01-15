<template>
  <div class="scores-aside aside">
    <img src="~/assets/img/report-brand.png" class="logo" />
    <h3 class="capitalize">{{ $t('pages.assessments.list.totalSingular') }}</h3>
    <div class="legend">
      <h4 class="uppercase">{{ $t('pages.methodologyPage.subtitle4') }}</h4>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #029262"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.maintain.title') }}</strong><br />
          {{ $t('report.cover.legend.maintain.descriptionScore') }}
          <br />
          <br />
          {{ $t('pages.methodologyPage.scoreTable.indicator') }}: <strong>4</strong><br />
          {{ $t('pages.methodologyPage.scoreTable.attribute') }}: <strong>9-10</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #bcbc16"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.strengthen.title') }}</strong><br />
          {{ $t('report.cover.legend.maintain.descriptionScore') }}
          <br />
          <br />
          {{ $t('pages.methodologyPage.scoreTable.indicator') }}: <strong>3</strong><br />
          {{ $t('pages.methodologyPage.scoreTable.attribute') }}: <strong>6-8</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #fbbe21"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.build.title') }}</strong><br />
          {{ $t('report.cover.legend.build.descriptionScore') }}
          <br />
          <br />
          {{ $t('pages.methodologyPage.scoreTable.indicator') }}: <strong>2</strong><br />
          {{ $t('pages.methodologyPage.scoreTable.attribute') }}: <strong>3-5</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #e35d5e"></div>
        <div class="legend-item-text">
          <strong>{{ $t('report.cover.legend.plan.title') }}</strong><br />
          {{ $t('report.cover.legend.plan.descriptionScore') }}
          <br />
          <br />
          {{ $t('pages.methodologyPage.scoreTable.indicator') }}: <strong>1</strong><br />
          {{ $t('pages.methodologyPage.scoreTable.attribute') }}: <strong>0-2</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'assessment-report-partials-score-aside',
};
</script>
