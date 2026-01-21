<template>
  <article class="page page--create-account !p-0">
    <section class="section full-size">
      <div class="container">
        <div class="card__signin">
          <div>
            <h4>
              {{ $t('pages.auth.registration.title') }}
            </h4>
            <p v-html="$t('pages.auth.registration.subtitle')"></p>
          </div>
          <form id="form--signin" class="form form--signin" @submit="submit">
            <div>
              <div id="error" class="form__group" v-if="error">
                <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
                  role="alert"
                >
                  <strong class="font-bold">{{
                    $t('pages.auth.registration.validationErrorTitle')
                  }}</strong>
                </div>
              </div>
              <div class="form__group">
                <div class="form__row">
                  <div id="email" class="input">
                    <input
                      :class="{
                        'input--error': hasError('email'),
                      }"
                      v-model="form.email"
                      type="email"
                      name="email"
                      :placeholder="$t('pages.auth.registration.inputs.email')"
                    />
                    <p v-if="hasError('email')" class="msg msg--error">
                      {{ getError('email') }}
                    </p>
                  </div>
                </div>
                <div id="password1" class="form__row">
                  <div class="input">
                    <input
                      :class="{
                        'input--error': hasError('password1'),
                      }"
                      v-model="form.password1"
                      type="password"
                      name="password1"
                      :placeholder="
                        $t('pages.auth.registration.inputs.password1')
                      "
                    />
                    <p v-if="hasError('password1')" class="msg msg--error">
                      {{ getError('password1') }}
                    </p>
                  </div>
                </div>
                <div id="password2" class="form__row">
                  <div class="input">
                    <input
                      :class="{
                        'input--error': hasError('password2'),
                      }"
                      v-model="form.password2"
                      type="password"
                      name="password2"
                      :placeholder="
                        $t('pages.auth.registration.inputs.password2')
                      "
                    />
                    <p v-if="hasError('password2')" class="msg msg--error">
                      {{ getError('password2') }}
                    </p>
                  </div>
                </div>
                <div id="first_name" class="form__row">
                  <div class="input">
                    <input
                      :class="{
                        'input--error': hasError('first_name'),
                      }"
                      v-model="form.first_name"
                      type="text"
                      name="first_name"
                      :placeholder="
                        $t('pages.auth.registration.inputs.firstname')
                      "
                    />
                    <p v-if="hasError('first_name')" class="msg msg--error">
                      {{ getError('first_name') }}
                    </p>
                  </div>
                </div>
                <div id="last_name" class="form__row">
                  <div class="input">
                    <input
                      :class="{
                        'input--error': hasError('last_name'),
                      }"
                      v-model="form.last_name"
                      type="text"
                      name="last_name"
                      :placeholder="
                        $t('pages.auth.registration.inputs.lastname')
                      "
                    />
                    <p v-if="hasError('last_name')" class="msg msg--error">
                      {{ getError('last_name') }}
                    </p>
                  </div>
                </div>
                <div id="username" class="form__row">
                  <div class="input">
                    <input
                      :class="{
                        'input--error': hasError('username'),
                      }"
                      v-model="form.username"
                      type="text"
                      name="username"
                      :placeholder="
                        $t('pages.auth.registration.inputs.username')
                      "
                    />
                    <p v-if="hasError('username')" class="msg msg--error">
                      {{ getError('username') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__group">
              <div class="form__row">
                <label class="custom-radio">
                  <input
                    v-model="form.accept_tor"
                    type="checkbox"
                    id="terms-of-service"
                    name="terms-of-service"
                  />
                  <span class="custom-radio__label"
                    >{{ $t('pages.auth.registration.termsOfServiceCheckbox') }}
                    <NuxtLink
                      to="/terms-of-use"
                      class="text-turqy hover:underline"
                      >{{ $t('footer.termsOfUse') }}</NuxtLink
                    ></span
                  >
                </label>
              </div>
            </div>
            <div class="form__group">
              <div class="form__row">
                <button
                  type="submit"
                  form="form--signin"
                  class="btn btn--opacity--child w-full !justify-center"
                >
                  <span class="btn--opacity__target !m-0">{{
                    $t('pages.auth.registration.createAccountButton')
                  }}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'create-account',
  auth: 'guest',
  data() {
    return {
      form: {
        username: null,
        email: null,
        password1: null,
        password2: null,
        first_name: null,
        last_name: null,
        affiliation: null,
        accept_tor: false,
      },
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
      signUp: 'authentication/signUp',
    }),
    submit(event) {
      event.preventDefault();
      this.signUp(this.form);
    },
    hasError(field) {
      return this.error && this.error[field];
    },
    getError(field) {
      return this.error[field][0];
    },
  },
};
</script>
