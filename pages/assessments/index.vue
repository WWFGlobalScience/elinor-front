<template>
    <article class="page page--assessments-list">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-assessments-turqy.svg">
                    <span>{{ $t( 'pages.assessments.content.header.title' ) }}</span>
                </h1>
            </div>
        </header>
        <section class="section section--mt-0 section--button">
            <div class="container">
                <button type="button" class="btn btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'pages.assessments.content.create' ) }}</span>
                    <img src="~/assets/img/ico-button-arrow.svg">
                </button>
            </div>
        </section>
        <section class="section section--filters">
            <div class="container">
                <ul>
                    <li>
                        <form id="form--search" action="" class="form">
                            <div class="form__group">
                                <div class="form__row">
                                    <div class="input input--ico">
                                        <input type="text" :placeholder="$t( 'default.search' )">
                                        <div class="input__ico">
                                            <span></span>
                                            <button type="submit" form="form--search">
                                                <img src="~/assets/img/ico-search-turqy.svg">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>
                    <li>
                        <button type="button" class="btn--border-turqy btn--opacity--child" 
                        @click="popupState( { component : 'popup-assessments-filter', title: 'pages.assessments.content.filters.title' })">
                            <span class="btn--opacity__target">{{ $t( 'default.filters.button' ) }}</span>
                            <img src="~/assets/img/ico-filters-turqy.svg">
                        </button>
                    </li>
                    <li>
                        <button type="button" class="btn--border-turqy btn--opacity--child">
                            <span class="btn--opacity__target">{{ $t( 'default.order.button' ) }}</span>
                            <img src="~/assets/img/ico-order-turqy.svg">
                        </button>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section section--mt-medium section--ma-results">
            <div class="container">
                <div class="search__results">
                    <span>{{ $t( 'default.showing' ) }}</span> - 
                    <span>{{ assessments.length }}</span> 
                    <span v-if="assessments.length > 1 || assessments.length == 0">{{ $t( 'pages.assessments.content.showing.plural' )}}</span>
                    <span v-if="assessments.length == 1">{{ $t( 'pages.assessments.content.showing.singular' )}}</span>
                </div>
                <ul class="ma__results">
                    <li v-for="(assessment, index) in assessments" class="elinor__badge ui-rounded-border">
                        <header class="header">
                            <div class="left">
                                <span class="title">User Name Admin</span>
                                <span class="subtitle">{{ assessment.name }}</span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="avatar">
                                <div class="elinor__avatar elinor__avatar--red">
                                    <span>X</span>
                                </div>
                            </li>
                            <li class="role">
                                <span class="label">{{ $t( 'pages.assessments.content.assessment.labels.role' ) }}</span>
                                <span class="data">Admin</span>
                            </li>
                            <li class="ha">
                                <span class="label">{{ $t( 'pages.assessments.content.assessment.labels.year' ) }}</span>
                                <span class="data">{{ assessment.year }}</span>
                            </li>
                            <li class="countries">
                                <span class="label">{{ $t( 'pages.assessments.content.assessment.labels.countries' ) }}</span>
                                <span class="data">
                                    <span v-for="(country, index) in assessment.countries">
                                        <span v-if="index != assessment.countries.length - 1">{{ country }}, </span>
                                        <span v-else>{{ country }}</span>
                                    </span>
                                </span>
                            </li>
                            <li class="view">
                                <nuxt-link :to="`/assessments/${assessment.id}/info`" class="btn--border-turqy btn--opacity--child">
                                    <span class="btn--opacity__target">{{ $t( 'default.view' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    </article>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'Assessments',
    computed: {
        assessments() {
            return this.$store.state.assessments.list
        }
    },
    methods: {
        ...mapActions({
            getAssessments: 'assessments/getAssessments',
            loaderState: 'loader/loaderState',
            popupState: 'popup/popupState'
        })
    },
    mounted() {
        this.getAssessments()
    }
}
</script>