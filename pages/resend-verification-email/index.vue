<template>
  <article class="page page--flushed">
    <section class="section section--sign-in">
      <picture class="section__full-background">
        <img src="~/assets/img/signin-background.jpg"/>
      </picture>
      <div class="elinor__card elinor__card--sign-in">
        <NuxtLink to="/" class="flex justify-center">
          <img src="~/assets/img/elinor-sign-up-circle.svg" class="elinor__card--sign-in__logo"/>
        </NuxtLink>
        <div class="elinor__card--sign-in__info">
          <div>
            <p class="text-xl mb-1.5">{{ $t('pages.auth.resendVerificationEmail.title') }}</p>
          </div>
        </div>

        <p class="text-base">{{ $t('pages.auth.resendVerificationEmail.subtitle') }}</p>
          <div v-if="error"
               class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">{{ error }}</strong>
          </div>

        <div v-if="alerts.resendVerificationEmailSent"
             class="bg-green-100 mt-10 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ $t('pages.auth.forgotPassword.alerts.forgotPasswordEmailSent.title') }}</strong>
          <span class="block sm:inline">{{ $t('pages.auth.forgotPassword.alerts.forgotPasswordEmailSent.subtitle') }}</span>
        </div>

        <form id="form--signin" class="form form--sign-in" @submit="submit">
          <div v-if="!alerts.resendVerificationEmailSent" class="form__group">
            <div class="form__row">
              <div class="input">
                <input type="email" :placeholder="$t('pages.auth.resendVerificationEmail.emailInput')" v-model="email" required/>
              </div>
            </div>
          </div>

          <div class="elinor__card--sign-in__info mt-9">
            <div>
              <button v-if="!alerts.resendVerificationEmailSent" type="submit" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target">{{ $t('pages.auth.resendVerificationEmail.sendEmailButton') }}</span>
                <img src="~/assets/img/ico-signin-turqy.svg"/>
              </button>
              <button v-if="alerts.resendVerificationEmailSent" @click.prevent.stop="reset" type="button" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target">{{ $t('pages.auth.resendVerificationEmail.tryAgainButton') }}</span>
                <img src="~/assets/img/ico-signin-turqy.svg"/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </article>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'resend-verification-email',
  auth: 'guest',
  data() {
    return {
      email: null
    }
  },
    computed: {
    ...mapState({
      alerts: state => state.authentication.alerts,
      error: state => state.authentication.error
    })
  },
    mounted() {
        this.$store.commit('authentication/clearError');
    },
  methods: {
    ...mapActions({
        resendEmail: 'authentication/resendEmail'
    }),
    submit(event) {
      event.preventDefault();
      this.resendEmail(this.email);
    },
  }
}
</script>
