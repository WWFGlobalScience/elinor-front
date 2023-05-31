import Vue from "vue"

export const ScoreColors = {
    data() {
        return {
            scoreColors: ["poor", "average", "good", "excellent"]
        };
    },
    methods: {
        getAssessmentColor(score){
            if(score <= 29){
                return this.scoreColors[0]
            }else if(score <= 59){
                return this.scoreColors[1]
            }else if(score <= 89){
                return this.scoreColors[2]
            }else{
                return this.scoreColors[3]
            }
        },
        getAttributteColor(score){            
            if(score <= 2){
                return this.scoreColors[0]
            }else if(score <= 5){
                return this.scoreColors[1]
            }else if(score <= 8){
                return this.scoreColors[2]
            }else{
                return this.scoreColors[3]
            }
        },
    }
}

if (!Vue.__score_colors__) {
  Vue.__score_colors__ = true
  Vue.mixin(ScoreColors)
}