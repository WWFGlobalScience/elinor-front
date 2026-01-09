<template>
  <div class="accordion">
    <div class="accordion-item">
      <div
        class="accordion-item-button"
        :class="{ 'is-open': isAccordionOpen }"
        @click="toggleAccordion"
      >
        <div>
          <span>{{ index }}.</span>
          <h5>{{ title }}</h5>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          class="min-w-[32px] min-h-[32px] transition-transform duration-300"
          :class="{ 'rotate-180': isAccordionOpen }"
          v-if="!isSmall"
        >
          <mask
            id="mask0_7699_8602"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="32"
            height="32"
          >
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_7699_8602)">
            <path
              d="M15.9926 20.4001C15.8326 20.4001 15.6826 20.3723 15.5426 20.3167C15.4026 20.2612 15.2771 20.1779 15.166 20.0667L8.84397 13.7447C8.59197 13.4927 8.47153 13.2056 8.48264 12.8834C8.49375 12.5612 8.62153 12.2779 8.86597 12.0334C9.11042 11.789 9.39375 11.6667 9.71597 11.6667C10.0382 11.6667 10.3215 11.789 10.566 12.0334L15.9993 17.5001L21.466 12.0334C21.7104 11.789 21.9937 11.6723 22.316 11.6834C22.6382 11.6945 22.9215 11.8223 23.166 12.0667C23.4104 12.3112 23.5326 12.5945 23.5326 12.9167C23.5326 13.239 23.4066 13.5254 23.1546 13.7761L16.8326 20.0667C16.7126 20.1779 16.5826 20.2612 16.4426 20.3167C16.3026 20.3723 16.1526 20.4001 15.9926 20.4001Z"
              fill="#2E2E2E"
            />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          :class="{ 'rotate-180': isAccordionOpen }"
          viewBox="0 0 24 24"
          fill="none"
          v-else
        >
          <mask
            id="mask0_7699_13501"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_7699_13501)">
            <path
              d="M11.9963 15.3002C11.8763 15.3002 11.7638 15.2794 11.6588 15.2377C11.5538 15.1961 11.4596 15.1336 11.3763 15.0502L6.63481 10.3087C6.44581 10.1197 6.35548 9.90441 6.36381 9.66274C6.37214 9.42108 6.46798 9.20858 6.65131 9.02524C6.83464 8.84191 7.04714 8.75024 7.28881 8.75024C7.53048 8.75024 7.74298 8.84191 7.92631 9.02524L12.0013 13.1252L16.1013 9.02524C16.2846 8.84191 16.4971 8.75441 16.7388 8.76274C16.9805 8.77108 17.193 8.86691 17.3763 9.05024C17.5596 9.23358 17.6513 9.44608 17.6513 9.68774C17.6513 9.92941 17.5568 10.1442 17.3678 10.3322L12.6263 15.0502C12.5363 15.1336 12.4388 15.1961 12.3338 15.2377C12.2288 15.2794 12.1163 15.3002 11.9963 15.3002Z"
              fill="#2E2E2E"
            />
          </g>
        </svg>
      </div>
      <div class="accordion-item-content" v-show="isAccordionOpen">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accordion',
  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isAccordionOpen: this.isOpen,
    };
  },
  methods: {
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
  },
};
</script>
