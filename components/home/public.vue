<template>
  <article class="page page--flushed">
    <section :class="{'section--sign-in--logged-in': $auth.loggedIn}" class="section section--sign-in">
      <picture class="section__full-background">
        <img src="~/assets/img/signin-background.jpg" />
      </picture>
      <div v-if="!$auth.loggedIn" class="elinor__card elinor__card--sign-in">
        <NuxtLink to="/" class="flex justify-center">
          <img src="~/assets/img/elinor-sign-up-circle.svg" class="elinor__card--sign-in__logo"/>
        </NuxtLink>
        <div class="elinor__card--sign-in__info">
          <div>
            <p class="text-xl mb-1.5">{{ $t('pages.home.public.signInTitle') }}</p>
          </div>
          <div>
            <p class="mb-0 text-grayy-lighter"
               v-if="!alerts.emailVerificationRequired && !alerts.emailVerificationSent">
                {{ $t('pages.home.public.signInTitleAndCreateAccountSeparator') }}
              <NuxtLink to="/create-account" class="text-turqy text-sm">{{ $t('pages.home.public.createAccountLink') }}</NuxtLink>
            </p>
            <p class="mb-0 text-grayy-lighter" v-if="alerts.emailVerificationRequired || alerts.emailVerificationSent">
              <a class="text-turqy text-sm">{{ $t('pages.home.public.resentVerificationLink') }}</a>
            </p>
          </div>
        </div>

        <p class="text-base">{{ $t('pages.home.public.signInSubtitle') }}</p>

        <div v-if="alerts.invalidCredentials"
             class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.home.public.alerts.invalidCredentials.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.home.public.alerts.invalidCredentials.subtitle') }}</span>
        </div>

        <div v-if="alerts.emailVerificationRequired"
             class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.home.public.alerts.emailVerificationRequired.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.home.public.alerts.emailVerificationRequired.subtitle') }}</span>
        </div>

        <div v-if="alerts.emailVerificationSent"
             class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.home.public.alerts.emailVerificationSent.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.home.public.alerts.emailVerificationSent.subtitle') }}</span>
        </div>

        <div v-if="alerts.passwordChangedSuccessfully"
             class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.home.public.alerts.passwordChangedSuccessfully.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.home.public.alerts.passwordChangedSuccessfully.subtitle') }}</span>
        </div>

        <div v-if="alerts.emailVerifiedSuccessfully"
             class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.home.public.alerts.emailVerifiedSuccessfully.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.home.public.alerts.emailVerifiedSuccessfully.subtitle') }}</span>
        </div>

        <form id="form--signin" @submit="submit" class="form form--sign-in">
          <div class="form__group">
            <div class="form__row">
              <div class="input">
                <input type="text" :placeholder="$t('pages.home.public.usernameInput')" v-model="username" required/>
              </div>
            </div>
            <div class="form__row">
              <div class="input">
                <input type="password" :placeholder="$t('pages.home.public.passwordInput')" v-model="password" required/>
              </div>
            </div>
          </div>

          <div class="elinor__card--sign-in__info info-start mt-9">
            <div class="form__group">
              <div class="form__row">
                <div class="input input--radios input--radios-question">
                  <div class="radios__wrap">
                    <div class="radio__wrap">
                      <div class="radio">
                        <input
                          type="checkbox"
                          name="answer"
                          id="answer-1"
                          v-model="remember"
                        />
                        <img src="~/assets/img/ico-ok.svg"/>
                      </div>
                    </div>
                  </div>
                  <label for="answer-1" class="label">
                    <span>{{ $t('pages.home.public.rememberMeCheckbox') }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="btn--border-turqy btn--opacity--child"
              >
                <span class="btn--opacity__target">{{ $t('pages.home.public.signInButton') }}</span>
                <img src="~/assets/img/ico-signin-turqy.svg"/>
              </button>
            </div>
          </div>
        </form>
        <NuxtLink to="/forgot-password" class="text-turqy mt-3 text-sm">
            {{ $t('pages.home.public.forgotPasswordLink') }}
        </NuxtLink>
      </div>
    </section>
    <section id="create-account" class="section section--intro section--turqy-light">
      <div class="container">
        <img
          src="~/assets/img/elinor-illustration.svg"
          alt="ellinor illustration"
        />
        <p class="section--intro__info">
          {{ $t('pages.home.public.content.introduction.text') }}
        </p>
        <NuxtLink v-if="!$auth.loggedIn" to="/create-account" class="btn btn--opacity--child">
          <span class="btn--opacity__target">{{ $t('pages.home.public.content.introduction.createAccountLink') }}</span>
          <img src="~/assets/img/ico-button-arrow.svg"/>
        </NuxtLink>
      </div>
    </section>

    <section class="section section--latest-news">
      <div class="container">
        <div class="row">
          <div class="text-medium uppercase">LATEST NEWS</div>
          <nuxt-link to="/news" role="button" class="link-arrow">
            <span>See more news</span>
            <img class="ico" src="~/assets/img/ico-arrow-right.svg"/>
          </nuxt-link>
        </div>
        <div class="row row--cards mt-9">
          <div v-for="newsInstance in latestNews" class="latest-news__card ui-rounded-border">
            <div class="header">
              <p class="date">{{ newsInstance.date }}</p>
              <h3 class="title c-title--md text-turqy mt-2">{{ newsInstance.title }}</h3>
            </div>
            <div class="body">
              <p class="text c-text--base">{{ newsInstance.text.length > maxCharacters ? newsInstance.text.substring(0,maxCharacters) + '...' : newsInstance.text}}</p>
              <nuxt-link to="news" class="link-more mt-4">Read more</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section section--text section--img-text">
      <div class="container">
        <div class="section--img-text__block">
          <div class="section--img-text__block-text">
            <h1 class="c-title">{{ $t('pages.home.public.content.explanation.title') }}</h1>
            <p>{{ $t('pages.home.public.content.explanation.paragraph1') }}</p>
            <p>{{ $t('pages.home.public.content.explanation.paragraph2') }}</p>
          </div>
          <div class="flex justify-end items-center">
            <img class="h-64" src="~/assets/img/elinor-hand-icon.svg" />
          </div>
        </div>
      </div>
      <div class="section--img-text__block is-flushed">
        <div>
          <img class="w-full" src="~/assets/img/tracking.jpg" />
        </div>
        <div class="container">
          <div class="section--img-text__block-text">
            <h4 class="c-title--sm">{{ $t('pages.home.public.content.explanation.trackingChange.title') }}</h4>
            <p>{{ $t('pages.home.public.content.explanation.trackingChange.text') }}</p>
            <ul class="list-disc list-inside">
              <li>{{ $t('pages.home.public.content.explanation.trackingChange.first') }}</li>
              <li>{{ $t('pages.home.public.content.explanation.trackingChange.second') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--text section--turqy-light">
      <div class="container">
        <div class="grid grid-cols-2 gap-4 items-center lg:grid-cols-1">
          <div class="text-center lg:order-2">
            <img class="w-10/12" src="~/assets/img/elinor-pic.svg" />
            <blockquote class="elinor__sentence mx-auto">
              “{!! $t('pages.home.public.content.elinor.quote.text') !!}”
              <span class="elinor__sentence__name">
                {{ $t('pages.home.public.content.elinor.quote.author') }}
              </span>
            </blockquote>
          </div>
          <div class="lg:order-1">
            <h3 class="c-epi">{{ $t('pages.home.public.content.elinor.title') }}</h3>
            <h4 class="c-title">{{ $t('pages.home.public.content.elinor.subtitle') }}</h4>
            <p>{{ $t('pages.home.public.content.elinor.paragraph1') }}</p>
            <p>{{ $t('pages.home.public.content.elinor.paragraph2') }}</p>
            <p>{{ $t('pages.home.public.content.elinor.paragraph3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="faqs" class="section section--text section--img-text">
      <div class="section--img-text__block is-flushed items-center">
        <div class="container">
          <div class="section--img-text__block-text">
            <h4 class="c-title--block">{{ $t('pages.home.public.content.faqs.title') }}</h4>
            <p>{{ $t('pages.home.public.content.faqs.text') }}</p>
            <NuxtLink to="/faq" class="btn btn--opacity--child">
              <span class="btn--opacity__target">{{ $t('pages.home.public.content.faqs.button') }}</span>
              <img src="~/assets/img/ico-button-arrow.svg" />
            </NuxtLink>
          </div>
        </div>
        <div>
          <img class="w-full" src="~/assets/img/faq.jpg" />
        </div>
      </div>
      <div id="methodology" class="section--img-text__block is-flushed items-center">
        <div>
          <img class="w-full" src="~/assets/img/methodology.jpg" />
        </div>
        <div class="container">
          <div class="section--img-text__block-text">
            <h4 class="c-title--block">{{ $t('pages.home.public.content.methodology.title') }}</h4>
            <p>{{ $t('pages.home.public.content.methodology.text') }}</p>
            <NuxtLink to="/methodology" class="btn btn--opacity--child">
              <span class="btn--opacity__target">{{ $t('pages.home.public.content.methodology.button') }}</span>
              <img src="~/assets/img/ico-button-arrow.svg" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <default-footer ></default-footer>
  </article>
</template>

<script>
import {mapActions, mapState} from "vuex";
import news from '../../content/news'
const numNews = 3;
const maxCharacters = 300;

export default {
  name: 'home-public',
  data() {
    return {
      username: null,
      password: null,
      remember: false,
      latestNews: [...news].splice(0, numNews),
      maxCharacters
    }
  },
  computed: {
    ...mapState({
      alerts: state => state.authentication.alerts
    })
  },
  methods: {
    ...mapActions({
      signIn: 'authentication/signIn',
      resendEmail: 'authentication/resendEmail'
    }),
    submit(event) {
      event.preventDefault();
      this.signIn({username: this.username, password: this.password});
    },
    resend() {
      this.resendEmail(this.email)
    }
  }
}
</script>
