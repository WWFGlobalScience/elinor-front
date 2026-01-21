<template>
  <article class="page page--create-account !p-0">
    <section class="section full-size">
      <div class="container">
        <div class="card__signin">
          <div>
            <h4 class="uppercase">
              {{ $t('pages.profile.header.title') }}
            </h4>
            <p v-html="$t('pages.profile.header.subtitle')"></p>
          </div>
          <div class="content">
            <div
              v-if="alerts.profileUpdatedSuccessfully"
              class="bg-green-100 mb-5 text-white-700 px-4 py-2 rounded relative"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.profileUpdatedSuccessfully.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t(
                  'pages.home.public.alerts.profileUpdatedSuccessfully.subtitle',
                )
              }}</span>
            </div>
            <form @submit="onSubmit" class="form">
              <fieldset class="form__group px-0">
                <div class="form__row">
                  <div class="input">
                    <label for="email" class="label">{{
                      $t('pages.profile.form.email')
                    }}</label>
                    <input
                      type="text"
                      id="email"
                      :placeholder="$t('pages.profile.form.email')"
                      v-model="form.email"
                      required
                    />
                  </div>
                </div>

                <div class="form__row">
                  <div class="input">
                    <label for="username" class="label"
                      >{{ $t('pages.profile.form.username') }}*</label
                    >
                    <input
                      type="text"
                      id="username"
                      :placeholder="$t('pages.profile.form.username')"
                      v-model="form.username"
                      required
                    />
                  </div>
                </div>

                <div class="form__row">
                  <div class="input">
                    <label for="password" class="label">{{
                      $t('pages.profile.form.password')
                    }}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="form.password"
                    />
                  </div>
                </div>

                <div class="form__row">
                  <div class="input">
                    <label for="first_name" class="label"
                      >{{ $t('pages.profile.form.first_name') }}*</label
                    >
                    <input
                      type="text"
                      id="first_name"
                      :placeholder="$t('pages.profile.form.first_name')"
                      v-model="form.first_name"
                      required
                    />
                  </div>
                </div>

                <div class="form__row">
                  <div class="input">
                    <label for="last_name" class="label"
                      >{{ $t('pages.profile.form.last_name') }}*</label
                    >
                    <input
                      type="text"
                      id="last_name"
                      :placeholder="$t('pages.profile.form.last_name')"
                      v-model="form.last_name"
                      required
                    />
                  </div>
                </div>

                <div class="row-btn justify-end">
                  <button
                    type="submit"
                    class="btn btn--new-sm w-full justify-center"
                  >
                    {{ $t('pages.profile.form.submit') }}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: this.$auth.user.email,
        password: null,
        username: this.$auth.user.username,
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
      },
    };
  },
  computed: {
    ...mapState({
      alerts: (state) => state.authentication.alerts,
    }),
  },
  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
    }),
    onSubmit(event) {
      event.preventDefault();
      // console.log(this.form);
      this.$store
        .dispatch('authentication/updateProfile', this.form)
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch(
              'authentication/resetProfileUpdatedSuccessfully',
            );
          }, 5000);
        });
    },
  },
};
</script>
