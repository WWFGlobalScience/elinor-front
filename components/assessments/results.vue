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
                            <span class="title">{{ assessment.person_responsible.username }}</span>
                            <NuxtLink class="subtitle" :to="isOpenAssessment(assessment) ? `/assessments/edit/${assessment.id}/assessment-data/` : `/assessments/${assessment.id}/info/`">{{ assessment.name }}</NuxtLink>
                        </div>
                    </header>
                    <ul class="sublist">
                        <li class="avatar">
                            <div class="elinor__avatar elinor__avatar--red">
                                <span>{{ assessment.person_responsible.username | capitalizeFirstLetter }}</span>
                            </div>
                        </li>
                        <li v-if="isAssessmentCollaborator($auth, assessment)" class="role">
                            <span class="label">{{ $t('pages.assessments.content.assessment.labels.role') }}</span>
                            <span class="data">{{ $t('default.roles.' + getMyRole($auth, assessment)) }}</span>
                        </li>
                        <li class="ha">
                            <span class="label">{{ $t('pages.assessments.content.assessment.labels.year') }}</span>
                            <span class="data">{{ assessment.year }}</span>
                        </li>
                        <li class="countries" v-if="assessment.management_area_countries && assessment.management_area_countries.countries">
                            <span class="label">{{ $t('pages.assessments.content.assessment.labels.countries') }}</span>
                            <span class="data" v-html="assessment.management_area_countries.countries.join(', ')"></span>
                        </li>
                        <li class="view" v-if="!$auth.loggedIn || assessment.status === 10 || isAssessmentObserver($auth, assessment)">
                            <nuxt-link :to="`/assessments/${assessment.id}/info/`"
                                       class="btn--border-turqy btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t( 'default.view' ) }}</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                        </li>
                        <li class="view" v-if="$auth.loggedIn && assessment.status !== 10 && !isAssessmentObserver($auth, assessment)">
                            <nuxt-link :to="`/assessments/edit/${assessment.id}/assessment-data/`"
                                       class="btn--border-turqy btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t( 'default.edit' ) }}</span>
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
import {isAssessmentObserver, getMyRole, isAssessmentCollaborator} from "~/config/assessment-roles";

export default {
    name: 'assessments-results',
    computed: {
        ...mapState({
            assessments: state => state.assessments.list,
            users: state => state.users.users
        })
    },
    methods: {
        isAssessmentCollaborator: isAssessmentCollaborator,
        isAssessmentObserver: isAssessmentObserver,
        getMyRole: getMyRole,
        isOpenAssessment(assessment) {
            return this.$auth.loggedIn && assessment.status !== 10 && !isAssessmentObserver(this.$auth, assessment)
        }
    },
    filters: {
        capitalizeFirstLetter: (value) => {
            if (!value) {
                return ''
            }
            return value.charAt(0).toUpperCase()
        }
    }
}
</script>
