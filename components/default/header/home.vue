<template>
  <header class="header--main">
    <nav class="header--main__wrapper">
      <ul>
        <li>
          <a role="button" class="btn--opacity--child" v-scroll-to="'#about'">
            <span class="btn--opacity__target" >{{ $t('pages.home.header.aboutLink') }}</span>
          </a>
        </li>
        <li>
          <nuxt-link to="contact" role="button" class="btn--opacity--child">
            <span class="btn--opacity__target">{{ $t('pages.home.header.contactLink') }}</span>
          </nuxt-link>
        </li>
        <li v-if="!$auth.loggedIn">
          <a role="button" class="btn--opacity--child" v-scroll-to="'#create-account'">
            <span class="btn--opacity__target">{{ $t('pages.home.header.createAccountLink') }}</span>
          </a>
        </li>
        <li class="btn--opacity--child header--main__toggle-btn" @click="toggleSidebar">
            <img v-if="isSidebarOpen" src="~/assets/img/ico-maximize-turqy.svg" alt="maximize" class="center-v w-12">
            <img v-else src="~/assets/img/ico-minimize-turqy.svg" alt="minimize" class="center-v w-12 btn--opacity__target">
        </li>
        <li>
            <default-header-profile />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
      name: "default-header-home",
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
