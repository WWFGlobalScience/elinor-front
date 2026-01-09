<template>
  <article class="page page--create-account !p-0">
    <section class="section full-size">
      <div class="container">
        <div class="card__signin">
          <div>
            <h4>
              {{ $t('pages.home.public.signInTitle') }}
            </h4>
          </div>

          <div>
            <div
              v-if="error"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[16px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">Error!</strong>
              <span class="block sm:inline">{{ error }}</span>
            </div>
            <div
              v-if="alerts.emailVerificationRequired"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[16px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.emailVerificationRequired.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t(
                  'pages.home.public.alerts.emailVerificationRequired.subtitle',
                )
              }}</span>
            </div>

            <div
              v-if="alerts.emailVerificationSent"
              class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.emailVerificationSent.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t('pages.home.public.alerts.emailVerificationSent.subtitle')
              }}</span>
            </div>

            <div
              v-if="alerts.passwordChangedSuccessfully"
              class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.passwordChangedSuccessfully.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t(
                  'pages.home.public.alerts.passwordChangedSuccessfully.subtitle',
                )
              }}</span>
            </div>

            <div
              v-if="alerts.emailVerifiedSuccessfully"
              class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.emailVerifiedSuccessfully.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t(
                  'pages.home.public.alerts.emailVerifiedSuccessfully.subtitle',
                )
              }}</span>
            </div>

            <div
              v-if="alerts.accountDeletedSuccessfully"
              class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">{{
                $t('pages.home.public.alerts.accountDeletedSuccessfully.title')
              }}</strong>
              <span class="block sm:inline">{{
                $t(
                  'pages.home.public.alerts.accountDeletedSuccessfully.subtitle',
                )
              }}</span>
            </div>

            <form id="form--signin" @submit="submit" class="form form--sign-in">
              <div class="flex flex-col gap-4">
                <div class="form__group">
                  <div class="form__row">
                    <div class="input">
                      <input
                        type="text"
                        :placeholder="$t('pages.home.public.usernameInput')"
                        v-model="username"
                        required
                      />
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        :placeholder="$t('pages.home.public.passwordInput')"
                        v-model="password"
                        required
                      />
                      <button
                        type="button"
                        @click="togglePasswordVisibility"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        :title="
                          showPassword ? 'Hide password' : 'Show password'
                        "
                      >
                        <img
                          v-if="!showPassword"
                          src="~/assets/img/visibility_off.svg"
                          class="w-5 h-5"
                          alt="Hide password"
                        />
                        <img
                          v-else
                          src="~/assets/img/ico-eye-turqy-light.svg"
                          class="w-5 h-5 opacity-100"
                          alt="Show password"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div class="form__group">
                  <div class="form__row items-center justify-between">
                    <label class="custom-radio">
                      <input
                        v-model="remember"
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                      />
                      <span class="custom-radio__label">{{
                        $t('pages.home.public.rememberMeCheckbox')
                      }}</span>
                    </label>
                    <NuxtLink
                      to="/forgot-password"
                      class="text-turqy mt-3 text-sm block sm:hidden"
                    >
                      {{ $t('pages.home.public.forgotPasswordLink') }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div>
                <div class="button-container">
                  <button type="submit" class="btn--border-white btn--md">
                    <span class="btn--opacity__target">{{
                      $t('pages.home.public.signInButton')
                    }}</span>
                    <img src="~/assets/img/ico-signin-white.svg" />
                  </button>

                  <NuxtLink to="/create-account" class="create-account-link capitalize">
                    {{ $t('pages.home.public.createAccountLink') }}
                  </NuxtLink>

                  <NuxtLink
                    to="/forgot-password"
                    class="text-turqy mt-3 mx-auto text-sm hidden sm:block"
                  >
                    {{ $t('pages.home.public.forgotPasswordLink') }}
                  </NuxtLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapActions, mapState } from 'vuex';
import locales from '../../locales';
const numNews = 3;
const maxCharacters = 300;

export default {
  name: 'sign-in',
  auth: 'guest',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      username: null,
      password: null,
      remember: false,
      maxCharacters,

      isDragging: false,
      itemsPerView: 4,
      items: [
        {
          id: '9bxrsgW82L4',
          title: 'Introduction to Elinor',
          duration: '2:45',
        },
        {
          id: 'nA5LNNuqpKQ',
          title: 'How to create a new assessment',
          duration: '4:12',
        },
        {
          id: 'CX8LucMtgdg',
          title: 'How to generate a report',
          duration: '3:28',
        },
        {
          id: '1AJ-g-2y8pQ',
          title: 'How to change assestment privacy',
          duration: '1:55',
        },
        {
          id: 'z1T6DnDNVIg',
          title: 'How to add a Collaborator',
          duration: '2:18',
        },
      ],
      showPassword: false,
    };
  },

  computed: {
    ...mapState({
      alerts: (state) => state.authentication.alerts,
      error: (state) => state.authentication.error,
    }),
  },

  activated() {
    this.$store.commit('authentication/clearError');
  },

  mounted() {
    // Optionally fetch YouTube durations when component mounts
    // this.fetchYouTubeDurations();
  },

  methods: {
    ...mapActions({
      popupState: 'popup/popupState',
      signIn: 'authentication/signIn',
    }),
    submit(event) {
      event.preventDefault();
      this.signIn({ username: this.username, password: this.password });
    },
    handleDragging(isDragging) {
      this.isDragging = isDragging;
      // console.log('status:', this.isDragging);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    formatDuration(duration) {
      if (!duration) return '';

      // If duration is already in MM:SS format, return as is
      if (duration.includes(':')) {
        return duration;
      }

      // If duration is in seconds, convert to MM:SS
      const totalSeconds = parseInt(duration);
      if (!isNaN(totalSeconds)) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      return duration;
    },
    async fetchYouTubeDurations() {
      // Note: This would require a YouTube Data API key
      // For now, we'll use the hardcoded durations
      // In a real implementation, you would:
      // 1. Get a YouTube Data API key
      // 2. Make requests to: https://www.googleapis.com/youtube/v3/videos?id={videoId}&part=contentDetails&key={API_KEY}
      // 3. Parse the ISO 8601 duration format (e.g., "PT2M45S" -> "2:45")

      // console.log(
      //   'YouTube duration fetching would be implemented here with API key',
      // );
    },
  },
};
</script>
