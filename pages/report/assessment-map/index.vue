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
    <div class="flex flex-col gap-10">
      <div class="keys-card ui-rounded-border">
        <h4 class="title uppercase font-montserratSemiBoldPdf">
          Key governance strengths
        </h4>
        <ul class="list-keys list-keys--xl key-ok">
          <li class="text-medium">Capacity for adaptive management</li>
          <li class="text-medium">
            Clearly defined rights and decision making
          </li>
          <li class="text-medium">Transparency and accountability</li>
        </ul>
        <p class="font-montserratMediumPdf mt-4 text-grayy-lighter">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          recusandae reprehenderit nobis officia sint quisquam, veritatis,
          deserunt odit vero fugit ea repellat explicabo reiciendis molestias
          quasi quidem animi magni qui.
        </p>
      </div>
      <div class="keys-card ui-rounded-border">
        <h4 class="title uppercase font-montserratSemiBoldPdf">
          Key governance needs
        </h4>
        <ul class="list-keys list-keys--xl key-ko">
          <li class="text-medium">
            Resource boundaries need to be clearly defined
          </li>
          <li class="text-medium">Enhance monitoring and sanctioning</li>
        </ul>
        <p class="font-montserratMediumPdf mt-4 text-grayy-lighter">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          recusandae reprehenderit nobis officia sint quisquam, veritatis,
          deserunt odit vero fugit ea repellat explicabo reiciendis molestias
          quasi quidem animi magni qui.
        </p>
      </div>
      <div class="keys-card ui-rounded-border">
        <h4 class="title uppercase font-montserratSemiBoldPdf">Context</h4>
        <p class="font-montserratMediumPdf text-grayy-lighter">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          recusandae reprehenderit nobis officia sint quisquam, veritatis,
          deserunt odit vero fugit ea repellat explicabo reiciendis molestias
          quasi quidem animi magni qui.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { jsPDF } from 'jspdf';
import '../../../assets/fonts/montserrat/Montserrat-Medium-normal.js';
import '../../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js';
import '../../../assets/fonts/montserrat/Montserrat-Bold-bold.js';
export default {
  name: 'score assessment map',
  layout: 'report-assessment',
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
          doc.save('assessment-report.pdf');
        },
        x: 0,
        y: 0,
      });
    },
  },
};
</script>
