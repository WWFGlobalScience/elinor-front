<template>
  <div class="scores-aside aside">
    <img src="~/assets/img/report-brand.png" class="logo" />
    <h3>Assessment</h3>
    <div class="legend">
      <h4>SCORING SYSTEM</h4>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #029262"></div>
        <div class="legend-item-text">
          <strong>MAINTAIN</strong><br />
          Maintainstrong governance and monitor potential threats
          <br />
          <br />
          Indicator: <strong>4</strong><br />
          Attribute: <strong>9-10</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #bcbc16"></div>
        <div class="legend-item-text">
          <strong>STRENGTHEN</strong><br />
          Strengthen governance by addressing minor gaps
          <br />
          <br />
          Indicator: <strong>3</strong><br />
          Attribute: <strong>6-8</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #fbbe21"></div>
        <div class="legend-item-text">
          <strong>BUILD</strong><br />
          Build upon initial progress to address major governance gaps
          <br />
          <br />
          Indicator: <strong>2</strong><br />
          Attribute: <strong>3-5</strong>
        </div>
      </div>
      <div class="legend-item">
        <div class="legend-item-color" style="--color: #e35d5e"></div>
        <div class="legend-item-text">
          <strong>PLAN</strong><br />
          Develop plans for addressing severe governance gaps
          <br />
          <br />
          Indicator: <strong>1</strong><br />
          Attribute: <strong>0-2</strong>
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
