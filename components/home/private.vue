<template>
    <article class="page page--welcome">
        <header class="header--page">
            <div class="container">
                <h1 class="mb-10">
                    {{ $t('pages.welcome.content.header.title') }}
                </h1>
                <p
                    v-html="$t('pages.welcome.content.header.subtitle')"
                    class="max-w-sm"
                ></p>
            </div>
        </header>
        <!--<section class="section welcome__asessments">
      <div class="container">
        <header>
          <h2 class="mb-5">{{ $t( 'pages.welcome.content.assessments.header.title' ) }}</h2>
        </header>
        <ul class="assesments__list">
          <li>
            <div class="elinor__badge ui-rounded-border">
              <ul class="sublist">
                <li class="avatar">
                  <div class="elinor__avatar elinor__avatar--red">
                    <span>X</span>
                  </div>
                </li>
                <li  class="role">
                  <span class="label">{{ $t( 'pages.welcome.content.assessments.labels.role' ) }}</span>
                  <span class="data">Admin</span>
                </li>
                <li class="owner">
                  <span class="label">Name Admin</span>
                  <span class="data">Name Assessment lorem ipsum dolor sid amet </span>
                </li>
                <li class="invited-by">
                  <span class="label">{{ $t( 'pages.welcome.content.assessments.labels.invited-by' ) }}</span>
                  <span class="data">Name invitator</span>
                </li>
                <li class="view">
                  <nuxt-link to="" class="btn--ico btn--opacity">
                    <img src="~/assets/img/ico-eye-turqy-light.svg">
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>-->
        <section class="section section--welcome__ctas">
            <div class="container">
                <header>
                    <h2 class="mb-5">
                        {{ $t('pages.welcome.content.ctas.header.title') }}
                    </h2>
                </header>
                <ul class="flex">
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>
                                {{
                                    $t(
                                        'pages.welcome.content.ctas.items.create.title',
                                    )
                                }}
                            </h4>
                            <p
                                v-html="
                                    $t(
                                        'pages.welcome.content.ctas.items.create.description',
                                    )
                                "
                            ></p>
                        </header>
                        <footer>
                            <nuxt-link to="" class="btn btn--opacity--child">
                                <span class="btn--opacity__target">{{
                                    $t(
                                        'pages.welcome.content.ctas.items.create.button',
                                    )
                                }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg" />
                            </nuxt-link>
                        </footer>
                    </li>
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>
                                {{
                                    $t(
                                        'pages.welcome.content.ctas.items.invite.title',
                                    )
                                }}
                            </h4>
                            <p
                                v-html="
                                    $t(
                                        'pages.welcome.content.ctas.items.invite.description',
                                    )
                                "
                            ></p>
                        </header>
                        <footer>
                            <nuxt-link to="" class="btn btn--opacity--child">
                                <span class="btn--opacity__target">{{
                                    $t(
                                        'pages.welcome.content.ctas.items.invite.button',
                                    )
                                }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg" />
                            </nuxt-link>
                        </footer>
                    </li>
                    <li class="ui-rounded-turqy-lighter">
                        <header>
                            <h4>
                                {{
                                    $t(
                                        'pages.welcome.content.ctas.items.help.title',
                                    )
                                }}
                            </h4>
                            <p
                                v-html="
                                    $t(
                                        'pages.welcome.content.ctas.items.help.description',
                                    )
                                "
                            ></p>
                        </header>
                        <footer>
                            <nuxt-link
                                to="/help-and-guides"
                                class="btn btn--opacity--child"
                            >
                                <span class="btn--opacity__target">{{
                                    $t(
                                        'pages.welcome.content.ctas.items.help.button',
                                    )
                                }}</span>
                                <img src="~/assets/img/ico-button-arrow.svg" />
                            </nuxt-link>
                        </footer>
                    </li>
                </ul>
            </div>
        </section>
    </article>
</template>

<script>
export default {
    name: 'home-private',
    methods: {},
};
</script>
