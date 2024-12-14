<template>
    <aside
        class="sidebar__main"
        id="elinor__sidebar"
        v-bind:class="[!isSidebarOpen ? 'sidebar__main--min' : null]"
    >
        <div class="sidebar__wrap">
            <div class="brand">
                <NuxtLink
                    :class="isOffline ? 'pointer-events-none' : ''"
                    :event="isOffline ? '' : 'click'"
                    to="/"
                    class="flex items-center"
                >
                    <img
                        src="~/assets/img/elinor-icon-white.svg"
                        class="brand__icon"
                        alt=""
                    />
                    <img
                        src="~/assets/img/elinor.svg"
                        class="brand__text"
                        alt=""
                    />
                </NuxtLink>
            </div>
            <nav class="nav__main">
                <ul>
                    <li v-for="(page, index) in pages">
                        <NuxtLink
                            v-slot="{ href, route, navigate }"
                            v-if="
                                page.config.display.auth === null ||
                                page.config.display.auth === isUserAuthenticated
                            "
                            :to="`/${$t(page.slug)}`"
                        >
                            <a
                                @click="goTo(page)"
                                class="btn--opacity--child nav__main__link"
                                :class="{
                                    'nuxt-link-active': isLinkActive(page),
                                    'pointer-events-none opacity-50':
                                        isOffline && !page.offlineTitle,
                                }"
                            >
                                <img
                                    v-if="page.icons.turqy"
                                    :src="
                                        isLinkActive(page)
                                            ? page.icons.turqy
                                            : page.icons.white
                                    "
                                    :alt="getPageTitle(page)"
                                    class="center-v"
                                />
                                <span class="btn--opacity__target">{{
                                    getPageTitle(page)
                                }}</span>
                                <div
                                    class="input__tooltip"
                                    :content="getPageTitle(page)"
                                    v-tippy="{ placement: 'right' }"
                                >
                                    &nbsp;
                                </div>
                            </a>
                        </NuxtLink>
                    </li>
                </ul>
                <img
                    @click="home"
                    style="cursor: pointer"
                    class="nav__main__bottom-brand"
                    src="~/assets/img/elinor-sidebar-circle.svg"
                    alt="elinor-sidebar-circle"
                />
            </nav>
            <div class="nav__main nav__main--bottom">
                <ul>
                    <li class="btn--opacity--child" @click="toggleSidebar">
                        <div class="nav__main__link">
                            <img
                                v-if="isSidebarOpen"
                                src="~/assets/img/ico-minimize-white.svg"
                                alt="minimize"
                                class="center-v"
                            />
                            <img
                                v-else
                                src="~/assets/img/ico-maximize-white.svg"
                                alt="maximize"
                                class="center-v w-4 btn--opacity__target"
                            />
                            <span class="btn--opacity__target">{{
                                $t('sidebar.minimize')
                            }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'default-sidebar',
    computed: {
        pages() {
            return this.$store.state.pages.list;
        },
        isSidebarOpen() {
            return this.$store.state.layout.sidebar;
        },
        isOffline() {
            return this.$store.state.layout.offline;
        },
        isUserAuthenticated() {
            return this.$auth.loggedIn;
        },
    },
    methods: {
        ...mapActions({
            toggleSidebar: 'layout/toggleSidebar',
        }),
        goTo(page) {
            const route = this.$t(page.slug);
            this.$router.push(route === '' ? '/' : route);
        },
        home() {
            this.$router.push('/');
        },
        isLinkActive(page) {
            const slug = this.$t(page.slug);
            if (this.$route.fullPath === '/') {
                return slug === '';
            }

            if (slug === '') {
                return false;
            }

            return this.$route.fullPath.indexOf(slug) !== -1;
        },
        getPageTitle(page) {
            const title =
                this.isOffline && page.offlineTitle
                    ? page.offlineTitle
                    : page.title;
            return this.$t(title);
        },
    },
};
</script>
