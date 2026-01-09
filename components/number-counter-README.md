# Number Counter Component

A reusable Vue.js component for number input with increment/decrement buttons.

## Features

- ✅ Increment/decrement buttons with icons
- ✅ Direct number input with validation
- ✅ Configurable min/max values and step size
- ✅ Disabled state support
- ✅ Multiple size variants (small, default, large)
- ✅ Accessibility support with ARIA labels
- ✅ Internationalization support
- ✅ Focus states and hover effects
- ✅ Input validation and clamping

## Usage

### Basic Usage

```vue
<template>
  <number-counter v-model="count" :min="0" :max="100" :step="1" />
</template>

<script>
import NumberCounter from '~/components/number-counter.vue';

export default {
  components: {
    NumberCounter,
  },
  data() {
    return {
      count: 5,
    };
  },
};
</script>
```

### Props

| Prop       | Type    | Default | Description                       |
| ---------- | ------- | ------- | --------------------------------- |
| `value`    | Number  | 0       | Current value of the counter      |
| `min`      | Number  | 0       | Minimum allowed value             |
| `max`      | Number  | 999     | Maximum allowed value             |
| `step`     | Number  | 1       | Step size for increment/decrement |
| `disabled` | Boolean | false   | Whether the counter is disabled   |

### Events

| Event    | Payload | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| `input`  | Number  | Emitted when the value changes (for v-model)         |
| `change` | Number  | Emitted when the value changes and input loses focus |

### Size Variants

Add CSS classes to change the size:

```vue
<!-- Small size -->
<number-counter v-model="count" class="number-counter--small" />

<!-- Large size -->
<number-counter v-model="count" class="number-counter--large" />
```

### Advanced Example

```vue
<template>
  <div>
    <p>Current value: {{ myValue }}</p>
    <number-counter
      v-model="myValue"
      :min="10"
      :max="50"
      :step="5"
      @change="onValueChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      myValue: 25,
    };
  },
  methods: {
    onValueChange(newValue) {
      console.log('Value changed to:', newValue);
    },
  },
};
</script>
```

## Styling

The component uses SCSS and includes built-in styles. You can customize the appearance by overriding the CSS classes:

- `.number-counter` - Main container
- `.number-counter__btn` - Increment/decrement buttons
- `.number-counter__input` - Number input field
- `.number-counter--small` - Small size variant
- `.number-counter--large` - Large size variant

## Accessibility

The component includes proper ARIA labels and keyboard navigation support:

- `aria-label` attributes for screen readers
- Keyboard accessible buttons
- Focus management
- Proper semantic HTML structure

## Internationalization

The component supports multiple languages through the translation system. Add these keys to your translation files:

```json
{
  "default": {
    "numberCounter": {
      "decrease": "Decrease value",
      "increase": "Increase value",
      "value": "Number value"
    }
  }
}
```

## Demo

Visit `/number-counter-demo` to see the component in action with various configurations.
