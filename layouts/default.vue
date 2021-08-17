<template>
  <div id="app">
    <div :class="[ 'app__content' ]">
      <default-header></default-header>
      <main role="main">
        <default-sidebar></default-sidebar>
        <Nuxt keep-alive/>
        <default-footer></default-footer>
      </main>
    </div>
    <default-loader></default-loader>
    <default-notification v-if="$nuxt.nuxt.err"></default-notification>
    <popup-default></popup-default>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'layout-default',
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    loader() {
      return this.$store.state.loader.loader
    },
    popup() {
      return this.$store.state.popup.popup
    }
  }
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
