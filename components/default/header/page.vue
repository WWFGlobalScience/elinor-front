<template>
    <ul v-if="$auth.loggedIn">
      <div class="elinor__avatar bg-turqy">
        <span>J</span>
      </div>
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
