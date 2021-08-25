<template>
  <article class="page page--flushed">
    <section class="section section--sign-in">
      <picture class="section__full-background">
        <img src="~/assets/img/signin-background.jpg" />
      </picture>
      <div class="elinor__card elinor__card--sign-in">
        <NuxtLink to="/" class="flex justify-center">
          <img src="~/assets/img/elinor-logo.svg"/>
        </NuxtLink>
        <hr class="elinor__card--sign-in__separator" />
        <div class="elinor__card--sign-in__info">
          <div>
            <p class="text-xl mb-1.5">SIGN IN</p>
          </div>
          <div>
            <p class="mb-0 text-grayy-lighter"
               v-if="!alerts.emailVerificationRequired && !alerts.emailVerificationSent">
              or
              <NuxtLink to="/create-account" class="text-turqy text-sm">create an account</NuxtLink>
            </p>
            <p class="mb-0 text-grayy-lighter" v-if="alerts.emailVerificationRequired || alerts.emailVerificationSent">
              <a class="text-turqy text-sm">Resend email</a>
            </p>
          </div>
        </div>

        <p class="text-base">{{ $t('pages.auth.content.sign-in.subtitle') }}</p>

        <div v-if="alerts.invalidCredentials"
             class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Invalid credentials!</strong>
          <span class="block sm:inline">Do not remember the password? Try the forgot password</span>
        </div>

        <div v-if="alerts.emailVerificationRequired"
             class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Email verification required!</strong>
          <span class="block sm:inline">Have you not received the verification email? If not resend it again</span>
        </div>

        <div v-if="alerts.emailVerificationSent"
             class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Email verification sent!</strong>
          <span class="block sm:inline">You will receive a massage to verify your email</span>
        </div>

        <form id="form--signin" @submit="submit" class="form form--sign-in">
          <div class="form__group">
            <div class="form__row">
              <div class="input">
                <input type="text" :placeholder="'Username'" v-model="username" required/>
              </div>
            </div>
            <div class="form__row">
              <div class="input">
                <input type="password" :placeholder="'Password'" v-model="password" required/>
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
                          type="radio"
                          name="answer"
                          id="answer-1"
                          value="1"
                        />
                        <img src="~/assets/img/ico-ok.svg"/>
                      </div>
                    </div>
                  </div>
                  <label for="answer-1" class="label">
                    <span>Remember me</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="btn--border-turqy btn--opacity--child"
              >
                <span class="btn--opacity__target"> Sign in </span>
                <img src="~/assets/img/ico-signin-turqy.svg"/>
              </button>
            </div>
          </div>
        </form>
        <NuxtLink to="/" class="text-turqy mt-3 text-sm">
          Forgot password?
        </NuxtLink>
      </div>
    </section>
    <section class="section section--intro section--turqy-light">
      <div class="container">
        <img
          src="~/assets/img/elinor-illustration.svg"
          alt="ellinor illustration"
        />
        <p class="section--intro__info">
          Elinor is a flexible tool and data system designed to track the
          management, governance, and equity status in areas under protection or
          management. Elinor seeks to streamline data collection, entry, and
          visualization for information on management, governance, and equity
          while also allowing flexibility on how data is gathered.
        </p>
        <button type="button" class="btn btn--opacity--child">
          <span class="btn--opacity__target">Crate an account</span>
          <img src="~/assets/img/ico-button-arrow.svg"/>
        </button>
      </div>
    </section>

    <section class="section section--text section--img-text">
      <div class="container">
        <div class="section--img-text__block">
          <div class="section--img-text__block-text">
            <h1 class="c-title">WHY SHOULD I USE IT?</h1>
            <p>
              Elinor can be applied as either a field-based assessment with a
              trained facilitator or as a desk-based tool that harnesses local
              and practitioner knowledge.
            </p>
            <p>The questions within Elinor are
              high-level, covering a broad range of topics and have been
              designed to supplement and not replace in-depth research exploring
              issues like equity, governance, gender and climate change.</p>
          </div>
          <div class="flex justify-end items-center">
            <img class="h-64 sm:h-48" src="~/assets/img/elinor-hand-icon.svg" />
          </div>
        </div>
      </div>
      <div class="section--img-text__block is-flushed">
        <div>
          <img class="w-full" src="~/assets/img/tracking.jpg" />
        </div>
        <div class="container">
          <div class="section--img-text__block-text">
          <h4 class="c-title--sm mb-12">Tracking change</h4>
          <p>
            Elinor has been designed primarily to help track changes over time,
            thus can be used at any stage in the project cycle to
          </p>
          <ul class="list-disc list-inside">
            <li>Indicate the suitability of a site for conservation</li>
            <li>
              Highlight areas that require more focused interventions to enhance
              implementation efforts.
            </li>
          </ul>
        </div>
        </div>
      </div>
    </section>

    <section class="section section--text section--turqy-light">
      <div class="container">
        <div class="g-grid--2-1-lg items-center">
          <div class="text-center lg:order-2">
            <img class="w-10/12" src="~/assets/img/elinor-pic.svg" />
            <blockquote class="elinor__sentence mx-auto">
              “Little by little, bit by bit, family by family, so much good can be done on so many levels.”
              <span class="elinor__sentence__name">
                ELINOR OSTROM
              </span>
            </blockquote>
          </div>
          <div class="lg:order-1">
            <h3 class="c-epi">In Honor</h3>
            <h4 class="c-title">Elinor “Lin” Ostrom</h4>
            <p>Elinor Ostrom was the first woman to win the Nobel Prize in economics in 2009, but her legacy extends far beyond that singular honor. Ostrom and her colleagues countered the dominant narrative around the tragedy of the commons (which argued that individuals pursue their own interest even when it goes against the collective good—made famous by an ecologist who was a known racist and eugenicist). Ostrom’s theory on governing the commons proved that our planet could be protected through community, collaboration, and cooperation.
            </p>
            <p>
            Research on the governance of common pool resource management pushed boundaries of science and challenged the usual divisions between disciplines. Working in true partnership with others who understood the world in different ways, Ostrom and her colleagues paved the way for a new research community and body of knowledge that embraces diversity and the intertwined nature of human and natural systems.
            </p>
            <p>
            Ostrom’s legacy shapes how we work today in conservation, and by honoring her in our work, we hope that her insights can help us all better support both the communities and governance systems that protect our natural resources now and into the future.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--text section--img-text">
      <div class="section--img-text__block is-flushed items-center">
        <div class="container">
          <div class="section--img-text__block-text">
          <h4 class="c-title--block">FAQ’s</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <NuxtLink :to="`/faq/`">
          <button type="button" class="btn btn--opacity--child">
            <span class="btn--opacity__target">Go to FAQ’s</span>
            <img src="~/assets/img/ico-button-arrow.svg" />
          </button>
          </NuxtLink>
        </div>
        </div>
        <div>
          <img class="w-full" src="~/assets/img/faq.jpg" />
        </div>
      </div>
      <div class="section--img-text__block is-flushed items-center">
        <div>
          <img class="w-full" src="~/assets/img/methodology.jpg" />
        </div>
        <div class="container">
          <div class="section--img-text__block-text">
            <h4 class="c-title--block">METHODOLOGY</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <NuxtLink :to="`/methodology/`">
            <button type="button" class="btn btn--opacity--child">
              <span class="btn--opacity__target">Go to Methodology</span>
              <img src="~/assets/img/ico-button-arrow.svg" />
            </button>
            </NuxtLink> 
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'sign-in',
  auth: 'guest',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    ...mapState({
      alerts: state => state.authentication.alerts
    })
  },
  mounted() {
    if (this.$route.params.verification === 'email-verification-sent') {
      this.$store.commit('authentication/setAlert', {name: 'emailVerificationSent', value: true});
    }

    if (this.$route.params.verification === 'email-verification-required') {
      this.$store.commit('authentication/setAlert', {name: 'emailVerificationRequired', value: true});
    }

    if (this.$route.params.verification === 'password-changed-successfully') {
      this.$store.commit('authentication/setAlert', {name: 'passwordChangedSuccessfully', value: true});
    }
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
