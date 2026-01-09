<template>
  <div class="score-chart-wrapper">
    <div id="score-chart-publish"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'assessment-score-chart',
  props: {
    width: {
      default: 460,
      type: Number,
    },
    height: {
      default: 460,
      type: Number,
    },
  },
  data() {
    return {
      loaded: false,
      colorMapping: [
        '#EE8383', //poor
        '#F5C243', //average
        '#CCCC25', //good
        '#4FAD5B', //excellent
      ],
    };
  },
  computed: {
    ...mapState({
      assessment: (state) => state.assessments.assessment,
      attributes: (state) => state.attributes.list,
    }),
  },
  watch: {
    assessment: {
      handler(newVal) {
        if (this.canRenderChart()) {
          this.renderChart();
        }
      },
      deep: true,
    },
    attributes: {
      handler(newVal) {
        if (this.canRenderChart()) {
          this.renderChart();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      fetchAssessment: 'assessments/fetchAssessment',
    }),
    canRenderChart() {
      return (
        this.assessment &&
        this.assessment.attributes &&
        this.assessment.attributes.length > 0 &&
        this.attributes &&
        this.attributes.length > 0
      );
    },
    getScoreByAttribute(attribute) {
      if (this.isAttributeChecked(attribute)) {
        var answers = this.assessment.surveyAnswers.filter(
          (surveyAnswer) => surveyAnswer.question.attribute === attribute.id,
        );
        var sumValues = answers.reduce(function (s, a) {
          return s + a.choice;
        }, 0);

        return sumValues / Object.keys(answers).length;
      } else {
        return 0;
      }
    },
    isAttributeChecked(attribute) {
      return this.assessment.attributes.indexOf(attribute.id) !== -1;
    },
    renderChart() {
      var numBars = this.attributes.length;
      d3.select('#score-chart-publish').html('');

      // console.log('attributes', this.attributes);
      var getColor = (value) => {
        let index = Math.floor(value);
        return this.colorMapping[index];
      };

      function getBB(selection) {
        selection.each(function (d) {
          d.bbox = this.getBBox();
        });
      }

      // set the dimensions and margins of the graph
      var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = this.width - margin.left - margin.right,
        height = this.height - margin.top - margin.bottom,
        innerRadius = 0,
        outerRadius = Math.min(width, height) / 2;

      // append the svg object
      var svg = d3
        .select('#score-chart-publish')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr(
          'transform',
          'translate(' +
            (width / 2 + margin.left) +
            ',' +
            (height / 2 + margin.top) +
            ')',
        );

      // Scales
      var x = d3
        .scaleBand()
        .range([0, 2 * Math.PI])
        .domain(
          this.attributes.map(function (d) {
            return d.name;
          }),
        );
      var y = d3
        .scaleLinear()
        .range([innerRadius, outerRadius])
        .domain([0, 10]);

      // Add the bars
      svg
        .append('g')
        .selectAll('path')
        .data(this.attributes)
        .enter()
        .append('path')
        .attr('fill', (d) => {
          return getColor(this.getScoreByAttribute(d));
        })
        .attr(
          'd',
          d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius((d) => {
              return y(this.getScoreByAttribute(d) * 3.33);
            })
            .startAngle(function (d, i) {
              return (i * 2 * Math.PI) / numBars;
            })
            .endAngle(function (d, i) {
              return ((i + 1) * 2 * Math.PI) / numBars;
            })
            .padAngle(0.01)
            .padRadius(innerRadius),
        );

      // Add the labels
      svg
        .append('g')
        .selectAll('g')
        .data(this.attributes)
        .enter()
        .append('g')
        .attr('text-anchor', function (d) {
          return ((x(d.name) + x.bandwidth() / 2) * 180) / Math.PI - 90 > 90
            ? 'end'
            : 'start';
        })
        .attr('transform', function (d) {
          return (
            'rotate(' +
            (((x(d.name) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
            ')' +
            'translate(' +
            (outerRadius + 20) +
            ',0)'
          );
        })
        .append('text')
        .text(function (d, i) {
          return d.id + ' ' + d.name;
        })
        .attr('transform', function (d) {
          return (
            'rotate(' +
            -1 * (((x(d.name) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
            ')'
          );
        })
        .style('font-size', '11px')
        .style('fill', '#585858')
        .style('font', '14px Montserrat')
        .attr('alignment-baseline', 'middle');

      //Add radius
      svg
        .append('g')
        .selectAll('g')
        .data(this.attributes)
        .join('g')
        .attr(
          'transform',
          (d, i, arr) => `
                        rotate(${(i * 360) / arr.length - 90})
                        translate(${innerRadius},0)
                    `,
        )
        .call((g) =>
          g
            .append('line')
            .attr('x1', -5)
            .attr('x2', outerRadius - innerRadius)
            .style('stroke', '#ccc')
            .style('stroke-width', 1),
        );

      //Add circles
      svg
        .append('g')
        .attr('text-anchor', 'middle')
        .selectAll('g')
        .data([
          { label: '2.5' },
          { label: '5.0' },
          { label: '7.5' },
          { label: '10.0' },
        ])
        .join('g')
        .attr('fill', 'none')
        .style('stroke', 'none')
        .call((g) =>
          g
            .append('circle')
            .style('stroke', '#ccc')
            .style('stroke-opacity', 1)
            .style('stroke-width', 1)
            .attr('r', (d) => y(d.label)),
        )
        .call((g) =>
          g
            .append('text')
            .attr('y', (d) => -y(d.label))
            .attr('dy', '0.35em')
            .style('font', '14px Montserrat')
            .style('fill', '#7b7b7b')
            .text((d) => d.label)
            .call(getBB),
        )
        .call((g) =>
          g
            .insert('rect', 'text')
            .attr('x', '0')
            .attr('y', (d) => -y(d.label))
            .attr('width', (d) => d.bbox.width + 8)
            .attr('height', (d) => d.bbox.height + 4)
            .attr('transform', function (d) {
              return `translate(-${d.bbox.width * 0.5 + 4}, -${d.bbox.height * 0.5 + 3})`;
            })
            .style('fill', 'white')
            .style('stroke', '#ccc')
            .style('stroke-width', 1)
            .style('rx', 4),
        );
    },
  },
  async mounted() {
    if (this.canRenderChart()) {
      this.renderChart();
    } else {
      // Fetch assessment if not loaded yet - watchers will trigger renderChart when data arrives
      await this.fetchAssessment(this.$route.params.assessment);
      // After fetch completes, check again and render if possible
      if (this.canRenderChart()) {
        this.renderChart();
      }
    }
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/core/variables';

.score-chart-wrapper {
  // Make horizontally scrollable on mobile, tablet, and up to desktop (below desktop-xl breakpoint)
  @media (max-width: $desktop-xl-breakpoint) {
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    width: calc(
      100% + 32px
    ); // Extend beyond container to account for section padding
    margin-left: -16px; // Offset section padding (16px on each side)
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
    // Prevent clipping of content
    max-width: none !important;
    min-width: 0; // Allow wrapper to shrink, but content inside will expand
    // Ensure content can overflow horizontally
    position: relative;
    // Prevent any parent constraints
    box-sizing: border-box;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #dadada;
      border-radius: 2px;
    }
  }
}

#score-chart-publish {
  padding: 55px 42px;

  // Ensure chart maintains minimum width on mobile, tablet, and up to desktop (below desktop-xl breakpoint) for scrolling
  // Chart default width is 460px (from props) + left/right padding (250px * 2) = 960px minimum
  // Labels extend beyond the chart circle, so we add generous padding (250px each side)
  @media (max-width: $desktop-xl-breakpoint) {
    padding-left: 150px !important;
    padding-right: 150px !important;
    min-width: 760px !important; // Chart width (460px) + padding (250px * 2) = 960px minimum
    width: max-content !important; // Allow content to determine width, override any constraints
    display: inline-block !important; // Prevent width constraints
    box-sizing: content-box !important; // Ensure padding is included in width calculation
    // Prevent any clipping
    overflow: visible !important;
    // Ensure content is not constrained
    max-width: none !important;
  }
}

#score-chart-publish svg {
  margin: auto;
  overflow: visible;
  // Ensure SVG is not clipped
  @media (max-width: $desktop-xl-breakpoint) {
    display: block;
    max-width: none;
  }
}
</style>
