<template>
    <div class="h-full pt-8 static">
        <a
            @click="pdf"
            role="button"
            class="btn btn--border-turqy btn--sm absolute top-0 right-0 mr-8 mt-8 z-10 font-montserratBoldPdf"
            title="Report"
        >
            <img src="~/assets/img/ico-download.png" alt="Download" />
            <span>Download Report</span></a
        >
        <table class="table-score-assessment">
            <thead>
                <tr>
                    <th class="title-col"></th>
                    <th class="title-col">Resource boundaries</th>
                    <th class="title-col">Monitoring and sanctioning</th>
                    <th class="title-col">Capacity for Adaptive Management</th>
                    <th class="title-col">Operational Capacity</th>
                    <th class="title-col">
                        Inclusive and Equitable Management
                    </th>
                    <th class="title-col">
                        Clearly defined rights and decision making
                    </th>
                    <th class="title-col">Clear and Congruent Regulations</th>
                    <th class="title-col">Transparency and Accountability</th>
                    <th class="title-col">Ecological outcomes</th>
                    <th class="title-col">Ecological outcomes</th>
                </tr>
            </thead>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-poor">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-excellent">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-average">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-good">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-poor">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
            <tbody class="">
                <tr>
                    <th colspan="11" class="title-row">
                        <span><h3>Title row</h3></span>
                    </th>
                </tr>
                <tr class="wrapper-row">
                    <td><span class="dot-row bg-average">69</span></td>
                    <td><span class="dot-col bg-excellent">1</span></td>
                    <td><span class="dot-col bg-average">2</span></td>
                    <td><span class="dot-col bg-good">3</span></td>
                    <td><span class="dot-col bg-excellent">4</span></td>
                    <td><span class="dot-col bg-poor">5</span></td>
                    <td><span class="dot-col bg-excellent">6</span></td>
                    <td><span class="dot-col bg-average">7</span></td>
                    <td><span class="dot-col bg-average">8</span></td>
                    <td><span class="dot-col bg-poor">9</span></td>
                    <td><span class="dot-col bg-excellent">10</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { jsPDF } from 'jspdf';
import '../../../assets/fonts/montserrat/Montserrat-Medium-normal.js';
import '../../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js';
import '../../../assets/fonts/montserrat/Montserrat-Bold-bold.js';
export default {
    name: 'score assessment',
    layout: 'report',
    auth: false,
    methods: {
        pdf() {
            var doc = new jsPDF('l', 'px', [1440, 1024]);
            var pdfjs = document.querySelector('#temp-target');
            // Convert HTML to PDF in JavaScript
            doc.html(pdfjs, {
                callback: function (doc) {
                    doc.setFont('Montserrat-Medium', 'normal');
                    doc.setFont('Montserrat-SemiBold', 'normal');
                    doc.setFont('Montserrat-Bold', 'normal');
                    doc.internal.write(0, 'Tw');
                    doc.save('report-score-assessment.pdf');
                },
                x: 0,
                y: 0,
            });
        },
    },
};
</script>
