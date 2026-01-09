<template>
  <div>
    <div class="w-[0px] h-[0px] overflow-hidden">
      <div id="scores-page">
        <div class="content-report">
          <div class="scores-container" id="scores-target">
            <div
              class="score-item"
              v-for="attribute in attributesScores"
              :key="attribute.id"
            >
              <div class="score-item-title">
                <div
                  class="score-item-score"
                  :class="
                    attribute.score !== 0
                      ? 'bg-' + getAttributeColor(attribute.score.toFixed(0))
                      : 'bg-grayy-lighter'
                  "
                >
                  {{ attribute.score !== 0 ? attribute.score.toFixed(0) : '-' }}
                </div>
                <h3>{{ attribute.name }}</h3>
              </div>
              <div class="score-item-content">
                <div class="score-item-description">
                  {{ attribute.shortDescription }}
                </div>
                <div class="score-item-answers">
                  <div
                    class="score-item-answer"
                    v-for="question in questions.filter(
                      (q) => q.attribute == attribute.id,
                    )"
                    :key="question.id"
                  >
                    <div class="score-item-answer-title">
                      {{ question.text }}
                    </div>
                    <!-- <div class="score-item-answer-score">{{ getAnswerChoice(attribute.answers, question) }}</div> -->
                    <div
                      :set="
                        currentAnswer = attribute.answers.find(
                          (a) => a.question == question.key,
                        )
                      "
                    >
                      <span
                        :class="
                          currentAnswer
                            ? getAnswerColor(currentAnswer.choice)
                            : 'text-grayy-lighter'
                        "
                      >
                        {{
                          currentAnswer && currentAnswer.choice !== null
                            ? currentAnswer.choice
                            : '-'
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="scores-pages-wrapper">
      <div
        v-for="(page, pageIndex) in pages"
        :key="'page-' + pageIndex"
        class="page page-scores"
        :id="
          pageIndex === 0
            ? 'assessment-report-pages-scores'
            : `assessment-report-pages-scores-${pageIndex}`
        "
      >
        <div class="content">
          <assessment-report-partials-score-aside></assessment-report-partials-score-aside>
          <div class="scores-container py-5">
            <div
              v-for="(item, itemIndex) in page"
              :key="'item-' + itemIndex"
              class="score-item"
              v-html="item.innerHTML"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'assessment-report-pages-scores',
  data() {
    return {
      pages: [],
      contentItems: [],
      attributesScores: [],
      sortedDescriptions: [
        'The qualities of the managed area boundaries',
        'The ability of to enforce regulations',
        'The use different forms of knowledge in decision-making',
        'The operational resources available to manage the MA',
        'The inclusivity and equitability of MA management',
        'Community rights in the MA',
        'The quality of MA regulations',
        'The responsibility of managers to community members',
        'General perceptions of the MA ecological outcomes',
        'General perceptions of MA social outcomes',
      ],
      scoreColors: ['poor', 'average', 'good', 'excellent'],
    };
  },

  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      report: (state) => state.assessments.report,
      attributes: (state) => state.attributes.list,
      questions: (state) => state.surveyquestions.list,
    }),
  },
  async mounted() {
    await this.$store.dispatch('assessments/fetchReport', this.assessment.id);
    // console.log('this.assessment', this.assessment);
    // console.log('this.report', this.report);
    // console.log('this.attributes', this.attributes);
    // console.log('this.questions', this.questions);
    // console.log('this.report', this.report.attributes);

    this.$nextTick(() => {
      this.getAttributesScores();
    });
    // const attributes = this.attributes.map((attribute, index) => {
    //     if(this.assessment.attributes.find(a => a === attribute.id) !== undefined) {
    //         return {
    //             id: attribute.id,
    //             name: attribute.name,
    //             description: attribute.description,
    //             shortDescription: this.sortedDescriptions[index],
    //             score: this.getScoreByAttribute(attribute),
    //             answers: this.getAnswerByAttribute(attribute),
    //         };
    //     }
    // });

    // // console.log('attributes', attributes.filter(a => a !== undefined));
    // // Sort attributes by score descending
    // const sortedAttributes = attributes.filter(a => a !== undefined).slice().sort((a, b) => b.score - a.score);
    // // console.log(sortedAttributes);
    // this.attributesScores = sortedAttributes;
    // this.$nextTick(() => {
    //     this.splitContentIntoPages();
    // });
  },
  methods: {
    getAttributesScores() {
      const attributes = this.attributes.map((attribute, index) => {
        if (
          this.assessment.attributes.find((a) => a === attribute.id) !==
          undefined
        ) {
          return {
            id: attribute.id,
            name: attribute.name,
            description: attribute.description,
            shortDescription: this.sortedDescriptions[index],
            score: this.getScoreByAttribute(attribute),
            answers: this.getAnswerByAttribute(attribute),
          };
        }
      });

      const sortedAttributes = attributes
        .filter((a) => a !== undefined)
        .slice()
        .sort((a, b) => b.score - a.score);
      // console.log(sortedAttributes);
      this.attributesScores = sortedAttributes;

      this.$nextTick(() => {
        this.splitContentIntoPages();
      });

      return sortedAttributes;
    },
    splitContentIntoPages() {
      const PAGE_HEIGHT = 842; // A4 height in pixels
      const CONTENT_PADDING = 40; // 24px top + 24px bottom (from p-6 = 1.5rem = 24px)
      const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - CONTENT_PADDING;

      // Create a temporary container to measure heights
      const tempTarget = document.getElementById('scores-target');
      const elementsContainer = tempTarget.querySelectorAll('.score-item');
      // console.log(elementsContainer);
      const pages = [];
      let currentPage = [];
      let currentHeight = 0;

      for (const element of elementsContainer) {
        const elementHeight = element.offsetHeight;
        const gapHeight = currentPage.length > 0 ? 16 : 0;
        const totalItemHeight = elementHeight + gapHeight;

        if (
          currentHeight + totalItemHeight > MAX_CONTENT_HEIGHT &&
          currentPage.length > 0
        ) {
          // Start a new page
          pages.push([...currentPage]);
          currentPage = [element];
          currentHeight = elementHeight;
        } else {
          // Add to current page
          currentPage.push(element);
          currentHeight += totalItemHeight;
        }
      }

      // Add the last page if it has content
      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      // Clean up temporary container
      tempTarget.innerHTML = '';
      // tempTarget.removeChild(tempContainer);
      // console.log(pages);
      // Update pages
      this.pages = pages;
    },
    getScoreByAttribute(attribute) {
      return (
        this.report.attributes.find((a) => a.attribute === attribute.name)
          ?.score || 0
      );
    },
    getAnswerByAttribute(attribute) {
      return (
        this.report.attributes.find((a) => a.attribute === attribute.name)
          ?.answers || []
      );
    },
    isAttributeChecked(attribute) {
      if (this.assessment.attributes) {
        return this.assessment.attributes.indexOf(attribute.id) !== -1;
      }

      return false;
    },
    getAnswerColor(choice) {
      return choice !== null
        ? 'text-' + this.scoreColors[choice]
        : 'text-grayy-lighter';
    },
  },
};
</script>
