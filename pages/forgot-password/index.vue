<template>
  <section class="section section--mt-0 section--sign-in">
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
          <p class="text-xl mb-1.5">{{ $t('pages.auth.content.forgot-password.title') }}</p>
        </div>
      </div>

      <p class="text-base">{{ $t('pages.auth.content.forgot-password.subtitle') }}</p>

      <div v-if="alerts.forgotPasswordEmailSent" class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Forgot password email  sent!</strong>
        <span class="block sm:inline">We have generated a link to reset your password</span>
      </div>

      <form id="form--signin" action="" class="form form--sign-in" @submit="forgotPassword">
        <div class="form__group">
          <div class="form__row">
            <div class="input">
              <input type="email" :placeholder="$t('pages.auth.content.forgot-password.email-placeholder')" v-model="email" required />
            </div>
          </div>
        </div>

        <div class="card--sign-in__info mt-9">
          <div>
            <button type="submit" class="btn--border-turqy btn--opacity--child">
              <span class="btn--opacity__target">Send email</span>
              <img src="~/assets/img/ico-signin-turqy.svg"/>
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
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
      forgotPassword: 'authentication/forgotPassword'
    }),
    submit(event) {
      event.preventDefault();
      this.forgotPassword(this.email);
    },
  }
}
</script>
