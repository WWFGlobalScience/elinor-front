<template>
  <div class="home-public">
    <section
      :class="{ 'section--sign-in--logged-in': $auth.loggedIn }"
      class="section section--sign-in"
    >
      <picture class="section__full-background">
        <img src="~/assets/img/signin-background.jpg" />
      </picture>
      <div class="home-container">
        <!-- signin card -->
        <div class="signin-content">
          <NuxtLink to="/" class="inline-flex justify-start">
            <img
              src="~/assets/img/elinor-sign-up-circle.svg"
              class="elinor__card--sign-in__logo"
            />
          </NuxtLink>
          <h1>
            {{ $t('pages.home.public.content.introduction.title') }}
          </h1>
          <p class="text-subtitle">
            {{ $t('pages.home.public.content.introduction.text') }}
          </p>
        </div>
        <div v-if="!$auth.loggedIn" class="elinor__card elinor__card--sign-in">
          <div class="elinor__card--sign-in__info">
            <div>
              <p class="text-[22px] leading-[30px] font-semibold">
                {{ $t('pages.home.public.signInTitle') }}
              </p>
            </div>
            <div>
              <p
                class="mb-0 text-grayy-lighter"
                v-if="
                  alerts.emailVerificationRequired ||
                  alerts.emailVerificationSent
                "
              >
                {{
                  $t('pages.home.public.signInTitleAndCreateAccountSeparator')
                }}
                <NuxtLink
                  to="/resend-verification-email"
                  class="text-turqy text-sm"
                  >{{
                    $t('pages.home.public.resendVerificationLink')
                  }}</NuxtLink
                >
              </p>
            </div>
          </div>

          <div>
            <div
              v-if="error"
              class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
              role="alert"
            >
              <strong class="font-bold">Error!</strong>
              <span class="block sm:inline">{{ error }}</span>
            </div>
            <div
              v-if="alerts.emailVerificationRequired"
              class="bg-red-100 mt-5 border border-red-400 text-red-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
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
              class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded-[12px] relative mb-5 text-body-14"
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
              class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
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
              class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
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
              class="bg-green-100 mt-5 border border-green-400 text-white-700 px-4 py-3 rounded relative"
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
                      :title="showPassword ? 'Hide password' : 'Show password'"
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

              <div class="elinor__card--sign-in__info info-start mt-4">
                <label class="custom-radio">
                  <input
                    type="checkbox"
                    name="answer"
                    id="answer-1"
                    v-model="remember"
                  />
                  <span class="custom-radio__label">{{
                    $t('pages.home.public.rememberMeCheckbox')
                  }}</span>
                </label>
                <div>
                  <NuxtLink
                    to="/forgot-password"
                    class="text-turqy mt-3 text-sm block sm:hidden capitalize"
                  >
                    {{ $t('pages.home.public.forgotPasswordLink') }}
                  </NuxtLink>
                </div>
              </div>
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
            </form>
          </div>
        </div>
        <div v-else class="elinor__card elinor__card--sign-in">
          <div class="elinor__card--sign-in__info">
            <div class="flex flex-col gap-6">
              <h4>
                {{ $t('pages.home.public.content.assessment.title') }}
              </h4>
              <p>
                {{ $t('pages.home.public.content.assessment.subtitle') }}
              </p>
              <div class="flex flex-col gap-4">
                <NuxtLink
                  to="/assessments?create=true"
                  class="btn btn--new-sm w-full justify-center capitalize"
                >
                  {{ $t('pages.home.public.content.assessment.btnCreate') }}
                </NuxtLink>
                <NuxtLink
                  to="/assessments?myAssessments=true"
                  class="btn btn--new-sm btn--tertiary w-full justify-center capitalize"
                >
                  {{ $t('pages.home.public.content.assessment.btnLibrary') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-[58px] md:bottom-[24px] left-1/2 -translate-x-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M19.9997 10.0001V14.2859M32.8569 14.2859C32.8569 10.8759 31.5023 7.60566 29.0911 5.19448C26.6799 2.7833 23.4096 1.42871 19.9997 1.42871C16.5898 1.42871 13.3195 2.7833 10.9083 5.19448C8.49717 7.60566 7.14258 10.8759 7.14258 14.2859V25.7144C7.14258 27.4029 7.47514 29.0747 8.12127 30.6346C8.7674 32.1945 9.71445 33.6119 10.9083 34.8058C12.1022 35.9997 13.5196 36.9467 15.0795 37.5929C16.6394 38.239 18.3113 38.5716 19.9997 38.5716C21.6881 38.5716 23.36 38.239 24.9199 37.5929C26.4798 36.9467 27.8972 35.9997 29.0911 34.8058C30.285 33.6119 31.232 32.1945 31.8782 30.6346C32.5243 29.0747 32.8569 27.4029 32.8569 25.7144V14.2859Z"
            stroke="white"
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </section>

    <!-- <section
            id="create-account"
            class="section section--intro section--turqy-light"
        >
            <div class="container">
                <img
                    src="~/assets/img/elinor-illustration.svg"
                    alt="ellinor illustration"
                />
                <p class="section--intro__info">
                    {{ $t('pages.home.public.content.introduction.text') }}
                </p>
                <NuxtLink
                    v-if="!$auth.loggedIn"
                    to="/create-account"
                    class="btn btn--opacity--child"
                >
                    <span class="btn--opacity__target">{{
                        $t(
                            'pages.home.public.content.introduction.createAccountLink',
                        )
                    }}</span>
                    <img src="~/assets/img/ico-button-arrow.svg" />
                </NuxtLink>
            </div>
        </section> -->

    <section
      class="section section--text section--intro-carousel section--img-text"
    >
      <div class="container">
        <div class="section--img-text__block-text">
          <h2>HOW TO USE ELINOR</h2>
          <div class="text-subtitle">
            The videos below demonstrate many of Elinor’s key features. Check
            them out to learn how to start your own assessment, or see the
            Methodology and Documentation pages for more detailed information.
          </div>
        </div>
      </div>
      <div class="carousel-container container">
        <carousel
          ref="carousel"
          :center-mode="true"
          :perPage="itemsPerView"
          :perPageCustom="[
            [0, 1],
            [768, 2],
            [1300, 3],
            [2000, 3],
          ]"
          :navigationEnabled="true"
          :paginationEnabled="true"
          @dragging="handleDragging"
        >
          <slide v-for="(item, index) in items" :key="index">
            <button
              @click="
                popupState({
                  active: true,
                  component: 'popup-show-video',
                  type: 'video',
                  title: item.title,
                  videoId: item.id,
                })
              "
              class="card-carousel relative"
            >
              <div class="relative">
                <img
                  :id="`thumb-${item.id}`"
                  :alt="`Contenido del video ${item.title}`"
                  class="carousel-thumb"
                  :src="`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`"
                />
                <!-- Play button overlay -->
                <div class="play-button-area">
                  <div class="play-button-overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <mask
                        id="mask0_7699_7922"
                        style="mask-type: alpha"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="33"
                        height="32"
                      >
                        <rect x="0.5" width="32" height="32" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_7699_7922)">
                        <path
                          d="M14.6993 21.0003L21.1993 16.8337C21.5105 16.6337 21.666 16.3559 21.666 16.0003C21.666 15.6448 21.5105 15.367 21.1993 15.167L14.6993 11.0003C14.366 10.7781 14.0271 10.7614 13.6827 10.9503C13.3382 11.1392 13.166 11.4337 13.166 11.8337V20.167C13.166 20.567 13.3382 20.8614 13.6827 21.0503C14.0271 21.2392 14.366 21.2225 14.6993 21.0003ZM16.4993 29.3337C14.6549 29.3337 12.9216 28.9837 11.2993 28.2837C9.67713 27.5837 8.26602 26.6337 7.06602 25.4337C5.86602 24.2337 4.91602 22.8225 4.21602 21.2003C3.51602 19.5781 3.16602 17.8448 3.16602 16.0003C3.16602 14.1559 3.51602 12.4225 4.21602 10.8003C4.91602 9.1781 5.86602 7.76699 7.06602 6.56699C8.26602 5.36699 9.67713 4.41699 11.2993 3.71699C12.9216 3.01699 14.6549 2.66699 16.4993 2.66699C18.3438 2.66699 20.0771 3.01699 21.6993 3.71699C23.3216 4.41699 24.7327 5.36699 25.9327 6.56699C27.1327 7.76699 28.0827 9.1781 28.7827 10.8003C29.4827 12.4225 29.8327 14.1559 29.8327 16.0003C29.8327 17.8448 29.4827 19.5781 28.7827 21.2003C28.0827 22.8225 27.1327 24.2337 25.9327 25.4337C24.7327 26.6337 23.3216 27.5837 21.6993 28.2837C20.0771 28.9837 18.3438 29.3337 16.4993 29.3337Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="duration-badge text-body-14">
                  {{ formatDuration(item.duration) }}
                </div>
              </div>
              <div class="card-carousel__info">
                <h4>
                  {{ item.title }}
                </h4>
              </div>
            </button>
          </slide>
        </carousel>
      </div>
    </section>

    <section id="about" class="section section--text section--img-text">
      <div class="container">
        <div class="section--img-text__block">
          <div class="section--img-text__block-text">
            <h2>
              {{ $t('pages.home.public.content.explanation.title') }}
            </h2>
            <p>
              {{ $t('pages.home.public.content.explanation.paragraph1') }}
            </p>
            <p>
              {{ $t('pages.home.public.content.explanation.paragraph2') }}
            </p>
            <p>
              {{ $t('pages.home.public.content.explanation.paragraph3') }}
            </p>
          </div>
          <div class="flex justify-center items-center">
            <img class="h-[299px]" src="~/assets/img/elinor-hand-icon.svg" />
          </div>
        </div>
        <div class="section--img-text__block pl-0">
          <div>
            <img class="w-full rounded-2xl" src="~/assets/img/tracking.jpg" />
          </div>
          <div class="section--img-text__block-text">
            <h2>
              {{
                $t('pages.home.public.content.explanation.trackingChange.title')
              }}
            </h2>
            <p
              v-html="
                $t('pages.home.public.content.explanation.trackingChange.text')
              "
            ></p>
            <ol
              class="list-decimal list-inside"
              v-html="
                $t('pages.home.public.content.explanation.trackingChange.list')
              "
            ></ol>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--text section--honor bg-[#E4F0F4]">
      <div class="container">
        <div class="text-center lg:order-2">
          <img
            class="w-full mx-auto"
            src="~/assets/img/elinir ilustration.svg"
          />
          <blockquote class="elinor__sentence mx-auto">
            <h5>"{{ $t('pages.home.public.content.elinor.quote.text') }}"</h5>
            <span class="elinor__sentence__name">
              {{ $t('pages.home.public.content.elinor.quote.author') }}
            </span>
          </blockquote>
        </div>
        <div class="lg:order-1">
          <h5>
            {{ $t('pages.home.public.content.elinor.title') }}
          </h5>
          <h2 class="uppercase mt-2 mb-4">
            {{ $t('pages.home.public.content.elinor.subtitle') }}
          </h2>
          <p>
            {{ $t('pages.home.public.content.elinor.paragraph1') }}
          </p>
          <p>
            {{ $t('pages.home.public.content.elinor.paragraph2') }}
          </p>
          <p>
            {{ $t('pages.home.public.content.elinor.paragraph3') }}
          </p>
        </div>
      </div>
    </section>

    <!-- <section
            id="faqs"
            class="section section--text section--img-text"
            style="padding-top: 1rem; padding-bottom: 1rem"
        ></section> -->
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapActions, mapState } from 'vuex';
import locales from '../../locales';
const numNews = 3;
const maxCharacters = 300;

export default {
  name: 'home-public',
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
    // Reset alerts when component first initializes
    this.$store.commit('authentication/resetAlerts');
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
