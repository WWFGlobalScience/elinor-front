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
            <p class="text-xl mb-1.5">{{ $t('pages.auth.content.forgot-password.title') }}</p>
          </div>
        </div>

        <p class="text-base">{{ $t('pages.auth.content.forgot-password.subtitle') }}</p>

        <div v-if="alerts.forgotPasswordEmailSent"
             class="bg-green-100 mt-10 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Forgot password email sent!</strong>
          <span class="block sm:inline">We have generated a link to reset your password</span>
        </div>

        <form id="form--signin" class="form form--sign-in" @submit="submit">
          <div v-if="!alerts.forgotPasswordEmailSent" class="form__group">
            <div class="form__row">
              <div class="input">
                <input type="email" :placeholder="$t('pages.auth.content.forgot-password.email-placeholder')"
                       v-model="email" required/>
              </div>
            </div>
          </div>

          <div class="elinor__card--sign-in__info mt-9">
            <div>
              <button v-if="!alerts.forgotPasswordEmailSent" type="submit" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target">Send email</span>
                <img src="~/assets/img/ico-signin-turqy.svg"/>
              </button>
              <button v-if="alerts.forgotPasswordEmailSent" @click.prevent.stop="reset" type="button" class="btn--border-turqy btn--opacity--child">
                <span class="btn--opacity__target">Try again</span>
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
  name: 'forgot-password',
  auth: 'guest',
  data() {
    return {
      email: null
    }
  },
    computed: {
    ...mapState({
      alerts: state => state.authentication.alerts
    })
  },
  methods: {
    ...mapActions({
      forgotPassword: 'authentication/forgotPassword',
      resetForgotPassword: 'authentication/resetForgotPassword'
    }),
    submit(event) {
      event.preventDefault();
      this.forgotPassword(this.email);
    },
      reset() {
        this.resetForgotPassword();
      }
  }
}
</script>
