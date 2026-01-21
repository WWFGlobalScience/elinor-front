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
    <div
      class="report-text grid grid-cols-1 gap-6 ml-16 font-montserratMediumPdf"
    >
      <p>
        WWF has been working with partners including,
        <strong
          >[Name of community, Government organization, Non-government
          organization, Partner]</strong
        >
        to support the management of <strong>PA/OECM Name</strong> since
        <strong
          >2012 - [YEAR WWF STARTED WORKING WITH PARTNERS AT THIS
          PA/OECM].</strong
        >
      </p>
      <p>
        The <strong>[PA/OECM NAME]</strong> was established in
        <strong>[YEAR ESTABLISHED]</strong> and is currently managed to achieve
        several social and ecological objectives, including
        <strong>
          objectives, including [INSERT 2-3 MANAGEMENT GOALS OR OBJECTIVES]
          objectives, including </strong
        >.
      </p>
      <p>
        The <strong>[PA/OECM]</strong> helps to support WWF’s global
        biodiversity conservation objectives by contributing to the protection
        of
        <strong
          >[INSERT 1-2 SPECIES/HABITATS/ECOSYSTEM SERVICES PROTECTED]</strong
        >, and supporting sustainable local livelihoods and the wellbeing of
        local communities through a range of activities, including
        <strong>
          [INSERT 1-2 SOCIAL PROGRAMS/ACTIVITIES LIKE CAPACITY
          BUILDING/ALTERNATIVE LIVELIHOODS]
        </strong>
        with support from <strong>[DONOR]</strong>
      </p>
    </div>
  </div>
</template>
<script>
import { jsPDF } from 'jspdf';
import '../../../assets/fonts/montserrat/Montserrat-Medium-normal.js';
import '../../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js';
import '../../../assets/fonts/montserrat/Montserrat-Bold-bold.js';
export default {
  name: 'qualitative 02',
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
          doc.save('report-qualitative-data-01.pdf');
        },
        x: 0,
        y: 0,
      });
    },
  },
};
</script>
