<template>
    <div class="popup__content">
        <form class="grid grid-cols-3 md:grid-cols-1 gap-x-4 gap-y-8 ">
            <div class="col-span-2 md:col-span-full">
                <div class="uppercase keys-card text-sm ui-rounded-border">
                    <h4 class="title">Key governance strenghts</h4>
                    <ul class="list-keys key-ok">
                        <li>Capacity for adaptive management</li>
                        <li>Clearly defined rights and decision making</li>
                        <li>Transparency and accountability</li>
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
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            Lorem Ipsum dolor sid amet consectetur adipiscing
                        </p>
                    </div>
                </div>
            </div>
            <hr class="col-span-full" />
            <div class="col-span-2 md:col-span-full">
                <div class="uppercase keys-card text-sm ui-rounded-border">
                    <h4 class="title">Key governance needs</h4>
                    <ul class="list-keys key-ko">
                        <li>Resource boundaries need to be clearly defined</li>
                        <li>Enhance monitoring and sanctioning</li>
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
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            Lorem Ipsum dolor sid amet consectetur adipiscing
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
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-span-1">
                        <p class="text-xs text-grayy-lighter pt-8">
                            Lorem Ipsum dolor sid amet consectetur adipiscing
                        </p>
                    </div>
                </div>
            </div>
            <div class="btn-row">
                <button
                    type="button"
                    @click="close"
                    class="btn--border-turqy btn--opacity--child"
                >
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
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "popup-assessment-generate-report",
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment,
            popup: state => state.popup.popup
        })
    },
    methods: {
        ...mapActions({
            popupState: "popup/popupState"
        }),

        close() {
            this.popupState({ active: false });
        }
    }
};
</script>
