<template>
  <article class="page page--signin">
    <section class="section section--sign-in">
      <div class="section__full-background">
        <img src="~/assets/img/signin-background.jpg"/>
      </div>
      <div class="card card--sign-in">
        <NuxtLink to="/" class="flex justify-center">
          <img src="~/assets/img/elinor-logo.svg"/>
        </NuxtLink>
        <hr class="card--sign-in__separator"/>
        <div class="card--sign-in__info">
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

          <div class="card--sign-in__info info-start mt-9">
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
    <section class="section section--intro">
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

    <section class="section">
      <div class="container">
        <div class="grid grid-cols-2 gap-16">
          <div>
            <h1 class="section__title">WHY SHOULD I USE IT?</h1>
            <p>
              Elinor can be applied as either a field-based assessment with a
              trained facilitator or as a desk-based tool that harnesses local
              and practitioner knowledge. The questions within Elinor are
              high-level, covering a broad range of topics and have been
              designed to supplement and not replace in-depth research exploring
              issues like equity, governance, gender and climate change.
            </p>
          </div>
          <div class="flex justify-end">
            <img src="~/assets/img/elinor-hand-icon.svg"/>
          </div>
        </div>
      </div>
      <div class="mt-12 grid grid-cols-2 gap-16">
        <div>
          <img class="w-full" src="~/assets/img/tracking.png"/>
        </div>
        <div>
          <h4 class="section__title--block">TRACKING CHANGE</h4>
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
