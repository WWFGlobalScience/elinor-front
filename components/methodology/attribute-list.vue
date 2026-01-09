<template>
  <tbody class="w-full" :class="{ 'bg-[#F9F9F9]': isQuestionListVisible }">
    <tr>
      <td>
        <p>{{ index + 1 }}.</p>
      </td>
      <td>
        <p class="font-bold">{{ attribute.name }}</p>
      </td>
      <td>
        <p>{{ attribute.description }}</p>
      </td>
      <td>
        <p>{{ $t('pages.background.attribute_use.' + (index + 1)) }}</p>
      </td>
      <td>
        <button
          class="btn btn--secondary question-list-btn mx-auto"
          @click="toggleQuestionList"
          :class="{ active: isQuestionListVisible }"
        >
          <span class="mr-2"
            >{{ getAttributeQuestions(attribute).length }}
            {{ $t('pages.background.questions') }}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            :class="{ 'rotate-180': isQuestionListVisible }"
          >
            <mask
              id="mask0_7699_8405"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_7699_8405)">
              <path
                d="M11.9951 15.3C11.8751 15.3 11.7626 15.2792 11.6576 15.2375C11.5526 15.1958 11.4584 15.1333 11.3751 15.05L6.63359 10.3085C6.44459 10.1195 6.35426 9.90417 6.36259 9.6625C6.37092 9.42083 6.46676 9.20833 6.65009 9.025C6.83342 8.84167 7.04592 8.75 7.28759 8.75C7.52926 8.75 7.74176 8.84167 7.92509 9.025L12.0001 13.125L16.1001 9.025C16.2834 8.84167 16.4959 8.75417 16.7376 8.7625C16.9793 8.77083 17.1918 8.86667 17.3751 9.05C17.5584 9.23333 17.6501 9.44583 17.6501 9.6875C17.6501 9.92917 17.5556 10.144 17.3666 10.332L12.6251 15.05C12.5351 15.1333 12.4376 15.1958 12.3326 15.2375C12.2276 15.2792 12.1151 15.3 11.9951 15.3Z"
                fill="#43A0BD"
              />
            </g>
          </svg>
        </button>
      </td>
    </tr>
    <tr class="bg-[#E4F0F4] question-list" v-show="isQuestionListVisible">
      <td colspan="2"></td>
      <td colspan="3" class="!pt-4">
        <p class="font-semibold">{{ $t('pages.background.questions') }}</p>
        <div class="flex flex-col gap-2 mt-3">
          <p v-for="(question, index) in getAttributeQuestions(attribute)">
            {{ index + 1 }}. {{ question.text }}
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'attribute-list',
  props: {
    attribute: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isQuestionListVisible: false,
    };
  },
  computed: {
    ...mapState({
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
    }),
  },
  watch: {
    expandAll(newValue) {
      this.isQuestionListVisible = newValue;
      this.$emit('update-expand-state', this.index, newValue);
    },
  },
  methods: {
    getAttributeQuestions(attribute) {
      return this.questions.filter(
        (question) => question.attribute === attribute.id,
      );
    },
    toggleQuestionList() {
      this.isQuestionListVisible = !this.isQuestionListVisible;
      this.$emit('update-expand-state', this.index, this.isQuestionListVisible);
    },
  },
};
</script>
