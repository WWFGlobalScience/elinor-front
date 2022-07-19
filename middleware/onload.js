export default function ({store}) {
    store.dispatch('attributes/fetchAttributes')
    store.dispatch('surveyquestions/fetchSurveyQuestions')
}
