<template>
    <div class="elinor__dropdown lang-dropdown" v-click-outside="externalClick">
        <div
            class="elinor__dropdown-toggle"
            :class="isOffline ? 'pointer-events-none' : ''"
        >
            <div class="elinor__dropdown-toggle">
                <div class="current" @click="toggleLangDropdown">
                    <span>{{ currentLanguage.name }}</span>
                    <div class="multiselect__caret" v-if="!isOffline">
                        <img src="~/assets/img/ico-select-turqy.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <ul
            v-if="!isOffline"
            class="lang-dropdown-menu"
            v-bind:class="[!isLangDropdownOpen ? 'isOpen' : null]"
        >
            <li
                class="lang-dropdown-menu__item"
                v-for="lang in availableLanguages"
                :key="lang.code"
                :value="lang.code"
                @click="onLanguageChange(lang)"
            >
                {{ lang.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import vClickOutside from 'v-click-outside';
export default {
    name: 'default-language-selector',
    directives: {
      clickOutside: vClickOutside.directive
    },
    computed: {
        availableLanguages() {
            return this.$i18n.locales.filter(
                (lang) => lang.code !== this.$i18n.locale,
            );
        },
        currentLanguage() {
            return this.$i18n.locales.find(
                (lang) => lang.code === this.$i18n.locale,
            );
        },
        ...mapState({
            isLangDropdownOpen: (state) => state.langdropdown.langdropdown,
            isOffline: (state) => state.layout.offline,
        }),
    },
    methods: {
        ...mapActions({
            toggleLangDropdown: 'langdropdown/toggleLangDropdown',
            closeDropdown: 'langdropdown/closeDropdown',
        }),
        onLanguageChange(language) {
            this.$i18n.setLocale(language.code);
            this.$axios.setHeader('Accept-Language', language.code);
            this.$store.dispatch('attributes/fetchAttributes');
            this.$store.dispatch('surveyquestions/fetchSurveyQuestions');
            this.toggleLangDropdown();
        },
        externalClick () {
            this.$store.dispatch('langdropdown/closeDropdown');
        }
    },
};
</script>
