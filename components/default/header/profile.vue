<template>
    
    <ul v-if="$auth.loggedIn">

        <div class="elinor__dropdown lang-dropdown">
            <div class="elinor__dropdown-toggle">
                <div class="elinor__dropdown-toggle">
                    <div class="current" @click="toggleLangDropdown">
                        <span>EN</span>
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
                <li class="lang-dropdown-menu__item"><NuxtLink to="#">ES</NuxtLink></li>
                <li class="lang-dropdown-menu__item"><NuxtLink to="#">EN</NuxtLink></li>
            </ul>
        </div>

        <div class="elinor__dropdown">
            <div class="elinor__dropdown-toggle">
                <div class="elinor__avatar bg-turqy" @click="toggleDropdown">
                    <span>{{ user.username.charAt(0).toUpperCase() }}</span>
                </div>
            </div>
            <ul
                class="elinor__dropdown-menu"
                v-bind:class="[!isDropdownOpen ? 'isOpen' : null]"
            >
                <li class="elinor__dropdown-menu__item"><NuxtLink to="/profile">{{ $t('pages.home.header.profile') }}<img src="~assets/img/ico-users-access-turqy.svg" :alt="$t('pages.home.header.signOut')"></NuxtLink></li>
                <li class="elinor__dropdown-menu__item"><a @click="logout" role="button">{{ $t('pages.home.header.signOut') }}<img src="~assets/img/ico-signout-turqy.svg" :alt="$t('pages.home.header.signOut')"></a></li>
            </ul>
        </div>

        <li
            class="btn--opacity--child header--main__toggle-btn"
            @click="toggleSidebar"
        >
            <img
                v-if="isSidebarOpen"
                src="~/assets/img/ico-maximize-turqy.svg"
                alt="maximize"
                class="center-v w-12"
            />
            <img
                v-else
                src="~/assets/img/ico-minimize-turqy.svg"
                alt="minimize"
                class="center-v w-12 btn--opacity__target"
            />
        </li>

    </ul>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "default-header-profile",
    computed: {
        isSidebarOpen() {
            return this.$store.state.layout.sidebar;
        },
        isDropdownOpen() {
            return this.$store.state.dropdown.dropdown;
        },
        isLangDropdownOpen() {
            return this.$store.state.langdropdown.langdropdown;
        },
        user() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        ...mapActions({
            toggleSidebar: "layout/toggleSidebar",
            toggleDropdown: "dropdown/toggleDropdown",
            toggleLangDropdown: "langdropdown/toggleLangDropdown",
            logout: "authentication/logout",
        }),
    }
};
</script>
