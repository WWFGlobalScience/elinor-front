<template>
  <div class="number-counter-demo">
    <h2>Number Counter Component Demo</h2>

    <div class="demo-section">
      <h3>Basic Usage</h3>
      <p>Current value: {{ basicValue }}</p>
      <number-counter v-model="basicValue" :min="0" :max="100" :step="1" />
    </div>

    <div class="demo-section">
      <h3>With Custom Range</h3>
      <p>Current value: {{ customValue }}</p>
      <number-counter v-model="customValue" :min="10" :max="50" :step="5" />
    </div>

    <div class="demo-section">
      <h3>Small Size</h3>
      <p>Current value: {{ smallValue }}</p>
      <number-counter
        v-model="smallValue"
        :min="0"
        :max="20"
        class="number-counter--small"
      />
    </div>

    <div class="demo-section">
      <h3>Large Size</h3>
      <p>Current value: {{ largeValue }}</p>
      <number-counter
        v-model="largeValue"
        :min="0"
        :max="1000"
        :step="10"
        class="number-counter--large"
      />
    </div>

    <div class="demo-section">
      <h3>Disabled State</h3>
      <p>Current value: {{ disabledValue }}</p>
      <number-counter
        v-model="disabledValue"
        :min="0"
        :max="100"
        :disabled="true"
      />
    </div>

    <div class="demo-section">
      <h3>With Change Event</h3>
      <p>Current value: {{ eventValue }} (Last changed: {{ lastChange }})</p>
      <number-counter
        v-model="eventValue"
        :min="0"
        :max="50"
        @change="onValueChange"
      />
    </div>
  </div>
</template>

<script>
import NumberCounter from '~/components/number-counter.vue';

export default {
  name: 'NumberCounterDemo',
  components: {
    NumberCounter,
  },
  data() {
    return {
      basicValue: 5,
      customValue: 25,
      smallValue: 3,
      largeValue: 100,
      disabledValue: 42,
      eventValue: 10,
      lastChange: null,
    };
  },
  methods: {
    onValueChange(newValue) {
      this.lastChange = new Date().toLocaleTimeString();
    },
  },
};
</script>

<style lang="scss" scoped>
.number-counter-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    margin-bottom: 30px;
    color: #111827;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;

    h3 {
      margin-bottom: 10px;
      color: #374151;
    }

    p {
      margin-bottom: 15px;
      color: #6b7280;
    }
  }
}
</style>
