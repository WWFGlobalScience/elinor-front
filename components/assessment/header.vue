<template>
    <header class="header--page">
        <div class="container flex justify-start gap-8 items-start">
            <div
                v-if="assessment.score"
                class="flex gap-2 flex-col items-center"
            >
                <div
                    class="flex justify-center items-center w-[80px] h-[80px] rounded-full"
                    :class="'bg-' + getScoreColor(assessment.score)"
                >
                    <span class="text-white text-[40px] font-semibold">{{
                        assessment.score.toFixed(0)
                    }}</span>
                </div>
                <span class="uppercase text-grayy-lighter font-bold text-[12px]"
                    >out of 100</span
                >
            </div>
            <div class="text">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg" />
                    <span>{{ $t("pages.assessments.view.title") }}</span>
                </h1>
                <h2 class="assessment__name">{{ assessment.name }}</h2>
                <p class="assessment__year">
                    {{ $t("pages.assessments.view.year") }}
                    {{ assessment.year }} - Version
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
export default {
    name: "assessment-header",
    data() {
        return {
            scoreColors: ["poor", "average", "good", "excellent"]
        };
    },
    computed: {
        assessment() {
            return this.$store.state.assessments.assessment;
        }
    },
    methods: {
        getScoreColor(score) {
            if (score <= 29) {
                return this.scoreColors[0];
            } else if (score <= 59) {
                return this.scoreColors[1];
            } else if (score <= 89) {
                return this.scoreColors[2];
            } else {
                return this.scoreColors[3];
            }
        }
    }
};
</script>
