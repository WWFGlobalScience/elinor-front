import Vue from 'vue';

export const ScoreColors = {
    methods: {
        getAssessmentColor(score) {
            var scoreColors = ['poor', 'average', 'good', 'excellent'];
            if (score <= 29) {
                return scoreColors[0];
            } else if (score <= 59) {
                return scoreColors[1];
            } else if (score <= 89) {
                return scoreColors[2];
            } else {
                return scoreColors[3];
            }
        },
        getAttributeColor(score) {
            var scoreColors = ['poor', 'average', 'good', 'excellent'];
            if (score == null) {
                return 'grayy-lighter';
            } else if (score <= 2) {
                return scoreColors[0];
            } else if (score <= 5) {
                return scoreColors[1];
            } else if (score <= 8) {
                return scoreColors[2];
            } else {
                return scoreColors[3];
            }
        },
    },
};

if (!Vue.__score_colors__) {
    Vue.__score_colors__ = true;
    Vue.mixin(ScoreColors);
}
