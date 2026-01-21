<template>
  <div class="score-chart-wrapper">
    <!-- <div class="export-button-wrapper">
            <button @click="exportToImage" class="btn-export-chart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export as Image
            </button>
        </div> -->
    <div id="score-chart-report"></div>
    <!-- <img :src="scoreChartImage" alt="Score Chart" class="score-chart-image" /> -->
  </div>
</template>

<script>
import * as d3 from 'd3';

import { mapState } from 'vuex';

export default {
  name: 'assessment-report-partials-score-chart',
  props: {
    width: {
      default: 392,
      type: Number,
    },
    height: {
      default: 220,
      type: Number,
    },
  },
  data() {
    return {
      loaded: false,
      scoreChartImage: null,
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
    'assessment.surveyAnswers': {
      handler(newVal) {
        // console.log('newVal', newVal);
        if (newVal) {
          this.$nextTick(() => {
            this.renderChart();
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    async exportToImage() {
      // Wait for all fonts to be loaded
      await document.fonts.ready;

      const svgElement = document.querySelector('#score-chart-report svg');
      if (!svgElement) {
        console.error('SVG element not found');
        return;
      }

      // Clone the SVG to avoid modifying the original
      const clonedSvg = svgElement.cloneNode(true);

      // Get SVG dimensions
      const width = parseFloat(svgElement.getAttribute('width'));
      const height = parseFloat(svgElement.getAttribute('height'));

      // Get computed styles from the original SVG and apply them inline
      const allTextElements = svgElement.querySelectorAll('text, tspan');
      const clonedTextElements = clonedSvg.querySelectorAll('text, tspan');

      allTextElements.forEach((textEl, index) => {
        // Safety check: ensure textEl exists before accessing computed styles
        if (!textEl) {
          return;
        }

        const computedStyle = window.getComputedStyle(textEl);
        const clonedEl = clonedTextElements[index];

        // Safety check: ensure computedStyle exists
        if (!computedStyle || !clonedEl) {
          return;
        }

        // Copy all relevant font properties from computed styles
        const fontFamily = computedStyle.fontFamily || 'sans-serif';
        const fontSize = computedStyle.fontSize || '14px';
        const fontWeight = computedStyle.fontWeight || 'normal';
        const fontStyle = computedStyle.fontStyle || 'normal';
        const fill =
          computedStyle.fill ||
          textEl.getAttribute('fill') ||
          computedStyle.color ||
          '#000000';

        let styleStr = clonedEl.getAttribute('style') || '';

        // Remove existing font declarations to avoid conflicts
        styleStr = styleStr.replace(/font-family:[^;]+;?/gi, '');
        styleStr = styleStr.replace(/font-size:[^;]+;?/gi, '');
        styleStr = styleStr.replace(/font-weight:[^;]+;?/gi, '');
        styleStr = styleStr.replace(/font-style:[^;]+;?/gi, '');
        styleStr = styleStr.replace(/fill:[^;]+;?/gi, '');
        console.log('fontFamily', fontFamily);
        // Add computed styles
        styleStr += `font-family: ${fontFamily}, sans-serif; font-size: ${fontSize}; font-weight: normal; font-style: ${fontStyle}; fill: ${fill};`;

        clonedEl.setAttribute('style', styleStr);
      });

      // Serialize the SVG
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(clonedSvg);

      // Ensure proper XML namespace
      if (!svgString.includes('xmlns')) {
        svgString = svgString.replace(
          '<svg',
          '<svg xmlns="http://www.w3.org/2000/svg"',
        );
      }

      // Create a Blob from the SVG string
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = URL.createObjectURL(svgBlob);

      // Create an image element
      const img = new Image();

      img.onload = () => {
        // Additional delay to ensure proper rendering
        setTimeout(() => {
          // Create a canvas
          const canvas = document.createElement('canvas');
          canvas.width = width * 2; // 2x for better quality
          canvas.height = height * 2;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white'; // Set white background
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert canvas to PNG
          canvas.toBlob((blob) => {
            this.scoreChartImage = URL.createObjectURL(blob);
            // Clean up
            URL.revokeObjectURL(url);
          }, 'image/png');
        }, 200); // Slightly longer delay for better font rendering
      };

      img.onerror = (error) => {
        console.error('Error loading SVG:', error);
      };

      img.src = url;
    },
    getScoreByAttribute(attribute) {
      if (this.isAttributeChecked(attribute)) {
        var answers = this.assessment.surveyAnswers.filter(
          (surveyAnswer) => surveyAnswer.question.attribute === attribute.id,
        );
        var sumValues = answers.reduce(function (s, a) {
          return s + a.choice;
        }, 0);

        // console.log('sumValues', sumValues);
        // console.log('Object.keys(answers)', Object.keys(answers));

        return sumValues / Object.keys(answers).length;
      } else {
        return 0;
      }
    },
    isAttributeChecked(attribute) {
      return this.assessment.attributes.indexOf(attribute.id) !== -1;
    },
    renderChart() {
      // Clear previous chart
      d3.select('#score-chart-report').html('');

      var numBars = this.attributes.length;
      var getColor = (value) => {
        let index = Math.floor(value);
        return this.colorMapping[index];
      };

      function getBB(selection) {
        selection.each(function (d) {
          d.bbox = this.getBBox();
        });
      }

      // Function to wrap text into multiple lines
      function wrapText(text, maxWidth) {
        text.each(function () {
          const textElement = d3.select(this);
          const words = textElement.text().split(/\s+/);
          const lineHeight = 1.1; // ems
          const y = textElement.attr('y') || 0;
          const dy = 0;

          let line = [];
          let lineNumber = 0;
          let tspan = textElement
            .text(null)
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', dy + 'em');

          words.forEach((word, i) => {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > maxWidth) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = textElement
                .append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                .text(word);
            }
          });
        });
      }

      // set the dimensions and margins of the graph
      var margin = { top: 30, right: 30, bottom: 30, left: 30 },
        width = this.width - margin.left - margin.right,
        height = this.height - margin.top - margin.bottom,
        innerRadius = 0,
        outerRadius = Math.min(width, height) / 2;

      // append the svg object
      var svg = d3
        .select('#score-chart-report')
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
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
        .style('font-size', '7px')
        .style('fill', '#585858')
        .style('font', '7px Montserrat, sans-serif')
        .attr('alignment-baseline', 'middle')
        .call(wrapText, 100);

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
            .style('font', '9px Montserrat, sans-serif')
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
  mounted() {
    this.renderChart();
    // this.$nextTick(() => {
    //     this.exportToImage();
    // });
  },
};
</script>
<style>
@font-face {
  font-family: 'Montserrat';
  src: url('~/assets/fonts/montserrat/Montserrat-Regular.ttf')
    format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('~/assets/fonts/montserrat/Montserrat-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('~/assets/fonts/montserrat/Montserrat-SemiBold.ttf')
    format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('~/assets/fonts/montserrat/Montserrat-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.score-chart-wrapper {
  position: relative;
}

.export-button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.btn-export-chart {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #4fad5b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.2s ease;
}

.btn-export-chart:hover {
  background-color: #3d8a47;
}

.btn-export-chart:active {
  background-color: #2f6a37;
}

.btn-export-chart svg {
  flex-shrink: 0;
}

#score-chart-report svg {
  margin: auto;
  overflow: visible;
}
</style>
