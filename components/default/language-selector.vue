<template>
  <div>
    <div class="elinor__dropdown lang-dropdown" v-click-outside="externalClick">
      <div
        class="elinor__dropdown-toggle"
        :class="isOffline ? 'pointer-events-none' : ''"
      >
        <div class="elinor__dropdown-toggle">
          <div class="current" @click="toggleLangDropdown">
            <div>
              <img
                src="~/assets/img/nav-icons/ico-lang-white.svg"
                alt="language"
              />
              <span>{{ languageNames[currentLanguage.code] }}</span>
            </div>
            <div class="multiselect__caret" v-if="!isOffline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <mask
                  id="mask0_9536_2998"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="18"
                  height="18"
                >
                  <rect width="18" height="18" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_9536_2998)">
                  <path
                    d="M8.99635 11.475C8.90635 11.475 8.82198 11.4594 8.74323 11.4281C8.66448 11.3969 8.59385 11.35 8.53135 11.2875L4.97523 7.73138C4.83348 7.58963 4.76573 7.42813 4.77198 7.24688C4.77823 7.06563 4.8501 6.90625 4.9876 6.76875C5.1251 6.63125 5.28448 6.5625 5.46573 6.5625C5.64698 6.5625 5.80635 6.63125 5.94385 6.76875L9.0001 9.84375L12.0751 6.76875C12.2126 6.63125 12.372 6.56563 12.5532 6.57188C12.7345 6.57813 12.8939 6.65 13.0314 6.7875C13.1689 6.925 13.2376 7.08438 13.2376 7.26562C13.2376 7.44688 13.1667 7.608 13.025 7.749L9.46885 11.2875C9.40135 11.35 9.32823 11.3969 9.24948 11.4281C9.17073 11.4594 9.08635 11.475 8.99635 11.475Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ul
        v-if="!isOffline"
        class="lang-dropdown-menu"
        v-bind:class="[isLangDropdownOpen ? 'isOpen' : null]"
      >
        <li
          class="lang-dropdown-menu__item"
          v-for="lang in availableLanguages"
          :key="lang.code"
          :value="lang.code"
          @click="onLanguageChange(lang)"
        >
          {{ languageNames[lang.code] }}
        </li>
      </ul>
    </div>
    <div class="language-message" v-if="languageMessage">
      <div class="language-message--content">
        {{ languageMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import vClickOutside from 'v-click-outside';
export default {
  name: 'default-language-selector',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isLangDropdownOpen: false,
      languageMessage: '',
      languageNames: {
        pt: 'Português',
        es: 'Español',
        id: 'Bahasa Indonesia',
        sw: 'Kiswahili',
        en: 'English',
        fr: 'Français',
        mg: 'Malagasy',
      },
    };
  },
  computed: {
    availableLanguages() {
      return this.$i18n.locales.filter(
        (lang) => lang.code !== this.$i18n.locale,
      );
    },
    currentLanguage() {
      return this.$i18n.locales.find((lang) => lang.code === this.$i18n.locale);
    },
    ...mapState({
      // isLangDropdownOpen: (state) => state.langdropdown.langdropdown,
      layoutOffline: (state) => state.layout.offline,
    }),
    isOffline() {
      // Only return true if offline mode feature flag is enabled
      // Check runtime config (via $config) or fallback to process.env
      // Defaults to true unless explicitly set to false
      let offlineModeEnabled = true;
      if (this.$config && this.$config.offlineMode === false) {
        offlineModeEnabled = false;
      } else if (process.env.OFFLINE_MODE === 'false') {
        offlineModeEnabled = false;
      }
      return offlineModeEnabled && this.layoutOffline;
    },
  },
  methods: {
    ...mapActions({
      // toggleLangDropdown: 'langdropdown/toggleLangDropdown',
      // closeDropdown: 'langdropdown/closeDropdown',
    }),
    toggleLangDropdown() {
      this.isLangDropdownOpen = !this.isLangDropdownOpen;
    },
    onLanguageChange(language) {
      this.$i18n.setLocale(language.code);
      this.$axios.setHeader('Accept-Language', language.code);
      this.$store.dispatch('attributes/fetchAttributes');
      this.$store.dispatch('surveyquestions/fetchSurveyQuestions');
      // this.toggleLangDropdown();
      this.isLangDropdownOpen = false;
      console.log('language', language);
      // Show toast notification for language change
      this.languageMessage =
        'You are now viewing this website in ' +
        this.languageNames[language.code];

      setTimeout(() => {
        this.languageMessage = '';
      }, 5000);
    },
    externalClick() {
      // this.$store.dispatch('langdropdown/closeDropdown');
      this.isLangDropdownOpen = false;
    },
  },
};
</script>
