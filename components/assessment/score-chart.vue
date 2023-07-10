<template>
    <div id="score-chart"></div>
</template>

<script>
import * as d3 from "d3";

import {mapState} from "vuex";

export default {
    name: 'assessment-score-chart',
    props: {
        width: {
            default: 460,
            type: Number
        },
        height: {
            default: 460,
            type: Number
        }
    },
    data() {
        return {
            loaded: false,
            colorMapping: [
                '#EE8383', //poor
                '#F5C243', //average
                '#CCCC25', //good
                '#4FAD5B' //excellent
            ]
        }
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            attributes: state => state.attributes.list,
        })
    },
    methods: {
        getScoreByAttribute(attribute){
            if(this.isAttributeChecked(attribute)){
                var answers = this.assessment.surveyAnswers.filter(surveyAnswer => surveyAnswer.question.attribute === attribute.id)
                var sumValues = answers.reduce(function (s, a) {return s + a.choice;}, 0);

                return sumValues / Object.keys(answers).length
            }else{
                return 0
            }
        },
        isAttributeChecked(attribute) {
            return this.assessment.attributes.indexOf(attribute.id) !== -1;
        },
        renderChart(){
            var numBars = this.attributes.length;
            var getColor = (value) => {
                let index = Math.floor(value)
                return this.colorMapping[index];
            }

            function getBB(selection) {
                selection.each(function(d){d.bbox = this.getBBox();})
            }

            // set the dimensions and margins of the graph
            var margin = {top: 20, right: 20, bottom: 20, left: 20},
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom,
                innerRadius = 0,
                outerRadius = Math.min(width, height) / 2;

            // append the svg object
            var svg = d3.select("#score-chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");


            // Scales
            var x = d3.scaleBand()
                .range([0, 2 * Math.PI])
                .domain(this.attributes.map(function(d) { return d.name; }));
            var y = d3.scaleLinear()
                .range([innerRadius, outerRadius])
                .domain([0, 10]);

            // Add the bars
            svg.append("g")
                .selectAll("path")
                .data(this.attributes)
                .enter()
                .append("path")
                .attr("fill", (d) => {return getColor(this.getScoreByAttribute(d))})
                .attr("d", d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius((d) => { return y(this.getScoreByAttribute(d) * 3.33); })
                    .startAngle(function(d, i) { return (i * 2 * Math.PI) / numBars; })
                    .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
                    .padAngle(0.01)
                    .padRadius(innerRadius)
                )

            // Add the labels
            svg.append("g")
                .selectAll("g")
                .data(this.attributes)
                .enter()
                .append("g")
                    .attr("text-anchor", function(d) { return (x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90 > 90 ? "end" : "start"; })
                    .attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (outerRadius + 20) + ",0)"; })
                .append("text")
                    .text(function(d, i){return(d.id + ' ' + d.name)})
                    .attr("transform", function(d) { return "rotate(" + -1 * ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"})
                    .style("font-size", "11px")
                    .style("fill", "#585858")
                    .style('font', '16px Montserrat')
                    .attr("alignment-baseline", "middle")

            //Add radius
            svg.append("g")
                .selectAll("g")
                .data(this.attributes)
                .join('g')
                    .attr('transform', (d,i,arr) => `
                        rotate(${ i * 360/arr.length - 90})
                        translate(${innerRadius},0)
                    `)
                    .call(g => g.append('line')
                        .attr('x1', -5)
                        .attr('x2', outerRadius - innerRadius)
                        .style('stroke', '#ccc')
                        .style('stroke-width', 1)
                    )

            //Add circles
            svg.append("g")
                .attr('text-anchor', 'middle')
                .selectAll("g")
                .data([
                    {"label": "2.5"},
                    {"label": "5.0"},
                    {"label": "7.5"},
                    {"label": "10.0"},
                ])
                .join('g')
                    .attr('fill', 'none')
                    .style('stroke', 'none')
                    .call(g => g.append('circle')
                        .style('stroke', '#ccc')
                        .style('stroke-opacity', 1)
                        .style('stroke-width', 1)
                        .attr('r', d => y(d.label))
                    )
                    .call(g => g.append('text')
                        .attr('y', d => -y(d.label))
                        .attr('dy', '0.35em')
                        .style('font', '14px Montserrat')
                        .style("fill",'#7b7b7b')
                        .text(d => d.label)
                        .call(getBB)
                        )
                    .call(g => g.insert("rect", "text")
                        .attr("x", "0")
                        .attr("y", d => -y(d.label))
                        .attr("width", d => d.bbox.width + 8)
                        .attr("height", d => d.bbox.height + 4)
                        .attr('transform', function(d) {
                            return `translate(-${d.bbox.width * 0.5 + 4}, -${d.bbox.height * 0.5 + 3})`
                        })
                        .style("fill", "white")
                        .style("stroke", "#ccc")
                        .style('stroke-width', 1)
                        .style('rx', 4)
                    )
        }
    },
    mounted() {
        this.renderChart()  
    }
}
</script>
<style>
    #score-chart{
        padding:20px 0 75px;
    }
    #score-chart svg{
        margin: auto;
        overflow: visible;
    }
</style>
