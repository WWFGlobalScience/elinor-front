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
        <div class="grid grid-cols-2 gap-12">
            <div class="col-span-1 grid gap-12 self-start ml-16">
                <h2 class="font-montserratBoldPdf text-[16px]">
                    Year of PA establishmnet:
                    <span class="font-montserratMediumPdf text-[20px]"
                        >2016</span
                    >
                </h2>
                <div class="keys-card ui-rounded-border">
                    <h4 class="title font-montserratSemiBoldPdf">
                        Social and ecological objectives
                    </h4>
                    <p class="font-montserratMediumPdf text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Modi recusandae reprehenderit nobis officia sint
                        quisquam, veritatis, deserunt odit vero fugit ea
                        repellat explicabo reiciendis molestias quasi quidem
                        animi magni qui.
                    </p>
                </div>
                <div class="keys-card ui-rounded-border">
                    <h4 class="title font-montserratSemiBoldPdf">
                        Protected biodiversity
                    </h4>
                    <p class="font-montserratMediumPdf text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Modi recusandae reprehenderit nobis officia sint
                        quisquam, veritatis, deserunt odit vero fugit ea
                        repellat explicabo reiciendis molestias quasi quidem
                        animi magni qui.
                    </p>
                </div>
                <div class="keys-card ui-rounded-border">
                    <h4 class="title font-montserratSemiBoldPdf">
                        Activities and social programs
                    </h4>
                    <p class="font-montserratMediumPdf text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Modi recusandae reprehenderit nobis officia sint
                        quisquam, veritatis, deserunt odit vero fugit ea
                        repellat explicabo reiciendis molestias quasi quidem
                        animi magni qui.
                    </p>
                </div>
            </div>
            <div class="col-span-1 grid gap-12 self-start">
                <h2 class="font-montserratBoldPdf text-[16px]">
                    Year we start working with partners:
                    <span class="font-montserratMediumPdf text-[20px]"
                        >2016</span
                    >
                </h2>
                <div class="keys-card ui-rounded-border">
                    <h4 class="title font-montserratSemiBoldPdf">
                        Partners
                    </h4>
                    <ul class="list-keys">
                        <li>Resource boundaries need to be clearly defined</li>
                        <li>Enhance monitoring and sanctioning</li>
                    </ul>
                </div>
                <div class="keys-card ui-rounded-border">
                    <h4 class="title font-montserratSemiBoldPdf">
                        Donors
                    </h4>
                    <ul class="list-keys">
                        <li>Resource boundaries need to be clearly defined</li>
                        <li>Enhance monitoring and sanctioning</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { jsPDF } from "jspdf";
import "../../../assets/fonts/montserrat/Montserrat-Medium-normal.js";
import "../../../assets/fonts/montserrat/Montserrat-SemiBold-bold.js";
import "../../../assets/fonts/montserrat/Montserrat-Bold-bold.js";
export default {
    name: "qualitative 01",
    layout: "report",
    auth: false,
    methods: {
        pdf() {
            var doc = new jsPDF("l", "px", [1440, 1024]);
            var pdfjs = document.querySelector("#temp-target");
            // Convert HTML to PDF in JavaScript
            doc.html(pdfjs, {
                callback: function(doc) {
                    doc.setFont("Montserrat-Medium", "normal");
                    doc.setFont("Montserrat-SemiBold", "normal");
                    doc.setFont("Montserrat-Bold", "normal");
                    doc.internal.write(0, "Tw");
                    doc.save("report-score-assessment.pdf");
                },
                x: 0,
                y: 0
            });
        }
    }
};
</script>
