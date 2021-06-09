<template>
    <article class="page page--managed-areas-list">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-0">
                    <img src="~/assets/img/ico-managed-areas-turqy.svg">
                    <span>{{ $t( 'pages.managed-areas.content.header.title' ) }}</span>
                </h1>
            </div>
        </header>
        <section class="section section--mt-0 section--button">
            <div class="container">
                <button type="button" class="btn btn--opacity--child">
                    <span class="btn--opacity__target">{{ $t( 'pages.managed-areas.content.create' ) }}</span>
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
                                        <input type="text" :placeholder="$t( 'pages.managed-areas.content.search' )">
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
                        <button type="button" class="btn--border-turqy btn--opacity--child">
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
                    {{ $t( 'default.showing' ) }} - 206 {{ $t( 'pages.managed-areas.content.showing.managed-areas' )}}
                </div>
                <ul class="ma__results">
                    <li class="elinor__badge ui-rounded-border">
                        <header class="header">
                            <div class="left">
                                <span class="title">User Name Owner</span>
                                <span class="subtitle">Name Managed Area lorem ipsum dolor sid amet </span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="avatar">
                                <div class="elinor__avatar elinor__avatar--red">
                                    <span>X</span>
                                </div>
                            </li>
                            <li class="role">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.role' ) }}</span>
                                <span class="data">Admin</span>
                            </li>
                            <li class="ha">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.ha' ) }}</span>
                                <span class="data">89.566</span>
                            </li>
                            <li class="assessments">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.assessments' ) }}</span>
                                <span class="data">3</span>
                            </li>
                            <li class="countries">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.countries' ) }}</span>
                                <span class="data">Lorem ipsum doloe aemet</span>
                            </li>
                            <li class="view">
                                <nuxt-link to="" class="btn--border-turqy btn--opacity--child">
                                    <span class="btn--opacity__target">{{ $t( 'default.view' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li class="elinor__badge ui-rounded-border">
                        <header class="header">
                            <div class="left">
                                <span class="title">User Name Owner</span>
                                <span class="subtitle">Name Managed Area lorem ipsum dolor sid amet </span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="avatar">
                                <div class="elinor__avatar elinor__avatar--red">
                                    <span>X</span>
                                </div>
                            </li>
                            <li class="role">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.role' ) }}</span>
                                <span class="data">Admin</span>
                            </li>
                            <li class="ha">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.ha' ) }}</span>
                                <span class="data">89.566</span>
                            </li>
                            <li class="assessments">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.assessments' ) }}</span>
                                <span class="data">3</span>
                            </li>
                            <li class="countries">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.countries' ) }}</span>
                                <span class="data">Lorem ipsum doloe aemet</span>
                            </li>
                            <li class="view">
                                <nuxt-link to="" class="btn--border-turqy btn--opacity--child">
                                    <span class="btn--opacity__target">{{ $t( 'default.view' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow-turqy.svg">
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li class="elinor__badge ui-rounded-border">
                        <header class="header">
                            <div class="left">
                                <span class="title">User Name Owner</span>
                                <span class="subtitle">Name Managed Area lorem ipsum dolor sid amet </span>
                            </div>
                        </header>
                        <ul class="sublist">
                            <li class="avatar">
                                <div class="elinor__avatar elinor__avatar--red">
                                    <span>X</span>
                                </div>
                            </li>
                            <li class="role">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.role' ) }}</span>
                                <span class="data">Admin</span>
                            </li>
                            <li class="ha">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.ha' ) }}</span>
                                <span class="data">89.566</span>
                            </li>
                            <li class="assessments">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.assessments' ) }}</span>
                                <span class="data">3</span>
                            </li>
                            <li class="countries">
                                <span class="label">{{ $t( 'pages.managed-areas.content.ma.labels.countries' ) }}</span>
                                <span class="data">Lorem ipsum doloe aemet</span>
                            </li>
                            <li class="view">
                                <nuxt-link to="" class="btn--border-turqy btn--opacity--child">
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