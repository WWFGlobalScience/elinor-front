<template>
    <ul v-if="$auth.loggedIn">
      <li>
        <NuxtLink to="/" class="btn--opacity--child">
          <span class="btn--opacity__target">Select</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/faq/`" class="btn--opacity--child">
          <span class="btn--opacity__target">Avatar</span>
        </NuxtLink>
      </li>
      <li class="btn--opacity--child header--main__toggle-btn" @click="toggleSidebar">
        <img v-if="isSidebarOpen" src="~/assets/img/ico-maximize-turqy.svg" alt="maximize" class="center-v w-12">
        <img v-else src="~/assets/img/ico-minimize-turqy.svg" alt="minimize" class="center-v w-12 btn--opacity__target">
      </li>
    </ul>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "default-header-page",
  computed: {
    pages() {
      return this.$store.state.pages.list
    },
    isSidebarOpen(){
      return this.$store.state.layout.sidebar
    }
  },
  methods:{
    ...mapActions({
      toggleSidebar: 'layout/toggleSidebar'
    })
  }
};
</script>
