<template>
  <div class="popover">
    {{ $t('default.feedback.prompt') }}
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSccumYV8Ldg4XJZDmc7FIR1vaSRXXkRfWnrxVPa4T3dqW_cdw/viewform"
      target="_blank"
      rel="noopener noreferrer"
      >{{ $t('default.feedback.linkHere') }}</a
    >
    {{ $t('default.feedback.surveyText') }}
    <a href="https://ElinorData.org">ElinorData.org</a>
  </div>
</template>

<script>
export default {
  name: 'popover',
};
</script>
