<template>
  <article class="page page--flushed">
    <section class="section section--sign-in">
      <picture class="section__full-background">
        <img src="~/assets/img/signin-background.jpg" />
      </picture>
      <div class="elinor__card elinor__card--sign-in">
        <NuxtLink to="/" class="flex justify-center">
          <img
            src="~/assets/img/elinor-sign-up-circle.svg"
            class="elinor__card--sign-in__logo"
          />
        </NuxtLink>
        <div class="elinor__card--sign-in__info">
          <div>
            <p class="text-xl mb-1.5">
              {{ $t('pages.auth.resetPassword.title') }}
            </p>
          </div>
        </div>

        <p class="text-base">
          {{ $t('pages.auth.resetPassword.subtitle') }}
        </p>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
          role="alert"
        >
          <strong class="font-bold">{{
            $t('pages.auth.resetPassword.error.title')
          }}</strong>
          <span class="block sm:inline">{{
            error[Object.keys(error)[0]][0]
          }}</span>
        </div>

        <form
          id="form--reset-password"
          class="form form--sign-in"
          @submit="submit"
        >
          <div class="form__group">
            <div class="form__row">
              <div class="input">
                <input
                  type="password"
                  :placeholder="$t('pages.auth.resetPassword.password1Input')"
                  v-model="password1"
                  required
                />
              </div>
            </div>
            <div class="form__row">
              <div class="input">
                <input
                  type="password"
                  :placeholder="$t('pages.auth.resetPassword.password2Input')"
                  v-model="password2"
                  required
                />
              </div>
            </div>
          </div>

          <div class="elinor__card--sign-in__info mt-9">
            <div>
              <button
                type="submit"
                class="btn--border-turqy btn--opacity--child"
              >
                <span class="btn--opacity__target">{{
                  $t('pages.auth.resetPassword.changePasswordButton')
                }}</span>
                <img src="~/assets/img/ico-signin-turqy.svg" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'reset-password',
  auth: 'guest',
  data() {
    return {
      password1: null,
      password2: null,
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.authentication.error,
    }),
  },
  mounted() {
    this.$store.commit('authentication/clearError');
  },
  methods: {
    ...mapActions({
      resetPassword: 'authentication/resetPassword',
    }),
    submit(event) {
      event.preventDefault();
      this.resetPassword({
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        password1: this.password1,
        password2: this.password2,
      });
    },
  },
};
</script>
