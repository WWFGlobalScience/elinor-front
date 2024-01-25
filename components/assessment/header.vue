<template>
    <header class="header--page">
        <div class="container flex justify-start gap-8 items-start">
            <div v-if="assessment && assessment.score !== null" class="flex gap-2 flex-col items-center">
                <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                    :class="'bg-' + getAssessmentColor(assessment.score)">
                    <span class="text-white text-[40px] font-semibold">
                        {{ assessment.score }}
                    </span>
                </div>
                <span class="uppercase text-grayy-lighter font-bold text-[12px]">{{ $t("pages.assessments.outOf100") }}</span>
            </div>
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg" />
                    <span>{{ $t("pages.assessments.view.title") }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">
                    {{ $t("pages.assessments.view.year") }}
                    {{ assessment.year }} - {{ $t("default.version") }}
                    {{ assessment.published_version }}
                </p>
                <assessment-actions type="show" />
            </div>
            <div class="header__save ml-auto justify-start">
                <assessment-status></assessment-status>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "assessment-header",
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    }
};
</script>
