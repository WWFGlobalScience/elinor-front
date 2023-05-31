<template>
    <header class="header--page">
        <div class="container flex justify-start gap-8 items-start">
            <div v-if="assessment && assessment.score" class="flex gap-2 flex-col items-center">
                <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                    :class="'bg-' + getAssessmentColor(assessment.score)">
                    <span class="text-white text-[40px] font-semibold">
                        {{ assessment.score }}
                    </span>
                </div>
                <span class="uppercase text-grayy-lighter font-bold text-[12px]">out of 100</span>
            </div>
            <div class="text flex-1">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg" />
                    <span>{{ $t("pages.assessments.edit.title") }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">
                    {{ $t("pages.assessments.edit.year") }}
                    {{ assessment.year }}
                </p>
                <assessment-actions type="edit" />
            </div>
            <div class="header__save" style="justify-items: flex-start">
                <assessment-status class="mb-7"></assessment-status>
                <template v-if="assessment.status !== 10">
                    <button
                        type="submit"
                        form="form--assessment-edit"
                        class="btn btn--opacity--child">
                        <span class="btn--opacity__target">{{
                            $t("pages.assessments.edit.saveButton")
                        }}</span>
                        <img src="~/assets/img/ico-save-white.svg" />
                    </button>
                    <p v-if="assessment.last_edit !== null && assessment.last_edit !== undefined" >
                        {{ $t("default.save.autosave") + " " + assessment.last_edit.fromNow() }}
                    </p>
                </template>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "assessment-edit-header",
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    }
};
</script>
