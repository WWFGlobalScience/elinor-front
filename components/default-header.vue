<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <ul>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">About</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/faq/`" class="btn--opacity--child">
            <span class="btn--opacity__target">Faqs</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/methodology/`" class="btn--opacity--child">
            <span class="btn--opacity__target">Methodology</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="btn--opacity--child">
            <span class="btn--opacity__target">Create Account</span>
          </NuxtLink>
        </li>
        <li class="btn--opacity--child header--main__toggle-btn" @click="toggleSidebar">
            <img v-if="isSidebarOpen" src="../assets/img/ico-maximize-turqy.svg" alt="maximize" class="center-v w-12">
            <img v-else src="../assets/img/ico-minimize-turqy.svg" alt="minimize" class="center-v w-12 btn--opacity__target">
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
      name: "default-header",
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
    }
</script>