<template>
  <div class="container">
    <!--<article class="page page--assessments">
      <div class="container">
        <button type="button" class="btn--border-turqy btn--opacity--child"
                @click="popupState( { active: true, component: 'popup-map-spatialfile', title: 'popups.spatialfile.title' })"
        >
          <span class="btn--opacity__target">Upload map image</span>
          <img src="~/assets/img/ico-button-arrow-turqy.svg">
        </button>
      </div>
    </article>-->
    <div>

      <h1 class="title">
        {{ $t( 'pages.home.title' ) }}
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Home',
    auth: false,
    computed: {
      pages() {
        return this.$store.state.pages
      }
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        })
    }

}
</script>

