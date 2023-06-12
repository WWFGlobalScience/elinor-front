<template>
    <div class="popup__content">
        <form class="grid grid-cols-3 md:grid-cols-1 gap-x-4 gap-y-8 ">
            <div class="col-span-2 md:col-span-full">
                <div class="uppercase keys-card text-sm ui-rounded-border">
                    <h4 class="title">Key governance strenghts</h4>
                    <ul class="list-keys key-ok">
                        <li v-for="key in sortedScores.slice(0, 3)">
                            {{ key.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div action="" class="col-span-full grid gap-y-8">
                <div class="grid grid-cols-3 md:grid-cols-1 gap-4">
                    <div class="col-span-2 md:col-span-full">
                        <div class="input input--pr">
                            <div class="label">
                                Explain Main Strenghts
                            </div>
                            <textarea
                                name="collection_method_text"
                                placeholder=""
                                v-model="form.strenghts"
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            <!--Lorem Ipsum dolor sid amet consectetur adipiscing-->
                        </p>
                    </div>
                </div>
            </div>
            <hr class="col-span-full" />
            <div class="col-span-2 md:col-span-full">
                <div class="uppercase keys-card text-sm ui-rounded-border">
                    <h4 class="title">Key governance needs</h4>
                    <ul class="list-keys key-ko">
                        <li v-for="key in sortedScores.length > 3 ? sortedScores.slice(3).slice(-3) : []">
                            {{ key.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div action="" class="col-span-full grid gap-y-8">
                <div class="grid grid-cols-3 md:grid-cols-1 gap-4">
                    <div class="col-span-2 md:col-span-full">
                        <div class="input input--pr">
                            <div class="label">
                                Explain Main Needs
                            </div>
                            <textarea
                                name="collection_method_text"
                                placeholder=""
                                v-model="form.needs"
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            <!--Lorem Ipsum dolor sid amet consectetur adipiscing-->
                        </p>
                    </div>
                </div>
            </div>

            <hr class="col-span-full" />
            <div action="" class="col-span-full grid gap-y-8">
                <div class="grid grid-cols-3 md:grid-cols-1 gap-4">
                    <div class="col-span-2 md:col-span-full">
                        <div class="input input--pr">
                            <div class="label">
                                Context
                            </div>
                            <textarea
                                name="collection_method_text"
                                placeholder=""
                                v-model="form.context"
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            <!--Lorem Ipsum dolor sid amet consectetur adipiscing-->
                        </p>
                    </div>
                </div>
            </div>
            <div class="btn-row">
                <button type="button"
                    @click="pdf"
                    class="btn--border-turqy btn--opacity--child">
                    <svg>
                        <path
                            d="M8.75 8.75h5M8.75 11.25h5M16.25 3.125H3.75a.625.625 0 0 0-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 0 0-.625-.625ZM6.25 3.125v13.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span class="btn--opacity__target">Generate</span>
                </button>
                <div style="clear: both"></div>
            </div>
        </form>
        <div class="report-wrap">
            <report-assessment :keys="sortedScores" :form="form"></report-assessment>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { jsPDF } from "jspdf";


export default {
    name: "popup-assessment-generate-report",
    data() {
        return {
            sortedScores: [],
            form: {
                strenghts: '',
                needs: '',
                context: '',
            }
        };
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            attributes: state => state.attributes,
            popup: state => state.popup.popup
        })
    },
    mounted() {
        this.$store.dispatch( 'assessments/fetchReport', this.assessment.id )

        this.$nextTick(() => {
            this.getAttributeScores();
        });
    },
    methods: {
        ...mapActions({
            popupState: "popup/popupState"
        }),
        close() {
            this.popupState({ active: false });
        },
        getAttributeScores(){
            var answers = this.assessment.surveyAnswers;
            var attributes = this.attributes.list;
            // Calculate the sums and group data (while tracking count)
            const groupedAnswers = answers.reduce(function(acc, a){
                if(!acc[a.question.attribute]){
                    var name = attributes.find(obj => {return obj.id == a.question.attribute }).name;
                    acc[a.question.attribute] = {
                        name: name,
                        sum: a.choice,
                        count: 1
                    };
                    return acc;
                }
                acc[a.question.attribute].sum += a.choice;
                acc[a.question.attribute].count += 1;
                return acc;
            },{});
            
            // Create new array from grouped data and compute the average
            const result = Object.keys(groupedAnswers).map(function(k){
                const item  = groupedAnswers[k];
                return {
                    name: item.name,
                    score: 10 / 3 * item.sum/item.count,
                }
            })
            this.sortedScores = result.sort((a, b)=> {return b.score - a.score});
        },
        pdf() {
            var doc = new jsPDF("l", "px", [1440, 1024]);
            doc.html(document.querySelector("#key-governances"), {
                callback: function (doc) {
                    doc.setFont("Montserrat-Medium", "normal");
                    doc.setFont("Montserrat-SemiBold", "normal");
                    doc.setFont("Montserrat-Bold", "normal");
                    doc.internal.write(0, "Tw");

                    doc.addPage([1440, 1024],"l");
                    doc.html(document.querySelector("#total-scores"), {
                        callback: function(doc) {
                            doc.internal.write(0, "Tw");
                            doc.save("report-score-assessment.pdf");
                        },
                        x: 0,
                        y: 1024,
                    });
                },
                x: 0,
                y: 0,
            });
            this.close()
        }
    }
};
</script>