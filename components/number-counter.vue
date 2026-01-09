<template>
  <div class="number-counter">
    <button
      type="button"
      class="number-counter__btn number-counter__btn--decrease"
      :disabled="disabled || value <= min"
      @click="decrease"
      :aria-label="$t('numberCounter.decrease')"
    ></button>

    <div class="number-counter__display">
      <input
        type="number"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="number-counter__input"
        @input="handleInput"
        @blur="handleBlur"
        :aria-label="$t('numberCounter.value')"
      />
    </div>

    <button
      type="button"
      class="number-counter__btn number-counter__btn--increase"
      :disabled="disabled || value >= max"
      @click="increase"
      :aria-label="$t('numberCounter.increase')"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'number-counter',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    increase() {
      if (!this.disabled && this.value < this.max) {
        const newValue = Math.min(this.value + this.step, this.max);
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
    decrease() {
      if (!this.disabled && this.value > this.min) {
        const newValue = Math.max(this.value - this.step, this.min);
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
    handleInput(event) {
      const inputValue = parseInt(event.target.value) || this.min;
      const clampedValue = Math.max(this.min, Math.min(this.max, inputValue));
      this.$emit('input', clampedValue);
    },
    handleBlur(event) {
      const inputValue = parseInt(event.target.value) || this.min;
      const clampedValue = Math.max(this.min, Math.min(this.max, inputValue));
      this.$emit('input', clampedValue);
      this.$emit('change', clampedValue);
    },
  },
};
</script>
