<template>
    <div id="map-score-chart"></div>
</template>

<script>
import * as d3 from "d3";

import {mapState} from "vuex";

export default {
    name: 'map-score-chart',
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

            // set the dimensions and margins of the graph
            var margin = {top: 20, right: 20, bottom: 20, left: 20},
                width = this.width - margin.left - margin.right,
                height = this.height - margin.top - margin.bottom,
                innerRadius = 0,
                outerRadius = Math.min(width, height) / 2;

            // append the svg object
            var svg = d3.select("#map-score-chart")
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
                .domain([0, 100]);

            // Add the bars
            svg.append("g")
                .selectAll("path")
                .data(this.attributes)
                .enter()
                .append("path")
                .attr("fill", (d) => {return getColor(this.getScoreByAttribute(d))})
                .attr("d", d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius((d) => { return y(this.getScoreByAttribute(d) * 33.33); })
                    .startAngle(function(d, i) { return (i * 2 * Math.PI) / numBars; })
                    .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
                    .padAngle(0.01)
                    .padRadius(innerRadius)
                )

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
                    {"label": 25},
                    {"label": 50},
                    {"label": 75},
                    {"label": 100},
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
                        .style('font', '8px Montserrat')
                        .style("fill",'#7b7b7b')
                        .text(d => d.label)
                        )
                    .call(g => g.insert("rect", "text")
                        .attr("x", "0")
                        .attr("y", d => -y(d.label))
                        .attr("width", d => 18)
                        .attr("height", d => 14)
                        .attr('transform', `translate(-10, -8)`)
                        .style("fill", "white")
                        .style("stroke", "#ccc")
                        .style('stroke-width', 1)
                        .style('rx', 4)
                    )

            //Hovers
            svg.append("g")
                .selectAll("path")
                .data(this.attributes)
                .enter()
                .append("path")
                .on('mouseover', (event, d) => document.querySelector(`#tooltip-${d.id}`).style.opacity = '1')
                .on('mouseout', (event, d) => document.querySelector(`#tooltip-${d.id}`).style.opacity = '0')
                .attr("fill", "transparent")
                .attr("d", d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius((d) => { return y(100); })
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
                    .attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (outerRadius - 20) + ",-35)"; })
                    .style('pointer-events', 'none')
                    .append("foreignObject")
                        .attr("transform", function(d) { return "rotate(" + -1 * ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"})
                        .attr("width", 500)
                        .attr("height", 70)
                        .style('font', '16px Montserrat')
                        .html((d) => { return `
                            <div id="tooltip-${d.id}" class="chart-tooltip">
                                <span class="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-${this.isAttributeChecked(d) && this.getScoreByAttribute(d) ? this.getAttributeColor(Math.round( 10 / 3 * this.getScoreByAttribute(d), 0)) : 'grayy-lighter'}">
                                    ${this.isAttributeChecked(d) && this.getScoreByAttribute(d) ? Math.round( 10 / 3 * this.getScoreByAttribute(d), 0) : '-'}
                                </span>
                                ${d.name}</div>
                        `})
        }
    },
    mounted() {
        this.renderChart()  
    }
}
</script>
<style lang="scss">
    #map-score-chart{
        margin: 5px auto -20px;
        & > svg{
            overflow:visible;
        }
    }
    .chart-tooltip{
        opacity:0;
        pointer-events: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 16px;
        border:1px solid #E5E5E5;
        border-radius: 8px;
        font: 14px Montserrat;
        font-weight: 600;
        .rounded-full{
            margin-right:10px;
            font-size:16px;
            color:white;
        }
    }
</style>