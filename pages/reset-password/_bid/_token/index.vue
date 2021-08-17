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
          <p class="text-xl mb-1.5">{{ $t('pages.auth.content.reset-password.title') }}</p>
        </div>
      </div>

      <p class="text-base">{{ $t('pages.auth.content.reset-password.subtitle') }}</p>

      <div v-if="error" class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">Error</span>
      </div>

      <form id="form--reset-password" class="form form--sign-in" @submit="resetPassword">
        <div class="form__group">
          <div class="form__row">
            <div class="input">
              <input type="password" :placeholder="$t('pages.auth.content.reset-password.password1-placeholder')" v-model="password1" required />
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <input type="password" :placeholder="$t('pages.auth.content.reset-password.password2-placeholder')" v-model="password2" required />
            </div>
          </div>
        </div>

        <div class="card--sign-in__info mt-9">
          <div>
            <button type="submit" class="btn--border-turqy btn--opacity--child">
              <span class="btn--opacity__target">Change password</span>
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
  name: 'reset-password',
  auth: 'guest',
  data() {
    return {
      password1: null,
      password2: null
    }
  },
  computed: {
    ...mapState({
      error: state => state.authentication.error
    })
  },
  methods: {
    ...mapActions({
      resetPassword: 'authentication/resetPassword'
    }),
    submit(event) {
      event.preventDefault();
      this.resetPassword({
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        password1: this.password1,
        password2: this.password2
      });
    },
  }
}
</script>
