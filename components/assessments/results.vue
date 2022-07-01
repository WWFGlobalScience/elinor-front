<template>
    <section class="section section--mt-medium section--ma-results">
        <div class="container">
            <div class="search__results g-grid--3-1-md">
                <div class="col-span-2">
                    <span>{{ $t('pages.assessments.list.total') }}</span> -
                    <span>{{ assessments.length }}</span>
                    <span v-if="assessments.length > 1 || assessments.length == 0">{{ $t('pages.assessments.list.totalPlural') }}</span>
                    <span v-if="assessments.length == 1">{{ $t('pages.assessments.list.totalSingular') }}</span>
                </div>
                <div class="form form--mt-0 ml-auto w-full" v-if="$auth.loggedIn">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="assessmentType"
                                                value="own"
                                                id="own"
                                                @change="filterAssessmentsBy($event.target.value)"
                                                :checked="listType === 'own'"
                                            />
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                    </div>
                                </div>
                                <label for="own" class="label">
                                    <span>{{ $t('pages.assessments.list.type.own') }}</span>
                                </label>
                            </div>
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="assessmentType"
                                                value="all"
                                                id="all"
                                                @change="filterAssessmentsBy($event.target.value)"
                                                :checked="listType === 'all'"
                                            />
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                    </div>
                                </div>
                                <label for="all" class="label">
                                    <span>{{ $t('pages.assessments.list.type.all') }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="ma__results">
                <li v-for="(assessment, index) in assessments" class="elinor__badge ui-rounded-border">
                    <header class="header">
                        <div class="left">
                            <span class="title">{{ assessment.person_responsible.username }}</span>
                            <NuxtLink class="subtitle" :to="isOpenAssessment(assessment) ? `/assessments/edit/${assessment.id}/assessment-data/` : `/assessments/${assessment.id}/info/`">{{ assessment.name }}</NuxtLink>
                            <div class="search-criteria"><span class="area">Managed Area</span> <span class="criteria">Lorem ipsum dolor sit</span></div>
                        </div>
                        <div class="right">
                            <div class="assessment-status status--ready">
                                <span class="status-circle"><img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljc5MzI2IDEyLjY4OThMMjAuNDgzMSAwTDIyLjQxNDIgMS45MzExNkw3Ljc5MzI2IDE2LjU1MjFMMCA4Ljc1ODg1TDEuOTMxMTYgNi44Mjc2OEw3Ljc5MzI2IDEyLjY4OThaIiBmaWxsPSIjNDNBMEJEIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNy43OTMyNiAxMi42ODk4TDIwLjQ4MzEgMEwyMi40MTQyIDEuOTMxMTZMNy43OTMyNiAxNi41NTIxTDAgOC43NTg4NUwxLjkzMTE2IDYuODI3NjhMNy43OTMyNiAxMi42ODk4WiIgZmlsbD0iIzQzQTBCRCIvPgo8L3N2Zz4K'/></span>
                                <span class="text">Published</span>
                            </div>
                            <div class="assessment-status status--ready">
                                <span class="status-circle"><span>100%</span></span>
                                <span class="text">Ready to Publish</span>
                            </div>
                            <div class="assessment-status status--pending">
                                <span class="status-circle"><span>50%</span></span>
                                <span class="text">Preparing to Publish</span>
                            </div>
                        </div>
                    </header>
                    <ul class="sublist">
                        <li class="avatar">
                            <div class="elinor__avatar elinor__avatar--red">
                                <span>{{ assessment.person_responsible.username | capitalizeFirstLetter }}</span>
                            </div>
                        </li>
                        <li v-if="isAssessmentCollaborator($auth, assessment)" class="role">
                            <span class="label">{{ $t('pages.assessments.list.myRole') }}</span>
                            <span class="data">{{ $t('pages.assessments.roles.' + getMyRole($auth, assessment)) }}</span>
                        </li>
                        <li class="ha">
                            <span class="label">{{ $t('pages.assessments.list.year') }}</span>
                            <span class="data">{{ assessment.year }}</span>
                        </li>
                        <li class="countries" v-if="assessment.management_area_countries && assessment.management_area_countries.countries">
                            <span class="label">{{ $t('pages.assessments.list.countries') }}</span>
                            <span class="data" v-html="assessment.management_area_countries.countries.join(', ')"></span>
                        </li>
                        <li class="view" v-if="!$auth.loggedIn || assessment.status === 10 || isAssessmentObserver($auth, assessment)">
                            <nuxt-link :to="`/assessments/${assessment.id}/info/`"
                                       class="btn--border-turqy btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t('pages.assessments.list.viewButton') }}</span>
                                <img src="~/assets/img/ico-button-arrow-turqy.svg">
                            </nuxt-link>
                        </li>
                        <li class="view" v-if="$auth.loggedIn && assessment.status !== 10 && !isAssessmentObserver($auth, assessment)">
                            <nuxt-link :to="`/assessments/edit/${assessment.id}/assessment-data/`"
                                       class="btn--border-turqy btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t('pages.assessments.list.editButton') }}</span>
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
import {mapActions, mapState} from 'vuex'
import {isAssessmentObserver, getMyRole, isAssessmentCollaborator} from "~/config/assessment-roles";

export default {
    name: 'assessments-results',
    computed: {
        ...mapState({
            assessments: state => state.assessments.list,
            users: state => state.users.users,
            listType: state => state.assessments.listType
        })
    },
    methods: {
        isAssessmentCollaborator: isAssessmentCollaborator,
        isAssessmentObserver: isAssessmentObserver,
        getMyRole: getMyRole,
        isOpenAssessment(assessment) {
            return this.$auth.loggedIn && assessment.status !== 10 && !isAssessmentObserver(this.$auth, assessment)
        },
        ...mapActions({
            filterAssessmentsBy: 'assessments/filterAssessmentsBy'
        })
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
