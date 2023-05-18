export const calculateScore = (assessment, responses) => {
    var total = 0;
    var assessmentAtributtes = assessment.attributes;
    assessmentAtributtes.forEach(
        (attr) => {                
            var answers = responses.filter(surveyAnswer => surveyAnswer.question.attribute === attr)
            var sumValues = answers.reduce(function (s, a) {return s + a.choice;}, 0);
            total += 10 / 3 * (sumValues / answers.length)
        }
    )
    return total;
}