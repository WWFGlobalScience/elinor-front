<template>
  <ul>
    <template v-if="$auth.loggedIn">
      <div
        class="elinor__dropdown"
        :class="isOffline ? 'pointer-events-none' : ''"
        v-click-outside="externalClick"
      >
        <div class="elinor__dropdown-toggle">
          <div class="elinor__avatar bg-turqy" @click="toggleDropdown">
            <span>{{ user.username.charAt(0).toUpperCase() }}</span>
          </div>
        </div>
        <ul
          v-if="!isOffline"
          class="elinor__dropdown-menu"
          v-bind:class="[!isDropdownOpen ? 'isOpen' : null]"
        >
          <li class="elinor__dropdown-menu__item">
            <NuxtLink to="/profile"
              >{{ $t('pages.home.header.profile')
              }}<img
                src="~assets/img/ico-users-access-turqy.svg"
                :alt="$t('pages.home.header.signOut')"
            /></NuxtLink>
          </li>
          <li class="elinor__dropdown-menu__item">
            <a @click="logout" role="button"
              >{{ $t('pages.home.header.signOut')
              }}<img
                src="~assets/img/ico-signout-turqy.svg"
                :alt="$t('pages.home.header.signOut')"
            /></a>
          </li>
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
    </template>
  </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import vClickOutside from 'v-click-outside';

export default {
  name: 'default-header-profile',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapState({
      isSidebarOpen: (state) => state.layout.sidebar,
      isDropdownOpen: (state) => state.dropdown.dropdown,
      user: (state) => state.auth.user,
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
      toggleSidebar: 'layout/toggleSidebar',
      toggleDropdown: 'dropdown/toggleDropdown',
      closeDropdown: 'dropdown/closeDropdown',
      logout: 'authentication/logout',
    }),
    externalClick() {
      this.$store.dispatch('dropdown/closeDropdown');
    },
  },
};
</script>
