<template>
  <div>
    <div class="w-[0px] h-[0px] overflow-hidden">
      <div class="page !max-w-[unset]">
        <div class="content-objectives" id="temp-objectives-target">
          <template v-for="(item, itemIndex) in contentItems">
            <h3
              v-if="item.type === 'heading'"
              :key="'h-' + itemIndex"
              class="item"
            >
              {{ item.content }}
            </h3>
            <div
              v-if="item.type === 'textbox'"
              :key="'tb-' + itemIndex"
              class="text-box item"
            >
              <h4 class="title">{{ item.title }}</h4>
              <div class="text-box-content">
                <div class="text block" v-html="item.content"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div id="objectives-pages-wrapper">
      <div
        v-for="(page, pageIndex) in pages"
        :key="'page-' + pageIndex"
        class="page page-objectives"
        :id="
          pageIndex === 0
            ? 'assessment-report-pages-objectives'
            : `assessment-report-pages-objectives-${pageIndex}`
        "
      >
        <div class="content-objectives">
          <div
            v-for="(item, itemIndex) in page"
            :key="'item-' + itemIndex"
            v-html="item.outerHTML"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'assessment-report-pages-objectives',
  props: ['keys', 'form'],
  data() {
    return {
      pages: [],
      contentItems: [],
      sortedScores: {
        strengths: [],
        needs: [],
      },
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      managementArea: (state) => state.managementareas.instance,
      attributes: (state) => state.attributes.list,
    }),
  },
  mounted() {
    this.getAttributeScores();
    this.$nextTick(() => {
      this.getContent();
    });
  },
  methods: {
    getContent() {
      // console.log('assessment', this.assessment);
      // console.log('managementArea', this.managementArea);
      let content = [
        { type: 'heading', content: 'Background' },
        {
          type: 'textbox',
          title: 'Management Objectives',
          content: this.managementArea.objectives
            ? this.managementArea.objectives
            : 'N/A',
        },
        {
          type: 'textbox',
          title: 'CONTEXT',
          content: this.assessment.context ? this.assessment.context : 'N/A',
        },
        { type: 'heading', content: 'Assessment Results' },
        this.strengthsSummary(),
        this.assessment.strengths_explanation
          ? {
              type: 'textbox',
              title: 'BUILDING AND MAINTAINING STRENGTHS',
              content: this.assessment.strengths_explanation,
            }
          : null,
        this.needsSummary(),
        this.assessment.needs_explanation
          ? {
              type: 'textbox',
              title: 'PLANNING AND BUILDING ON NEEDS',
              content: this.assessment.needs_explanation,
            }
          : null,
      ];

      // this.strengthsSummary();
      // console.log('content', content);
      this.contentItems = content.filter((item) => item !== null);
      this.$nextTick(() => {
        setTimeout(() => {
          this.splitContentIntoPages();
        }, 100);
      });
    },
    strengthsSummary() {
      const strenghts = this.sortedScores.strengths;

      if (strenghts.length > 0) {
        let strengthsSummary = '<ul class="list-keys key-ok">';
        strenghts.forEach((strength) => {
          strengthsSummary += `<li>${strength.name}</li>`;
        });
        strengthsSummary += '</ul>';
        return {
          type: 'textbox',
          title: 'SUMMARY OF STRENGTHS',
          content: strengthsSummary,
        };
      } else {
        return null;
      }
    },
    needsSummary() {
      const needs = this.sortedScores.needs;
      if (needs.length > 0) {
        let needsSummary = '<ul class="list-keys key-ko">';
        needs.forEach((need) => {
          needsSummary += `<li>${need.name}</li>`;
        });
        needsSummary += '</ul>';
        return {
          type: 'textbox',
          title: 'SUMMARY OF NEEDS',
          content: needsSummary,
        };
      } else {
        return null;
      }
    },
    splitContentIntoPages() {
      const PAGE_HEIGHT = 842; // A4 height in pixels
      const CONTENT_PADDING = 48; // 24px top + 24px bottom (from p-6 = 1.5rem = 24px)
      const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - CONTENT_PADDING;

      // Create a temporary container to measure heights
      const tempTarget = document.getElementById('temp-objectives-target');
      const elementsContainer = tempTarget.querySelectorAll('.item');
      // console.log(elementsContainer);
      const pages = [];
      let currentPage = [];
      let currentHeight = 0;

      for (const element of elementsContainer) {
        const elementHeight = element.getBoundingClientRect().height;
        const gapHeight = currentPage.length > 0 ? 16 : 0;
        const totalItemHeight = elementHeight + gapHeight;
        // console.log('elementHeight', elementHeight);
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
      // tempTarget.innerHTML = '';
      // tempTarget.removeChild(tempContainer);
      // console.log(pages);
      // Update pages

      this.pages = pages;
    },
    getAttributeScores() {
      var answers = this.assessment.surveyAnswers;
      var attributes = this.attributes;
      // Calculate the sums and group data (while tracking count)
      const groupedAnswers = answers
        .filter((answer) => answer.choice !== null)
        .reduce(function (acc, a) {
          if (!acc[a.question.attribute]) {
            var name = attributes.find((obj) => {
              return obj.id == a.question.attribute;
            }).name;
            acc[a.question.attribute] = {
              name: name,
              sum: a.choice,
              count: 1,
            };
            return acc;
          }
          acc[a.question.attribute].sum += a.choice;
          acc[a.question.attribute].count += 1;
          return acc;
        }, {});
      // Create new array from grouped data and compute the average
      const result = Object.keys(groupedAnswers).map(function (k) {
        const item = groupedAnswers[k];
        const score = ((10 / 3) * item.sum) / item.count;
        return {
          name: item.name,
          score: score.toFixed(0),
        };
      });
      const sortedScores = result.sort((a, b) => {
        return b.score - a.score;
      });

      let scores = {
        strengths: [],
        needs: [],
      };
      sortedScores.forEach((score) => {
        if (score.score > 5) {
          scores.strengths.push(score);
        } else {
          scores.needs.push(score);
        }
      });
      this.sortedScores = scores;
      // console.log('sortedScores', this.sortedScores);
      // console.log('scores', scores/sortedScores.length);

      // console.log('final scores', scores);
    },
  },
};
</script>
