import Vue from 'vue';

export const Tab = {
  data() {
    return {
      tabs: {
        active: null,
        tabs: null,
      },
    };
  },
  methods: {
    tabFirstActive() {
      const firstTab = document.querySelectorAll('.elinor__tabs li button')[0];
      this.tabs.active = firstTab;
    },
  },
  mounted() {
    this.tabFirstActive();
  },
};

Vue.mixin(Tab);
