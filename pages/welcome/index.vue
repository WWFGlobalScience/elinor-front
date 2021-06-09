<template>
    <article class="page page--welcome">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-10">{{ $t( 'pages.welcome.content.header.title' ) }}</h1>
                <p v-html="$t( 'pages.welcome.content.header.subtitle' )" class="max-w-sm"></p>
            </div>
        </header>
        <section class="section welcome__asessments">
            <div class="container">
                <header>
                    <h2 class="mb-5">{{ $t( 'pages.welcome.content.assessments.header.title' ) }}</h2>
                </header>
                <ul class="assesments__list">
                    <li>
                        <div class="assessment-ivitation-badge ui-rounded-border">
                            <ul>
                                <li class="assessment-ivitation-badge__avatar">
                                    <div class="avatar avatar--red">
                                        <span>X</span>
                                    </div>
                                </li>
                                <li  class="assessment-ivitation-badge__role">
                                    <span class="assessment-ivitation-badge__label">{{ $t( 'pages.welcome.content.assessments.labels.role' ) }}</span>
                                    <span class="assessment-ivitation-badge__data">Admin</span>
                                </li>
                                <li class="assessment-ivitation-badge__owner">
                                    <span class="assessment-ivitation-badge__label">Name Admin</span>
                                    <span class="assessment-ivitation-badge__data">Name Assessment lorem ipsum dolor sid amet </span>
                                </li>
                                <li class="assessment-ivitation-badge__invited-by">
                                    <span class="assessment-ivitation-badge__label">{{ $t( 'pages.welcome.content.assessments.labels.invited-by' ) }}</span>
                                    <span class="assessment-ivitation-badge__data">Name invitator</span>
                                </li>
                                <li class="assessment-ivitation-badge__url">
                                    <nuxt-link to="" class="btn--ico btn--opacity">
                                        <img src="~/assets/img/ico-eye-turqy-light.svg">
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section welcome__ctas">
            <div class="container">
                <header>
                    <h2 class="mb-5">{{ $t( 'pages.welcome.content.ctas.header.title' ) }}</h2>
                </header>
                <ul class="flex">
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>{{ $t( 'pages.welcome.content.ctas.items.create.title' ) }}</h4>
                            <p v-html="$t( 'pages.welcome.content.ctas.items.create.description' )"></p>
                        </header>
                        <footer>
                            <nuxt-link to="" class="btn btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t( 'pages.welcome.content.ctas.items.create.button' ) }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg">
                            </nuxt-link>
                        </footer>
                    </li>
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>{{ $t( 'pages.welcome.content.ctas.items.invite.title' ) }}</h4>
                            <p v-html="$t( 'pages.welcome.content.ctas.items.invite.description' )"></p>
                        </header>
                        <footer>
                            <nuxt-link to="" class="btn btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t( 'pages.welcome.content.ctas.items.invite.button' ) }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg">
                            </nuxt-link>
                        </footer>
                    </li>
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>{{ $t( 'pages.welcome.content.ctas.items.help.title' ) }}</h4>
                            <p v-html="$t( 'pages.welcome.content.ctas.items.help.description' )"></p>
                        </header>
                        <footer>
                            <nuxt-link to="/help-and-guides" class="btn btn--opacity--child">
                                <span class="btn--opacity__target">{{ $t( 'pages.welcome.content.ctas.items.help.button' ) }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg">
                            </nuxt-link>
                        </footer>
                    </li>
                </ul>
            </div>
        </section>
    </article>
</template>