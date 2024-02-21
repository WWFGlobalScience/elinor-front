export default function ({store, app, $axios}) {
    const locale = app.i18n.locales.find(i => i.code === app.i18n.getLocaleCookie());
    $axios.setHeader('Accept-Language', locale && locale.code || 'en-US');
    store.dispatch('attributes/fetchAttributes')
    store.dispatch('surveyquestions/fetchSurveyQuestions')
}
