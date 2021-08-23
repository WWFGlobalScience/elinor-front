<template>
  <section class="section section--mt-medium section--ma-results">
    <div class="container">
      <div class="search__results">

        <span>{{ $t('default.showing') }}</span> -
        <span>{{ assessments.length }}</span>
        <span
          v-if="assessments.length > 1 || assessments.length == 0">{{ $t('pages.assessments.content.showing.plural') }}</span>
        <span v-if="assessments.length == 1">{{ $t('pages.assessments.content.showing.singular') }}</span>

      </div>
      <ul class="ma__results">
        <li v-for="(assessment, index) in assessments" class="elinor__badge ui-rounded-border">
          <header class="header">
            <div class="left">
              <span class="title">{{ getAssessmentUser(assessment.person_responsible) }}</span>
              <span class="subtitle">{{ assessment.name }}</span>
            </div>
          </header>
          <ul class="sublist">
            <li class="avatar">
              <div class="elinor__avatar elinor__avatar--red">
                <span>{{ getAssessmentUser(assessment.person_responsible) | capitalizeFirstLetter }}</span>
              </div>
            </li>
            <li class="role">
              <span class="label">{{ $t('pages.assessments.content.assessment.labels.role') }}</span>
              <span class="data">Admin</span>
            </li>
            <li class="ha">
              <span class="label">{{ $t('pages.assessments.content.assessment.labels.year') }}</span>
              <span class="data">{{ assessment.year }}</span>
            </li>
            <li class="countries">
              <span class="label">{{ $t('pages.assessments.content.assessment.labels.countries') }}</span>

              <span class="data">
                                <span v-for="(country, index) in getAssessmentCountries( assessment ) ">
                                    <span v-if="index != getAssessmentCountries( assessment ).length - 1">{{
                                        country
                                      }}, </span>
                                    <span v-else>{{ country }}</span>
                                </span>
                            </span>
            </li>
            <li class="view">
              <nuxt-link :to="`/assessments/${assessment.id}/info/`" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target">{{ $t('default.view') }}</span>
                <img src="~/assets/img/ico-button-arrow-turqy.svg">
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'assessments-results',
  computed: {
    ...mapState({
      assessments: state => state.assessments.list,
      mas: state => state.managementareas.mas,
      users: state => state.users.users
    })
  },
  filters: {
    capitalizeFirstLetter: (value) => {
      if (!value) {
        return ''
      }
      return value.charAt(0).toUpperCase()
    }
  },
  methods: {
    getAssessmentUser(value) {
      console.log(this.users);
      if (!this.users) return '';
      return this.users.find(user => user.id == value).username
    },
    getAssessmentCountries(assessment) {
      if (!this.mas.versions) return '';
      return this.mas.versions.find(version => version.id == assessment.management_area_version).countries

    }
  }
}
</script>
