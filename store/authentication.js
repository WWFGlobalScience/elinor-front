export const state = () => ({
  error: null,
  alerts: {
    invalidCredentials: false,
    emailVerificationSent: false,
    emailVerificationRequired: false,
    passwordChangedSuccessfully: false
  }
})

export const mutations = {
  setAlert(state, {name, value}) {
    state.alerts[name] = value;
  },
  setError(state, error) {
    state.error = error;
  }
}

export const actions = {
  async signIn(state, credentials) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Login...'
    })

    try {
      await this.$auth.loginWith('local', {
        data: {
          username: credentials.username,
          password: credentials.password
        },
      })
      await this.dispatch('assessments/reset');
      this.$router.push('/assessments');
    } catch (error) {
      if (error.response.data.non_field_errors) {
        if (error.response.data.non_field_errors[0] === 'E-mail is not verified.') {
          state.commit('setAlert', {name: 'emailVerificationRequired', value: true});
          state.commit('setAlert', {name: 'invalidCredentials', value: false});
        }

        if (error.response.data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
          state.commit('setAlert', {name: 'invalidCredentials', value: true});
        }
      }
    }

    this.dispatch('loader/loaderState', {
      active: false,
      text: ''
    })
  },
  async signUp(state, form) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Registering...'
    })

    if (form.accept_tor) {
      await this.$axios
        .$post('rest-auth/registration/', {
          username: form.username,
          email: form.email,
          password1: form.password1,
          password2: form.password2,
          first_name: form.first_name,
          last_name: form.last_name,
          affiliation: form.affiliation && form.affiliation.id,
          accept_tor: form.accept_tor,
        })
        .then((response) => {
          this.$router.push(`/status/email-verification-sent`)
        })
        .catch((error) => {
          state.commit('setError', error.response.data);
        });
    }
    this.dispatch('loader/loaderState', {
      active: false,
      text: ''
    })
  },
  async resendEmail(state, email) {
    this.dispatch('loader/loaderState', {
      active: true,
      text: 'Sending verification email...'
    })

    await this.$axios
      .$post('rest-auth/registration/resend-verification-email/', {email})
      .then((response) => {
        this.$router.push(`/status/email-verification-sent`)
      })
      .catch((error) => {
        state.commit('setError', error.response);
      });

    this.dispatch('loader/loaderState', {
      active: false,
      text: ''
    })
  },
  async forgotPassword(state, email) {
    await this.$axios
      .$post('rest-auth/password/reset/', {email})
      .finally((response) => {
        state.commit('setAlert', {name: 'forgotPasswordEmailSent', value: true});
      });
  },
  async resetPassword(state, {uid, token, password1, password2}) {
    await this.$axios
      .$post('rest-auth/password/reset/confirm/' + uid + '/' + token + '/', {
        uid,
        token,
        new_password1: password1,
        new_password2: password2,
      })
      .then((response) => {
        this.$router.push(`/status/password-changed-successfully`)
      })
      .catch((error) => {
        state.commit('setError', true);
      });
  },
  async confirmEmail(state, token) {
    await this.$axios
      .$post('rest-auth/account-confirm-email/', {key: token})
      .then((response) => {
        this.$router.push(`/status/email-confirmed-successfully`)
      })
      .catch((error) => {
        state.commit('setError', true);
      });
  },
  async logout(state) {
      await this.$auth.logout();
      await this.dispatch('assessments/reset');
      this.dispatch('dropdown/toggleDropdown');
      this.$router.push(`/`);
  }
}
