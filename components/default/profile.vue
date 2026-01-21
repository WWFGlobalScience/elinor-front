<template>
  <div class="relative" v-click-outside="externalClick">
    <div class="btn--opacity--child nav__main__link" @click="toggleDropdown">
      <div class="elinor__avatar !w-6 !min-w-[24px] !h-6 bg-white">
        <span class="!text-turqy">{{
          user.username.charAt(0).toUpperCase()
        }}</span>
      </div>
      <span
        class="btn--opacity__target whitespace-nowrap overflow-hidden text-ellipsis"
        >{{ user.first_name }} {{ user.last_name }}</span
      >
    </div>
    <div
      class="absolute bottom-full left-0 w-full bg-white rounded-md shadow-md z-10 overflow-hidden"
      v-if="isDropdownOpen"
    >
      <div @click="goToProfile" class="btn--opacity--child nav__main__link">
        <img
          src="~/assets/img/ico-users-access-turqy.svg"
          alt="sign in"
          class="w-6 h-6"
        />
        <span class="btn--opacity__target !text-turqy">{{
          $t('pages.home.header.profile')
        }}</span>
      </div>
      <a @click="logout" class="btn--opacity--child nav__main__link">
        <img src="~/assets/img/ico-signout-turqy.svg" alt="sign out" />
        <span class="btn--opacity__target !text-turqy">{{
          $t('pages.home.header.signOut')
        }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import vClickOutside from 'v-click-outside';

export default {
  name: 'default-profile',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      isOffline: (state) => state.layout.offline,
    }),
  },
  watch: {
    user: {
      handler(newVal) {
        // console.log('User:', newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout',
    }),
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    externalClick() {
      this.isDropdownOpen = false;
    },
    goToProfile() {
      this.isDropdownOpen = false;
      this.$router.push('/profile');
    },
  },
};
</script>
