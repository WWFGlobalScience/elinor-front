<template>
  <div class="container">
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
export default {
    name: 'Home',
    computed: {
        pages() {
            return this.$store.state.pages
        }
    }
}
</script>

