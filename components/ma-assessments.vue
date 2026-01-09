<template>
  <section class="section section--ma-data">
    <div class="container">
      <header class="header--ma-data header--ma-data--stripped">
        <h3>
          {{
            $t(
              'pages.managed-areas.content.ma.tabs.info.data.assessments.header.title',
            )
          }}
        </h3>
      </header>
      <ul class="ma__results">
        <li
          v-for="(assessment, index) in assessments"
          class="elinor__badge ui-rounded-border"
        >
          <header class="header">
            <div class="left">
              <span class="subtitle">{{ assessment.name }}</span>
            </div>
          </header>
          <ul class="sublist">
            <li class="year">
              <span class="label">{{
                $t('pages.assessments.content.assessment.labels.year')
              }}</span>
              <span class="data">{{ assessment.year }}</span>
            </li>
            <li class="countries">
              <span class="label">{{
                $t('pages.assessments.content.assessment.labels.countries')
              }}</span>
              <span class="data">
                <span v-for="(country, index) in assessment.countries">
                  <span v-if="index != assessment.countries.length - 1"
                    >{{ country }},
                  </span>
                  <span v-else>{{ country }}</span>
                </span>
              </span>
            </li>
            <li class="view">
              <nuxt-link
                :to="`/assessments/${assessment.id}/info`"
                class="btn--border-turqy btn--opacity--child"
              >
                <span class="btn--opacity__target">{{
                  $t('default.view')
                }}</span>
                <img src="~/assets/img/ico-button-arrow-turqy.svg" />
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ma-assessments',
  props: ['assessments'],
};
</script>
