<template>
  <aside
    class="sidebar__main"
    id="elinor__sidebar"
    v-bind:class="[
      !isSidebarOpen ? 'sidebar__main--min' : null,
      isMobileMenuOpen ? 'sidebar__mobile--open' : '',
    ]"
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
          <img src="~/assets/img/elinor.svg" class="brand__text" alt="" />
        </NuxtLink>
        <!-- Mobile close button -->
        <button
          @click.stop="closeMobileMenu"
          class="sidebar__mobile-close"
          aria-label="Close menu"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <nav class="nav__main nav__main--top">
        <ul>
          <li v-for="(page, index) in pages" :key="index">
            <!-- Parent navigation item -->
            <div v-if="isParentPage(page)" class="nav__main__parent">
              <div
                class="btn--opacity--child nav__main__link nav__main__parent__header"
                @click="toggleParent(page)"
                :class="{
                  'nav__main__parent__header--active': expandedParents.includes(
                    page.path,
                  ),
                }"
              >
                <div class="flex items-center">
                  <img
                    v-if="page.icons.turqy"
                    :src="
                      isLinkActive(page) ? page.icons.white : page.icons.white
                    "
                    :alt="getPageTitle(page)"
                    class="center-v"
                  />
                  <span class="btn--opacity__target">{{
                    getPageTitle(page)
                  }}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  class="parent-arrow"
                >
                  <mask
                    id="mask0_9536_2189"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                  >
                    <rect width="18" height="18" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_9536_2189)">
                    <path
                      d="M8.99626 11.475C8.90626 11.475 8.82188 11.4594 8.74313 11.4281C8.66438 11.3969 8.59376 11.35 8.53126 11.2875L4.97513 7.73138C4.83338 7.58963 4.76563 7.42813 4.77188 7.24688C4.77813 7.06563 4.85001 6.90625 4.98751 6.76875C5.12501 6.63125 5.28438 6.5625 5.46563 6.5625C5.64688 6.5625 5.80626 6.63125 5.94376 6.76875L9.00001 9.84375L12.075 6.76875C12.2125 6.63125 12.3719 6.56563 12.5531 6.57188C12.7344 6.57813 12.8938 6.65 13.0313 6.7875C13.1688 6.925 13.2375 7.08438 13.2375 7.26562C13.2375 7.44688 13.1666 7.608 13.0249 7.749L9.46876 11.2875C9.40126 11.35 9.32813 11.3969 9.24938 11.4281C9.17063 11.4594 9.08626 11.475 8.99626 11.475Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>

              <!-- Children navigation -->
              <ul
                v-if="expandedParents.includes(page.path)"
                class="nav__main__children"
              >
                <li
                  v-for="(child, childIndex) in getPageChildren(page)"
                  :key="childIndex"
                >
                  <!-- <NuxtLink
                                        v-if="
                                            child.config.display.auth === null ||
                                            child.config.display.auth === isUserAuthenticated
                                        "
                                        :to="`/${$t(child.slug)}`"
                                    > -->
                  <a
                    @click="goTo(child)"
                    class="btn--opacity--child nav__main__link nav__main__child"
                    v-if="
                      child.config.display.auth === null ||
                      child.config.display.auth === isUserAuthenticated
                    "
                    :class="{
                      'nuxt-link-active': isLinkActive(child),
                      'pointer-events-none opacity-50':
                        isOffline && !child.offlineTitle,
                    }"
                  >
                    <img
                      v-if="page.icons.turqy"
                      :src="
                        isLinkActive(child)
                          ? child.icons.turqy
                          : child.icons.white
                      "
                      :alt="getPageTitle(page)"
                      class="center-v"
                    />
                    <span class="btn--opacity__target">{{
                      getPageTitle(child)
                    }}</span>
                  </a>
                  <!-- </NuxtLink> -->
                </li>
              </ul>
            </div>

            <!-- Regular navigation item -->
            <NuxtLink
              v-else-if="
                (page.config.display.auth === null ||
                  page.config.display.auth === isUserAuthenticated) &&
                !page.children
              "
              v-slot="{ href, route, navigate }"
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
                    isLinkActive(page) ? page.icons.turqy : page.icons.white
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
        <!-- <img
                    @click="home"
                    style="cursor: pointer"
                    class="nav__main__bottom-brand"
                    src="~/assets/img/elinor-sidebar-circle.svg"
                    alt="elinor-sidebar-circle"
                /> -->
        <div class="nav__bottom">
          <default-language-selector />
          <default-profile v-if="$auth.loggedIn" />
          <NuxtLink
            v-if="!$auth.loggedIn"
            to="/sign-in"
            class="btn--opacity--child nav__main__link"
          >
            <img src="~/assets/img/ico-signin-white.svg" alt="sign in" />
            <span class="btn--opacity__target">Sign in</span>
          </NuxtLink>
        </div>
      </nav>
      <div class="copyright-wrapper">
        <div class="copyright">
          <div>
            <NuxtLink to="/terms-of-use">{{
              $t('footer.termsOfUse')
            }}</NuxtLink>
            | All rights reserved.
          </div>
          <div>{{ $t('footer.copyright') }} {{ currentYear }} Elinor</div>
        </div>
        <!-- <ul>
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
                </ul> -->
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'default-sidebar',
  data() {
    return {
      expandedParents: [],
    };
  },
  computed: {
    pages() {
      const pagesData = this.$store.state.pageslatest.list;
      return pagesData;
    },
    currentYear() {
      return new Date().getFullYear();
    },
    isSidebarOpen() {
      return this.$store.state.layout.sidebar;
    },
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
      return offlineModeEnabled && this.$store.state.layout.offline;
    },
    isUserAuthenticated() {
      return this.$auth.loggedIn;
    },
    currentRoute() {
      return this.$route.fullPath;
    },
    isMobileMenuOpen() {
      return this.$store.state.layout.mobileMenuOpen || false;
    },
  },
  mounted() {
    // Debug store state on component mount
    // console.log('Store state on mount:', this.$store.state.pages);
    // console.log('Current pages:', this.pages);

    // Check if store is reactive
    this.$store.watch(
      (state) => state.pageslatest.list,
      (newPages) => {
        // console.log('Store updated:', newPages);
      },
    );

    // Auto-expand parents with active children on mount
    this.autoExpandActiveParents();
  },
  watch: {
    // Watch for route changes to auto-expand parents
    currentRoute() {
      this.autoExpandActiveParents();
    },
  },
  methods: {
    ...mapActions({
      toggleSidebar: 'layout/toggleSidebar',
    }),
    closeMobileMenu() {
      this.$store.commit('layout/setMobileMenuOpen', false);
    },
    goTo(page) {
      const route = this.$t(page.slug);
      // console.log('route', route);
      // console.log('this.$route.fullPath', this.$route.fullPath);
      // if (this.$route.fullPath === '/map') {
      //   window.location.href = route;
      // } else {
        this.$router.push(route === '' ? '/' : route);
      // }
      // Close mobile menu after navigation
      this.closeMobileMenu();
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
        this.isOffline && page.offlineTitle ? page.offlineTitle : page.title;
      return this.$t(title);
    },
    isParentPage(page) {
      // Check if the page has children property in the store
      return page.children && page.children.length > 0;
    },
    toggleParent(page) {
      const index = this.expandedParents.indexOf(page.path);
      if (index > -1) {
        this.expandedParents.splice(index, 1);
      } else {
        this.expandedParents.push(page.path);
      }

      // console.log('expandedParents', this.expandedParents);

      return this.expandedParents;
    },
    isParentActive(page) {
      // Check if parent is expanded OR if any child is currently active
      const isExpanded = this.getPageChildren(page).some((child) =>
        this.isLinkActive(child),
      );
      if (!isExpanded) {
        const index = this.expandedParents.indexOf(page.path);
        if (index > -1) {
          this.expandedParents.splice(index, 1);
        }
      }
      return isExpanded;
    },
    getPageChildren(page) {
      // Use children from the store
      return page.children || [];
    },
    getParentArrowIcon(page) {
      const isExpanded = this.expandedParents.includes(page.path);
      return isExpanded
        ? require('~/assets/img/ico-arrow-up.svg')
        : require('~/assets/img/ico-arrow-down.svg');
    },
    autoExpandActiveParents() {
      // Auto-expand parents that have active children
      this.pages.forEach((page) => {
        if (this.isParentPage(page)) {
          const hasActiveChild = this.getPageChildren(page).some((child) =>
            this.isLinkActive(child),
          );
          if (hasActiveChild && !this.expandedParents.includes(page.path)) {
            this.expandedParents.push(page.path);
          }
        }
      });
    },
  },
};
</script>
