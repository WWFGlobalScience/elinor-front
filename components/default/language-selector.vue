<template>
    <div class="elinor__dropdown lang-dropdown">
        <div class="elinor__dropdown-toggle">
            <div class="elinor__dropdown-toggle">
                <div class="current" @click="toggleLangDropdown">
                    <span>{{ currentLanguage.name }}</span>
                    <div class="multiselect__caret">
                        <img src="~/assets/img/ico-select-turqy.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <ul
            class="lang-dropdown-menu"
            v-bind:class="[!isLangDropdownOpen ? 'isOpen' : null]"
        >
            <li class="lang-dropdown-menu__item"
                v-for="lang in availableLanguages"
                :key="lang.code"
                :value="lang.code"
                @click="onLanguageChange(lang)">
                {{ lang.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "default-language-selector",
    computed: {
        availableLanguages() {
            return this.$i18n.locales.filter(lang => lang.code !== this.$i18n.locale);
        },
        currentLanguage() {
            return this.$i18n.locales.find(lang => lang.code === this.$i18n.locale);
        },
        ...mapState({
            isLangDropdownOpen: state => state.langdropdown.langdropdown
        })
    },
    methods: {
        ...mapActions({
            toggleLangDropdown: "langdropdown/toggleLangDropdown",
        }),
        onLanguageChange(language) {
            this.$i18n.setLocale(language.code);
            const locale = this.$i18n.locales.find(lang => lang.code !== this.$i18n.locale);
            this.$axios.setHeader('Accept-Language', locale.iso);
            this.$store.dispatch('attributes/fetchAttributes');
            this.$store.dispatch('surveyquestions/fetchSurveyQuestions');
            this.toggleLangDropdown();
        }
    }
};
</script>
