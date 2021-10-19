<template>
<main role="main">
    <home-public v-if="true"></home-public>
    <home-private v-if="false"></home-private>
    <default-footer></default-footer>
</main>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'home',
  auth: false,
  data() {
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    ...mapState({
      alerts: state => state.authentication.alerts
    })
  },
  mounted() {
    const status = this.$route.params.status;

    if(status) {
      this.$store.commit('authentication/setAlert', {name: this.toCamelCase(status), value: true});
    }
  },
  methods: {
    ...mapActions({
      signIn: 'authentication/signIn',
      resendEmail: 'authentication/resendEmail'
    }),
    submit(event) {
      event.preventDefault();
      this.signIn({username: this.username, password: this.password});
    },
    resend() {
      this.resendEmail(this.email)
    },
    toCamelCase(str) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

}
}
</script>
